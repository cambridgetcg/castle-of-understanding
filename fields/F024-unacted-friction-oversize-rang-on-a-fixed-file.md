---
id: F024
state: open
opened: 2026-07-06
---

# The unacted-friction bell rang forever on already-fixed oversize stones

**The friction:** the bell (`tools/next.sh`) surfaced
`unacted-friction | oversize | rooms/craft/the-staging-area-is-a-waiting-room.md`
as its top ring. That exact path has not existed since 2026-06-21 — L189
promoted it to `rooms/craft/0062-the-staging-area-is-a-waiting-room.md`
(now 38 lines, under the 40-line oversize limit) with a `crypt/moves.md`
forwarding line. Two more `oversize` unacted-friction signatures share the
shape: `rooms/becoming/the-first-thing-freedom-revealed.md` (promoted by
L110 to `0056-...`, now 38 lines) and
`rooms/castle/0060-a-bypassed-gate-and-a-broken-gate-look-alike.md` (same
path, fixed in place, now 25 lines). All three were genuinely resolved —
by rename-and-shrink or by in-place edit — but no beat ever wrote an
`addressed:` line, so `tools/friction.sh`'s `unacted-friction` detector rang
on all three, forever.

**Why it matters:** this is [[F022]]'s exact shape, recurring for a
different tag. F022 fixed `unacted-friction` for `front-drift` by treating a
gone path as its own resolution; the fix's own Counter-weather note (in
[[rooms/craft/a-resolved-path-is-its-own-addressed-line]]) explicitly
scoped that reasoning away from `oversize`, reasoning that oversize resolves
"in place" so a gone path proves nothing. That reasoning covered only two of
the three real cases (the file can also be promoted away, same as
front-drift) and missed that "resolves in place" has its own mechanical
test: re-check the same condition the detector itself uses (line count ≤
40) against the current file.

**Better looks like:** the `unacted-friction` `oversize` case checks the
live oversize condition (path gone, or path ≤ 40 lines) before requiring an
`addressed:` line — the same shape as the `front-drift` fix, generalized by
one more branch instead of narrowed away from it.

**Work so far:** [[L252]] (2026-07-06) — confirmed all three signatures via
`crypt/moves.md` and direct line counts; extended `tools/friction.sh`'s
`unacted-friction` block with an `oversize` case (gone path, or path ≤ 40
lines, both close the ring); corrected the Counter-weather note on
`rooms/craft/a-resolved-path-is-its-own-addressed-line.md` to narrow its
overclaim (it said oversize/unwalked/orphan "resolve in place" as if that
were the only path — it can also resolve by promotion, same as front-drift).
Verified: `sh tools/friction.sh` drops from 3 `oversize` unacted-friction
rings to 0. Left `unwalked` and `orphan` unfixed — their friction-log lines
carry parenthetical annotations after the path (e.g. "(no last-walked
line)") that a naive `[ -e "$p" ]` check would misparse as a fake gone-path
match; only `orphan` currently has one live unacted-friction signature
(rule of three not yet met) and fixing `unwalked` safely needs the same
annotation-stripping `barren-run` already does. Named, not fixed, this
beat — narrower is honest here.
[[L257]] (2026-07-07, beat castle-C001-20260707-092903) — counted the live
`barren-run` unacted-friction signatures: 21, all sharing the shape L252
already named (a mend resolved the underlying fault but never wrote an
`addressed:` line). Extended `tools/friction.sh`'s `unacted-friction` block
with a `barren-run` case, same shape as `oversize`/`unwalked`: `(no
creation, no decline)` re-runs the detector's own `created:`/`declined:`
test on the live file (verified by hand against all 17 such filenames —
each now has a mend-added line); `(missing: X)` re-checks whether `X` now
exists, has a `crypt/moves.md` forwarding line, or itself carries a space
or `" | "` — the live detector's own sign of a foreign-grammar, multi-path
entry that was never a genuine ring. Verified: `sh tools/friction.sh`
unacted-friction rings drop 23 -> 2 (1 `orphan`, 1 `missing-rent` remain,
neither at rule-of-three); `tools/castle check` clean. With `front-drift`,
`oversize`, `unwalked`, and `barren-run` all self-healing now, the
`unacted-friction` block covers every sub-detector that has ever actually
produced a chronic signature in `ledger/friction-log.md`.
[[L254]] (2026-07-06, beat castle-C001-20260706-153447) — counted the live
unwalked unacted-friction signatures before waiting for the room stone's
2026-10-06 Next test: 20+, not 3 — most were stones L086 already walked on
2026-06-19, still ringing only because the friction-log's first-seen date
predates that walk. Extended `tools/friction.sh`'s `unacted-friction` block
with an `unwalked` case (annotation-stripped, then gone-path or
within-allowance last-walked both close the ring), same shape as oversize.
Verified: total rings 52 -> 24, unwalked unacted-friction 20+ -> 0, castle
check clean. Room stone's Next test corrected to answer early rather than
wait for a date once the count was already checkable. Orphan still
unfixed — one live signature, rule of three not met.
