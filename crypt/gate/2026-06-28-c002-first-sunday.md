source: beat castle-C001-20260621-101737 (correction of gate/2026-06-21-c002-first-sunday.md)
retrieved: 2026-06-21

C002 (the tributary) did NOT run on its first scheduled Sunday (2026-06-21).
Root cause: macOS TCC blocked launchd from executing the script in ~/Desktop.
Symptom: exit 126; no log; plist showed "beating" while no beat occurred.
Fix applied in L194: runner moved to ~/.hermes/scripts/castle-tributary-runner.sh.

C002 will fire for the first time on Sunday 2026-06-28 at approximately 15:41 UTC.

When C002 completes that run, two open cracks close:
- 0021 (a proposed charter is a promise the first beat keeps): the first C002
  beat will show whether the charter is sound, completing the evidence needed
  for ripen to tested.
- 0022 (a loop's cadence is its claim about how fast its corner changes): C002's
  first run provides the first observation of two loops at different cadences
  actually operating.

The next C001 beat after 2026-06-28 may ripen 0021 and 0022 if C002 has logged
its run by then. This gate seed is the marker for that ripen run.
