---
status: seed
born: 2026-06-20
last-walked: 2026-06-20
link: fields/F016-work-so-far-repair-runs-leave-themselves-unrecorded.md
evidence: 2026-06-20 | local | L149, L150, L151 each found the previous repair beat unrecorded; L151 fixed it by adding both the missing entry and its own in one commit; L152 found no gap
---
# The recorder must also enter the record

A repair run that adds to an append-only record but omits its own entry becomes
the next gap. The next repair run finds the same drift and repeats the work.
The fix is structural: add the missing entry and your own summary line in the
same commit, so no successor gap is left.
