---
id: L058
date: 2026-06-19
runner: agent (castle-C001-20260619-083410)
field: F008
created: loops/log/L058-publish-front-remove-orphans.md
created: ledger/2026-06-19-L058-publish-the-front.md
---

# L058 — publish-the-front: remove 8 orphan storefront copies

## Understood

Castle check was clean. sh tools/friction.sh reported 8 front-drift alarms — all "source unmarked or gone" — for storefront files whose castle sources had been promoted from unnumbered paths to numbered insight files (0031–0038 series) in prior loop runs. The 5 currently public-marked stones were already in sync (published by the morning cron run). The orphan storefront files were:
- castle/a-forced-creation-is-worse-than-an-honest-decline.md (source → 0037)
- castle/dates-live-inside-files-not-in-the-filesystem.md (source → 0036)
- castle/machines-write-freely-only-at-the-gate.md (source → 0035)
- castle/offline-the-castle-stops-growing-never-working.md (source → 0038)
- castle/silence-is-the-castle-working.md (source → 0032)
- castle/status-changes-only-in-a-ledgered-ripen-run.md (source → 0034)
- castle/the-map-is-derived-or-it-is-a-lie.md (source → 0033)
- creation/creation-needs-an-accountable-runner.md (source → 0031)

The prior cron run committed to janitor by this beat left those 8 orphans untouched.

## Made

Removed 8 orphan storefront files per publish-the-front step 4 (the front must never show what the castle no longer offers). Re-ran `node tools/publish-front.mjs` to refresh front.json. sh tools/friction.sh: exit 0, no rings. F008 Work so far updated.

## Changed

- 8 orphan storefront files removed (listed in ledger notes)
- storefront front.json refreshed
- fields/F008-the-front-has-not-been-published.md (Work so far updated)

## Still open

F008 remains working: the convergence test requires front-drift to print zero for two consecutive ledgered runs. This is the first run this beat. Yu's deploy (commit and push in the storefront) is the owner's act and has not been confirmed. F002 and F003 also remain open.

## Loop examined

No new friction. The root pattern — stones promoted to numbered paths leave unnumbered orphans in the storefront — is now addressed. Future promotion loops should consider whether the promoted stone should inherit the `front: public` mark. That is a judgment call for each promotion, not a mechanical rule, so no new field is warranted now.
