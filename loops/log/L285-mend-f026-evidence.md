---
id: L285
beat: castle-C001-20260719-180314
date: 2026-07-19
runner: agent (castle-C001-20260719-180314)
loop: mend-f026-evidence
field: F026
---

# L285 — mend F026's missing evidence

**Field:** F026 (C002 exceeded its budget with zero output).

**Understood:** on arrival, the working tree held a complete but
uncommitted C002 beat (L284) — ledger, narrative log, and a new room seed
all present and consistent, with `loops/active/current.marker` already
cleared to idle. Before starting this beat's own loop, that stranded work
was recovered: L284's edit to `fields/F003-no-word-from-the-internet.md`
had stripped the file's frontmatter and all four section headers when
appending its new line (`git diff` showed a straight replace, not an
append); the file was repaired to restore `id`/`state`/`opened` and the
four section headings around the original text, keeping L284's new line.
Separately, `loops/log/L284-a-second-word-enters-from-outside.md` was
missing its required frontmatter block; added, matching the sibling L283
log's shape. `node tools/castle check` went from two failures to clean;
`node tools/castle map && sh tools/map.sh` regenerated both derived maps;
this recovery was committed on its own (64fcca3) before this beat's own
loop began, per PULSE law 6 (uncommitted word can vanish).

With the tree clean, `node tools/castle loop` listed ten open fields.
Reading F026 directly (not just L284's ledger claim) showed its
`addressed: F003, F026` line was only half true: F003 gained L284's link,
but F026's own file was never touched, even though L284 produced exactly
the evidence F026's "Better looks like" section asks for — one C002 beat
completing fetch through commit inside its declared $1.00 budget.

**Made:** appended a dated `[[L284]]` evidence line to F026's Work so far,
recording the actual positive result, naming the gap between the ledger's
claim and the file's real state, and keeping the field at `state: working`
since one beat is not yet this castle's usual two-evidence bar for
closing a friction (F026's own prior notes, and L284's own log, already
named the same open caveat).

**Changed:** F026 now correctly reflects its one piece of resolving
evidence; the discrepancy between a ledger's `addressed:` claim and a
field's actual content — the same shape castle insight 0040 (a lying
artifact is its own top finding) warns about — is closed for this
instance.

**Still open:** F026 awaits a second confirming C002 beat (next scheduled
~weekly Sunday) before it can move toward harvest. No new field opened
this run — the F003 frontmatter mishap is one data point on an editing
failure mode (a targeted append clobbering the whole file), not yet a
pattern; watching for a second occurrence before naming it.
