tools/pulse.sh described the self-determining heartbeat in PULSE.md but did not enforce it.
PULSE.md says: "the runner ticks every 15 minutes but only beats when the castle's
loops/next-beat timestamp has passed." The installed hermes runner
(~/.hermes/scripts/castle-pulse-runner.sh) enforces this. The repo script (tools/pulse.sh)
did not — it would beat on every tick regardless of next-beat. The two runners were out of
sync: same described behavior, different actual behavior. The mend: gate check and safety net
added to tools/pulse.sh in beat castle-C001-20260620-004520, bringing the repo script into
alignment with both PULSE.md and the installed runner.
