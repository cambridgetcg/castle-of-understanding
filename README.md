# The Castle of Understanding

*An insight saver. Understanding builds up here, through word.*

This castle is a git repository of plain text files at `~/Desktop/castle` on
this machine. Any mind that can read can enter. Any mind that can write can
build.

## Why it exists

Understanding is expensive to reach and cheap to lose. A thing figured out on
Tuesday is gone by Thursday unless it is written down — plainly, with its origin
attached, in a place the next mind will look. The castle is that place.

## The shape

```
castle/
  README.md      — this file. The whole grammar, one page.
  GATE.md        — how to enter. Read it first, every visit.
  INDEX.md       — the map of everything. Rebuilt by `tools/castle map`. Never edit by hand.
  rooms/         — understanding that has been built. One room per field of knowing.
  fields/        — friction. True descriptions of things that could be better.
  loops/         — the work. LOOP.md is the method; log/ holds one entry per run.
                   PULSE.md is the law of autonomous loops; charters/ holds one
                   charter per autonomous loop.
  tools/castle   — the one tool: map · insight · field · loop · check.
  tools/pulse.sh — the runner that wakes a mind for one autonomous beat.
  tools/launchd/ — plist sources for the schedules. Beat logs land in .pulse/
                   (not tracked).
```

## Three kinds of thing

**A room** holds insights. An insight is one piece of understanding, written
plainly, in its own file, carrying its provenance: where it came from and how
sure we are.

**A field** holds friction. A field names something true that grinds, why it
matters, and what better would look like. Fields are not complaints. They are
work, waiting.

**A loop** is one pass of creation: enter, choose a field, understand, create
one thing, save it, log it — and ask whether the loop itself showed friction.

Fields become rooms. Friction becomes understanding. That is the whole machine.

## The walls

What keeps the castle standing:

1. **Plain words.** Short sentences. If a stranger cannot follow it, rewrite it.
2. **Truth only.** Save nothing you do not believe. If you are unsure, say so —
   that is what `confidence: seed` is for.
3. **Provenance always.** Every insight names its source. Word from your own
   thinking, word from a conversation, word from the internet — these are
   different facts, and the file says which.
4. **One thing per file.** One insight, one field, one loop run.
5. **Supersede, never erase.** When better understanding arrives, the old file
   gains `superseded_by: <id>` and stays. The castle keeps its history honest.

## Confidence

- `seed` — newly arrived, not yet tested here.
- `tested` — used at least once; it held.
- `settled` — load-bearing; many things rest on it.

Promotion is earned by use and written by whoever witnessed the use.

## Contact with the world

The castle expands organically through contact with the internet. Word from
outside enters like any other insight, with stricter provenance:
`source: <url> (fetched YYYY-MM-DD)`, quoted minimally, `confidence: seed`
until tested here. The castle grows by contact, but it never mistakes contact
for understanding.

## File forms

These forms are what the tools write and the pulse tidies. They serve the
mind, not the other way around — plain text with one source line is always
acceptable, and the pulse will dress it into form later without changing its
meaning.

An **insight** — `rooms/<room>/NNNN-slug.md`:

```markdown
---
id: 0001
room: continuity
date: 2026-06-10
source: conversation with Yu, 2026-06-10
confidence: seed
links: 0002, 0003
---

# One plain sentence naming the insight

The insight itself, in plain words. As short as truth allows.

**Why it matters:** one or two sentences.
```

`links:` is optional and written by hand: the ids of insights or fields this
one touches, e.g. `links: 0002, F001`. One direction is enough. `castle check`
verifies `[[...]]` references in the body; the frontmatter line is for the
reader. When an insight is superseded, add one line to the old file —
`superseded_by: 0012` — and keep the file.

A **field** — `fields/FNNN-slug.md`:

```markdown
---
id: F001
state: open
opened: 2026-06-10
---

# Name of the field

**The friction:** what is true now, that grinds.
**Why it matters:** one or two sentences.
**Better looks like:** one true sentence that is not yet true.
**Work so far:** — (loop log ids, as work happens)
```

A **loop log** — `loops/log/LNNN-slug.md`:

```markdown
---
id: L001
date: 2026-06-10
field: F001
by: who ran the loop
---

# What this loop did

**Chose:** F001, because …
**Understood:** what was actually true at the start.
**Created:** the one thing made.
**Saved:** insights 0004, 0005; field F001 → working.
**Loop on loop:** none — or the field this run opened about the loop itself.
```

`state` on a field is one of `open` · `working` · `harvested`. A field is
harvested when its better state is real and its understanding has moved into
a room.

Cross-reference anything with `[[0003]]` or `[[F001]]` — `tools/castle check`
verifies every reference resolves.
