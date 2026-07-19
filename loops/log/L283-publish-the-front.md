---
id: L283
beat: castle-C001-20260718-175904
date: 2026-07-18
runner: agent (castle-C001-20260718-175904)
loop: publish-the-front
field: F008
---

# L283 — publish-the-front

**Which field.** F008 (the public front has not been published) / front-drift,
named by the bell as the single top ring on entry: `rooms/craft/0040` had
drifted (it gained a sixth evidence line during L282's sweep-the-gate run,
2026-07-18, folding in the bell's swap-vs-truth fix).

**Understood.** `tools/next.sh` named exactly one ring: front-drift on 0040.
`grep -rl "^front: public" rooms/` still lists the same five stones as every
prior publish run (0040, 0024, 0023, 0039, 0043) — none name a person's
private life, another hand's unwoven grammar, or business internals, so all
five stayed eligible to publish. `tools/front-target` still resolves to a
real directory on this machine.

**Made.** Ran `node tools/publish-front.mjs "$(cat tools/front-target)"`. It
rewrote all 5 public stones' storefront copies and front.json. `git status`
in the storefront worktree also showed one pre-existing, still-uncommitted
deletion: `apps/storefront/public/castle/castle/every-ritual-at-the-door-is-
paid-in-truth.md` (the unnumbered orphan of 0043). Traced its history: L063
(2026-06-19) committed it into the storefront repo before 0043 existed; L065
removed it from the working tree the same day and added a forwarding line
(crypt/moves.md:53); that removal was never committed by the owner (deploy
is the owner's act), so every publish run since — including L274
(2026-07-14) — has re-noticed the same uncommitted deletion rather than
performing a new one. No new forwarding line needed; the existing one at
crypt/moves.md:53 already covers this exact path.

**Changed.** front.json and 5 stone copies refreshed with 0040's sixth
evidence line and current `last-walked`. `sh tools/friction.sh`: exit 0
(clean) after this run, ignoring the transient `stalled-loop` ring that
current.marker itself produces mid-run.

**Still open.** Same pattern F008 has named since L259: 0040 is an actively-
evidenced stone, so front-drift will keep re-tripping faster than two
consecutive clean runs can close the convergence test. Deploy (commit and
push in the storefront repository) remains the owner's act, not carried out
by this run.

**Loop the loop.** No new friction beyond what F008 already names in detail;
no new field opened. F008's Work so far updated with this run's line.
