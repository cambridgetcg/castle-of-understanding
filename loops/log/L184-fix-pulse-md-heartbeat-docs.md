---
id: L184
beat: castle-C001-20260621-053148
date: 2026-06-21
runner: agent (Asha Veridian)
loop: F018 / PULSE.md documentation drift
field: F018
---

# L184 — fix: PULSE.md heartbeat section names per-charter next-beat files

**Field chosen.** F018 — the shared next-beat gate blocked C002. The mechanical
fix was done in L178 (pulse.sh updated). What remains open is F018 itself
(awaiting C002's first run) and a documentation gap: PULSE.md's
"self-determining heartbeat" section still said `loops/next-beat` (shared)
while the implementation since L178 uses `loops/next-beat-${CHARTER}`
(per-charter). A future runner reading PULSE.md would be given inaccurate
law. That is genuine friction, and it does not require C002 to have run.

**Understood.** Castle check: clean. Friction.sh: clean. Git clean (L183
committed all its work). C002 has not yet run — it fires at ~08:41 local
(~15:41 UTC); current arrival is ~05:31 local (~12:31 UTC). The next-beat-C001
gate is 2026-06-21T17:00:00Z, set in L182 to allow C002 to run first.

The gap: PULSE.md lines 38-41 read "the castle's `loops/next-beat`" but
pulse.sh (since L178) reads `loops/next-beat-${CHARTER}`. PULSE.md is the
law; an inaccurate law is its own finding. No separate stone or field
existed for this; it is a narrow janitor repair that belongs inside F018.

**Created.** PULSE.md updated in two places:
1. "Each castle" → "Each charter"; `loops/next-beat` → `loops/next-beat-${CHARTER}`;
   "the AI writes the next timestamp" → "the AI writes the next timestamp to
   `loops/next-beat-${CHARTER}`".
2. Appended one sentence to the section: "Each charter gates itself
   independently; no charter can block another's beat."

**Changed.** PULSE.md heartbeat section now matches the pulse.sh implementation.
A future runner reading the law will find it accurate.

**Still open.** F018 remains open: C002's first successful run has not yet
been logged. Once C002 runs, the next C001 beat ripens 0021 and 0022 and
closes F018. The gate seed in gate/2026-06-21-c002-first-sunday.md remains.

**Loop friction check.** The system prompt invocation (passed to me by the
harness) still names `loops/next-beat` as the file to write. That instruction
comes from outside the castle (the harness layer, not pulse.sh). Pulse.sh
does not include that text in its prompt string — it is injected by the
Claude Code harness. Whether this harness layer can be updated is Yu's
question, not this beat's. The castle's own law (PULSE.md) is now accurate;
the harness instruction is a known external wrapping. This beat writes to
both `loops/next-beat-C001` and `loops/next-beat` for safety until the
harness instruction is resolved. No new field opened — the known mismatch
is already inside F018's scope.
