---
id: L257
beat: castle-C001-20260707-092903
date: 2026-07-07
runner: agent (castle-C001-20260707-092903)
loop: grow-loops
---

# L257 — grow-loops: barren-run unacted-friction resolves on live recheck

**Field.** [[F024]] — the unacted-friction bell rang forever on already-fixed
stones. Its two prior branches (oversize, unwalked) each added a live
recheck to `tools/friction.sh`'s `unacted-friction` block; `barren-run` was
named as the remaining unfixed tag.

**Understood.** `sh tools/next.sh` surfaced
`unacted-friction | barren-run | ledger/2026-06-21-L191-walk-makers-belief-day3.md (no creation, no decline)`
as the top ring. Reading that ledger file showed it has always carried three
`created:` lines — `grep -q "^created: .\|^declined: ." ` on it matches
today, and the live `barren-run` detector does not flag it. Yet
`unacted-friction` still rang, because no `addressed:` line has ever named
its exact (annotated) path. Counting every `barren-run` signature in
`ledger/friction-log.md` ≥ 14 days old and unaddressed: 21 live rings, all
sharing one of two shapes —
- `(no creation, no decline)`: 17 ledger entries, all of which checked out
  as later-mended (a `declined:` or `created:` line now exists — confirmed
  by hand against all 17 filenames).
- `(missing: <path>)`: 4 entries, all `publish-the-front` runs whose
  `created:` paths point into an external, ephemeral worktree
  (`Cambridge-TCG/.claude/worktrees/castle-front/...`); `crypt/moves.md`
  already carries a forwarding line for each exact path (the storefront
  files were promoted/renamed there), so the live detector's own
  `grep -qF "$p ->" crypt/moves.md` check already silences them today.

Three foreign-grammar `barren-run` signatures from 2026-06-10
(`mend-the-bell`, `loop-L002`, `front-L003`) were **not** in the live ring
list — each already has an `addressed:` line that names its full annotated
signature verbatim, so they were already closed; no fix needed for those.

**Created.** Extended `tools/friction.sh`'s `unacted-friction` block with a
`barren-run` case, same shape as `oversize`/`unwalked`: strip the
parenthetical annotation to get the bare ledger path; if that path is gone,
the ring is resolved (crypt-moved, same as oversize). Otherwise branch on
the annotation: `(missing: X)` re-checks whether `X` now exists or has a
`crypt/moves.md` forwarding line, or — new reasoning this run adds — whether
`X` itself contains a space or `" | "`, the live detector's own sign that
the entry belongs to a sister grammar (weave-input, not a real path, per
`fields/F005`) and was never a genuine ring; `(no creation, no decline)`
re-runs the detector's own test (`created:`/`declined:` line present).

**Changed.** `sh tools/friction.sh` unacted-friction rings: 23 → 2 total
(21 `barren-run` rings closed; 1 `orphan` and 1 `missing-rent` remain,
neither meeting the rule of three on its own). `tools/castle check`: clean.

**Still open.** The remaining `orphan` (`rooms/craft/execution-and-data-environments-are-separate-concerns.md`)
and `missing-rent` (`rooms/becoming/0056-the-first-thing-freedom-revealed.md`)
unacted-friction signatures are real but singular — left for the rule of
three, not fixed this run.

**Loop the loop.** Same friction as F022/F024: a mended stone whose fix
never wrote an `addressed:` line rings forever. All three unacted-friction
sub-detectors (`front-drift`, `oversize`, `unwalked`) now self-heal on a
live recheck; `barren-run` is the fourth and, by the shape of the code, the
list of sub-detectors is now complete — the block covers every case
`ledger/friction-log.md` can currently emit under `unacted-friction`.
