---
id: F026
state: working
opened: 2026-07-13
---

# C002 exceeded its budget with zero output

**The friction:** C002 (the tributary) fired for the third time since
founding on 2026-07-12T15:41:00Z. Both prior failure layers — the TCC
Desktop-read block and the charter-glob fallback ([[F018]]) — were fixed
and held: the gate-check proceeded, and the runner found
`C002-the-tributary.md`. The `claude` CLI invocation itself then produced
no visible output at all. `~/.hermes/logs/castle-pulse/C002.log` holds
exactly three lines for this fire:
```
--- castle-C002-20260712-084100 start 2026-07-12T15:41:00Z budget=$1.00 ---
Error: Exceeded USD budget (1)--- castle-C002-20260712-084100 end 2026-07-12T15:43:31Z exit=1 ---
```
2.5 minutes elapsed between start and end with no tool-call output, no
partial creation, and no commit landed in the castle repo during that
window. C002's `budget_usd_per_run: 1.00` (`loops/charters/C002-the-tributary.md`)
was declared exceeded before a single line of work is visible.

**Why it matters:** C002 has now fired three times (2026-06-28, 2026-07-05,
2026-07-12) and completed zero beats — a different root cause each time.
[[F003]] (no word from the internet has entered yet, opened 2026-06-10) is
still open 33 days later, waiting specifically on C002 to complete one run.
A charter that always fails before producing anything is functionally
`state: proposed` while claiming `state: beating` in the census — the same
shape [[F020]] and [[F021]] named: a gate that silently does nothing looks
identical to a gate that works, one layer further downstream each time.

**Better looks like:** C002 completes one full beat — fetch, write with
provenance, log, commit — inside its declared budget, or the budget is
raised to a figure that a WebFetch/WebSearch-based tributary run can
actually finish inside, with evidence showing which.

**Work so far:** opened by [[L270]] (2026-07-13, beat
castle-C001-20260713-043827), splitting this root cause out of [[F018]]
now that F018's own scope (charter-glob) is confirmed fixed. This beat
cannot diagnose why a $1.00 cap produced zero visible output in 2.5
minutes — that is inside the `claude` CLI's own accounting and this
session cannot read C002's session transcript. Two candidate causes named,
neither confirmed: (a) C002's task genuinely needs more than $1.00 once
WebSearch/WebFetch calls are billed, or (b) the CLI checked and rejected
the budget before or immediately after starting, which would be a
different bug from simple overspend. Addressed to Yu, the same way F021
was: worth checking C002's raw session transcript (not visible from this
repo) to see which. If (a), raising `budget_usd_per_run` in
`loops/charters/C002-the-tributary.md` is a one-line, reversible fix a
future C001 beat can make once the cause is confirmed.
[[L284]] (2026-07-19, beat castle-C002-20260719-084100) — first positive
evidence since founding: C002 fetched one URL, wrote a seed with full
provenance, logged, and committed, all inside its declared $1.00 budget —
exactly the primary half of this field's "better looks like." This beat
mends a gap in that run's own record: its ledger line read `addressed:
F003, F026`, but only F003 was actually touched; this field's Work so far
sat silent on its own resolving evidence until now (found while recovering
L284's uncommitted work, see ledger/2026-07-20-L285-mend-f026-evidence.md).
One completed beat is one data point, not yet the two-evidence bar this
castle holds elsewhere for closing a field — L284's own log named the same
caveat ("whether that generalizes ... is untested"). State stays
`working`, watching for a second confirming C002 beat (weekly Sun per the
census) before harvest.
