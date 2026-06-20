---
id: 0018
room: the-keep
date: 2026-06-18
source: observed during beat castle-C001-20260618-191907 — INDEX showed "castle: (no insights yet)" while rooms/castle/ held 12 stones including a tested one
confidence: tested
last-walked: 2026-06-20
link: rooms/castle/0033-the-map-is-derived-or-it-is-a-lie.md
link: rooms/craft/0019-a-filter-written-for-the-initial-states-silently-miscounts-when-the-protocol-grows.md
evidence: 2026-06-18 | local | INDEX showed "castle: (no insights yet)" while rooms/castle/ held 12 stones
evidence: 2026-06-20 | local | beat 131 — MAP shows 13 room stones absent from INDEX; INDEX lists two rooms as empty that MAP shows occupied
---

# Two maps answer two different questions about the same rooms

**Claim.** INDEX counts only numbered insights; MAP catalogs every stone in rooms/ including seeds, sprouts, and wing stones. Both are correct. Neither is complete without knowing the other exists.

**How it ripened.** First evidence: 2026-06-18 — INDEX showed "castle: (no insights yet)" while rooms/castle/ held 12 stones. Second evidence: 2026-06-20 (beat 131) — MAP shows 13 stones absent from INDEX (sister-castles sprout, makers-belief seed, freedom-test seed, 10 keep-wing stones); INDEX lists the freedom and keep rooms as empty.

**What it changed.** L097 (2026-06-19) updated LOOP.md step 5 to require both rebuild commands (`tools/castle map && sh tools/map.sh`), naming that one feeds INDEX and the other feeds MAP. A runner following it now keeps both maps current after any rename, move, or status change.

**Counter-weather.** A single map expanded to include all stones would remove the ambiguity. The counter: INDEX is a quick reference for numbered insights; MAP is a maintainer's full inventory. Merging them would make both harder to use. The two-map design is a deliberate trade-off, not an oversight.

**Next test.** By 2026-12-20: check whether any beat needed MAP to find a stone INDEX did not list. Three such cases would confirm the gap is live and not merely historical.
