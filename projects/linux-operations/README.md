# Linux Operations Portfolio

Three reproducible Linux interview labs by Sehaj Kumar: Bash host monitoring and alerts, automated backup and recovery, and Linux user management. These are learning projects, not claims of production administration experience.

| Project | Main implementation | Demonstrates |
|---|---|---|
| [Monitoring and alerts](monitoring/README.md) | Bash, `/proc`, `df`, `flock`, optional syslog | CPU sampling, memory pressure, disk thresholds, logs, exit codes |
| [Backup and recovery](backup/README.md) | Bash, GNU tar, SHA-256, Python | Scheduled full backups, retention, integrity verification, safe restore |
| [User management](user-management/README.md) | Bash, useradd, groupadd, usermod | Preview/apply, supplementary groups, password locking, account inspection |

## Run the labs

Use an Ubuntu/Debian disposable VM or WSL Linux distribution with Bash, Python 3.10+, GNU coreutils/findutils/tar, util-linux (`flock`), and standard account tools. Commands below run from this directory. Run ordinary scripts as your normal user. Only apply user changes as root inside a disposable lab.

```bash
make syntax test
LOG_DIR=./logs bash monitoring/monitor.sh
# Forced alert demo: expected exit code 2
CPU_LIMIT=0 LOG_DIR=./logs bash monitoring/monitor.sh
mkdir -p /tmp/ops-demo-source
printf 'restore me\n' > /tmp/ops-demo-source/example.txt
bash backup/backup.sh /tmp/ops-demo-source /tmp/ops-demo-backups
# Replace ARCHIVE with the path printed above. Destination must not exist.
python3 backup/restore.py /tmp/ops-demo-backups/ARCHIVE.tar.gz /tmp/ops-demo-restored
bash user-management/users.sh create opslab_demo
```

Read [interview walkthrough](docs/INTERVIEW.md), [architecture and flow diagrams](docs/DIAGRAMS.md), [command revision](docs/COMMANDS.md) and [test evidence](docs/VALIDATION.md). Cron examples are in [examples/crontab](examples/crontab); they must be edited before installation. Nothing installs schedules automatically.

## Scope and limitations

Monitoring is host level; container CPU/memory limits are not calculated. Alerts go to stdout, a local alert file and optionally syslog; no email/SMS integration is claimed. Logs need external rotation. Backups are compressed full snapshots of a quiescent source, not application-consistent database backups; SHA-256 detects corruption, not malicious replacement of both files. Keep an off-host encrypted copy separately. Restore deliberately rejects links and special files; it does not preserve ownership, ACLs, xattrs or original timestamps. Do not restore untrusted archives or run concurrent restores to one destination. User password locking does not revoke SSH keys or active sessions. See each project README for details.

## Repository layout

`monitoring/`, `backup/`, `user-management/`, `tests/`, `docs/`, `examples/`.

The included `.github/workflows/test.yml` works when this folder is the repository root. When hosted inside another repository, copy it to that repository's workflow folder and set the job working directory to this folder. It is a CI template until enabled there.
