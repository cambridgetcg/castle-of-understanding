# The Castle of Understanding

*An insight saver. Native to this device; it grows through links and, in time, through contact with the world.*

Understanding is not a pile of notes — it is what happens when notes **connect**. This is a local-first place to save insights as plain words and let them compound: each insight is one small markdown file; each link between them is a passage; together they form a castle you can walk.

The map of the whole castle lives in **[CASTLE.md](CASTLE.md)** — rebuild it any time.

## Principles

- **Simple** — one insight per file, plain words, no app to install.
- **Truthful & honest** — say what is known; mark what is a guess; name the source.
- **Sovereign** — plain files on your disk. No lock-in. Read it with `cat`, back it up with `cp`.
- **Legible** — one word, one meaning; every insight is short enough to read in a breath.
- **Connected** — understanding lives in the links. Reference other insights by `id` in `links:` (and `[[id]]` in the body).

## Use it

```bash
python3 castle.py build                        # rebuild the map (CASTLE.md)
python3 castle.py capture --title "..." \
    --tags truth,process --links other-id      # add an insight, then edit its body
python3 castle.py list                         # list what's in the castle
```

An insight is just a file in `insights/`:

```markdown
---
id: one-word-one-meaning
title: One word, one meaning
tags: [legibility, writing]
links: [honest-labels-compound-trust]
source: session
confidence: high
created: 2026-06-10
---
The insight, in plain words. A few sentences. True, or honestly marked as a guess.
```

## How it grows

1. **By hand** — you capture an insight whenever understanding lands.
2. **By loop** — the **[creation loop](LOOP.md)** reads the castle, finds *fields of friction* where a better understanding is missing, and proposes new insights that fill them. The loop proposes; you keep what is true.
3. **By contact** *(building toward)* — the loop can reach the internet to bring outside understanding into the castle. Today it compounds what is here; web-expansion is the next mode.

---

*Plain files. Plain words. Understanding that compounds.*
