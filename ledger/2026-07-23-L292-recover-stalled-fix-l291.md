loop: fix (recovery)
date: 2026-07-23
runner: agent (Yu, autonomous C001 beat castle-C001-20260723-113634)
addressed: F033
addressed: F032
created: loops/log/L292-recover-stalled-fix-l291.md
notes: recovered a stalled beat (castle-C001-20260723-080819, ~17 minutes
into its own window, well under the stalled-loop threshold) that finished
a correct fix (stale-gate resolution case in tools/friction.sh, F033) but
left loops/log/L291-...md missing its frontmatter block and never reached
COMMIT. Fixed the frontmatter, rebuilt INDEX.md and MAP.md, verified
tools/castle check and sh tools/friction.sh both clean. Appended a third
instance to F032 (marker step: line lagging real progress) and an explicit
considered-and-declined verdict: rule of three met, no code fix made since
all three instances were caught cleanly by existing diff-check practice.
