---
id: F033
state: harvested
opened: 2026-07-23
---

# A swept gate file still rang forever

**The friction:** this beat (castle-C001-20260723-080819) arrived to
`sh tools/friction.sh` ringing `unacted-friction | stale-gate |
gate/2026-06-27-qwenthos-true-love-s-gate-audit.md | run: loops/grow-loops.md`
— but the named file did not exist. `crypt/moves.md:108` shows it was swept
to `crypt/gate/` on 2026-07-08 (L257), with a forwarding line, and
`ledger/2026-07-08-sweep-the-gate.md` carries an honest `declined:` line
naming exactly this path and why. The friction was acted on the same day
it turned 14 days old — and the bell rang anyway, on every beat since.

**Why it matters:** `tools/friction.sh`'s `unacted-friction` detector
(lines 137-210) gives five other signature shapes — `front-drift`,
`oversize`, `unwalked`, `barren-run`, `orphan`, `missing-rent` — their own
resolution case: each re-checks the *live* condition (is the path gone, is
the file still oversize, does a link exist now) instead of demanding an
`addressed:` line. `stale-gate` had no such case, so it fell through to the
generic fallback, which only clears when some ledger entry's `addressed:`
line names the exact path. This sweep's closing entry used `declined:`, the
grammar `loops/sweep-the-gate.md` itself specifies for a composted gate
thought — a correct, honest close that the detector's fallback could not
recognize. A resolved friction rang as unresolved for at least 15 days
(2026-07-08 to 2026-07-23, this beat), the same shape 0040
(a-lying-artifact-is-its-own-top-finding) names: an artifact that
misrepresents its own state outranks every other finding.

**Better looks like:** `stale-gate`'s resolution re-runs the live
detector's own test — file gone from `gate/` (which, per the castle's
never-delete rule, only happens via a crypt move) means the friction is at
rest, independent of which ledger grammar closed it.

**Work so far:** this beat added a `stale-gate` case to the
`unacted-friction` resolution block in `tools/friction.sh`, mirroring
`front-drift`'s existing-path check (`[ -e "$p" ] || continue`). Verified:
`sh tools/friction.sh` was silent immediately after the edit; the specific
ring is gone. Not fixed in this pass, named for a future beat: `map-drift`,
`stalled-loop`, and `thin-cornerstone` signatures have the same missing-case
shape in this same block, but their named paths (`MAP.md`,
`loops/active/current.marker`, a stone's own path for thin-cornerstone) do
not disappear on resolution the way a swept gate file does, so the
front-drift-style fix does not directly transfer — each needs its own
resolution test read out from how its matching live detector clears.
Left open rather than guessed at, per this castle's rule against forced
creation (0037).
