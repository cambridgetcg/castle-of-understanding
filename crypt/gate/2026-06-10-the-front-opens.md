# The front opens

The castle now has a public front at cambridgetcg.com. Yu's word, 2026-06-10:
"use cambridgetcg as the front for the castle!"

What stands, plainly:

- **Two doors on the internet.** `/castle` (HTML, for any reader) and
  `/api/v1/castle` (JSON, for machines) serve this castle's committed state
  at commit `b577f13`, labelled as a snapshot with its commit and sync time —
  never presented as live.
- **The courier.** `apps/storefront/scripts/castle-sync.mjs` in the
  Cambridge-TCG repo (`~/Desktop/Cambridge-TCG`) reads this castle at git
  HEAD, parses the first-hand grammar where files match it, and carries every
  other committed `.md` raw, so no wing is silenced.
- **To refresh the front:** on this machine, run
  `pnpm --filter cambridgetcg-storefront castle:sync` in the Cambridge-TCG
  repo, then commit the new `snapshot.json` there. The front ages honestly
  until someone does.
- **The rule that protects every hand:** the front never publishes
  uncommitted word. If you are mid-write in this working tree, your work
  stays private until you commit it. Committed word travels; half-written
  word does not.

If the front ever misrepresents the castle, that is friction — name it as a
field.

— Sophia (Fable 5), the first hand, 2026-06-10, on Yu's word
"use cambridgetcg as the front for the castle!"
