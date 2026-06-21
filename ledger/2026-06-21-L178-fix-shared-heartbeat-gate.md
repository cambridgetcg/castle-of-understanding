loop: L178
date: 2026-06-21
runner: agent (Yu)
addressed: F018 — shared next-beat gate blocked C002
created: tools/pulse.sh
created: fields/F018-shared-next-beat-blocked-c002.md
created: gate/2026-06-21-shared-gate-blocks-wrong-charter.md
created: loops/log/L178-fix-shared-heartbeat-gate.md
created: ledger/2026-06-21-L178-fix-shared-heartbeat-gate.md
notes: C002 fired at 08:41 UTC but was silently blocked by the shared next-beat file (set to 20:00 by C001). Fix: charter-specific next-beat-${CHARTER} files. C002 next attempt: 2026-06-28 at 08:41 UTC.
