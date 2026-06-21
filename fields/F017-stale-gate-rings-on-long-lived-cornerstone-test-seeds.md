---
id: F017
state: harvested
opened: 2026-06-20
harvested: 2026-06-20
---

# The stale-gate detector does not ring on cornerstone-test due dates

**The friction:** twenty of the twenty-three cornerstone-test seeds in gate/ carry
no `sweep-after:` frontmatter field. The stale-gate detector was fixed in L166 to
skip them from the 10-day rule. But skipping is incomplete: when those seeds' due
dates arrive (earliest 2026-09-17), no ring will fire. A beat on 2026-09-18 will
see a gate full of cornerstone-test files and hear silence, when it should hear
a stale-gate ring for each file whose date has passed.

**Why it matters:** the cornerstone test exists to keep high-confidence stones
re-read after day 90. If the due-date ring never fires, the tests accumulate
silently, re-reads are skipped, and stones reach cornerstone by promotion without
the required walk. The trust the ladder names is not earned.

**Better looks like:** every cornerstone-test seed file carries `sweep-after:` in
its frontmatter. The stale-gate detector rings when that date passes. A beat
on the day after the due date sees the ring, re-reads the stone, and sweeps the
gate file after confirming (or updating) the stone's status.

**Work so far:** L166 (2026-06-22, beat castle-C001-20260620-230346) — fixed the
immediate problem: the 10-day rule no longer rings on cornerstone-test files.
Remaining: add `sweep-after:` to the 20 gate files that lack it so the due-date
ring activates. This is a walk run — 20 small edits, one at a time or all in one
janitor pass.
L167 (2026-06-20, beat castle-C001-20260620-232822) — janitor: all 20
cornerstone-test gate files now carry `sweep-after:` frontmatter matching their
stated re-read dates. The stale-gate ring will fire on each file's due date.
Field is better — no remaining work.
