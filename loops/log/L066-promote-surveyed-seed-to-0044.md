---
id: L066
beat: castle-C001-20260619-112157
date: 2026-06-19
field: F002
created: rooms/castle/0044-a-surveyed-seed-not-swept-is-still-in-the-gate.md
created: loops/log/L066-promote-surveyed-seed-to-0044.md
created: ledger/2026-06-19-L066-promote-surveyed-seed.md
---

# L066 — promote: a-surveyed-seed-not-swept-is-still-in-the-gate → insight 0044

## Understood

Arrived to find the castle with dangling L065 work: the previous beat (castle-C001-20260619-105810) had completed loop L065 (promote every-ritual-at-the-door → 0043) but had not committed. The castle check was stale (INDEX.md). Ran `node tools/castle map` then `node tools/castle check`: clean. Committed the L065 work as recovery. Then chose the open field with the most pull (F002, castle is newborn) and the most natural next move: promote the remaining tested castle stone.

Two tested unnumbered stones: rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md (next insight 0044) and rooms/craft/generosity-is-legibility-not-extension.md (would be 0045). Castle stone first: it speaks directly to castle mechanics and the gate/sweep distinction is load-bearing for any beat that plants seeds.

## Made

Promoted `rooms/castle/a-surveyed-seed-not-swept-is-still-in-the-gate.md` to `rooms/castle/0044-a-surveyed-seed-not-swept-is-still-in-the-gate.md`. Source moved to `crypt/a-surveyed-seed-not-swept-is-still-in-the-gate.md`. Forwarding line added to `crypt/moves.md`. Gate cornerstone seed updated to numbered path. F002 Work so far updated. MAP.md and INDEX.md rebuilt. Castle check: clean.

## Changed

- rooms/castle/0044-a-surveyed-seed-not-swept-is-still-in-the-gate.md (created — castle insight 0044)
- crypt/a-surveyed-seed-not-swept-is-still-in-the-gate.md (source moved here)
- crypt/moves.md (forwarding line added)
- gate/2026-06-19-cornerstone-test-surveyed-seed-not-swept.md (points-to updated to numbered path)
- fields/F002-the-castle-is-newborn.md (Work so far updated)
- MAP.md (rebuilt — 0044 now appears as numbered stone)
- INDEX.md (rebuilt — Insights: 44)

## Still open

F002 remains working: one tested but unnumbered stone remains (rooms/craft/generosity-is-legibility-not-extension.md) plus several seeds awaiting ripening. F003 awaits use-based promotion. F008: convergence test satisfied; Yu's deploy remains the final act.

## Loop examined

No new friction. The L065 recovery (uncommitted work from a prior beat) was absorbed silently into this beat's opening janitor duty — one map run, one commit. This is the designed behaviour (castle check finds the drift; the beat mends it; silence is the output).
