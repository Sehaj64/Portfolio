# Validation Record

Local checks run on 27 November 2026 in an unprivileged Linux workspace:

- Bash syntax validation for all three shell scripts.
- Eight Python unittest cases passed: backup/restore byte comparison, corrupted archive rejection, retention preserving unrelated files, backup nesting rejection, traversal/absolute-path/link rejection, real monitor sampling plus a forced alert, invalid thresholds, and account command previews with invalid-name rejection.
- Account creation/lock/unlock were not applied to the workstation. Complete the documented disposable-VM exercise to validate privileged behavior in your chosen distribution.
- Cron entries and syslog delivery were not installed or tested as services here.
- GitHub Actions configuration is supplied as a template; no successful CI run is claimed in this record.

Reproduce from this directory with `make syntax test`.
