---
id: 0047
room: castle
date: 2026-06-18
source: rooms/castle/a-named-blind-spot-is-its-own-first-repair.md — laid L009 (2026-06-18), tested L069 (beat castle-C001-20260619-122239), promoted L071 (beat castle-C001-20260619-130347)
confidence: tested
links: a-bell-that-never-rang-at-its-keeper-is-not-yet-evidence
links: 0041
link: rooms/craft/0041-the-log-records-the-check-reports.md
last-walked: 2026-06-19
---

# A named blind spot is its own first repair

Writing a blind spot into a field is the fastest repair: the field becomes a specification, and the next hand who reads it implements the fix. Three of F006's four named gaps were closed in the code before any loop explicitly addressed them.

**Evidence.** F006 opened 2026-06-10: the check could not validate `links:` frontmatter ids, did not warn on undeclared top-level directories, and did not flag fields with unfilled template stubs. By 2026-06-18 all three were in the code. L009 confirmed the fourth gap — [[C001]]-style charter references slipping through the cross-reference regex — and closed it by extending the pattern and scanning `loops/charters/`. Second evidence (L069, 59-beat audit L009→L068): L026 open-field counter bug and L058 storefront orphan links each named before being fixed; no blind spot accumulated in silence; ten-beat test passed, pattern confirmed.

**Counter-weather.** Does naming always close? No — F006 was open eight days and took multiple hands. The open crack: a gap no one thinks to name rings no bell and earns no field.

**Next test.** Cornerstone (day 90, earliest 2026-09-17): third evidence, one from `| weather |` (external source with url + retrieved date + verbatim quote), survived re-read. First checkpoint 2026-07-18 (30 days): does a new blind spot surface in the check, get named in a field or ledger, and get repaired — without the naming-first pattern being violated?
