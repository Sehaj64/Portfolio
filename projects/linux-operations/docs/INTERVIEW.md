# Linux Operations Interview Walkthrough

## Honest introduction

"I am an AI and Data Science graduate preparing for Linux operations roles. My portfolio has three lab projects: Bash monitoring with threshold alerts, scheduled backup and verified recovery, and user/group administration with preview and apply modes. I can demonstrate the scripts, explain the failure cases, and distinguish lab results from production requirements."

## Demonstration order

1. Run `make syntax test` and explain the real sampling, round-trip restore and rejected unsafe inputs.
2. Run monitoring normally, then force an alert with CPU_LIMIT=0. Explain why exit 2 is a designed result.
3. Create a sample file, back it up and restore into a new directory. Compare the restored bytes. Alter a copied archive and show checksum rejection.
4. Preview account creation and group membership. Demonstrate root apply only in your disposable VM.
5. Open the diagrams and trace collection, decisions, storage and failures.

## Questions and answers

| Question | Answer |
|---|---|
| Why Bash? | Small orchestration around standard Linux tools; Python handles structured archive validation and restoration. |
| What does set -euo pipefail do? | Exit on many command failures, unset variables and failed pipeline components; it is not a substitute for explicit error checks. |
| Why flock? | Prevent two jobs from operating on the same log/backup area simultaneously; locks are advisory. |
| Load vs CPU? | Load includes runnable and uninterruptible tasks; utilization measures busy CPU time. Interpret load against core count and I/O conditions. |
| Memory used is high; is RAM exhausted? | Check MemAvailable, swapping and workload behavior; Linux uses spare memory for cache. |
| Why is df different from du? | df reports filesystem allocation; du walks reachable files. Deleted-open files, reserved blocks, mounts and permissions can cause differences. |
| First action for a stuck process? | Inspect PID, state, logs and owner; request graceful termination with SIGTERM before SIGKILL if necessary. |
| Why not always kill -9? | SIGKILL prevents cleanup and can interrupt writes; it cannot immediately remove a task stuck in uninterruptible kernel sleep. |
| Hard link vs symbolic link? | Hard links share an inode within a filesystem; symlinks reference a path and can cross filesystems or become dangling. |
| Why checksum plus restore drill? | A checksum catches changed bytes, while a restore drill demonstrates usable contents and recovery steps. |
| Why reject links on restore? | Keep the exercise limited to ordinary files and avoid link-based writes outside the destination. |
| Why -aG? | Append supplementary groups without replacing other memberships. |
| Does usermod -L block SSH? | It locks the password; SSH keys and sessions need separate revocation controls. |
| chmod 750? | Owner rwx, group r-x, others no permissions. Directory execute allows traversal. |
| What is RPO/RTO? | RPO is tolerated data loss in time; RTO is the recovery duration target. Neither is proven by just creating a cron entry. |
| What would production need? | Off-host encrypted backups, alert delivery/escalation, log rotation, consistency controls, access reviews and measured recovery objectives. |

## Before using this resume in an interview

Run all three labs yourself, reproduce an alert and a restore, and complete the account/permission exercise in a disposable VM. Explain each line you list; do not describe lab code as employment or production administration.
