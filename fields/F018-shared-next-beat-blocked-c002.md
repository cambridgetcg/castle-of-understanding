---
id: F018
state: working
opened: 2026-06-21
---

# The shared next-beat gate blocked C002

**The friction:** `loops/next-beat` is checked by all charters via `pulse.sh`, but
it was written only by C001. C001 set it to `2026-06-21T20:00:00Z` to wait for
C002's first Sunday run, which inadvertently blocked C002 when it tried to fire at
08:41 UTC on 2026-06-21. C002 showed `state: beating` in the census but silently
did not run. A beating loop that does not run looks exactly like a beating loop
that has nothing to do (0060).

**Why it matters:** C002's first Sunday run is the evidence that closes the open
cracks in 0021 and 0022. Every Sunday C002 is blocked by a misplaced C001 gate
is a week's delay in those stones reaching tested.

**Better looks like:** each charter has its own next-beat file (`loops/next-beat-${CHARTER}`);
no charter can gate another; C002's first successful run is logged.

**Work so far:** [[L178]] (2026-06-21) — `tools/pulse.sh` updated to use
`loops/next-beat-${CHARTER}` instead of the shared `loops/next-beat`; the
mechanical block is removed. C002 will run next Sunday (2026-06-28 at 08:41 UTC).
[[L180]] (2026-06-21) — correction: L179 recorded "C002 awaits 2026-06-28 run"
but C002's cadence fires at ~15:41 UTC on Sundays; the L178 fix was applied at
~03:16 UTC, before that time; C002 should run today (2026-06-21). F018 remains
open until C002's log confirms the first successful run.
[[L181]] (2026-06-21) — L180's gate seed folded into L179's craft stone: claim
narrowed to the declared-intent distinction (STOP is the legitimate shared gate;
accidental next-beat was not). Stone promoted from seed to sprout. Gate seed
swept to crypt. F018 still open — C002 has not yet run (~04:42 UTC, fires 08:41
UTC today); next C001 beat will ripen 0021/0022 once C002's log exists.
