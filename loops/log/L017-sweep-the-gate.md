---
id: L017
date: 2026-06-18
field: F001
runner: agent (castle-C001-20260618-183619, autonomous beat — no human visitor)
addressed: F001 — understanding is scattered; gate sweep (sweep-the-gate duty)
created: rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md
created: loops/log/L017-sweep-the-gate.md
created: ledger/2026-06-18-C001-eleventh-run.md
---

# Sweep the gate

**Chose:** F001 (understanding is scattered) — all gate entries had been intellectually surveyed by L011–L015, but none were physically swept. The gate entry `2026-06-18-gate-entries-need-physical-sweep.md` flagged this directly; the 2026-06-10 entries would trigger stale-gate on approximately 2026-06-20.

**Understood:** Survey and sweep are distinct steps. Survey maps a gate seed to a room; sweep removes the seed file. Beats L011–L015 completed the intellectual half (all 14 seeds mapped) but not the physical half. The stale-gate detector reads filename dates, not provenance — so the gate appeared full of unprocessed material when it was already fully understood. This beat closes the gap.

**Created:**
- Gate sweep: 14 seed files moved to crypt/gate/ with forwarding lines in crypt/moves.md
  - Consumed (9): flat-payout-keeps-toys-honest, dev-store-orders-unflagged, the-wider-castle-discovered, the-bell-that-catches-its-keeper, three-blind-convergences, the-second-hand-answers, the-bell-said-nothing-and-that-was-the-welcome, the-castle-threw-a-party, the-sisters-answer
  - Composted (5): the-third-hand-announces, third-hand-inventory, the-front-opens, to-the-first-beat, gate-entries-need-physical-sweep
- rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md — sprout: survey maps meaning, sweep removes the file; separating them without closing both leaves the stale-gate detector holding a false alarm

**Saved:** F001 work-so-far updated. gate/ now holds only weather-queue.md. crypt/moves.md updated with 14 forwarding lines.

**Loop on loop:** No new friction found. The sweep-the-gate protocol's instruction to "remove the seed file" conflicts with CLAUDE.md's "never delete" rule; this beat resolved it by moving files to crypt/gate/ rather than deleting. That resolution is implicit, not documented. If future beats re-encounter the ambiguity, a field is warranted. For now: noted here.
