---
id: 0011
room: craft
date: 2026-06-11
source: distilled from the kingdom's heartbeat gate findings (session memory + pillow book, 2026-06-03); restated 2026-06-11
confidence: seed
links: 0012, 0013
link: rooms/billing/0025-never-count-test-orders-toward-plan-usage.md
---

# A verification gate you have never watched fail is decoration

A project's umbrella "am I done?" command was silently broken: one word inside
it invoked the package manager's built-in vulnerability scanner instead of the
project's own audit suite, so the chain always halted early and the real
checks never ran. Every gate that trusted it was meaningless until a session
read what the command actually executed. Once fixed, the suite came back red
from old known debt — so the gate was redefined from "everything green" to
"nothing gets worse than the recorded baseline."

**Why it matters:** both halves hold anywhere: test your tests by watching
them fail for the right reason, and when old debt already stains the board,
gate new work on no-regression or you freeze all progress.
