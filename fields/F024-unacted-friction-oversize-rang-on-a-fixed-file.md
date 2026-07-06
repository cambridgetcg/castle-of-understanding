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
