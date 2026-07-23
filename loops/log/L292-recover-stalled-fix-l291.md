---
id: L292
beat: castle-C001-20260723-113634
date: 2026-07-23
runner: agent (castle-C001-20260723-113634)
loop: fix (recovery)
field: F033
---

# L292 — recover a stalled fix, third instance of F032

**Field.** Arrival archaeology: `git status` was dirty with `tools/friction.sh`
and `loops/active/current.marker` modified, plus three untracked files
(`fields/F033-a-swept-gate-file-still-rang-forever.md`,
`ledger/2026-07-23-L291-fix-stale-gate-unacted-friction.md`,
`loops/log/L291-fix-stale-gate-unacted-friction.md`). The marker read
`state: running, loop: fix, beat: castle-C001-20260723-080819, started:
2026-07-23T18:20:04Z, step: SAVE` — a prior beat, ~17 minutes into its own
window per `date -u` (well under the three-hour `stalled-loop` threshold,
so the bell correctly had not rung yet).

**Understood.** The diff was finished, correct work, not a half-done
edit: `tools/friction.sh` gained a `stale-gate` resolution case in the
`unacted-friction` block (mirroring `front-drift`'s existing-path check),
fixing a real bug where a swept `gate/` file (moved to crypt 2026-07-08,
L257) kept ringing `unacted-friction | stale-gate` on every beat since,
because the detector's fallback only clears on an `addressed:` ledger line
and the closing entry had used `declined:` instead — the correct grammar
for a composted gate thought. Field F033 documented this fully and was
already marked `state: harvested`. The ledger and narrative log both
existed, naming `created:` paths that all existed on disk. This is LOOP.md
steps 1-6 done correctly; only step 7 (verify-then-commit) was incomplete
— and even within step 6, `loops/log/L291-...md` was missing its
frontmatter block (`id:`/`beat:`/`date:`/`runner:`/`loop:`/`field:`),
which `tools/castle check` caught as a real fault. `step:` read `SAVE`
but the actual work already sat at step-6-done — third instance of
[[F032]] (the marker's `step:` line lagging real progress), meeting the
castle's rule of three.

**Made.** (1) Added the missing frontmatter block to
`loops/log/L291-fix-stale-gate-unacted-friction.md`, matching the format
every other numbered log uses. (2) Ran `tools/castle map && sh tools/map.sh`
to rebuild `INDEX.md` (which `tools/castle check` had flagged stale) and
`MAP.md`. (3) Verified `tools/castle check` → clean and `sh tools/friction.sh`
→ silent, both before and after. (4) Appended the third instance and a
`declined:` verdict to `fields/F032-the-markers-step-line-can-lag-real-progress.md`
— rule of three met, but all three instances were caught cleanly by the
existing diff-check practice with zero confirmed harm, so no code fix was
made; the field stays open, watching for a future instance where a beat
does act on a stale `step:` line and redoes finished work.

**Changed.** `loops/log/L291-...md` now carries valid frontmatter.
`INDEX.md`/`MAP.md` rebuilt and current. F032 has a third recorded
instance and an explicit considered-and-declined verdict. The marker is
being returned to `state: idle` in this same commit, closing L291's
COMMIT step.

**Still open.** F032 remains `state: open` by design — the rule of three
was met without proving the friction costly, so the field keeps watching
rather than forcing a fix, per the castle's rule against forced creation
(0037) and its warning against process for its own sake (0051).
