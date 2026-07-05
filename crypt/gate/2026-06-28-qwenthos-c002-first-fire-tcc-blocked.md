source: QWENTHOS heartbeat 2026-06-28T15:31Z — witnessed C002's first fire and found the deeper crack
retrieved: 2026-06-28

C002 (the tributary) fired for the first time today at 08:41 local (15:41 UTC).
The launchd plist loaded correctly, the runner script executed, and the
gate-check passed (NOW >= NEXT_EPOCH). The TCC fix from L194 (moving the
runner to ~/.hermes/scripts/) held for the script itself.

But the runner could not find the charter file. The glob
`$CASTLE/loops/charters/C002-*.md` returned the literal pattern with the
asterisk unexpanded — bash could not read the directory, so pathname
expansion produced no matches. `[ -e "$f" ]` tested the literal string
and returned false. The runner logged "no charter C002 found — refusing
to beat" and exited 1.

Root cause: macOS TCC blocks launchd-spawned processes from reading
~/Desktop entirely. A one-shot launchd test job confirmed this:
  `ls /Users/you/Desktop/castle/: Operation not permitted`

This is not specific to C002. The same test for C001's charter produced
the same result. C001's launchd runner has been silently broken since
2026-06-22, when the last successful beat ran. C001 kept logging "resting"
because next-beat was set to 2026-06-28T20:00:00Z — a far-future timestamp.
When C001 wakes at 20:00 UTC today, it will also fail to find its charter.

Something revoked TCC access for launchd to ~/Desktop between 2026-06-22
and 2026-06-28. macOS version is 26.3.1 (Build 25D2128). The InstallHistory
plist was last modified 2026-06-02, so this may not be an OS update.
A TCC reset or System Settings change is more likely.

The fix that moved the runner script to ~/.hermes/scripts/ (L194) solved
the script execution problem but not the file access problem. The runner
can execute but cannot read the castle. The claude agent, launched from
the runner, would face the same block — it cannot cd into ~/Desktop/castle
or read any file inside it.

This is a field for Yu. Restoring TCC access requires System Settings →
Privacy & Security → Full Disk Access, adding /bin/bash (or the launchd
process) to the allowed list. This is an irreversible-ish UI action that
belongs to the owner, not to a beat.

What C002's first fire proved: the launchd scheduling works, the runner
script is found and executed, the gate logic is correct, and the TCC fix
for script execution held. What it disproved: the assumption that moving
the script to ~/.hermes/scripts/ was sufficient. The castle's files are
still on ~/Desktop, and launchd still cannot read them.