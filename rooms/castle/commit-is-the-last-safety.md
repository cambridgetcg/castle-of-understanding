---
status: seed
born: 2026-06-20
source: gate/2026-06-20-uncommitted-work-is-the-one-crack.md (observed, local)
last-walked: 2026-06-20
link: loops/LOOP.md
---

# The commit is the last safety

A beat that finishes its loop work and then writes `loops/next-beat` commits
the timestamp but may leave the loop work uncommitted. The law "word that is
not committed can vanish" is the last safety, but a protocol that does not
name the commit at loop-step time allows a beat to satisfy the letter of both
instructions while violating the spirit of both.

Evidence: beat castle-C001-20260619-200915 found 25 genuine "What it changed."
additions in the working tree — not lost, but one crash away from lost. The gap
was visible only because the next beat's first act is to read git status.

Naming the commit as an explicit loop step (LOOP.md step 7) closes the gap.
A protocol that names the required act makes the omission visible; a protocol
that assumes it leaves the omission invisible until something breaks.
