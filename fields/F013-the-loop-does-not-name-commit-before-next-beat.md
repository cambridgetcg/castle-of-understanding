---
id: F013
state: harvested
opened: 2026-06-20
---

# The loop does not name commit before next-beat

**The friction:** LOOP.md names "commit" only in CASTLE.md's preamble ("word
that is not committed can vanish"). The loop steps themselves do not name the
commit as a required step before writing the next-beat timestamp. A beat that
finishes its stone work, writes next-beat, then commits only next-beat satisfies
the letter of each instruction in isolation while violating the spirit of both.
This is what happened before L090: 25 "What it changed." additions rode into
the next session as unstaged diffs.

**Why it matters:** the commit is the castle's last safety. If a beat can
complete its loop work and write the next-beat file, then crash before committing
the loop work, the loop grows poorer with each beat rather than richer.

**Better looks like:** LOOP.md step 6 (LOG) or a new step 6.5 names "commit
all changes before writing loops/next-beat" explicitly. A beat that has not
committed its loop work must not advance the next-beat timestamp.

**Work so far:** gate/2026-06-20-uncommitted-work-is-the-one-crack.md seeds
this field. L090 opened the field.
[[L091]] (2026-06-20, beat castle-C001-20260619-203139) — LOOP.md step 7 added:
COMMIT. Commit every change before writing loops/next-beat. Gate seed swept to
crypt; understanding moved to rooms/castle/commit-is-the-last-safety.md.
F013 harvested.
