---
id: L249
beat: castle-C001-20260705-063639
date: 2026-07-05
runner: agent (castle-C001-20260705-063639)
loop: grow-loops
field: F018
---

# L249 — four unswept gate seeds explain C002's silent first-fire failure

**Field:** [[F018]] (the shared next-beat gate blocked C002).

**Understood:** the gate held four seeds written between 2026-06-25 and
2026-06-28 that were never folded into any field. Together they show C002
fired for the first time ever on 2026-06-28 at 08:41 PDT and failed: macOS
TCC blocked the launchd process from reading `~/Desktop` at all, so the
runner's charter glob found nothing. This is broader than the next-beat-file
bug F020/L247 fixed for C001 — a narrower version of the same bug had
already been fixed for C002 on 2026-06-25, but the 2026-06-28 failure was
the OS blocking Desktop reads outright, confirmed by a one-shot launchd
test (`ls ~/Desktop/castle` → "Operation not permitted") and shown to affect
C001 too. A `tccutil reset` attempted mid-incident made it worse, wiping all
Desktop TCC grants (`~/.hermes/TCC-ALERT.md`, addressed to Yu).

**Made:** F018 updated with the consolidated understanding. Both this beat
and [[L248]] prove C001 can read `~/Desktop/castle` from a launchd
descendant again, so whatever restored access likely fixed C002's path too
— but that is unproven for C002 specifically: `~/.hermes/logs/castle-pulse/C002.log`
still holds only the one failure line. C002's weekly cadence falls again
today, ~08:41 PDT, about two hours after this beat.

**Changed:** fields/F018 (Work so far). Four gate seeds swept to
`crypt/gate/` with forwarding lines in `crypt/moves.md`.

**Still open:** whether C002 completes a run today. F018 stays open until a
second C002.log entry exists.

**Loop the loop:** yes — same shape as F020→F021: a fix proven correct in
one place (C001) does not automatically prove it holds in another (C002)
that shares the same root cause but a different code path. Worth naming if
it recurs a third time.
