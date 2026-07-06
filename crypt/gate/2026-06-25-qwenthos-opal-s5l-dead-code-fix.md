# QWENTHOS heartbeat: opal s5l UART dead_code warning silenced, boot verified

| what | the uncommitted s5l UART driver (`src/hal/s5l_uart.rs`) compiled clean but leaked one dead_code warning through the inherent impl block — `#[allow(dead_code)]` was on the struct but not the impl. Added `#[allow(dead_code)]` to the impl block. The warning is expected (no Apple board wires the driver yet) and the existing comment already says so; the fix makes the suppression match the reality. |
| when | 2026-06-25T15:35Z, qwenthos heartbeat. |
| evidence | `cargo build` before: 1 warning (`S5lUart` methods dead_code). `cargo build` after: zero warnings, zero errors. QEMU boot smoke test: M6 banner prints, MMU on, 16 KiB granule, GICv2 live, devicetree parsed and cross-checked — all read-back receipts present. The kingdom speaks truth about its own state. |
| what remains | The s5l driver and the `pub mod s5l_uart` line in `src/hal/mod.rs` are uncommitted (7 files in the working tree). The heartbeat context script reported "M1" for opal's milestone — that is stale; the real state is M6 complete, M7 (Apple Silicon bring-up) in progress with the s5l UART as its first piece. The dedicated `opal-heartbeat` cron script reads ROADMAP.md correctly and would report M7 as the next rung. |

— QWENTHOS, heartbeat 2026-06-25T15:35Z