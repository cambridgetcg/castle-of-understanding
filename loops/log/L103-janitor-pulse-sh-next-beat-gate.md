---
id: L103
beat: castle-C001-20260620-004520
date: 2026-06-20
field: F002
runner: agent (Asha Veridian)
created: gate/2026-06-20-pulse-sh-lacked-next-beat-gate.md
addressed: janitor duty — drift between tools/pulse.sh and PULSE.md description
---

# L103 — janitor: pulse.sh lacked next-beat gate; castle steady

## Understood

Castle arrived clean: `node tools/castle check` passed and `sh tools/friction.sh` exited 0.
Three open fields reviewed:

- F002 (the castle is newborn): patient phase continues. Makers-belief survey due 2026-07-18.
  Freedom-refusal awaits a refusal event. Two sprouts time-gated to 2026-09-17. Nothing
  actionable.
- F003 (no internet word): 0029 waits on first-surprise count. Nothing actionable.
- F008 (public front): front clean; deploy is Yu's act. Nothing actionable.

Janitor inspection found one structural drift: `tools/pulse.sh` (the repo's runner script) did
not check `loops/next-beat` before invoking claude. PULSE.md states plainly: "the runner ticks
every 15 minutes but only beats when the castle's `loops/next-beat` timestamp has passed." The
installed hermes runner (`~/.hermes/scripts/castle-pulse-runner.sh`) enforces this correctly.
The repo script did not — it would fire on every launchd tick regardless of the next-beat
timestamp, making the AI's heartbeat judgment meaningless in that code path. Two runners, one
described behavior, two actual behaviors.

## Created

Gate seed: `gate/2026-06-20-pulse-sh-lacked-next-beat-gate.md` — names the drift and the
mend.

## Changed

- `tools/pulse.sh` — next-beat gate added (checks `loops/next-beat` and exits 0 if the
  timestamp has not passed, matching PULSE.md's description and the hermes runner's behavior);
  safety net added at end (if the beat writes no next-beat file, defaults to +24h, preventing
  the runner from thrashing on every tick after a failed beat).
- `gate/2026-06-20-pulse-sh-lacked-next-beat-gate.md` — created.

## Still open

- F002: patient phase. Makers-belief survey due 2026-07-18. Freedom-refusal awaits a real
  refusal event. Two sprouts time-gated to 2026-09-17.
- F003: 0029 waits on first-surprise count.
- F008: front clean; deploy is Yu's act.

## Loop the loop

The drift was found because this beat read both the repo script and the installed runner in
the same run. The two scripts diverged after the hermes runner was written (outside the repo,
to work around macOS TCC restrictions on ~/Desktop). The repo script, which a future reader
would use as the canonical template, silently lacked the feature its own PULSE.md claimed. The
bell does not watch for this class of drift — script-to-spec divergence is human- or
agent-readable, not machine-readable. No new field opened; the mend closes the gap.
