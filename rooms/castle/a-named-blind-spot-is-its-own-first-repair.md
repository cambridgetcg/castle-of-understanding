---
status: tested
born: 2026-06-18
last-walked: 2026-06-19
link: rooms/craft/a-bell-that-never-rang-at-its-keeper-is-not-yet-evidence.md
link: rooms/craft/0041-the-log-records-the-check-reports.md
evidence: 2026-06-18 | local | L009 — F006 named four blind spots in the check; three were closed by later hands before this loop ran; the fourth (charter cross-references) closed here
evidence: 2026-06-19 | local | L069 — 59 beats (L009→L068) audited; L026 open-field counter bug and L058 storefront orphan links each named before being fixed; no blind spot accumulated in silence; ten-beat test passed, pattern confirmed
---
# A named blind spot is its own first repair

**Claim.** Writing a blind spot into a field is the fastest repair: the field becomes a specification, and the next hand who reads it implements the fix. Three of F006's four named gaps were closed in the code before any loop explicitly addressed them.

**How it ripened.** F006 opened 2026-06-10: the check could not validate `links:` frontmatter ids, did not warn on undeclared top-level directories, and did not flag fields with unfilled template stubs. By 2026-06-18 all three were in the code. L009 confirmed the fourth gap — [[C001]]-style charter references slipping through the cross-reference regex — and closed it by extending the pattern and scanning `loops/charters/`.

**What it changed.** 2026-06-18: castle check now validates [[C###]] charter cross-references. F006 harvested. The check earns its green light across four dimensions it previously could not see. 2026-06-19: ten-beat observation confirmed; promoted to tested.

**Counter-weather.** Does naming always close? No — F006 was open eight days and took multiple hands. The open crack: a gap no one thinks to name rings no bell and earns no field.

**Next test.** Cornerstone: three evidence entries including one from `| weather |` and a survived walk after day 90 (re-read after 2026-09-17).
