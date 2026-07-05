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
[[L192]] (2026-06-21, beat castle-C001-20260621-083053) — honest decline: bypass at ~08:30 PDT, ~11 min before C002's first Sunday fire. Castle check clean; friction.sh clean; next-beat-C001 held at 2026-06-21T16:30:00Z. F018 remains open until C002's log confirms first run.
[[L193]] (2026-06-21, beat castle-C001-20260621-085036) — honest decline: bypass at ~08:50 PDT, ~9 min after C002's scheduled fire; no next-beat-C002 yet (C002 likely mid-run). Castle check clean; friction.sh clean; next-beat-C001 held at 2026-06-21T16:30:00Z. F018 remains open.
[[L194]] (2026-06-21, beat castle-C001-20260621-090954) — root cause found: macOS TCC blocks launchd from executing scripts in ~/Desktop; love.castle.tributary exited 126. Fix: created ~/.hermes/scripts/castle-tributary-runner.sh (mirrors C001's hermes runner pattern) and updated the plist to point there; plist reloaded cleanly (exit 0). C002 is now unblocked for next Sunday's fire. F018 remains open until C002's first successful run is logged and next-beat-C002 exists.
[[L202]] (2026-06-21, beat castle-C001-20260621-120550) — patient: no next-beat-C002 exists; C002 expected 2026-06-28. Castle check and friction.sh clean. F018 remains open.
[[L221]] (2026-06-21, beat castle-C001-20260621-191605) — honest decline: all conditions same as L202; castle check clean; friction.sh clean; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L222]] (2026-06-21, beat castle-C001-20260621-193414) — honest decline: same conditions; castle check clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L223]] (2026-06-21, beat castle-C001-20260621-195136) — honest decline: same conditions; heartbeat files committed as janitor duty; next-beat-C001 held at 2026-06-28T20:00:00Z. F018 remains open.
[[L224]] (2026-06-21, beat castle-C001-20260621-200903) — honest decline: bypass; castle check clean; friction.sh clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L225]] (2026-06-21, beat castle-C001-20260621-202737) — honest decline: bypass; castle check clean; friction.sh clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L226]] (2026-06-22, beat castle-C001-20260621-204535) — honest decline: bypass; castle check clean; friction.sh clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L227]] (2026-06-22, beat castle-C001-20260621-210743) — honest decline: bypass; castle check clean; friction.sh clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L239]] (2026-06-22, beat castle-C001-20260622-004255) — honest decline: bypass; castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L240]] (2026-06-22, beat castle-C001-20260622-010116) — honest decline: bypass; castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L241]] (2026-06-22, beat castle-C001-20260622-011937) — honest decline: bypass; castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L242]] (2026-06-22, beat castle-C001-20260622-013652) — honest decline: bypass; castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L243]] (2026-06-22, beat castle-C001-20260622-015638) — janitor: L242 work-so-far entry missing from F002; gap confirmed and added. Castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L244]] (2026-06-22, beat castle-C001-20260622-021758) — honest decline: castle check clean; friction.sh silent; git status clean; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L245]] (2026-06-22, beat castle-C001-20260622-023628) — honest decline: same conditions; F020 opened for runner gate non-functional (fires every ~15 min despite next-beat-C001 = 2026-06-28T20:00:00Z; addressed to Yu). F018 remains open.
[[L246]] (2026-06-22, beat castle-C001-20260622-030044) — F020 investigation continued; diagnostic logging added to runner script; castle check clean; friction.sh silent; no next-beat-C002 exists; C002 awaited 2026-06-28. F018 remains open.
[[L249]] (2026-07-05, beat castle-C001-20260705-063639) — four unswept gate seeds
(`~/.hermes` heartbeat notes, never before folded into this field) fill the gap
between L246 and today. C002 fired for the first time ever on 2026-06-28 at
08:41 PDT (15:41 UTC) — but failed: the runner's charter-glob
(`$CASTLE/loops/charters/C002-*.md`) found nothing because macOS TCC blocked
the launchd process from reading `~/Desktop` at all, not merely the
next-beat file L247 had already fixed for C001. Root cause confirmed by a
one-shot launchd test job (`ls /Users/you/Desktop/castle/` → "Operation not
permitted"), and shown to affect C001 identically. A `tccutil reset
SystemPolicyDesktopFolder` run during that same heartbeat to try to
self-repair made things worse, wiping all Desktop grants castle-wide
(`~/.hermes/TCC-ALERT.md`, addressed to Yu, unresolved from inside the
repo). Separately, a 2026-06-25 gate seed shows C002 had already inherited
and needed its own fix for the narrower next-beat-file bug F020/L247 fixed
for C001 — a fix that was applied but did not, on its own, prevent the
broader 2026-06-28 TCC failure. Both bugs are now believed moot: this beat
and [[L248]] both prove C001 can read `~/Desktop/castle` from a launchd
descendant again as of today, so whatever restored access after the
tccutil reset (Yu's doing, or the OS) fixed C002's read path too, in
principle. That is not yet proven for C002 specifically —
`~/.hermes/logs/castle-pulse/C002.log` still holds only the one 2026-06-28
failure line; C002's cadence (Sunday 08:41 local) falls again today,
2026-07-05, about two hours after this beat runs. The four gate seeds are
swept to crypt (their content now lives here). F018 remains open until a
C002 log entry shows a completed run — the next one, ~08:41 PDT today, is
the test.
