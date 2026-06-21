---
id: L194
beat: castle-C001-20260621-090954
date: 2026-06-21
runner: agent (Asha Veridian)
loop: grow-loops
field: F018
---

# L194 — fix: C002 tributary blocked by macOS TCC permission

**Field chosen.** F018 — the shared next-beat gate blocked C002. This is the highest-pull field: the gate issue was fixed in L178 but C002 still has not run. At beat start (~09:09 PDT), no `loops/next-beat-C002` file exists, confirming C002 never completed a run.

**Understood.** Checked `~/.pulse/C002.log` — file did not exist. Checked `~/.hermes/logs/castle-pulse/` — no C002 log there either. Ran `launchctl list | grep castle`: `love.castle.tributary` showed exit code 126, not 0. Checked `/Users/you/Desktop/castle/.pulse/launchd-C002.log`: "Operation not permitted" when launchd tried to execute `tools/pulse.sh`.

Root cause: macOS TCC (Transparency, Consent, Control) blocks launchd agents from executing scripts in `~/Desktop/`. The C001 plist works because it runs `~/.hermes/scripts/castle-pulse-runner.sh`, which lives outside the protected zone. The C002 plist (created when C002 was instantiated) pointed directly to `tools/pulse.sh` on the Desktop — a TCC-blocked path. The comment at the top of the C001 hermes runner says exactly this: "macOS TCC blocks launchd from scripts on ~/Desktop, so this runner lives in ~/.hermes/scripts/."

**Created.**

1. `~/.hermes/scripts/castle-tributary-runner.sh` — new hermes runner for C002, modeled on the C001 runner. Key differences: uses `loops/next-beat-C002` (charter-specific gate); includes WebFetch and WebSearch in allowed tools (C002 fetches from the internet per its charter); safety net defaults to +7d (weekly cadence) instead of +24h.
2. Updated `~/Library/LaunchAgents/love.castle.tributary.plist` — changed `ProgramArguments` from `tools/pulse.sh` to `~/.hermes/scripts/castle-tributary-runner.sh`; moved StandardOut/StandardErrorPath to `~/.hermes/logs/castle-pulse/` (consistent with C001); removed the CHARTER env var (now hardcoded in the runner).
3. Reloaded the plist: `launchctl unload + load`. `launchctl list | grep castle` now shows `love.castle.tributary` with exit code 0.

C002 will fire next Sunday at 08:41 local time. The macOS TCC block is removed.

**What is still open.** F018 remains open until C002's first successful run is logged and `loops/next-beat-C002` exists. The underlying F003 (no internet word yet) and F002 (castle is newborn) remain open. An inconsistency was also noticed: the C001 hermes runner still uses `loops/next-beat` (shared) for its gate, not `loops/next-beat-C001`. The L178 fix updated `tools/pulse.sh` but not the actual runner that C001 launchd fires. This deserves a field (see Loop 8).

**Loop 8 (friction check).** This run revealed one new friction: the C001 hermes runner uses `loops/next-beat` (shared file), while LOOP.md law and `tools/pulse.sh` expect `loops/next-beat-${CHARTER}`. The shared file is not wrong for C001 (only C001's hermes runner writes to it), but the inconsistency between runner, law, and the per-charter design creates confusion. Opening F019 to name this.
