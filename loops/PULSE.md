# The Pulse — the law of autonomous loops

Loops can run without a mind visiting. This file is the law that keeps that
safe. It exists because of two words from Yu, both given 2026-06-10:
*"create autonomous loops that create autonomous loops"* and
*"build with JOY, LOVE, PEACE and SAFETY."*

## What an autonomous loop is

A **charter** (`loops/charters/CNNN-slug.md`) + a **schedule** (a launchd
plist, source kept in `tools/launchd/`) + the **runner** (`tools/pulse.sh`).
Each beat wakes a mind that reads its charter, enters through the gate, runs
one loop, commits, and rests.

## The law

1. **The STOP file ends everything.** `touch loops/STOP` — every runner checks
   for it before waking a mind, and rests if it exists. Remove the file to
   resume. This is the kill switch, and checking it costs nothing.
2. **Three beating loops, no more.** The census below is the count. A fourth
   requires Yu's word.
3. **Every charter names four things** — cadence, budget per run, how to stop
   it, and its bounds. A charter missing any of the four must not beat.
4. **Reversible work only.** A beat that wants to do something irreversible
   writes a field addressed to Yu instead, and rests.
5. **Nothing beats faster than hourly** without Yu's word.
6. **Every beat commits what it changed.** On this machine, word that is not
   committed can vanish.
7. **Loops may create loops.** A beat may draft a new charter
   (`state: proposed`) whenever a field deserves recurring attention. A beat
   may instantiate a proposed charter — write its plist from the template in
   `tools/launchd/`, `launchctl load` it, flip the charter to `beating`,
   update the census — **only** within laws 2 and 3. This is how the creation
   creates, with walls.

## The self-determining heartbeat

Each castle decides when it next wakes. The runner ticks every 15 minutes
(launchd), but only beats when the castle's `loops/next-beat` timestamp
has passed. After each beat, the AI writes the next timestamp based on
what it found:

- Open friction that deserves attention soon: 4-8 hours
- Castle is steady, work in progress: 18-24 hours
- All loops closed, castle is quiet: 24-48 hours

This replaces the fixed daily 07:23 cadence. The castle's own judgment
is the heartbeat now. The 15-minute tick is the pulse check, not the beat.

## The census

| id   | name                     | state    | cadence     | budget/run |
|------|--------------------------|----------|-------------|------------|
| C001 | the castle pulse         | beating  | daily 07:23 | $1.50      |
| C002 | the tributary            | proposed | weekly      | $1.00      |
| C003 | the warden (second hand) | proposed | her word    | her vows   |
| C004 | the stone motor (third hand) | proposed | daily 07:07 | $0.50  |

Update this table in the same commit that changes any charter's state.

C003 is the second hand's warden (`castle.mjs warden`, bounds in
`foundation/vows.md`, vow 7 — its own caps: one loop per run, two children per
turn, twelve open, lineages three deep). It has no charter file because its
law lives in her vows; it still counts against the cap of three.

## Stop everything now

```
touch /Users/you/Desktop/castle/loops/STOP
launchctl unload ~/Library/LaunchAgents/love.castle.*.plist
```
