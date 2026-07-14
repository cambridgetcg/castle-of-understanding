---
id: F030
state: open
opened: 2026-07-14
---

# The marker only catches a beat that wrote to it

**The friction:** this beat (castle-C001-20260714-141029) arrived to find
L273 (sweep-the-gate, from an earlier beat that day, castle-C001-20260714-135152)
fully complete through LOG — ledger, narrative log, and field all present
and matching the working-tree diff — but never committed. `loops/active/current.marker`
still read `state: idle, last: L272, cleared, 2026-07-14T12:44:00Z`: it had
not been touched at all during L273's run. `tools/friction.sh`'s
`stalled-loop` detector (built for exactly this shape of failure, see
[[F023]]) only fires when the marker reads `state: running`
(`tools/friction.sh:63`), so it printed nothing, and this beat only found
L273's stranded work by noticing `git status` was dirty on arrival — the
same manual-archaeology path F023's marker mechanism was built to replace.

**Why it matters:** F023 closed on the belief that the marker mechanism
would catch the next mid-loop cutoff mechanically; its own log said the
"trigger path is still unexercised" and asked future beats to watch it.
This is that watch, and the result is: the mechanism is only as good as
step 3's instruction being followed. A run that skips writing `state:
running` at UNDERSTAND (whether from an earlier prompt version, a
distracted agent, or budget pressure) leaves the previous beat's `idle`
state in place, and the detector has no way to distinguish "no loop is
running" from "a loop is running but didn't announce itself." Six
prior instances (per F023) all involved a marker that was at least
touched; this is the first cleanly observed instance where it was not
touched at all.

**Better looks like:** unclear yet — one data point. Options worth weighing
once this recurs: (a) have `tools/castle loop` or the loop's own step 1
(ENTER) write the marker to `running` automatically rather than relying on
the agent to remember step 3, removing the human-instruction-following
dependency; (b) a detector that also flags "ledger/log files exist that
are untracked or unstaged AND the marker's `last:` line does not name the
newest ledger entry" — catching the drift even when the marker was never
set to running; (c) nothing structural yet, since recovery-by-the-next-beat
has now worked seven times running and the cost of more process is real
(rooms/craft/0051).

**Work so far:** opened by this beat (2026-07-14, beat
castle-C001-20260714-141029) while recovering L273 and completing L274
(publish-the-front) in the same commit (212b1b4). One instance; watching
for a second and third before designing a fix, per the castle's rule of
three.
