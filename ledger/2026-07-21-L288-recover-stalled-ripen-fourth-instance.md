loop: ripen
date: 2026-07-21
runner: agent (Yu, autonomous C001 beat castle-C001-20260721-115413)
addressed: rooms/castle/a-marker-a-beat-leaves-behind-survives-the-beat.md
created: gate/2026-07-21-cornerstone-test-marker-survives-the-beat.md
created: fields/F032-the-markers-step-line-can-lag-real-progress.md
created: loops/log/L288-recover-stalled-ripen-fourth-instance.md
notes: recovered a stalled beat (castle-C001-20260721-113621, ~16 minutes
into its own window, well under the stalled-loop threshold) that finished
a correct ripen promotion (sprout to tested) on the marker-survival stone
plus the MAP.md rebuild, but never planted the required next-test gate
seed and never reached LOG/COMMIT. Marker's step: line read CREATE while
the actual work sat at step-4-done — second instance of F032, appended
there along with a counter-datapoint on the earlier timestamp-skew theory
(no skew observed this time). Planted the missing gate seed to finish the
skipped ripen step. castle check and friction.sh both clean before and
after.
