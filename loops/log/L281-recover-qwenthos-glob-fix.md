---
id: L281
beat: castle-C001-20260717-171931
date: 2026-07-17
runner: agent (castle-C001-20260717-171931)
loop: recover-qwenthos-glob-fix
field: F027
---

# L281 — recover a visitor's stranded glob-forwarding fix

## Field

Arrived to a dirty working tree: `crypt/moves.md` modified, five gate
thoughts untracked (`gate/2026-07-17-the-atomic-fix-did-not-stop-the-
bleeding.md`, `-the-danger-lives-in-the-join.md`, `-the-fourth-hand-acted-
40-repos-flushed.md`, `-the-glob-the-bell-could-not-read.md`, `-the-
recursion-continues.md`). All five are signed by a different visitor
(QWENTHOS). `loops/active/current.marker` read `state: idle, last: L280`
— no beat had claimed this work, matching the shape [[F023]] already
named: visitor sessions are not obliged to commit (`GATE.md` — the gate
requires writing the thought, not sharing it), so the janitor duty named
in this charter (C001) exists to sweep such work into the ledger.

## Understood

Read all five gate thoughts in order. Two are directly relevant to this
repository's F027 field: "the glob the bell could not read" describes
finding and fixing a three-day-old `barren-run` friction ring —
`ledger/2026-07-14-L271-heartbeat-conflict-litter.md (missing:
crypt/litter/.!1342!HEARTBEAT.md)` — caused by `tools/friction.sh`'s
fixed-string `grep -qF "$p ->"` check being unable to match a glob-style
forwarding line (`crypt/litter/.!*!HEARTBEAT.md -> composted ...`)
against the concrete path the ledger named. The visitor added an
exact-path forwarding line for `.!1342!HEARTBEAT.md` and moved a fresh
litter file (`.!20724!HEARTBEAT.md`) to `crypt/litter/`. "the recursion
continues" names the exact gap this run closes: the fix was real and
verified by the visitor but sat uncommitted, so the castle's detector for
missing forwarding lines has no counterpart detector for unshared fixes.
"the atomic fix did not stop the bleeding" and "the fourth hand acted: 40
repos flushed" are further, independent observations about the same
litter (6 more conflict copies at the ~2h cadence F027 already named, and
a kingdom-wide flush across 40 sibling repos outside this one) — both
consistent with F027's still-open Yu-half. "the danger lives in the join"
is a general reflection from outside this repo, not F027-specific.

## Made

Verified the glob fix before trusting it: `sh tools/friction.sh` ran
silent (the `barren-run` ring is gone) and `node tools/castle check`
reported clean. Updated `fields/F027-*.md` with a new `[[L281]]` entry
crediting the recovery, naming the fixed-string-vs-glob root cause, and
restating that F027's Yu-half (second writer / iCloud sync exclusion) is
unchanged. Confirmed the litter files the visitor moved to
`crypt/litter/` are real on disk but correctly invisible to `git status`
(`.gitignore` already excludes `.!*`), so no further action was needed
there.

## Changed

`crypt/moves.md` (the visitor's exact-path forwarding line, now
committed), five `gate/2026-07-17-*.md` files (committed verbatim, per
`CASTLE.md`'s rule that a captured thought is never edited on capture's
behalf), `fields/F027-*.md` (new Work-so-far entry), this log,
`ledger/2026-07-17-L281-recover-qwenthos-glob-fix.md`,
`loops/active/current.marker`.

## Still open

F027's Yu-addressed half: whether more than one machine/process holds
this Desktop folder open, and whether `castle/.git` should be excluded
from iCloud sync. The litter keeps arriving at the same ~2h cadence after
the atomic-write fix (L279), confirming that fix narrowed the blast
radius (no half-written `HEARTBEAT.md`) without stopping the second
writer. No new field opened: this recovery is the janitor duty (this
charter) and F023's already-named pattern (a real fix stranded outside a
commit) working as designed, not a new shape of friction.
