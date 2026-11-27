#!/usr/bin/env bash
set -euo pipefail
export LC_ALL=C
root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf -- "$work"' EXIT
passed=0
ok() { passed=$((passed+1)); printf 'PASS %s\n' "$1"; }
fail() { echo "FAIL $*" >&2; exit 1; }
reject() { if "$@" >"$work/rejected.log" 2>&1; then fail 'Unexpected command success'; fi; }
mkdir -p "$work/source files/nested"
printf 'Linux operations\n' > "$work/source files/hello.txt"
printf 'hidden\n' > "$work/source files/.hidden"
printf '\001\002\003' > "$work/source files/nested/binary"
backup() { bash "$root/backup/backup.sh" "$work/source files" "$work/backups" > /dev/null; }
backup
archive=$(find "$work/backups" -name 'ops-backup-*.tar.gz' -print -quit)
bash "$root/backup/restore.sh" "$archive" "$work/restored" > /dev/null
diff -r "$work/source files" "$work/restored"
reject bash "$root/backup/restore.sh" "$archive" "$work/restored"
ok 'Byte-identical recovery and existing destination rejection'
cp -- "$archive" "$work/corrupt.tar.gz"
cp -- "$archive.sha256" "$work/corrupt.tar.gz.sha256"
printf 'corrupt' >> "$work/corrupt.tar.gz"
reject bash "$root/backup/restore.sh" "$work/corrupt.tar.gz" "$work/corrupt-restore"
[[ ! -e $work/corrupt-restore ]] || fail 'Corrupt restore published'
ok 'Checksum corruption rejection'
printf 'keep' > "$work/backups/personal.tar.gz"
for i in 1 2 3; do KEEP=2 backup; done
count=$(find "$work/backups" -name 'ops-backup-*.tar.gz' | wc -l)
[[ $count == 2 && -f $work/backups/personal.tar.gz ]] || fail retention
ok 'Retention preserves unrelated files'
reject bash "$root/backup/backup.sh" "$work/source files" "$work/source files/backups"
ok 'Backup nesting rejection'
mkdir "$work/unsafe"
printf 'x' > "$work/unsafe/file"
for transform in 's|^file$|../escape|' 's|^file$|/absolute|'; do
 tar -czf "$work/bad.tar.gz" --transform="$transform" -C "$work/unsafe" file
 sha256sum "$work/bad.tar.gz" > "$work/bad.tar.gz.sha256"
 reject bash "$root/backup/restore.sh" "$work/bad.tar.gz" "$work/unsafe-restore"
done
ln -s /etc/passwd "$work/unsafe/link"
tar -czf "$work/bad.tar.gz" -C "$work/unsafe" link
sha256sum "$work/bad.tar.gz" > "$work/bad.tar.gz.sha256"
reject bash "$root/backup/restore.sh" "$work/bad.tar.gz" "$work/unsafe-restore"
[[ ! -e $work/unsafe-restore ]] || fail 'Unsafe restore published'
ok 'Traversal absolute paths and symlinks rejected'
rc=0
CPU_LIMIT=0 LOG_DIR="$work/logs" bash "$root/monitoring/monitor.sh" > "$work/sample" || rc=$?
[[ $rc == 2 ]] || fail "Monitor returned $rc"
grep -q 'status=ALERT' "$work/logs/alerts.log"
grep -q 'uptime_seconds=' "$work/sample"
ok 'Real monitoring sample and forced alert'
for threshold in 101 -1 abc 999999999999999999; do
 reject env CPU_LIMIT="$threshold" bash "$root/monitoring/monitor.sh"
done
ok 'Invalid monitoring thresholds rejected'
for action in create group lock unlock; do
 bash "$root/user-management/users.sh" "$action" opslab_demo | grep -q '^PLAN '
done
bash "$root/user-management/users.sh" add-group opslab_demo opslab_team | grep -q 'usermod -aG opslab_team'
for name in root 'opslab_;id' 'opslab_../../etc' opslab_; do
 reject bash "$root/user-management/users.sh" create "$name"
done
if (( EUID != 0 )); then
 reject bash "$root/user-management/users.sh" --apply create opslab_demo
 grep -q 'requires root' "$work/rejected.log"
fi
ok 'User plans name validation and non-root apply rejection'
printf 'All %s Bash test groups passed\n' "$passed"
