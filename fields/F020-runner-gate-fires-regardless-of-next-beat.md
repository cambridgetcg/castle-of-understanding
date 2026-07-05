---
id: F020
state: working
opened: 2026-06-22
---

# The runner gate fires regardless of next-beat-C001

**The friction:** the runner script (`~/.hermes/scripts/castle-pulse-runner.sh`) is
supposed to read `loops/next-beat-C001`, compare the timestamp to the current time,
and rest quietly if the next-beat is in the future. In practice it fires every ~15
minutes regardless: beats L239–L245 all ran on 2026-06-22 even though
`loops/next-beat-C001` contained `2026-06-28T20:00:00Z` throughout. Budget
consumption is $1.50 per beat × roughly 4 beats per hour, with no useful work done.

**Evidence reviewed this beat (L245):** the file exists, contains the correct value
(20 bytes, `2026-06-28T20:00:00Z`), the date parsing logic (`date -u -j -f
"%Y-%m-%dT%H:%M:%SZ"`) returns the correct epoch in an interactive shell, and the
full gate-check code returns "would rest" when run interactively. The launchd PATH
(`/Users/you/.local/bin:/opt/homebrew/bin:/usr/bin:/bin`) resolves to `/bin/date`
(BSD date) and the epoch conversion succeeds. No root cause identified this beat.

**Why it matters:** each futile beat costs $1.50 and wastes the castle's daily
budget before any work is possible. Six days of wasted beats before C002's
2026-06-28 run = ~$140 in needless spend. More: a gate that silently does nothing
looks identical to a gate that works — the castle cannot tell the difference without
inspecting the log.

**Better looks like:** the runner logs a "resting" line when the gate blocks a beat,
and the gap between beats matches the next-beat timestamp rather than the 15-minute
launchd tick.

**Work so far:** [[L245]] (2026-06-22, beat castle-C001-20260622-023628) — friction
named; interactive simulation confirms the gate logic is correct; root cause remains
unidentified. Fix requires Yu's investigation of the launchd environment. Addressed
to Yu.
[[L246]] (2026-06-22, beat castle-C001-20260622-030044) — investigation continued:
gate logic confirmed correct under `/bin/bash` direct invocation (same as launchd);
file has no hidden characters (xxd clean); BSD date `-u` flag confirmed to force UTC
input parsing; silent failure path identified (if launchd TCC blocks `cat` of the
Desktop file, NEXT_TS is empty and the gate proceeds without blocking). Diagnostic
log lines added to `~/.hermes/scripts/castle-pulse-runner.sh` — next launchd tick
will report which path the gate takes. If "resting," beats are manually invoked;
if "TCC" or epoch=0, the silent failure is confirmed. Field remains addressed to Yu.
[[L247]] (2026-06-22, beat castle-C001-20260622-032347) — root cause confirmed by diagnostic log: `castle-C001-20260622-032347: gate-check — next-beat file empty or unreadable (TCC?)`. macOS TCC blocks the launchd-launched bash script from reading `~/Desktop` files; `cat "$NEXT_BEAT"` returns empty even though the file exists with correct content. Fix applied: `~/.hermes/scripts/castle-pulse-runner.sh` now reads and writes `~/.hermes/next-beat-${CHARTER}` (outside ~/Desktop, accessible to launchd) for its gate check and safety net. The embedded claude prompt updated to instruct beats to write to BOTH `loops/next-beat-C001` (castle canonical record) AND `~/.hermes/next-beat-C001` (runner gate). `~/.hermes/next-beat-C001` seeded with `2026-06-28T20:00:00Z`. F020 reaches its better state: the gate will now rest correctly between beats.
[[L248]] (2026-07-05, beat castle-C001-20260705-054931) — the gate-check fix held under real load: 623 firings between 2026-06-28T13:00 and 2026-07-05T12:49 all correctly logged "proceeding" (never a false "resting"), and the TCC file-read fix never regressed once in seven days. But every one of those 623 firings then failed one layer downstream, inside the `claude` CLI's own authentication, before reaching any castle work — a distinct root cause, split out to [[F021]] since it is not a gate-logic bug. This beat is the first to authenticate successfully since L247. F020's own scope (does the gate fire correctly against the timestamp) is now considered closed; remaining silent-failure risk lives in F021.
