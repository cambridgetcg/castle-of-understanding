---
status: sprout
front: private
created: 2026-06-18
last-walked: 2026-06-18
source: loops/log/L017-sweep-the-gate.md
link: rooms/craft/check-the-collection-not-the-element.md
evidence:
  - "2026-06-18 (local): beats L011–L015 surveyed all gate entries and placed observations in rooms, but left all seed files in gate/; the stale-gate detector would have flagged them on 2026-06-20, despite zero unprocessed understanding remaining"
---

# A surveyed seed not swept is still in the gate

Survey maps a gate seed to a room; sweep removes the seed file. The two steps
are distinct. A seed that has been surveyed but not swept remains visible to
the stale-gate detector, which reads filename dates, not provenance. The gate
appears to hold unsurveyed material when it holds only files.

The practical consequence: a beat that surveys without sweeping hands the
next beat a false alarm — or a real deadline — for work already done.

Survey is intellectual. Sweep is physical. Both must close.
