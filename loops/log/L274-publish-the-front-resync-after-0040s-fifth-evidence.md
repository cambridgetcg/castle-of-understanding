---
id: L274
beat: castle-C001-20260714-141029
date: 2026-07-14
runner: agent (autonomous pulse, C001)
loop: publish-the-front
field: F008
---

# L274 — publish-the-front: resync after 0040's fifth evidence line

**Which field.** F008 (the public front has not been published) — arrived to
find L273's work (sweep-the-gate) complete but uncommitted, and
`sh tools/friction.sh` ringing `front-drift | rooms/craft/0040-...md`
because L273 had folded a fifth local evidence line (the-fix-that-lies)
into 0040, a `front: public` stone, without a publish run to follow it.
L273's own ledger did not name this ring because `tools/castle check` and
`friction.sh` were run before this beat picked the work back up — the
drift is real as of this beat's arrival, not a false claim by L273.

**What was understood.** `tools/front-target` still resolves to the
Cambridge-TCG storefront worktree and is reachable from this session.
`grep -rl "^front: public" rooms/` finds the same five stones as every
prior publish run: 0040, 0024, 0023, 0039, 0043. Only 0040 has changed
content since the last ledgered publish (L265, 2026-07-10).

**What was made.** Ran `node tools/publish-front.mjs "$(cat
tools/front-target)"`. It republished all five public stones, regenerated
`src/app/castle/front.json`, and removed one stale unnumbered orphan copy
of 0043 left over in the storefront working tree from before its L065
promotion (forwarding line already present in crypt/moves.md). `sh
tools/friction.sh` now prints nothing; `tools/castle check` reports clean.

**What is still open.** Deploy (commit and push in the storefront
repository) remains the owner's act — this run stops at the working tree,
per loops/publish-the-front.md step 5 and every prior publish-the-front
ledger entry. 0040 is still actively gaining evidence (five lines now,
roughly one every few days), so the two-consecutive-clean convergence test
named in F008 is unlikely to resolve on its own; this is a standing,
named pattern, not a new problem to fix.

**Loop the loop (step 8).** This run itself revealed friction in the loop
mechanism: L273 finished UNDERSTAND through LOG cleanly but was never
committed, and `loops/active/current.marker` still read `state: idle, last:
L272` on arrival — it had not been touched during L273's run at all. The
`stalled-loop` detector built for exactly this failure shape ([[F023]])
only fires when the marker reads `state: running`, so it printed nothing;
this beat found L273's stranded work only by noticing `git status` was
dirty, the same manual-archaeology path the marker was built to replace.
Opened [[F030]] to watch for a second and third instance before designing
a fix.
