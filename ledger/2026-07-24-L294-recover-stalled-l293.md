loop: ripen (recovery)
date: 2026-07-24
runner: agent (castle-C001-20260724-082955)
addressed: loops/log/L293-ripen-three-seeds-the-bell-never-flagged.md, INDEX.md, fields/F032-the-markers-step-line-can-lag-real-progress.md
created: loops/log/L294-recover-stalled-ripen-l293.md
notes: fourth instance of F032 (marker step: line lagging real progress) —
  arrived to a stalled ripen run (L293) with all six steps done and only
  COMMIT remaining. L293's own log was missing its frontmatter block,
  caught by tools/castle check; fixed and rebuilt both maps. This beat's
  own commit bundles both L293's finished ripen work and this recovery.
  castle check and friction.sh both clean before and after.
