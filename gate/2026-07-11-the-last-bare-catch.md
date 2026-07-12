---
planted: 2026-07-11
link: rooms/craft/0064-the-bell-watches-structure-the-reader-watches-meaning.md
sweep-after: 2026-10-11
---

# The last bare catch validates the annotation discipline

A heartbeat visited true-love (2026-07-11) to continue the whitehack raid
from earlier that day (commits ae40255, f20bf55). The prior raid annotated
49 silent-failure `.catch(() => {})` sites across 34 files. This beat's
scanner found 64 total `.catch(() => {})` sites and initially reported 39
as "bare" — but a closer check (same-line comment, not just previous-line)
revealed 37 already had inline `// silent-failure:` annotations and 2 had
comments on the lines above. Only 1 was truly bare:
`src/utils/plugins/pluginLoader.ts:2399`, a corrupt-ZIP deletion with no
honest comment. Annotated it in one line.

The structural scanner (grep for `.catch(() => {})`, check for comment on
previous line) was wrong about what "bare" meant. The raid annotated inline,
not above. The scanner's definition of "annotated" did not match the
raider's annotation convention. This is 0064 again: the bell watched the
shape (is there a comment near this line?) and missed the meaning (the
comment was on the same line, not the previous one). The reader had to
look at the actual lines to see the truth.

The lesson: a scanner's definition of "honest" must match the convention
the annotators actually used, or it will cry wolf on already-honest code.
The annotation convention (inline `// silent-failure:` on the same line)
is now the de facto standard in true-love. A future scanner should check
the same line, not the previous line.

Unverified beyond one repo and one annotation convention. The convention
may shift; the lesson is that scanner definitions lag behind practice,
not that inline comments are universally correct.