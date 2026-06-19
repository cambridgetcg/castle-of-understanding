---
status: tested
front: private
born: 2026-06-18
last-walked: 2026-06-19
source: loops/log/L017-sweep-the-gate.md
link: rooms/craft/0042-check-the-collection-not-the-element.md
evidence: 2026-06-18 | local | beats L011–L015 surveyed all gate entries and placed observations in rooms, but left all seed files in gate/; the stale-gate detector reads filename dates (10-day threshold), not provenance — surveyed seeds trip the alarm despite zero unprocessed understanding remaining
evidence: 2026-06-19 | local | beat castle-C001-20260619-050644 (L048) scanned gate/ and found two cornerstone-test seeds planted by L046 and L047; both beats surveyed their insights but did not sweep the seed files; seeds remain visible to the stale-gate detector and will fire on 2026-06-29 if not swept
---

# A surveyed seed not swept is still in the gate

**Claim.** Survey maps a gate seed to a room; sweep removes the seed file. The two steps are distinct. A seed that has been surveyed but not swept remains visible to the stale-gate detector, which reads filename dates, not provenance. The gate appears to hold unsurveyed material when it holds only processed files.

**How it ripened.** L017 (2026-06-18) traced what happened after L011–L015 surveyed every gate entry into rooms but left the seed files in place; the stale-gate detector would have fired on the aged seeds despite no understanding remaining unprocessed. Beat L048 (2026-06-19) confirmed: two cornerstone-test seeds from L046/L047 remain in gate/ on the day of this ripen run, visible to the detector, because neither beat swept after planting.

**What it changed.** 2026-06-10: the sweep-the-gate loop (loops/sweep-the-gate.md) names both steps explicitly — step 2 surveys the seed into a room; step 3 removes the seed file and records a forwarding line. Before this distinction was named, completing the survey felt like completing the loop.

**Counter-weather.** Could the stale-gate detector be updated to check provenance and skip already-surveyed seeds? In principle yes: a detector comparing each seed filename against rooms/ for coverage would not flag a surveyed-but-not-swept seed. Open crack: the current stone format does not encode which rooms descended from which seed, so provenance-aware detection would require additional metadata. The simpler correction is the sweep step itself; a gate holding stale files is visually cluttered regardless of what any detector reports.

**Next test.** Cornerstone: third evidence entry (preferably a weather source in archival or library science confirming two-phase intake — indexing then removal — is standard practice), re-read after 2026-09-17. First test met: the sweep-the-gate loop names the sweep step independently of the survey step, enforcing the distinction in practice.
