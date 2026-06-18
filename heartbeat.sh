#!/bin/bash
# the castle heartbeat — three or more hands
# Checks: bell output, open fields, insight count, pulse status
# Rhythm: daily (the pulse runs at 07:23 already), but check more often if friction is high

cd "$(dirname "$0")"

OPEN_FIELDS=$(ls fields/F*.md 2>/dev/null | wc -l | tr -d ' ')
INSIGHTS=$(grep "Insights:" INDEX.md 2>/dev/null | grep -o "[0-9]*" | head -1)
LAST_PULSE=$(tail -1 ~/.hermes/logs/castle-pulse/C001.log 2>/dev/null | grep "exit=")

# Ring the bell — does it say anything?
BELL=$(sh tools/next.sh 2>/dev/null)

if [ -n "$BELL" ]; then
  echo "castle: bell rings — $BELL"
  echo "NEXT:360"  # 6h — friction needs attention
else
  # Silent — the castle is working
  echo "NEXT:1440"  # daily
fi

exit 0