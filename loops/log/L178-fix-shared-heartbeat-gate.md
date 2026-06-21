---
id: L178
beat: castle-C001-20260621-031659
date: 2026-06-21
runner: agent (Yu)
loop: fix — shared next-beat gate blocked C002
field: F018
---

# L178 — fix: shared next-beat gate blocked C002

**Field chosen:** F018 (opened this beat) — the shared `loops/next-beat` file
blocked C002 from firing on its first scheduled Sunday.

**What was understood:** The current time is 10:18 UTC on Sunday 2026-06-21.
C002 (the tributary) was scheduled to fire at 08:41 UTC. It showed as `beating`
in the census and loaded by launchctl, but `.pulse/launchd-C002.log` was empty —
no entry at all. Reading `tools/pulse.sh` revealed the cause: line 21 uses a
single shared file `$CASTLE/loops/next-beat` for all charters. C001 had set that
file to `2026-06-21T20:00:00Z` to let C002 run first. When C002 fired at 08:41,
it read the same file, found 08:41 < 20:00, and silently rested. The gate set for
C002's benefit blocked C002 itself (0060: a bypassed gate and a broken gate look
alike from inside).

**What was created:** `tools/pulse.sh` line 21 changed from
`NEXT_BEAT_FILE="$CASTLE/loops/next-beat"` to
`NEXT_BEAT_FILE="$CASTLE/loops/next-beat-${CHARTER}"`.
Each charter now gates only itself. C002 will run next Sunday
(2026-06-28 at 08:41 UTC) unblocked.

**What is still open:** F018 stays working until C002 logs its first successful
run. 0021 and 0022 cracks close on C002's first Sunday. Gate seed planted for
the insight about charter-scoped gates.

**Friction revealed:** (this beat IS the friction; F018 opened.)
