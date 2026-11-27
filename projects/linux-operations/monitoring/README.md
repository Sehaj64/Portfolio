# Bash Monitoring and Alerts

## Problem and implementation

A Linux operator needs a repeatable way to see resource pressure. `monitor.sh` collects an aggregate CPU utilization sample, memory usage based on MemAvailable, filesystem capacity for one configured path, 1-minute load average and uptime. It compares percentages against independently configured limits, writes timestamped key-value metrics, and records threshold alerts. `flock` prevents overlapping samples for the same log directory. A restrictive umask protects new files.

## Usage

```bash
LOG_DIR=./logs bash monitoring/monitor.sh
CPU_LIMIT=0 LOG_DIR=./logs bash monitoring/monitor.sh
CPU_LIMIT=80 MEMORY_LIMIT=85 DISK_LIMIT=90 DISK_PATH=/ LOG_DIR=./logs bash monitoring/monitor.sh
# Optional local syslog (requires a functioning logger/syslog setup)
SYSLOG_ALERTS=1 CPU_LIMIT=0 LOG_DIR=./logs bash monitoring/monitor.sh
```

Exit codes: 0 healthy, 2 threshold reached, 1 collection/configuration failure. Cron captures output but does not act on exit code 2 itself. Integrate a supervisor if escalation is needed. Logs append on every sample; alerts can repeat until usage drops. Use logrotate for long-running installations.

## Explain the calculations

CPU percent = 100 × (delta total ticks − delta idle/iowait ticks) ÷ delta total ticks. Guest fields are excluded because their time is already counted in user/nice. Memory percent = 100 × (MemTotal − MemAvailable) ÷ MemTotal; cache is not automatically treated as exhausted memory. Disk percentage comes from `df -P`. Load average is runnable plus uninterruptible tasks averaged over time, not CPU utilization.

## Demo and failure drill

Run normally, force a threshold to zero, inspect `logs/alerts.log`, then pass `CPU_LIMIT=101` and explain why invalid settings are rejected. Try an invalid DISK_PATH and explain collection failure. The CPU and memory figures are Linux host views and may differ from container resource quotas. The script samples resources only; service-health probes are a future extension.

Architecture and flow: [diagrams](../docs/DIAGRAMS.md#monitoring).
