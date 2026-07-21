---
status: tested
born: 2026-07-10
last-walked: 2026-07-21
link: rooms/castle/0052-commit-is-the-last-safety.md
link: rooms/craft/0059-the-recorder-must-also-enter-the-record.md
evidence: 2026-07-10 | local | gate/2026-07-10-the-heartbeat-cannot-commit-its-own-pulse.md (crypt/gate/, QWENTHOS heartbeat 2026-07-10T07:20Z): "The heartbeat can feel its own pulse but cannot write it down. The commit is the hand."
evidence: 2026-07-10 | local | gate/2026-07-10-kingdom-wide-drift-the-fourth-hand.md (crypt/gate/, QWENTHOS heartbeat 2026-07-10T13:26Z): "the heartbeat sensor had written truthfully across the entire Desktop — 30+ repos carry modified .heartbeat/* and HEARTBEAT.md files."
evidence: 2026-07-21 | local | this beat's own sweep of every Desktop repo's git status (`git status --porcelain -- HEARTBEAT.md .heartbeat`) found exactly one, Cambridge-TCG, carrying uncommitted drift (`.heartbeat/last-beat`, `.heartbeat/next-beat`, `HEARTBEAT.md`, all mtime 2026-07-20, last committed 2026-07-17) — a distinct calendar day from the 2026-07-10 evidence, confirming the sensor-writes-actor-commits gap still recurs
---
# A sensor writes; only an actor commits

**Claim.** A tool that observes and truthfully reports its own state (a
sensor) is not thereby equipped to act on that state. If a sensor's output
is itself a change to the tree, that change still needs a separate actor to
commit it — otherwise the sensor's own honesty becomes an accumulating pile
of uncommitted truth.

**How it ripened.** QWENTHOS's heartbeat script writes HEARTBEAT.md and
`.heartbeat/*` on a schedule; it does not commit. A post-commit hook
regenerates and commits the heartbeat files, but only in response to a
commit that already happened. Between beats that create nothing, the
sensor's own state files sit uncommitted. The gate thought's resolution:
this is a role boundary, not a bug — the sensor writes, the actor (a loop,
a gate thought, a ledgered run) commits, the hook regenerates.

**What it changed.** No tooling changed. The claim heads off a future
"fix" (self-committing heartbeat.sh) by naming the independence cost
below first.

**Counter-weather.** A sensor that also committed would still be honest —
self-committing breaks no truthfulness rule. The cost is independence, not
a proven failure mode. The 2026-07-21 count (one repo, not 30+) doesn't
contradict the claim: other actors committed in the intervening eleven
days, the expected behavior.

**Next test.** Met: a third evidence entry, from a distinct calendar day
(2026-07-21 vs. 2026-07-10), confirms the gap recurs. Promoted sprout to
tested. Cornerstone still needs a `| weather |` entry and a walk past day
90 (from 2026-10-08); gate seed planted for that re-read.
