#!/usr/bin/env bash
# One Linux host sample. Exit: 0 healthy, 2 threshold crossed, 1 collection/config error.
set -euo pipefail
umask 077
CPU_LIMIT=${CPU_LIMIT:-85}; MEMORY_LIMIT=${MEMORY_LIMIT:-85}; DISK_LIMIT=${DISK_LIMIT:-90}
DISK_PATH=${DISK_PATH:-/}; LOG_DIR=${LOG_DIR:-./logs}; SAMPLE_SECONDS=${SAMPLE_SECONDS:-1}
for v in "$CPU_LIMIT" "$MEMORY_LIMIT" "$DISK_LIMIT"; do
  [[ $v =~ ^[0-9]+$ && ${#v} -le 3 ]] && ((10#$v <= 100)) || { echo 'Thresholds must be integers 0..100' >&2; exit 1; }
done
[[ $SAMPLE_SECONDS =~ ^[1-9][0-9]?$ ]] || { echo 'SAMPLE_SECONDS must be 1..99' >&2; exit 1; }
mkdir -p -- "$LOG_DIR"
exec 9>"$LOG_DIR/monitor.lock"
flock -n 9 || { echo 'Monitor already running' >&2; exit 1; }
read_cpu() {
  awk '/^cpu / {t=0; for(i=2;i<=9;i++)t+=$i; print t, $5+$6; exit}' /proc/stat
}
read -r total1 idle1 < <(read_cpu)
sleep "$SAMPLE_SECONDS"
read -r total2 idle2 < <(read_cpu)
(( total2 > total1 )) || { echo 'CPU sample did not advance' >&2; exit 1; }
cpu=$((100*(total2-total1-idle2+idle1)/(total2-total1)))
memory=$(awk '/^MemTotal:/ {t=$2} /^MemAvailable:/ {a=$2;found=1} END {if(t>0 && found) printf "%d", 100*(t-a)/t; else exit 1}' /proc/meminfo)
disk=$(df -P -- "$DISK_PATH" | awk 'NR==2 {gsub(/%/,"",$5); print $5}')
[[ $disk =~ ^[0-9]+$ ]] || { echo 'Cannot collect disk usage' >&2; exit 1; }
load=$(awk '{print $1}' /proc/loadavg)
uptime_seconds=$(awk '{print int($1)}' /proc/uptime)
stamp=$(date -u +%FT%TZ)
status=OK
if (( cpu >= 10#$CPU_LIMIT || memory >= 10#$MEMORY_LIMIT || disk >= 10#$DISK_LIMIT )); then status=ALERT; fi
line="$stamp status=$status cpu_pct=$cpu memory_pct=$memory disk_pct=$disk load1=$load uptime_seconds=$uptime_seconds"
printf '%s\n' "$line" | tee -a "$LOG_DIR/metrics.log"
if [[ $status == ALERT ]]; then
  printf '%s\n' "$line" >> "$LOG_DIR/alerts.log"
  if [[ ${SYSLOG_ALERTS:-0} == 1 ]]; then logger -t linux-ops-monitor -- "$line"; fi
  exit 2
fi
