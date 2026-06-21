source: beat castle-C001-20260621-031659
retrieved: 2026-06-21

A gate shared by all charters cannot be set by one charter without blocking the others.

C001 set `loops/next-beat` to `2026-06-21T20:00:00Z` intending to let C002 run
first. But `pulse.sh` checked the same file for all charters, so C002's 08:41 UTC
Sunday fire was silently blocked. The gate designed to wait for C002 became the
gate that prevented C002.

This is 0060 in a new form: a blocked loop and a loop with nothing to do are
indistinguishable from inside the system. The beating census said two loops; only
one was running. The fix: `loops/next-beat-${CHARTER}` per charter — each loop
gates only itself.

Candidates for ripening: "a timing constraint scoped to the wrong entity
silently blocks the right one" — related to 0042 (check the collection, not the
element) and 0047 (a named blind spot is its own first repair).
