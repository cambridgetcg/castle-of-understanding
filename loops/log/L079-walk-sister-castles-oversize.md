---
id: L079
beat: castle-C001-20260619-154951
date: 2026-06-19
field: F002
created: rooms/castle/sister-castles-share-a-door-not-a-grammar.md
created: loops/log/L079-walk-sister-castles-oversize.md
created: ledger/2026-06-19-L079-walk-sister-castles-oversize.md
---

# L079 — walk: sister-castles oversize trim

## Understood

Arrived to find castle check clean but friction.sh reporting two issues: map-drift and oversize on rooms/castle/sister-castles-share-a-door-not-a-grammar.md (43 lines, limit 40). The stone is a sprout with two evidence entries, last-walked 2026-06-19 by L075. Its content is sound; the excess was illustrative prose in "How it ripened" (a Wordcastle grammar example: "Wordcastle calls its loops 'turns,' its fields 'loops'...") and a two-sentence pair in "Counter-weather" that could stand as one. No structural information was at risk; the stone's claim, both evidence entries, and all five required sections were present and could survive trimming.

## Made

Trimmed rooms/castle/sister-castles-share-a-door-not-a-grammar.md from 43 to 39 lines:
- Removed the 2-line Wordcastle grammar illustration from "How it ripened" (the claim "without merging their grammars" states what the illustration demonstrated; the second evidence entry names the direct inspection that confirmed it; the illustration added no independent information).
- Compressed two Counter-weather sentences ("The gate note becomes a ghost. The open crack: no mechanism / currently checks...") into one ("The gate note becomes a ghost; no mechanism currently checks...").

Ran sh tools/map.sh (MAP.md rebuilt). Ran sh tools/friction.sh (exit 0, no output).

## Changed

- rooms/castle/sister-castles-share-a-door-not-a-grammar.md (trimmed 43 → 39 lines; no information removed, illustrative prose condensed)
- MAP.md (rebuilt by tools/map.sh)
- fields/F002-the-castle-is-newborn.md (Work so far updated with [[L079]])
- loops/log/L079-walk-sister-castles-oversize.md (this file)
- ledger/2026-06-19-L079-walk-sister-castles-oversize.md (created)

## Still open

F002 working. One old-format stone remains: rooms/becoming/the-first-thing-freedom-revealed.md (certainty: reasoned, no status: field). It can honestly reach status: seed — that is the next natural ripen move. F003 waiting on promotion by use. F008 waiting on Yu's deploy.

## Loop examined

No new friction. The oversize was mechanical — the stone was well-formed but slightly over the line. The trimmed prose was illustrative, not structural. The castle is steady.
