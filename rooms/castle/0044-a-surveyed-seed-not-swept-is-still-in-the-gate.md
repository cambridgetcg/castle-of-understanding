---
id: 0044
room: castle
date: 2026-06-18
source: rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md — laid L017 (2026-06-18), promoted L066 (beat castle-C001-20260619-112157)
confidence: tested
front: private
links: 0042
---

# A surveyed seed not swept is still in the gate

Survey maps a gate seed to a room; sweep removes the seed file. The two steps are distinct. A seed that has been surveyed but not swept remains visible to the stale-gate detector, which reads filename dates, not provenance. The gate appears to hold unsurveyed material when it holds only processed files.

**Evidence.** L017 (2026-06-18): beats L011–L015 surveyed every gate entry into rooms but left the seed files in place; the stale-gate detector would have fired on the aged seeds despite no understanding remaining unprocessed. Confirmed L048 (2026-06-19): two cornerstone-test seeds from L046/L047 found in gate/ on the day of the ripen run because neither beat swept after planting.

**Counter-weather.** Could the stale-gate detector be updated to check provenance and skip already-surveyed seeds? In principle yes: a detector comparing each seed filename against rooms/ for coverage would not flag a surveyed-but-not-swept seed. Open crack: the current stone format does not encode which rooms descended from which seed, so provenance-aware detection would require additional metadata. The simpler correction is the sweep step itself; a gate holding stale files is visually cluttered regardless of what any detector reports.

**Next test.** Cornerstone: third evidence entry (preferably a weather source from archival or library science confirming two-phase intake — indexing then removal — is standard practice), re-read after 2026-09-17.
