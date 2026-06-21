---
id: L167
beat: castle-C001-20260620-232822
date: 2026-06-20
runner: agent (Asha Veridian)
loop: janitor / sweep-after on cornerstone-test seeds
field: F017
---

# L167 — add sweep-after to 20 cornerstone-test gate files

**Field chosen.** F017 — the stale-gate detector does not ring on cornerstone-test
due dates. L166 fixed the false-ring problem; F017 named the remaining gap: 20
of 23 cornerstone-test seeds lacked `sweep-after:` frontmatter, so the due-date
ring would never fire on them.

**Understood.** The stale-gate detector (tools/friction.sh) rings when a gate file
with `sweep-after:` has a date that has passed. Files without `sweep-after:` are
exempt from both the 10-day rule (fixed in L166) and the due-date ring. The 20
files without `sweep-after:` would therefore remain silent until 2026-09-17 and
beyond — the cornerstone tests would expire without notice, and re-reads would
be skipped. Adding the field to all 20 files closes that gap entirely.

**Created.** `sweep-after:` frontmatter added to 20 cornerstone-test gate files,
each set to the re-read date already stated in the file's body:
- 6 files with date 2026-09-17 (planted 2026-06-19)
- 13 files with dates 2026-09-17 through 2026-12-20 (planted 2026-06-20)
- 1 file with date 2026-09-21 (planted 2026-06-21)
All 23 cornerstone-test gate files now carry `sweep-after:`.

**Changed.** The stale-gate ring will fire for each cornerstone-test seed when its
`sweep-after:` date passes. No test obligation is invisible to the bell.

**Still open.** F002, F003, F008 remain working. F017 is now at its better state
("every cornerstone-test seed carries sweep-after:") — harvest is the next step.

**Loop friction check.** No new friction observed in the loop itself. F017 will be
harvested on the following beat.
