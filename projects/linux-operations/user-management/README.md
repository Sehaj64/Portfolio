# Linux User Management

[Run the live Bash demo in Google Colab](https://colab.research.google.com/github/Sehaj64/Portfolio/blob/main/projects/linux-operations/user-management/live-demo.ipynb)

## Problem and implementation

Routine account tasks are easy to mistype. `users.sh` validates a lab naming convention, previews the command by default, and only changes accounts when explicitly run with `--apply` as root. Mutations are limited to `opslab_` names. It supports user/group creation, supplementary group membership, password lock/unlock and read-only inspection. Existing users/groups are detected during creation; system UIDs are rejected for modifications.

## Preview first

```bash
bash user-management/users.sh create opslab_demo
bash user-management/users.sh group opslab_team
bash user-management/users.sh add-group opslab_demo opslab_team
bash user-management/users.sh lock opslab_demo
```

## Apply only in a disposable VM

```bash
sudo bash user-management/users.sh --apply group opslab_team
sudo bash user-management/users.sh --apply create opslab_demo
sudo bash user-management/users.sh --apply add-group opslab_demo opslab_team
bash user-management/users.sh inspect opslab_demo
sudo passwd opslab_demo
sudo bash user-management/users.sh --apply lock opslab_demo
sudo passwd -S opslab_demo
sudo bash user-management/users.sh --apply unlock opslab_demo
```

Password entry is interactive; no passwords are stored in source. A new user starts without a usable password. Set a password before testing unlock; usermod may refuse an unlock that would leave a passwordless account. `-aG` appends a supplementary group; omitting `-a` can remove existing supplementary memberships. Existing sessions generally need a new login to see group changes.

## Permission exercise

In the disposable VM, create a shared lab directory with `sudo install -d -m 2770 -g opslab_team /srv/opslab-shared`. The setgid bit makes new files inherit the directory group. Inspect with `ls -ld` and `stat`. Test access from a fresh `sudo -iu opslab_demo` session. File creation permissions also depend on umask; directory write and execute permissions control adding/removing entries.

## Account limitations

Password locking is not full access revocation: authorized SSH keys, running processes and active sessions remain. Removing an account or granting sudo is deliberately manual and not automated. The prefix is an accident guard, not a security boundary; never use this tool on production accounts. Tests cover previews, validation and non-root apply rejection; actual root account lifecycle is a manual VM exercise, not claimed as tested on this workstation.

Architecture and flow: [diagrams](../docs/DIAGRAMS.md#user-management).
