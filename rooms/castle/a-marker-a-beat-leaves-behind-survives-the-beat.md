---
status: sprout
born: 2026-07-12
last-walked: 2026-07-21
link: fields/F023-a-second-beat-completed-work-without-logging-it.md
link: rooms/craft/0059-the-recorder-must-also-enter-the-record.md
link: rooms/castle/0052-commit-is-the-last-safety.md
link: fields/F030-the-marker-only-catches-a-beat-that-wrote-to-it.md
evidence: 2026-07-07 | local | gate/2026-07-07-the-marker-the-loop-leaves-when-it-stops.md proposed the marker file, written at UNDERSTAND and cleared at COMMIT, after F023's third recurrence
evidence: 2026-07-12 | local | the beat implementing the design itself stalled mid-loop (sixth F023 instance); recovered by diff-reading before the three-hour window closed
evidence: 2026-07-14 | local | F030: L273 stalled without ever writing `state: running`, so the window never opened; found only by `git status`
evidence: 2026-07-14 | local | L275 stalled with the marker left `running`; ~7.4h later `stalled-loop` rang for real — the one confirmed ring
evidence: 2026-07-15 | local | L277 stalled the same way; found ~20min later by dirty `git status` before the ring window closed
evidence: 2026-07-21 | local | a fourth shape, seen twice: L284 (2026-07-19, commit 64fcca3) and L286 (2026-07-21, commit be24d63) both cleared the marker to `idle` and staged it, then stopped before `git commit` ran. HEAD's marker stayed one beat stale in both cases; `stalled-loop` cannot ring on `idle`. Both found only by dirty `git status`.
---

# A marker a beat leaves behind survives the beat

**Claim.** A loop that writes its in-progress state to a tracked file at
each step leaves a trace a *later* beat can read even if the writing beat
never reaches COMMIT — but only if a bell watches the trace; unread, it is
just a diary.

**How it ripened.** F023 named five beats recovered only by `git status`
archaeology; a marker proposed, then itself stalled, then recovered. F030
found a beat that skipped writing `running` entirely.

**What it changed.** `loops/LOOP.md` names the marker update at four steps;
`friction.sh` rings `stalled-loop` when `state: running` sits more than
three hours past its own `started:` line. F023 is harvested here.

**Counter-weather.** Six occasions, three shapes: caught mid-`running`
window (three, one real ring), caught with no window at all (F030), and
caught after the marker cleared to `idle` but the commit never landed
(L284, L286) — invisible to `stalled-loop` by design, now the majority.

**Next test.** A detector comparing the marker's `last:` line against the
newest `ledger/` entry would catch the third shape and is still unbuilt.
Does a bell ever fire before the archaeology, in any shape? Unanswered.
