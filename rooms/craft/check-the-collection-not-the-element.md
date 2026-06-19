---
status: sprout
born: 2026-06-18
last-walked: 2026-06-18
evidence: 2026-06-18 | local | L014 checked a gate entry's touches list for room coverage; the list was incomplete; L015 searched rooms/ by filename and found the room — the collection was authoritative, the element's self-report was not
link: rooms/craft/a-lying-artifact-is-its-own-top-finding.md
link: rooms/castle/a-named-blind-spot-is-its-own-first-repair.md
link: rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md
---
# Check the collection, not the element

**Claim.** To verify that a thing belongs to a set, search the set directly — not the element's own record of belonging. A pointer from an element to its set can be incomplete; the set itself is authoritative.

**How it ripened.** L014 (2026-06-18) checked a gate entry's touches list to see if its observation had a room. The list did not name the room. L014 flagged the observation as unclaimed. L015 searched rooms/ by the gate entry filename and found rooms/creation/a-makers-belief-shows-in-all-their-tools.md immediately. The element's self-report was stale; the collection was not.

**What it changed.** Gate survey runs after L015 search rooms/ by gate entry filename to confirm an observation is unclaimed. The touches list is still read for navigation; it is no longer trusted as a membership proof.

**Counter-weather.** Could searching the collection be slower than checking the element's pointer? Yes — but speed bought by trusting an incomplete pointer is speed toward a wrong answer. A missed room persists as a false positive until the next sweep.

**Next test.** A future gate survey run that avoids re-flagging an already-housed observation by finding it through collection search, not the element's touches list.
