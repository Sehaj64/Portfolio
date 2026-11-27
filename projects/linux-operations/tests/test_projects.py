import hashlib
import io
import os
from pathlib import Path
import subprocess
import tarfile
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
def run(script, *args, env=None):
    command = ['python3' if script.endswith('.py') else 'bash', str(ROOT / script), *map(str, args)]
    return subprocess.run(command, text=True, capture_output=True, env={**os.environ, **(env or {})})

class LabTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
    def source(self):
        src = self.root / 'source files'; src.mkdir()
        (src / 'hello.txt').write_text('Linux operations\n'); (src / '.hidden').write_text('hidden')
        (src / 'nested').mkdir(); (src / 'nested' / 'binary').write_bytes(bytes(range(256)))
        return src
    def backup(self, src, keep='7'):
        dest = self.root / 'backups'
        result = run('backup/backup.sh', src, dest, env={'KEEP':keep})
        self.assertEqual(result.returncode, 0, result.stderr)
        return dest, sorted(dest.glob('*.tar.gz'))[-1]
    def test_backup_restore_byte_comparison(self):
        src = self.source(); _, archive = self.backup(src)
        dest = self.root / 'restored'
        result = run('backup/restore.py', archive, dest)
        self.assertEqual(result.returncode, 0, result.stderr)
        for f in src.rglob('*'):
            if f.is_file(): self.assertEqual(f.read_bytes(), (dest / f.relative_to(src)).read_bytes())
        self.assertNotEqual(run('backup/restore.py', archive, dest).returncode, 0)
    def test_corrupt_archive_rejected(self):
        _, archive = self.backup(self.source()); archive.write_bytes(b'corrupt')
        dest = self.root / 'restored'
        self.assertNotEqual(run('backup/restore.py', archive, dest).returncode, 0)
        self.assertFalse(dest.exists())
    def test_retention_preserves_unrelated_files(self):
        src = self.source(); dest, _ = self.backup(src)
        (dest / 'personal.tar.gz').write_text('keep')
        for _ in range(3): self.backup(src, '2')
        self.assertEqual(len(list(dest.glob('ops-backup-*.tar.gz'))), 2)
        self.assertTrue((dest / 'personal.tar.gz').exists())
    def test_destination_inside_source_rejected(self):
        src = self.source()
        self.assertNotEqual(run('backup/backup.sh', src, src / 'backups').returncode, 0)
    def test_unsafe_archive_rejected(self):
        for name, link in [('../escape', False), ('/absolute', False), ('link', True)]:
            archive = self.root / 'bad.tar.gz'
            with tarfile.open(archive, 'w:gz') as tf:
                member = tarfile.TarInfo(name)
                if link: member.type = tarfile.SYMTYPE; member.linkname = '/etc/passwd'; tf.addfile(member)
                else: member.size = 1; tf.addfile(member, io.BytesIO(b'x'))
            Path(str(archive)+'.sha256').write_text(hashlib.sha256(archive.read_bytes()).hexdigest()+'  bad.tar.gz\n')
            dest = self.root / 'restored'
            self.assertNotEqual(run('backup/restore.py', archive, dest).returncode, 0)
            self.assertFalse(dest.exists())
    def test_monitor_real_sample_and_forced_alert(self):
        for limit, expected in [('100', 0), ('0', 2)]:
            result = run('monitoring/monitor.sh', env={'CPU_LIMIT':limit,'MEMORY_LIMIT':limit,'DISK_LIMIT':limit,'LOG_DIR':str(self.root/limit)})
            # A fully used filesystem or CPU may legitimately alert at 100.
            self.assertIn(result.returncode, (0,2), result.stderr)
            if expected == 2:
                self.assertEqual(result.returncode, 2)
                self.assertIn('status=ALERT', (self.root/limit/'alerts.log').read_text())
            self.assertIn('uptime_seconds=', result.stdout)
    def test_invalid_threshold_rejected(self):
        for value in ['101','-1','abc','999999999999999999999999']:
            self.assertEqual(run('monitoring/monitor.sh',env={'CPU_LIMIT':value}).returncode,1)
    def test_user_plans_and_rejections(self):
        if os.geteuid() != 0:
            result = run('user-management/users.sh', '--apply', 'create', 'opslab_demo')
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('requires root', result.stderr)
        for action in ['create','group','lock','unlock']:
            result=run('user-management/users.sh',action,'opslab_demo')
            self.assertEqual(result.returncode,0,result.stderr); self.assertTrue(result.stdout.startswith('PLAN '))
        result=run('user-management/users.sh','add-group','opslab_demo','opslab_team')
        self.assertIn('usermod -aG opslab_team',result.stdout)
        for name in ['root','opslab_;id','opslab_../../etc','opslab_']:
            self.assertNotEqual(run('user-management/users.sh','create',name).returncode,0)
