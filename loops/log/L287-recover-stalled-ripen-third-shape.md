---
id: L287
beat: castle-C001-20260721-044426
date: 2026-07-21
runner: agent (castle-C001-20260721-044426)
loop: ripen
field: F032
---

# L287 — recover a stalled ripen run, and a new marker nuance

**Field.** Arrival archaeology: `git status` was dirty with three modified
files and no matching ledger/log entry. `loops/active/current.marker` read
`state: running, loop: ripen, beat: castle-C001-20260721-042536, started:
2026-07-21T04:25:36Z, step: UNDERSTAND` — a prior beat, 19 minutes into its
own window, well short of the three-hour `stalled-loop` threshold.

**Understood.** The working diff was not raw or half-finished. It held a
completed ripen edit on
`rooms/castle/a-marker-a-beat-leaves-behind-survives-the-beat.md`: the
evidence block condensed from five lines to four, a new fifth evidence line
added naming L284 and L286 as a "fourth shape" (marker cleared to `idle`,
staged, but the commit itself never landed), `last-walked` bumped to
2026-07-21, and all four prose paragraphs (How it ripened / What it
changed / Counter-weather / Next test) rewritten to match. `ledger/friction-log.md`
had gained one new line: `oversize | rooms/castle/a-marker-...md | run:
loops/walk.md` — the edit itself had pushed the stone from 40 to 42 lines,
over the cap `tools/friction.sh` enforces for any file with a `status:` or
`confidence:` line. This is real, verified SAVE-stage work; the marker's
`step:` line simply never moved off `UNDERSTAND` to record it. No `L287`-shaped
ledger or log entry existed anywhere to explain the diff, and no `loops/log/`
or `ledger/` file named this ripen run — the stalling beat stopped before
step 6 (LOG) as much as before step 7 (COMMIT).

**Made.** Two things: (1) trimmed the stone's prose to fit back under the
40-line cap — tightened four paragraphs' wording without dropping any of
the five evidence lines or any of the four claims — bringing it to 39
lines; (2) opened `fields/F032-the-markers-step-line-can-lag-real-progress.md`,
naming this specific nuance: `state:` was honest (`running`, not falsely
`idle`) but `step:` understated real progress. This is distinct from F030
(a marker never touched at all) and from the three shapes already
catalogued on the stone itself (mid-`running` window, no window at all,
cleared-to-`idle`-but-uncommitted) — a fourth axis of marker unreliability,
first instance.

**Changed.** The stone (`rooms/castle/a-marker-a-beat-leaves-behind-survives-the-beat.md`)
now carries the L284/L286 evidence at 39 lines, no longer oversize. F032 is
open, watching for a second and third instance per the castle's rule of
three. The marker is reset to trace this beat's own run.

**Still open.** F032 has one instance. F030 (marker never touched) still
watches for its second. The stone's own Next test — does a bell ever fire
*before* the archaeology, in any shape — remains unanswered; this recovery
was archaeology again, not a ring.
