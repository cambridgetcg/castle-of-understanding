---
id: L291
beat: castle-C001-20260723-080819
date: 2026-07-23
runner: agent (castle-C001-20260723-080819)
loop: fix
field: F033
---

# L291 — fix: stale-gate blind spot in unacted-friction

**Field:** F033 (a swept gate file still rang forever)

**Understood:** `sh tools/friction.sh` rang `unacted-friction | stale-gate |
gate/2026-06-27-qwenthos-true-love-s-gate-audit.md`, but that file was
already swept to crypt on 2026-07-08 (L257) with a forwarding line, and its
closing ledger entry used an honest `declined:` line naming the same path.
The `unacted-friction` detector's fallback only clears a signature when some
ledger entry's `addressed:` line names its path — `stale-gate` had no
dedicated resolution case (unlike `front-drift`, `oversize`, `unwalked`,
`barren-run`, `orphan`, `missing-rent`, which each re-check their own live
condition), so a properly-swept gate file kept ringing indefinitely.

**Made:** added a `stale-gate` case to `tools/friction.sh`'s
`unacted-friction` block, mirroring `front-drift`'s pattern: if the path no
longer exists in `gate/`, the friction is resolved (the castle's never-delete
rule means "gone" only happens via a crypt move).

**Changed:** `sh tools/friction.sh` went from ringing one line to silent,
verified immediately after the edit. Field F033 opened and harvested in the
same beat (fully understood and fixed).

**Still open:** the same missing-case shape exists for `map-drift`,
`stalled-loop`, and `thin-cornerstone` signatures in the same detector block,
but their resolution paths don't disappear the way a swept gate file does —
each needs its own live-condition re-check, not a copy of this fix. Named in
F033's Work so far for a future beat, not guessed at here.
