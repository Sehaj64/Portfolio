#!/usr/bin/env bash
# GNU tar restore for trusted lab backups: fail closed on unsafe archive members.
set -euo pipefail
umask 077
export LC_ALL=C
[[ $# == 2 ]] || { echo "Usage: $0 ARCHIVE DESTINATION" >&2; exit 1; }
archive=$(realpath -e -- "$1")
destination=$(realpath -m -- "$2")
[[ ! -e $destination && ! -L $destination ]] || { echo 'Destination must not exist' >&2; exit 1; }
read -r expected _ < "$archive.sha256"
[[ $expected =~ ^[[:xdigit:]]{64}$ ]] || { echo 'Invalid checksum sidecar' >&2; exit 1; }
actual=$(sha256sum -- "$archive"); actual=${actual%% *}
[[ ${expected,,} == "$actual" ]] || { echo 'Checksum mismatch' >&2; exit 1; }
parent=$(dirname -- "$destination")
mkdir -p -- "$parent"
lock_id=$(printf '%s' "$destination" | sha256sum); lock_id=${lock_id%% *}
exec 9>"$parent/.restore-$lock_id.lock"
flock -n 9 || { echo 'Restore already running' >&2; exit 1; }
stage=$(mktemp -d "$parent/.restore-stage.XXXXXX")
trap 'rm -rf -- "$stage"' EXIT
# Preserve absolute names during listing so they can be rejected explicitly.
# Escaped/newline/non-ASCII names are unsupported by this deliberately narrow lab format.
tar --absolute-names --quoting-style=escape -tzf "$archive" > "$stage/names"
tar --absolute-names --quoting-style=escape -tvzf "$archive" > "$stage/types"
while IFS= read -r name; do
  case "$name" in
    /*|*\\*|..|../*|*/../*|*/..) echo 'Unsafe or unsupported archive path' >&2; exit 1;;
  esac
done < "$stage/names"
awk 'substr($0,1,1)!="-" && substr($0,1,1)!="d" {exit 1}' "$stage/types" || { echo 'Links and special files rejected' >&2; exit 1; }
mkdir "$stage/data"
tar -xzf "$archive" -C "$stage/data" --keep-old-files --no-same-owner --no-same-permissions
# Do not carry privileged mode bits into recovered files.
find "$stage/data" -type f -exec chmod u-s,g-s {} +
[[ ! -e $destination && ! -L $destination ]] || { echo 'Destination appeared during restore' >&2; exit 1; }
mv -T -n -- "$stage/data" "$destination"
[[ ! -e $stage/data ]] || { echo 'Destination already exists' >&2; exit 1; }
printf 'RESTORE_OK destination=%s\n' "$destination"
