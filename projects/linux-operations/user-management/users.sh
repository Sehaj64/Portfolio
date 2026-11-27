#!/usr/bin/env bash
# Preview by default. Mutations limited to opslab_ names on a disposable Linux lab.
set -euo pipefail
umask 077
apply=0
if [[ ${1:-} == --apply ]]; then apply=1; shift; fi
[[ $# == 2 || $# == 3 ]] || { echo "Usage: $0 [--apply] {create|group|add-group|lock|unlock|inspect} opslab_NAME [opslab_GROUP]" >&2; exit 1; }
action=$1; name=$2; group=${3:-}
valid() { [[ $1 =~ ^opslab_[a-z][a-z0-9_]{0,20}$ ]]; }
valid "$name" || { echo 'Names must start opslab_ and use lowercase letters, numbers or underscores' >&2; exit 1; }
case "$action" in
 create) cmd=(useradd --create-home --shell /bin/bash -- "$name");;
 group) cmd=(groupadd -- "$name");;
 add-group) valid "$group" || { echo 'Valid opslab_ group required' >&2; exit 1; }; cmd=(usermod -aG "$group" -- "$name");;
 lock) cmd=(usermod -L -- "$name");;
 unlock) cmd=(usermod -U -- "$name");;
 inspect) id -- "$name"; exit;;
 *) echo 'Unknown action' >&2; exit 1;;
esac
if [[ $action != add-group && $# != 2 ]]; then echo 'Unexpected group argument' >&2; exit 1; fi
if (( !apply )); then printf 'PLAN '; printf '%q ' "${cmd[@]}"; printf '\n'; exit; fi
(( EUID == 0 )) || { echo 'Apply requires root in a disposable lab' >&2; exit 1; }
if [[ $action == create ]] && getent passwd "$name" > /dev/null; then echo 'EXISTS user'; exit; fi
if [[ $action == group ]] && getent group "$name" > /dev/null; then echo 'EXISTS group'; exit; fi
if [[ $action == add-group ]]; then getent group "$group" > /dev/null || { echo 'Group missing' >&2; exit 1; }; fi
if [[ $action != create && $action != group ]]; then
  entry=$(getent passwd "$name") || { echo 'User missing' >&2; exit 1; }
  IFS=: read -r _ _ uid _ <<< "$entry"
  (( uid >= 1000 && uid != 65534 )) || { echo 'Refusing a system account' >&2; exit 1; }
fi
"${cmd[@]}"
printf 'APPLIED action=%s name=%s\n' "$action" "$name"
