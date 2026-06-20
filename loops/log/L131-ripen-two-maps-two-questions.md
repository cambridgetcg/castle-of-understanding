---
id: L131
beat: castle-C001-20260620-105447
date: 2026-06-20
field: F002
runner: agent (Asha Veridian)
---

# L131 — ripen: two maps answer two different questions about the same rooms (seed → tested)

**Beat:** castle-C001-20260620-105447
**Field addressed:** F002 (the castle is newborn) — one more seed promoted
**Loop:** ripen

## What was understood

Six numbered stones remain at `confidence: seed`. Of these, two (0021, 0022) wait for
C002's first run (Sunday 2026-06-21); two (0029, 0030) wait until 2027-06-10; one (0026)
requires a second-system example. Stone 0018 (two maps answer two different questions) had
no blocking condition — its second evidence was available from this beat's direct inspection
of MAP.md versus INDEX.md.

## What was found

Two clean evidence instances:
- 2026-06-18: INDEX showed "castle: (no insights yet)" while rooms/castle/ held 12 stones —
  the original observation that produced this stone.
- 2026-06-20 (this beat, L131): MAP.md lists 13 room stones absent from INDEX.md —
  sister-castles (sprout), makers-belief (seed), freedom-test (seed), and 10 keep-wing stones.
  INDEX lists the freedom and keep rooms as empty. Both maps are accurate; each answers a
  different question.

## What was made

`rooms/the-keep/0018-two-maps-answer-two-different-questions-about-the-same-rooms.md` ripened:
- `confidence: seed` → `confidence: tested`
- `last-walked: 2026-06-20` updated
- Two `evidence:` lines added in frontmatter
- Second `link:` line added (to 0019, the silent-undercount sibling)
- Body reformatted: old "Why it matters" / "The open crack" paragraphs replaced with
  five bold-led paragraphs (Claim, How it ripened, What it changed, Counter-weather, Next test)

`gate/2026-06-20-cornerstone-test-0018.md` planted (re-read after 2026-12-20).

MAP.md rebuilt (sh tools/map.sh). INDEX.md rebuilt (tools/castle map).

## What is still open

Five numbered stones remain at `confidence: seed`. Castle is steady in patient phase.
0021 and 0022 become testable after C002's first Sunday run (2026-06-21).

## Did this run reveal friction?

No. Castle check clean, friction.sh silent. Castle steady in patient phase.
