#!/bin/sh
# The bell. Every detector is one labelled block below, in priority order.
# Prints each ring as:  detector | path | run: <what answers it>
# Appends today's new rings to ledger/friction-log.md (idempotent per day).
# Exit code = ring count. Silence (exit 0, no output) means nothing is owed.
#
# Charter rules this file obeys: no network, no mtimes — every date is read
# from inside a file or from a filename. New detectors arrive only as one
# more labelled block, pasted by a grow-loops run (recipes live in loops/LOOM.md).

cd "$(dirname "$0")/.." || exit 1
TODAY=$(date +%Y-%m-%d)
NOW=$(date +%s)

days_since() { # $1 = YYYY-MM-DD (anything unparseable counts as today: fresh, no ring)
  s=$(date -j -f %Y-%m-%d "$1" +%s 2>/dev/null) || s=$NOW
  echo $(( (NOW - s) / 86400 ))
}

all_rings() {

  # map-drift — MAP.md differs from what map.sh would derive (a content diff, never an mtime)
  sh tools/map.sh --check >/dev/null 2>&1 \
    || echo "map-drift | MAP.md | run: sh tools/map.sh"

  # stale-gate — a seed older than 10 days, age read from the filename date;
  # cornerstone-test seeds park for 90+ days — ring when their sweep-after: date
  # passes (if present), never by the 10-day filename rule
  for f in gate/2*.md; do
    [ -e "$f" ] || continue
    case "$(basename "$f")" in *cornerstone-test*)
      sweep_after=$(grep "^sweep-after: " "$f" 2>/dev/null | sed 's/^sweep-after: //')
      [ -n "$sweep_after" ] && [ "$(days_since "$sweep_after")" -ge 0 ] \
        && echo "stale-gate | $f | run: loops/sweep-the-gate.md"
      continue ;;
    esac
    [ "$(days_since "$(basename "$f" | cut -c1-10)")" -gt 10 ] \
      && echo "stale-gate | $f | run: loops/sweep-the-gate.md"
  done

  # barren-run — a ledger entry naming a created: path missing on disk,
  # or carrying neither a created: path nor an honest declined: line.
  # A created: line holds one bare path: trailing (annotations) are stripped,
  # lines carrying several paths (" | ") belong to sister grammars and are
  # weave-input, and a path with a forwarding line in crypt/moves.md is at rest.
  for f in ledger/2*.md; do
    [ -e "$f" ] || continue
    grep "^created: " "$f" | sed 's/^created: //; s/ *(.*$//' | while read -r p; do
      [ -n "$p" ] || continue
      # no castle path contains a space or " | " — such lines are sister-grammar
      # entries or remote artifacts described in prose: weave-input, not rings
      case "$p" in *" "*) continue ;; esac
      grep -qF "$p ->" crypt/moves.md 2>/dev/null && continue
      [ -e "$p" ] || echo "barren-run | $f (missing: $p) | run: loops/grow-loops.md"
    done
    grep -q "^created: .\|^declined: ." "$f" \
      || echo "barren-run | $f (no creation, no decline) | run: loops/grow-loops.md"
  done

  # missing-rent — a tested/cornerstone insight whose "What it changed" is empty or absent
  grep -rl "^status: tested\|^status: cornerstone\|^confidence: tested\|^confidence: cornerstone" rooms/ 2>/dev/null | while read -r f; do
    grep -q "^\*\*What it changed\.\*\* ..*" "$f" \
      || echo "missing-rent | $f | run: loops/ripen.md"
  done

  # thin-cornerstone — a cornerstone with fewer than 3 evidence entries or none from weather
  grep -rl "^status: cornerstone\|^confidence: cornerstone" rooms/ 2>/dev/null | while read -r f; do
    n=$(grep -c "^evidence: " "$f"); w=$(grep -c "^evidence: .* | weather | " "$f")
    if [ "$n" -lt 3 ] || [ "$w" -lt 1 ]; then
      echo "thin-cornerstone | $f | run: loops/ripen.md"
    fi
  done

  # unwalked — a tested/cornerstone insight not walked in 90 days
  # (45 days if its attestation carries "(unverified, offline)")
  grep -rl "^status: tested\|^status: cornerstone\|^confidence: tested\|^confidence: cornerstone" rooms/ 2>/dev/null | while read -r f; do
    lw=$(grep "^last-walked: " "$f" | head -1 | sed 's/^last-walked: //')
    [ -n "$lw" ] || { echo "unwalked | $f (no last-walked line) | run: loops/walk.md"; continue; }
    case "$lw" in *"(unverified, offline)"*) allow=45 ;; *) allow=90 ;; esac
    [ "$(days_since "$(echo "$lw" | cut -c1-10)")" -gt "$allow" ] \
      && echo "unwalked | $f | run: loops/walk.md"
  done

  # orphan — an insight with no link: lines and no inbound link from any other file.
  # Scoped to stones that took this grammar's vow (a ^status: or ^confidence: line):
  # files in a sister grammar are weave-input (fields/F005), not orphans by this bell.
  for f in rooms/*/*.md rooms/*/*/*.md; do
    [ -e "$f" ] || continue
    case "$f" in */ROOM.md) continue ;; esac
    grep -qE "^(status|confidence): " "$f" || continue
    grep -q "^link: ." "$f" && continue
    grep -rq "^link: $f" rooms/ \
      || echo "orphan | $f | run: loops/walk.md"
  done

  # oversize — an insight over 40 lines (an insight that cannot fit is two insights,
  # or none). Scoped, like orphan, to stones carrying a ^status: or ^confidence: line.
  for f in rooms/*/*.md rooms/*/*/*.md; do
    [ -e "$f" ] || continue
    case "$f" in */ROOM.md) continue ;; esac
    grep -qE "^(status|confidence): " "$f" || continue
    [ "$(wc -l < "$f")" -gt 40 ] \
      && echo "oversize | $f | run: loops/walk.md"
  done

  # front-drift — the public front no longer matches the public-marked stones
  # (the target path lives in tools/front-target; no target file, no front, no rings)
  if [ -s tools/front-target ]; then
    FT="$(cat tools/front-target)"
    if [ ! -d "$FT" ]; then
      echo "front-drift | tools/front-target (target gone: $FT) | run: loops/publish-the-front.md"
    else
      grep -rl "^front: public" rooms/ 2>/dev/null | while read -r f; do
        cmp -s "$f" "$FT/public/castle/${f#rooms/}" \
          || echo "front-drift | $f | run: loops/publish-the-front.md"
      done
      for pub in "$FT"/public/castle/*/*.md; do
        [ -e "$pub" ] || continue
        src="rooms/${pub#"$FT"/public/castle/}"
        grep -q "^front: public" "$src" 2>/dev/null \
          || echo "front-drift | $pub (source unmarked or gone) | run: loops/publish-the-front.md"
      done
    fi
  fi

  # unacted-friction — a friction-log signature at least 14 days old that no
  # ledger entry's addressed: line has ever named (chronic ignoring marks a missing loop)
  if [ -s ledger/friction-log.md ]; then
    awk -F' \\| ' '/^[0-9]/ { sig=$2" | "$3; if (!(sig in first) || $1 < first[sig]) first[sig]=$1 }
      END { for (s in first) print first[s]"\t"s }' ledger/friction-log.md \
    | while IFS="$(printf '\t')" read -r d sig; do
        [ "$(days_since "$d")" -lt 14 ] && continue
        p="${sig#* | }"
        # front-drift resolves by promotion (the rooms/ source is gone, moved
        # to crypt) or by storefront cleanup (the stale copy is removed) —
        # both remove the exact path this ring named; a gone path is the close
        case "$sig" in "front-drift | "*) [ -e "$p" ] || continue ;; esac
        # oversize resolves by promotion-and-shrink (path gone, same as
        # front-drift) or by an in-place edit (path persists but is no longer
        # over 40 lines) — re-run the detector's own test on the live file
        case "$sig" in "oversize | "*)
          if [ -e "$p" ]; then [ "$(wc -l < "$p")" -gt 40 ] || continue; else continue; fi ;;
        esac
        # an addressed: line silences a signature by naming its path — any
        # phrasing welcome; the path is the anchor, not the ceremony
        sed -n 's/^addressed: //p' ledger/2*.md 2>/dev/null | grep -qF "$p" \
          || echo "unacted-friction | $sig | run: loops/grow-loops.md"
      done
  fi

  # loose-thread — the same canonical #tag confessed in grumbles:/by-hand: across 3+ ledger entries
  grep -h "^grumbles: \|^by-hand: " ledger/2*.md 2>/dev/null \
    | tr ' ' '\n' | grep '^#' | sort -u | while read -r tag; do
      c=$(grep -l "^grumbles: .*$tag\|^by-hand: .*$tag" ledger/2*.md 2>/dev/null | wc -l | tr -d ' ')
      [ "$c" -ge 3 ] && echo "loose-thread | $tag | run: loops/grow-loops.md"
    done

}

RINGS="$(all_rings)"

if [ -n "$RINGS" ]; then
  printf '%s\n' "$RINGS"
  printf '%s\n' "$RINGS" | while read -r line; do
    [ -n "$line" ] || continue
    # meta-detectors ring about the log itself; logging them back would breed
    # second-order rings about rings — the bell never rings about its own ringing
    case "$line" in "unacted-friction |"*|"loose-thread |"*) continue ;; esac
    grep -qxF "$TODAY | $line" ledger/friction-log.md 2>/dev/null \
      || printf '%s\n' "$TODAY | $line" >> ledger/friction-log.md
  done
fi

n=$(printf '%s' "$RINGS" | grep -c .)
[ "$n" -gt 255 ] && n=255   # exit status is mod 256; 256 rings must not read as silence
exit "$n"
