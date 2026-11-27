#!/usr/bin/env python3
"""Verify checksum and restore regular files/directories into a new destination."""
import argparse
import hashlib
import os
from pathlib import Path, PurePosixPath
import shutil
import tarfile
import tempfile

def restore(archive, destination):
    archive = Path(archive).resolve(strict=True)
    destination = Path(os.path.abspath(destination))
    if destination.exists() or destination.is_symlink():
        raise ValueError('Destination must not exist; restore into a fresh directory')
    checksum = Path(str(archive) + '.sha256').read_text().split()[0]
    h = hashlib.sha256()
    with archive.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(chunk)
    if h.hexdigest() != checksum:
        raise ValueError('Checksum mismatch; archive was not restored')
    # Stage on the same filesystem. Publish only a completely extracted backup.
    destination.parent.mkdir(parents=True, exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix='.restore-', dir=destination.parent))
    try:
        with tarfile.open(archive, 'r:gz') as tf:
            members = tf.getmembers()
            for member in members:
                path = PurePosixPath(member.name)
                if path.is_absolute() or '..' in path.parts:
                    raise ValueError('Unsafe archive path')
                if not (member.isfile() or member.isdir()):
                    raise ValueError('Only regular files/directories can be restored; links and special files rejected')
            for member in members:
                target = stage.joinpath(*PurePosixPath(member.name).parts)
                if member.isdir():
                    target.mkdir(parents=True, exist_ok=True)
                else:
                    target.parent.mkdir(parents=True, exist_ok=True)
                    with tf.extractfile(member) as src, target.open('xb') as dst:
                        shutil.copyfileobj(src, dst)
                    target.chmod(member.mode & 0o777)  # never restore setuid/setgid
            for member in reversed(members):
                if member.isdir():
                    stage.joinpath(*PurePosixPath(member.name).parts).chmod(member.mode & 0o777)
        # Do not run multiple restores to the same destination concurrently.
        if destination.exists() or destination.is_symlink():
            raise ValueError('Destination appeared during restore')
        stage.rename(destination)
    except BaseException:
        shutil.rmtree(stage, ignore_errors=True)
        raise
    return destination

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive'); parser.add_argument('destination')
    args = parser.parse_args()
    try:
        print('RESTORE_OK destination=' + str(restore(args.archive, args.destination)))
    except (ValueError, OSError, tarfile.TarError) as exc:
        parser.exit(1, f'RESTORE_FAILED {exc}\n')
