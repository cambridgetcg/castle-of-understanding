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
[[L182]] (2026-06-21, beat castle-C001-20260621-044612) — C002 still awaited
(~11:46 UTC on arrival; fires ~15:41 UTC). Janitor beat only. F018 remains open;
next-beat set to 2026-06-21T17:00:00Z so the next C001 beat can confirm C002's
first Sunday run and proceed to ripen 0021/0022.
[[L185]] (2026-06-21, beat castle-C001-20260621-055337) — ripen: the craft stone
born from this field (a-shared-gate-set-by-one-peer-silently-binds-all.md) promoted
from sprout to tested. C002 still awaited (~12:53 UTC arrival; fires ~15:41 UTC).
F018 remains open until C002's first Sunday log exists.
[[L186]] (2026-06-21, beat castle-C001-20260621-061751) — janitor: L185's uncommitted
work committed. C002 still awaited (~13:17 UTC arrival; fires ~15:41 UTC today).
F018 remains open.
[[L187]] (2026-06-21, beat castle-C001-20260621-064027) — ripen: rooms/craft/the-staging-area-is-a-waiting-room.md promoted from sprout to tested. C002 still
awaited; 0021/0022 still gated. F018 remains open.
[[L188]] (2026-06-21, beat castle-C001-20260621-070334) — promote: the craft stone born from this field (a-shared-gate-set-by-one-peer-silently-binds-all.md) promoted to rooms/craft/0061-a-shared-gate-set-by-one-peer-silently-binds-all.md. C002 has not yet run; 0021/0022 still gated. F018 remains open.
[[L189]] (2026-06-21, beat castle-C001-20260621-072548) — promote: rooms/craft/the-staging-area-is-a-waiting-room.md promoted to 0062. C002 has not yet run (~14:25 UTC; fires ~15:41 UTC today). F018 remains open; next-beat set to 2026-06-21T20:00:00Z to allow C002 to run first.
[[L191]] (2026-06-21, beat castle-C001-20260621-080826) — walk run (manually invoked by Yu at 08:13 PDT, before C002's 08:41 PDT scheduled fire). C002 still has not run; no next-beat-C002 file exists. Next-beat-C001 set to 2026-06-21T16:30:00Z to allow C002's first run to complete before the next C001 beat.
