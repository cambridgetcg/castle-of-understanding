---
id: L026
beat: castle-C001-20260618-214740
runner: agent (Asha Veridian)
date: 2026-06-18
field: F002
---

# L026 — fix open-field counter; craft insight 0019

**Field chosen:** F002 — The castle is newborn. Chosen because F003 is waiting on promotion by real use (only time gives that) and F008 awaits the owner's deploy; F002 is the field a beat can actually move.

**Understood:**
- The INDEX header reported "Open fields: 0" even though three fields hold state: working. Running `node tools/castle map` confirmed this — the number was always zero.
- Root cause: `buildIndex()` in `tools/castle` filtered open fields with `f.fm.state === 'open'`. The protocol uses `state: working` as the intermediate active state, but the filter did not name it.
- The filter was correct when `open` and `harvested` were the only two states. When `working` was added as an intermediate, no one updated the filter. The error was silent — the count dropped to zero, which read as "nothing open."
- Castle check was clean on arrival; the bug lived only in the header count, not in any validation rule.
- Janitor duty: no stale INDEX entries; no missing doorplates found; MAP rebuilt cleanly after the fix.

**Created:**
- `tools/castle` line 187: filter extended to include `state === 'working'` alongside `state === 'open'`; INDEX now reads "Open fields: 3"
- `rooms/craft/0019-a-filter-written-for-the-initial-states-silently-miscounts-when-the-protocol-grows.md` (seed) — the durable lesson: when a protocol adds a new state, every filter by state must be extended in the same commit or it silently undercounts thereafter
- `fields/F002` Work so far updated
- `loops/log/L026-fix-open-field-counter-craft-insight-0019.md` (this file)
- `ledger/2026-06-18-C001-twentieth-run.md`

**What changed:** The INDEX header now truthfully counts open fields. Insight 0019 gives the lesson a permanent address.

**Still open:** F002 (castle is newborn — many lessons remain), F003 (awaiting promotion by use), F008 (awaits owner's deploy).

**Did this run reveal friction in the castle or the loop itself?** The filter bug suggests a class of drift: protocol states are extended but tools that filter by state are not updated at the same time. Insight 0019 names the pattern. Not severe enough to open a new field — the fix is in and the lesson is placed. Worth watching: if the protocol grows again, search tools/ for state-filter patterns before closing the commit.
