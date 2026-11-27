# Automatic Backup and Recovery

## Problem and implementation

A deleted file is recoverable only if the backup can be restored. The Bash job archives a selected directory into a separate destination, checks the tar listing, writes a SHA-256 sidecar, and keeps the latest KEEP tool-named archives. A temporary file and exclusive lock avoid partial archives and overlapping jobs. The Bash restore utility verifies bytes before extraction, validates every member, stages extraction, and publishes a fresh destination only on success.

## Usage

```bash
mkdir -p /tmp/ops-data
printf 'important\n' > /tmp/ops-data/report.txt
KEEP=7 bash backup/backup.sh /tmp/ops-data /tmp/ops-backups
# Use the exact archive path printed by backup.sh
bash backup/restore.sh /tmp/ops-backups/ARCHIVE.tar.gz /tmp/ops-restore
cmp /tmp/ops-data/report.txt /tmp/ops-restore/report.txt
```

The source must be a directory other than `/`. Store backups outside it. KEEP is 1..99. Restore destination must not already exist; move selected restored files back only after inspecting them. No restore overwrites a live directory. Use the edited cron template for unattended daily execution; create the log parent first and verify `crontab -l`. A schedule is supplied, not installed by this repository.

## Recovery policy and limits

With one successful backup every day, nominal RPO is up to 24 hours; failures or unscheduled changes can increase it. RTO must be measured using your data and machine; no speed claim is made. A local backup is a lab demonstration, not disaster protection against disk loss. Add encrypted off-host storage, access controls, monitoring of backup failures and regular recovery drills for real operations.

Stop writes or use an application-specific consistency mechanism for live data. This is not an incremental backup or a database snapshot. Ownership, ACLs and xattrs are not restored; GNU tar restores modification times. Link and device members are rejected rather than followed; a source containing symlinks can be archived but will deliberately fail this strict restore policy. The Bash restore accepts ordinary newline-free ASCII member names; escaped names are rejected. Restore only trusted lab backups. SHA-256 is an integrity check, not authenticity verification. Archives and checksums should both be access controlled. Restrict sources to directories owned by the operator and do not run the restore as root.

Architecture and flow: [diagrams](../docs/DIAGRAMS.md#backup-and-recovery).
