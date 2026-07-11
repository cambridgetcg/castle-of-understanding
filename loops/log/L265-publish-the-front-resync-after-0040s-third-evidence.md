---
id: L265
beat: castle-C001-20260710-192657
date: 2026-07-10
runner: agent (castle-C001-20260710-192657)
loop: publish-the-front
field: F008
---

# L265 — publish-the-front: resync after 0040's third evidence line

**Which field.** F008 (the public front has not been published) — arrived to
find a prior beat's work (L264, sweep-the-gate) staged but uncommitted, and
`sh tools/friction.sh` ringing `front-drift | rooms/craft/0040-...md` because
that uncommitted run had folded a third local evidence entry (the
qwenthos-og-couldnt-speak seed) into 0040, a `front: public` stone, without a
publish run to follow it — L264's own ledger named this ring as open and
left it for a dedicated run.

**What was understood.** `tools/front-target` still resolves to the
Cambridge-TCG storefront worktree and is reachable from this session.
`grep -rl "^front: public" rooms/` found the same five stones as every prior
publish run: 0040, 0024, 0023, 0039, 0043. Only 0040 had changed content
since the last ledgered publish (L259, 2026-07-08), but publish-front.mjs
re-writes all five on each run rather than diffing, matching the pattern
named in F008's L259 entry.

**What was made.** Ran `node tools/publish-front.mjs "$(cat
tools/front-target)"`. It republished all five public stones and regenerated
`src/app/castle/front.json`. `sh tools/friction.sh` now prints nothing.

**What changed.** The storefront working tree in the Cambridge-TCG worktree
now matches the five public-marked stones' current content, including
0040's new third evidence line. Deploy (commit and push in that repository)
remains the owner's act, per `loops/publish-the-front.md` step 5 — this run
stops at the working tree.

**Still open.** As named in F008 since L259: a public stone that keeps
gaining evidence lines (0040 has drifted the front three times now) will
keep re-drifting it, so the strict two-consecutive-clean-runs convergence
test may never naturally settle for an actively-evidenced cornerstone
candidate. Not fixing that this run — restating it so the pattern is visible
across entries.
