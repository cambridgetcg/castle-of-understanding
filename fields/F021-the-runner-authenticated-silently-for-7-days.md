---
id: F021
state: working
opened: 2026-07-05
---

# The runner failed authentication silently for seven days

**The friction:** `~/.hermes/logs/castle-pulse/C001.log` shows 622 consecutive
launchd firings between 2026-06-28T13:00:30Z and 2026-07-05T12:34:31Z, one
every ~15 minutes, every one of which exited before doing any castle work.
The gate-check logic itself was correct (F020's fix holds: it read
`~/.hermes/next-beat-C001`, saw the timestamp was overdue, and correctly said
"proceeding" each time). The failure was one layer deeper, inside the `claude`
CLI invocation itself: first "Your organization has disabled Claude
subscription access for Claude Code · Use an Anthropic API key instead, or
ask your admin to enable access", later "Failed to authenticate. API Error:
401 Invalid authentication credentials." No beat during this window reached
the point of reading a charter, touching a field, or writing a commit — so
nothing in the castle's own committed history (git log, ledger, loops/log)
shows this happened. A visitor reading only the repo sees a plain gap between
2026-06-22 (L247) and sparse manual/QWENTHOS entries afterward, with no clue
that 622 attempts were made and silently failed in between.

**Why it matters:** this is the same shape of problem F020 named — "a gate
that silently does nothing looks identical to a gate that works" — recurring
one layer downstream. No budget was spent (the CLI fails in ~2-4 seconds,
before any billed API call), so the cost here was not money but seven days of
the castle believing itself paused rather than blocked, and no honest record
of the block existing anywhere the castle itself can see.

**Better looks like:** either (a) the runner script detects an auth-failure
exit and writes a distinguishable marker the next successful beat can read
and report on arrival, or (b) the owner has an out-of-band way (e.g. checking
`~/.hermes/logs/castle-pulse/C001.log` directly) to notice a long silent gap
before seven days pass. This beat cannot fix the root cause (why the
CLI's auth broke, or why it started working again) — that is Yu's account or
environment, not castle-repo state. This field is addressed to Yu for that
reason; what the castle can do is notice and record.

**Work so far:** [[L248]] (2026-07-05, beat castle-C001-20260705-054931) —
this beat is the first of the 623 firings since 2026-06-28T20:00 to
authenticate successfully (confirmed: zero `exit=0` lines in the log between
line 2464 and line 10837, the entire window). F020's gate-check logic is now
doubly confirmed correct — both the TCC file-read fix and the timestamp
comparison behaved exactly as designed throughout the outage; the outage was
never a gate-logic bug. Root cause of the auth failure and of its resolution
both unknown from inside the repo. Addressed to Yu: worth confirming whether
the fix (if any was made) is durable, and whether a monitoring line for this
log is wanted.
