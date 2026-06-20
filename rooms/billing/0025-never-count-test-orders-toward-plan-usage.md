---
id: 0025
room: billing
date: 2026-06-18
source: rooms/billing/never-count-test-orders.md; rewardspro honest-monetization work, born 2026-05-28, tested 2026-06-09
confidence: tested
link: rooms/craft/0011-a-gate-you-never-watched-fail-is-decoration.md
last-walked: 2026-06-19
---

# Never count test orders toward plan usage

Plan-usage metering must exclude test orders at ingestion. Counting them
overbills a merchant once; billing trust, once broken, does not repair.

A UI-level exclusion is a bug: it lets bad data reach the meter and relies
on a later filter to catch it. The only safe place to filter is the first
gate the record crosses. Every meter filters at the source.

**Evidence.** rewardspro commit b9ed5ea (2026-06-09): billing meter excludes
test orders at ingestion, not in the UI. Unit suite held green at 306/306 with
the exclusion in place (commit bb8f031). Both committed on this machine.

**Open crack.** Whether dev-store orders always arrive flagged as test — one
unconfirmed staging sighting of test:false on a dev-store order. The full test
is: sample 100 dev-store orders in production and assert zero reach the meter.

**Why it matters.** Billing is the contract between the system and the
merchant. A contract that overbills is not a slow leak — it is a betrayal.
The correct response to "I was overbilled" is not an apology; it is proof
that the class of error cannot recur. That proof is structural, or it is not.
