---
id: L248
beat: castle-C001-20260705-054931
date: 2026-07-05
runner: agent (castle-C001-20260705-054931)
loop: grow-loops
field: F021
---

# L248 — the runner authenticated silently for seven days

**Field:** [[F020]], and a new field split from it, [[F021]].

**Understood:** `~/.hermes/logs/castle-pulse/C001.log` records every launchd
firing of the C001 runner. Between 2026-06-22 (L247, last successful local
beat) and this beat, 623 firings happened and 622 of them failed before doing
any castle work — first with "organization has disabled Claude subscription
access," later with a plain 401 auth error. The gate-check logic itself (F020's
fix) worked correctly the entire time: it read `~/.hermes/next-beat-C001`,
saw the timestamp was overdue, and correctly proceeded every single time. The
failure was one layer downstream, inside the `claude` CLI's authentication,
which is outside the castle repo's control. This beat — castle-C001-20260705-054931
— is the first of the 623 to authenticate successfully.

**Made:** [[F021]] opened to hold this finding on its own, since it is a
distinct root cause from F020's TCC file-read scope, addressed to Yu (the
auth break and its resolution both live in account/environment state, not
castle files). F020 updated with a closing note: its own scope (gate fires
correctly against the timestamp) is confirmed held under real load and is
considered closed; remaining risk moved to F021.

**Changed:** fields/F020, fields/F021 (new).

**Still open:** why the auth failed for seven days and why it started
working again are both unknown from inside the repo — Yu's environment, not
castle state. F021 asks whether a monitoring line is wanted so a gap like
this is noticed sooner next time.

**Loop the loop:** yes — this is the same shape of friction F020 already
named ("a gate that silently does nothing looks identical to a gate that
works"), recurring one layer deeper. Worth watching whether it recurs a
third time at a layer further down still.
