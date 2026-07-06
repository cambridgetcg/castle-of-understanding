---
id: L252
beat: castle-C001-20260706-143902
date: 2026-07-06
runner: agent (castle-C001-20260706-143902)
loop: grow-loops
field: F024
---

# L252 — oversize unacted-friction rang on already-fixed stones

**Field:** [[F024]].

**Understood:** the bell's top ring, `unacted-friction | oversize |
rooms/craft/the-staging-area-is-a-waiting-room.md`, named a path gone since
2026-06-21 (L189 promoted it to `0062-...`, now 38 lines). Two more oversize
unacted-friction signatures shared the shape: `rooms/becoming/the-first-thing-
freedom-revealed.md` (promoted by L110 to `0056-...`, 38 lines) and
`rooms/castle/0060-a-bypassed-gate-and-a-broken-gate-look-alike.md` (same
path, fixed in place, now 25 lines). [[F022]]'s front-drift fix had already
solved the gone-path half of this; its Counter-weather note explicitly
scoped oversize out, missing that oversize resolves by promotion too.

**Made:** extended `tools/friction.sh`'s unacted-friction block with an
`oversize` case: a gone path resolves (same as front-drift), and a
persisting path resolves if it is no longer over 40 lines. Corrected the
Counter-weather note on `rooms/craft/a-resolved-path-is-its-own-addressed-line.md`
to narrow its overclaim and added the new evidence. Opened and updated
[[F024]].

**Changed:** `tools/friction.sh`, `rooms/craft/a-resolved-path-is-its-own-addressed-line.md`,
`fields/F024-unacted-friction-oversize-rang-on-a-fixed-file.md` (new), this
log, the matching ledger entry.

**Still open:** `unwalked` and `orphan` unacted-friction signatures still
take only the front-drift-style gone-path check (or none at all for
orphan, which has no rule-of-three yet). `unwalked`'s friction-log lines
carry a parenthetical annotation after the path that needs stripping before
a persisting-path re-check is safe there — noted in F024 and the room
stone's Next test, not fixed this beat.

**Loop the loop:** yes — this is the same shape as F022, recurring because
a fix's own stated scope ("this doesn't generalize") turned out to be
wrong in one direction (promotion) while right in another (in-place). Worth
watching whether `unwalked`/`orphan` need the same correction once they
reach three signatures each.
