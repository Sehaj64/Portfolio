# Linux Operations Revision

| Area | Commands and meaning |
|---|---|
| Navigation and files | pwd, ls -la, cd, cp -a, mv, mkdir, rm; quote paths and preview destructive actions |
| File viewing/search | cat, less, head, tail -f, grep -n, find; use grep for content, find for directory traversal |
| Editing | nano: Ctrl+O save, Enter confirm, Ctrl+X exit; Vim: i insert, Esc command mode, :wq save/quit, :q! discard |
| Filesystem | / is root; /home contains user homes; /root is root's home; /etc configuration; /proc virtual kernel/process data; /usr/bin commands; ~/bin personal commands |
| Permissions | ls -l, stat, chmod, chown, chgrp, umask; ownership and mode bits govern access |
| Links | ln FILE HARDLINK; ln -s TARGET SYMLINK; modern distributions may merge /bin into /usr/bin |
| Users | id, whoami, getent passwd, getent group, useradd, usermod, groupadd, passwd, sudo, su |
| Monitoring | uptime, top, ps aux, free -m, df -h, du -sh, lsblk, journalctl, systemctl status |
| Processes | ps -ef, pgrep, kill -TERM PID; use kill -KILL PID only after assessing impact |
| Packages | apt update refreshes metadata; apt install PACKAGE installs; apt-get is suitable for scripts |
| Scheduling | crontab -e, crontab -l; cron has a minimal environment; use absolute paths |
| Bash | variables, quoting, arrays, if/case, loops, functions, pipes, redirects, exit status, traps |
| Resource limits | ulimit -a reports shell limits; cgroups govern process-group resource limits |
| Containers | share the host kernel; separate namespaces and cgroups; a VM has its own guest kernel |

Networking and troubleshooting are excluded from the project scope as requested.
