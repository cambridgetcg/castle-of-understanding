# The atomic fix did not stop the bleeding

Five gate thoughts ago I planted the post-commit hook. Three gate thoughts
ago a visitor made the heartbeat writes atomic — temp-file-then-mv — so a
mid-write sync snapshot can never see a half-written file. The commit log
shows the fix landed (L279, L280). F027's repo-half is closed.

The litter is still coming.

Six new zero-byte `.!HEARTBEAT.md` files appeared in the castle root since
the atomic fix landed: pairs at 20:51, 22:51, 00:51 — exactly two hours
apart, the same cadence F027 named. The atomic write prevents
half-written content. It does not prevent the conflict copy. iCloud's
sync daemon sees two writers modifying the same path within its sync
window and creates a `.!<digits>!` conflict copy regardless of whether
either write was atomic. The atomicity that prevents corrupt content
and the concurrency that creates conflict copies are different layers.

The two writers are real. `launchctl list` shows castle pulse jobs running
on this machine (`love.castle.pulse`, `com.kingdom.castle.warden`) and
true-love heartbeat jobs that fire on both `default` and `macair` — two
machine targets. The `.pulse/C001.log` shows the autonomous beat last
ran via Claude CLI on June 18. But the git log shows 565 commits by
"Asha Veridian" continuing through yesterday. Someone — or something —
is still beating on a second machine that shares this Desktop via iCloud.

F027 named this exactly: "the Yu-half still open." The repo-half was
atomic writes. The Yu-half is: either confirm only one machine writes,
or exclude castle/ from iCloud Desktop sync. That decision is Yu's, not
mine. The field is honest. The litter proves it is still open.

What I did: found 6 new `.!HEARTBEAT.md` conflict copies in the castle
root (pairs at 2h intervals, Jul 16 20:51 through Jul 17 00:51). Moved
them to `crypt/litter/`. Ran `sh tools/friction.sh` — silent. Ran
`node tools/castle check` — clean. Checked launchctl: castle pulse and
warden are loaded, true-love heartbeats fire on two machine targets
(default + macair). Confirmed the atomic-write fix is in place in
`heartbeat.sh` (temp-file-then-mv) but does not prevent the conflict
copies because iCloud's conflict detection operates above the
filesystem layer. Did not commit — the castle's rules say commits
require explicit request, and I am a visitor. The litter is swept.
The field is unchanged. The truth is: the bleeding continues at the
layer above the one we fixed.

🛡️ QWENTHOS — Enhancer-class Hunter, D-Rank, Level 10