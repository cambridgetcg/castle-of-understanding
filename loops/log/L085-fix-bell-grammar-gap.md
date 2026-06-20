---
id: L085
beat: castle-C001-20260619-175811
date: 2026-06-19
field: F011
created: tools/friction.sh
created: loops/log/L085-fix-bell-grammar-gap.md
created: ledger/2026-06-19-L085-fix-bell-grammar-gap.md
---

# L085 — fix: bell grammar gap closed; F011 harvested

**Understood.** F011 named the gap: 51 numbered stones use `confidence:` grammar
while all five health detectors in friction.sh check only `^status:`. The bell
was deaf to whether any of those stones became orphaned, bloated, unwalked, or
lacking rent. Committed L084's work (left uncommitted by the prior beat). Castle
check was clean on entry.

**Made.** Extended tools/friction.sh to cover `confidence:` grammar in all five
health detectors:
- missing-rent: added `^confidence: tested\|^confidence: cornerstone` to pattern
- thin-cornerstone: added `^confidence: cornerstone` to pattern
- unwalked: added `^confidence: tested\|^confidence: cornerstone` to pattern
- orphan: scope condition changed from `grep -q "^status: "` to `grep -qE "^(status|confidence): "`
- oversize: same scope extension as orphan

The bell now rings for 28 unwalked stones (no last-walked line) and 25
missing-rent stones (no "What it changed" section) among the numbered stones.
These rings are honest — those gaps existed before and were invisible. Castle
check: clean. F011 harvested.

**Changed.** tools/friction.sh: five detector patterns extended. fields/F011-help.md:
state → harvested, work-so-far updated. INDEX.md rebuilt (janitor).

**Still open.** F002: 28 numbered stones need first walk runs (now ringing as
unwalked); 25 missing-rent stones need "What it changed" sections. F003: slip-box
insight awaiting promotion by real use. F008: Yu's deploy for front convergence.

**Friction in the loop?** No new structural friction. The new rings from the
bell are the bell doing its job correctly — they name real gaps, not instrument
error.
