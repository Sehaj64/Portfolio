#!/usr/bin/env bash
# Create and verify a compressed full backup; retain only this tool's old archives.
set -euo pipefail
umask 077
[[ $# == 2 ]] || { echo "Usage: $0 SOURCE_DIRECTORY BACKUP_DIRECTORY" >&2; exit 1; }
source_dir=$(realpath -e -- "$1")
[[ -d $source_dir && $source_dir != / ]] || { echo 'Source must be a non-root directory' >&2; exit 1; }
mkdir -p -- "$2"
backup_dir=$(realpath -e -- "$2")
[[ $backup_dir != "$source_dir" && $backup_dir != "$source_dir/"* ]] || { echo 'Backups must be outside the source directory' >&2; exit 1; }
KEEP=${KEEP:-7}
[[ $KEEP =~ ^[1-9][0-9]?$ ]] || { echo 'KEEP must be 1..99' >&2; exit 1; }
exec 9>"$backup_dir/.backup.lock"
flock -n 9 || { echo 'Backup already running' >&2; exit 1; }
tmp=$(mktemp "$backup_dir/.pending.XXXXXX")
trap 'rm -f -- "$tmp"' EXIT
name="ops-backup-$(date -u +%Y%m%dT%H%M%S)-${tmp##*.}.tar.gz"
tar -czf "$tmp" -C "$source_dir" .
tar -tzf "$tmp" > /dev/null
mv -- "$tmp" "$backup_dir/$name"
(cd "$backup_dir" && sha256sum -- "$name" > "$name.sha256")
# Sort controlled names only; never remove unrelated archives or arbitrary user files.
mapfile -t archives < <(find "$backup_dir" -maxdepth 1 -type f -name 'ops-backup-*.tar.gz' -printf '%f\n' | LC_ALL=C sort -r)
for ((i=KEEP;i<${#archives[@]};i++)); do
  rm -- "$backup_dir/${archives[i]}"
  rm -f -- "$backup_dir/${archives[i]}.sha256"
done
printf 'BACKUP_OK archive=%s retained=%s\n' "$backup_dir/$name" "$KEEP"
