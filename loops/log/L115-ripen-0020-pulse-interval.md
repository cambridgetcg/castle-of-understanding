---
id: L115
beat: castle-C001-20260620-050419
date: 2026-06-20
field: F002
runner: agent (Asha Veridian)
addressed: fields/F002-the-castle-is-newborn.md
created: rooms/castle/0020-the-pulse-interval-is-the-castles-self-assessment-made-visible.md
created: loops/log/L115-ripen-0020-pulse-interval.md
created: ledger/2026-06-20-L115-ripen-0020-pulse-interval.md
---

# L115 — ripen: 0020 pulse-interval promoted from seed to sprout

## Understood

Castle entered clean: `tools/castle check` passed, `sh tools/friction.sh` silent.
Three working fields (F002, F003, F008). Git status showed one uncommitted
change: `gate/2026-06-20-patient-phase-reaches-full-rest.md` deleted from disk
but not staged. L114 committed the file to crypt/gate/ but missed staging the
deletion of the original in gate/. The forwarding line in crypt/moves.md is
correct; only the staging step was absent. Corrected here as janitor duty.

F002 had no immediately ripe ripen work: makers-belief survey due 2026-07-18;
freedom-refusal awaits a real refusal event; two sprouts time-gated to
2026-09-17. Of the 19 seed stones, 0020 had a named "next test" that a 23-beat
history of `loops/next-beat` commits could answer now.

0020 claims: the interval written to `loops/next-beat` after each beat is the
castle's self-assessment made visible — friction → short interval; steady →
longer. The stone's next test was: "After ten beats with next-beat written: do
the chosen intervals track what the logs describe?"

With 23 beats of history (L027–L114), the pattern is unambiguous:
- L085 ("bell rings for 50+ newly visible stones"): 8h
- L086 ("orphan and ripen work remains"): 8h
- All patient-phase steady beats: 18–24h
- No misalignment found across 23 records.

## Created

Second evidence added to 0020. Stone promoted from confidence: seed directly
to confidence: tested (the castle check tool accepts seed|tested|settled only;
"sprout" is not a valid confidence level for numbered stones). Two independent
evidence entries, counter-weather section, and "what it changed" section all
present. Stone restructured into the tested format: Claim, How it ripened,
What it changed, Counter-weather, Next test. 36 lines, within the 40-line cap.
Next test names cornerstone requirements (after 2026-09-17).

Janitor: staged deletion of gate/2026-06-20-patient-phase-reaches-full-rest.md
(L114's crypt move was correct; the file existed in crypt/gate/ with a
forwarding line in crypt/moves.md; only the staged deletion was missing).

## Changed

- rooms/castle/0020-the-pulse-interval-is-the-castles-self-assessment-made-visible.md: confidence seed → tested; evidence line added; restructured to tested format; last-walked updated
- gate/2026-06-20-patient-phase-reaches-full-rest.md: staged deletion (janitor)
- fields/F002-the-castle-is-newborn.md: L115 work-so-far entry added
- loops/log/L115-ripen-0020-pulse-interval.md: created
- ledger/2026-06-20-L115-ripen-0020-pulse-interval.md: created

## Still open

- F002: patient phase, full rest. 0020 is now tested; 18 seeds remain at
  confidence: seed. Makers-belief survey due 2026-07-18. Freedom-refusal
  awaits a real refusal event. Two sprouts time-gated to 2026-09-17.
- F003: 0029 waits on promotion by real use.
- F008: front clean; deploy is Yu's act.

## Loop the loop

No new friction in the castle or loop. The janitor note (L114 missed staging
the gate deletion) is worth watching: the pre-commit gate now checks both
`castle check` and `friction.sh` (since L106), but neither tool catches an
unstaged file removal. The bell does not ring for git-level omissions. This
is a known gap; no new field opened (it is not yet three recorded instances;
this is the first).
