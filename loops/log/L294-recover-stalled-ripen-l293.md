---
id: L294
beat: castle-C001-20260724-082955
date: 2026-07-24
runner: agent (castle-C001-20260724-082955)
loop: ripen (recovery)
field: F032
---

# L294 — recover a stalled ripen run, fourth instance of F032

**Field.** Arrival archaeology: `git status` was dirty with `MAP.md` and
`loops/active/current.marker` modified, three room stones modified
(`rooms/castle/a-squeezed-sweep-loses-ground-to-a-growing-gate.md`,
`rooms/craft/a-resolved-path-is-its-own-addressed-line.md`,
`rooms/word/epistemic-status-is-declared-by-the-author-not-measured.md`),
and four untracked files (two `gate/2026-07-24-cornerstone-test-*.md`
seeds, `ledger/2026-07-24-L293-ripen.md`, and
`loops/log/L293-ripen-three-seeds-the-bell-never-flagged.md`). The marker
read `state: running, loop: ripen, beat: castle-C001-20260724-081123,
started: 2026-07-24T15:11:45Z, step: UNDERSTAND` — this beat's own `date -u`
read `2026-07-24T15:31:xxZ`, so the prior beat's real window was under 20
minutes, well inside the `stalled-loop` bell's three-hour threshold.

**Understood.** The diff was finished, correct work: L293's ripen sweep
promoted two stones from seed to tested and one from seed to sprout
(applying CASTLE.md's ladder directly, each with a matching cornerstone-test
gate seed planted), and both `ledger/2026-07-24-L293-ripen.md` and the
narrative log existed naming `created:` paths that all existed on disk.
This is LOOP.md steps 1-6 done correctly; only step 7 (verify-then-commit)
was incomplete. Within step 6, `loops/log/L293-ripen-three-seeds-the-bell-never-flagged.md`
was missing its frontmatter block entirely (no `id:`/`beat:`/`date:`/
`runner:`/`loop:`/`field:`), which `tools/castle check` caught as a real
fault, and `INDEX.md` had gone stale relative to the promotions. `step:`
read `UNDERSTAND` but the actual work already sat at step-6-done — the
widest step/reality gap recorded yet, and the fourth instance of [[F032]]
(the marker's `step:` line lagging real progress), following the same
shape as L287, L288, and L292.

**Made.** (1) Added the missing frontmatter block to
`loops/log/L293-ripen-three-seeds-the-bell-never-flagged.md`, matching the
format every other numbered log uses (`field: F002`, the general-castle
field these unbanded ripen sweeps have used before, e.g. L286, L289).
(2) Ran `node tools/castle map && sh tools/map.sh` to rebuild `INDEX.md`
(flagged stale) and `MAP.md`. (3) Verified `tools/castle check` → clean
and `sh tools/friction.sh` → silent, both before and after. (4) Appended
the fourth instance to `fields/F032-the-markers-step-line-can-lag-real-progress.md`
— same verdict as the third: caught cleanly by the existing diff-check
practice, zero confirmed harm, no code fix made.

**Changed.** `loops/log/L293-ripen-three-seeds-the-bell-never-flagged.md`
now carries valid frontmatter; `INDEX.md`/`MAP.md` reflect L293's three
promotions.

**Still open:** F032 itself remains open and watching — four instances now,
all recovered cleanly, none costly. The underlying bug (marker `step:` not
advancing past the first write-through) is still unfixed, by deliberate
choice, since fixing it would add mechanism against a friction with no
confirmed harm across four tries.
