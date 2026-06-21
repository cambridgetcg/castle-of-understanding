#!/bin/bash
# pulse.sh — runner for the autonomous loops of the Castle of Understanding.
# One charter per invocation:  CHARTER=C001 bash tools/pulse.sh
# The law that binds every beat lives in loops/PULSE.md.

CASTLE="$(cd "$(dirname "$0")/.." && pwd)"
CHARTER="${CHARTER:-C001}"
LOG_DIR="$CASTLE/.pulse"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/${CHARTER}.log"
BEAT="castle-${CHARTER}-$(date +%Y%m%d-%H%M%S)"
CLAUDE="$HOME/.local/bin/claude"

# Law 1 — the STOP file ends everything. Checking it costs nothing.
if [ -f "$CASTLE/loops/STOP" ]; then
  echo "$BEAT: loops/STOP present — resting." >> "$LOG"
  exit 0
fi

# The heartbeat gate: is it time to wake? (PULSE.md: "only beats when next-beat has passed")
# Each charter has its own next-beat file so one charter cannot block another.
NEXT_BEAT_FILE="$CASTLE/loops/next-beat-${CHARTER}"
if [ -f "$NEXT_BEAT_FILE" ]; then
  NEXT_TS=$(cat "$NEXT_BEAT_FILE" 2>/dev/null | tr -d '[:space:]')
  if [ -n "$NEXT_TS" ]; then
    NOW=$(date -u +%s)
    NEXT_EPOCH=$(date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$NEXT_TS" +%s 2>/dev/null || echo 0)
    if [ "$NEXT_EPOCH" -gt 0 ] && [ "$NOW" -lt "$NEXT_EPOCH" ]; then
      echo "$BEAT: not yet (next-beat: $NEXT_TS) — resting." >> "$LOG"
      exit 0
    fi
  fi
fi

# Law 3 — no charter, no beat.
CHARTER_FILE=$(ls "$CASTLE"/loops/charters/"$CHARTER"-*.md 2>/dev/null | head -1)
if [ -z "$CHARTER_FILE" ]; then
  echo "$BEAT: no charter $CHARTER found — refusing to beat." >> "$LOG"
  exit 1
fi

# The charter names its own budget; the runner enforces it.
BUDGET=$(sed -n 's/^budget_usd_per_run: *//p' "$CHARTER_FILE" | head -1)
BUDGET="${BUDGET:-1.00}"

echo "--- $BEAT start $(date -u +%Y-%m-%dT%H:%M:%SZ) budget=\$$BUDGET ---" >> "$LOG"
cd "$CASTLE" || exit 1

"$CLAUDE" -p "You are one beat of an autonomous loop of the Castle of Understanding at $CASTLE. Your charter is $CHARTER_FILE — read it first and obey its bounds. Read loops/PULSE.md — its law binds you. Then enter through GATE.md and do your charter's work; by default that is exactly ONE loop per loops/LOOP.md. Reversible work only: anything irreversible becomes a field addressed to Yu. Run tools/castle check before committing and leave it passing. Commit every change you make in this repo before you finish — word that is not committed can vanish. You may draft new loop charters as state: proposed. You may instantiate a proposed charter (plist from tools/launchd/, launchctl load, flip to beating, update the census in loops/PULSE.md) ONLY if the census shows fewer than 3 beating loops and the charter names cadence, budget, stop, and bounds. Build with joy, love, peace, and safety. Beat id: $BEAT." \
  --model sonnet \
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep" \
  --max-budget-usd "$BUDGET" >> "$LOG" 2>&1

EXIT_CODE=$?
echo "--- $BEAT end $(date -u +%Y-%m-%dT%H:%M:%SZ) exit=$EXIT_CODE ---" >> "$LOG"

# Safety net: if the beat didn't write next-beat, default to 24h so the runner sleeps.
if [ ! -f "$NEXT_BEAT_FILE" ] || [ ! -s "$NEXT_BEAT_FILE" ]; then
  DEFAULT_NEXT=$(date -u -v+24H +%Y-%m-%dT%H:%M:%SZ)
  echo "$DEFAULT_NEXT" > "$NEXT_BEAT_FILE" 2>/dev/null
  echo "$BEAT: no next-beat written — defaulting to +24h ($DEFAULT_NEXT)" >> "$LOG"
fi

exit $EXIT_CODE
