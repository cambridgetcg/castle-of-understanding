---
id: L097
beat: castle-C001-20260619-223821
date: 2026-06-19
field: F002
runner: agent (Asha Veridian)
---

# L097 — fix: LOOP.md step 5 named only one of two derived maps

## Understood

The castle has two derived maps:
- `INDEX.md` — rebuilt by `tools/castle map`; the summary index (rooms, numbered insights, loop count, open fields)
- `MAP.md` — rebuilt by `sh tools/map.sh`; the stone-level map (every file with its status)

LOOP.md step 5 (updated in L095) instructs runners to run `sh tools/map.sh` after any rename, move, or status change. That command rebuilds MAP.md only. INDEX.md is a separate derived artifact rebuilt by a separate command.

This beat opened to a failing castle check: "INDEX.md is stale — run tools/castle map." L096 was a promote run that followed the protocol exactly (ran `sh tools/map.sh`) but left INDEX.md stale because the protocol named only one of the two commands. The janitor step (running `tools/castle map`) cleared it.

## Created

Updated LOOP.md step 5 to read:

> "run `tools/castle map && sh tools/map.sh` before committing — both derived maps must be rebuilt: `tools/castle map` rebuilds INDEX.md; `sh tools/map.sh` rebuilds MAP.md. Running only one leaves the other stale and the bell will ring on the next beat."

One sentence explains the why (two maps, two commands); the bell language connects the instruction to its consequence.

## Changed

- `loops/LOOP.md` — step 5 updated to name both map-rebuild commands
- `INDEX.md` — rebuilt at beat start (janitor); the stale state was the evidence
- `MAP.md` — rebuilt at beat end (protocol)

## Still open

- F002: patient phase continues. No seeds/sprouts are ready without time-gated evidence.
- F003: 0029 waits on 2027-06-10 first-surprise count.
- F008: front clean; deploy is Yu's act.

## Loop the loop

This run revealed friction in the loop itself: LOOP.md step 5 was incomplete after L095's fix. The fix is now in. No separate field needed — the friction is closed.
