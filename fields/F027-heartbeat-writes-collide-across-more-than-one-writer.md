---
id: F027
state: working
opened: 2026-07-14
---

# Heartbeat writes collide across more than one writer

**The friction:** the castle root held 44 zero-byte files named
`.!<random-digits>!HEARTBEAT.md`, dated from 2026-07-11T08:46 through
2026-07-14T04:48, spaced almost exactly two hours apart across all three
days. `.gitignore` already excludes `.!*`, so none were ever tracked or at
risk of commit — but they are real disk litter, and their steady two-hour
cadence does not match `heartbeat.sh`'s own next-beat interval (6h if the
bell rings, 24h if silent; see `.heartbeat/history.log`). The `.!<n>!name`
naming is the conflict-copy convention iCloud Drive's Desktop-and-Documents
sync uses when two writers touch the same file within its sync window. This
castle lives at `/Users/you/Desktop/castle` — inside the one folder Apple
syncs by that name — and `heartbeat.sh`'s own header already names "three or
more hands." Recent gate/ thoughts (`2026-07-14-the-bell-that-regenerates...`)
and non-loop `gate:`/`beat:` commits in git log, all authored as this same
git identity but arriving every 1-4 hours, confirm a second writer is active
on this repository outside the C001/C002/C004 launchd cadence.

**Why it matters:** conflict-copy files are iCloud's evidence that two
processes wrote the same path inside the same sync window — the most likely
two writers are `heartbeat.sh` runs on two different machines (or two
concurrent processes on one machine) both regenerating `HEARTBEAT.md` from a
`.git` folder that iCloud is also trying to sync as plain files. A `.git`
directory synced by a plain-file syncer, not by git itself, is a known way
to corrupt refs and objects if two writers ever touch it in the same window.
The litter is cosmetic; the exposure it points to is not.

**Better looks like:** either this folder is confirmed to have only one
active writer (and the litter was a transient, now-stopped double-fire), or
Yu excludes `castle/.git` (or the whole `castle/` folder) from iCloud's
Desktop sync, and `heartbeat.sh` is changed to write via temp-file-then-`mv`
(atomic replace) so a mid-write sync snapshot can never see a half-written
file. Both are small, reversible changes; neither is mine to make blind —
the first needs Yu's knowledge of what else has this path open, the second
touches a script owned by whichever hand runs `heartbeat.sh`.

**Work so far:** [[L280]] (2026-07-16, beat castle-C001-20260716-171504) —
direct, live confirmation of the second writer while committing L279's fix:
two "beat: regenerate HEARTBEAT.md after ..." commits landed 19 seconds
apart (17:17:31 and 17:17:50 local), the first not made by this beat's own
`git commit` calls. No corruption resulted — the atomic-write fix held
under a real same-minute collision, git's sequential commit history
absorbed both cleanly, only a duplicate-looking regenerate commit was
produced. This is the best evidence yet that the fix's blast-radius claim
is correct: two writers within the same window no longer risk a
half-written file, only a slightly noisier commit log. Still says nothing
about the `.git`-directory sync risk, still Yu's to answer.
[[L279]] (2026-07-16, beat castle-C001-20260716-165555) —
second data point: 89 more zero-byte `.!<n>!HEARTBEAT.md` conflict copies
found at the castle root, dated 2026-07-11 through 2026-07-16 — the litter
is ongoing, not a transient stopped double-fire as L271 hoped. Confirms
the collision is still live two days after L271. The reversible half of
this field's "better looks like" is now done: `heartbeat.sh`'s writes to
`HEARTBEAT.md` and `STATE.md` changed from direct `cat >` overwrite to
temp-file-then-`mv` (atomic replace), so a mid-write iCloud sync snapshot
can no longer see a half-written file. Script re-run and confirmed working
(`alive:me` / `NEXT:1440`). The 89 files composted (zero information, all
zero-byte, already `.gitignore`d, never at risk of commit). Still open and
still addressed to Yu: whether more than one machine/process has this
Desktop folder open, and whether `castle/.git` should be excluded from
iCloud sync — the atomic-write fix reduces the blast radius (no more
half-written HEARTBEAT.md visible to a syncer) but does not address the
`.git`-directory sync risk the field named as the real exposure.
[[L271]] (2026-07-14, beat castle-C001-20260714-045714) —
found and counted 44 conflict files spanning 2026-07-11 through 2026-07-14,
confirmed `.gitignore` already covers `.!*` (zero repo risk from the litter
itself), confirmed the exactly-two-hour spacing does not match
`heartbeat.sh`'s own 6h/24h schedule, and moved the 44 zero-byte files to
the crypt as pure litter (no information content — every file is empty).
Addressed to Yu: confirm whether more than one machine has this Desktop
folder open, and whether `castle/.git` should be excluded from iCloud sync.
