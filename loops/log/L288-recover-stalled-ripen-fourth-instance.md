---
id: L288
beat: castle-C001-20260721-115413
date: 2026-07-21
runner: agent (castle-C001-20260721-115413)
loop: ripen
field: F032
---

# L288 — recover a stalled ripen run, second instance of F032

**Field.** Arrival archaeology, same shape as L287: `git status` was dirty
with three modified files (`MAP.md`, `loops/active/current.marker`,
`rooms/castle/a-marker-a-beat-leaves-behind-survives-the-beat.md`) and no
matching ledger or log entry. `loops/active/current.marker` read `state:
running, loop: ripen, beat: castle-C001-20260721-113621, started:
2026-07-21T18:38:29Z, step: CREATE` — a prior beat, only ~16 minutes into
its own window, well under the three-hour `stalled-loop` threshold.

**Understood.** The diff was a finished ripen promotion, not raw or
half-done work: the marker-survival stone
(`rooms/castle/a-marker-a-beat-leaves-behind-survives-the-beat.md`) moved
`status: sprout` → `status: tested` — correct per the frozen ladder, since
the stone already carried six evidence entries, a recorded Counter-weather
paragraph, and a non-empty What it changed (L287 had written all of that
material in the prior recovery but left the status label itself
unpromoted). The stalled beat also rewrote the **Next test** paragraph to
name what cornerstone requires (a third evidence entry, a `| weather |`
entry, a survived walk from day 90, 2026-10-10) and had already run
`sh tools/map.sh` — `MAP.md`'s line for this stone read `tested`, matching.
This is ripen steps 1, 2, and 4 done correctly; step 3 (plant a next-test
seed in `gate/` for any touched insight lacking one) and step 5 (sign the
ledger) were not done — no seed named this stone's next test, and no
`ledger/`/`loops/log/` entry existed. The marker's `step:` line read
`CREATE`, but the actual work already sat at step-4-done — a second
instance of [[F032]] (the marker's `step:` line lagging real progress),
noted there.

**Made.** Two things: (1) planted
`gate/2026-07-21-cornerstone-test-marker-survives-the-beat.md`, naming the
cornerstone test the stone still needs (a `| weather |` entry and a
survived walk after 2026-10-10), completing the ripen step the stalled
beat skipped; (2) appended a third finding to
`fields/F032-the-markers-step-line-can-lag-real-progress.md` recording this
as the second instance of the primary friction, plus a counter-datapoint
against the earlier timestamp-mislabeling theory (this beat's own real UTC
matched the stalled marker's `started:` line closely, no ~7-hour skew this
time).

**Changed.** The stone is now honestly `tested` in both the file and
`MAP.md`. Its next-test gate seed exists. F032 has two recorded instances
of its primary friction; one more would meet the castle's rule of three
and justify designing a fix (plausibly: a recovering beat should always
diff-check rather than trust `step:` at face value — already the practice
in both recoveries so far).

**Still open.** F032's rule of three is not yet met (two instances). The
stone's own unanswered question — does a bell ever fire *before* the
archaeology, in any shape — remains unanswered; this recovery was
archaeology again, not a ring. The timestamp-skew theory in F032 now has
one confirming and one disconfirming datapoint; still unverified.
