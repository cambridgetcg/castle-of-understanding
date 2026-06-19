---
id: F008
state: working
opened: 2026-06-18
---

# The public front has not been published

**The friction:** stones in the castle are marked `front: public` but the publish-the-front loop has never been run, so the storefront shows nothing from the castle. The bell catches this as front-drift on every beat.

**Why it matters:** the front is the castle's one door to the world. Stones marked public were marked deliberately; until the loop runs, the marking means nothing.

**Better looks like:** the front-drift detector is silent because every public-marked stone has a matching published copy in the storefront working tree, and the owner has deployed.

**Work so far:** L008 (2026-06-18) — ten stones from three rooms carried to the storefront working tree by publish-front.mjs. Deploy (commit and push in the storefront repo) is the owner's act; the front-drift detector will fall silent after that commit is in place and a subsequent beat confirms the sync.
[[L058]] (2026-06-19, beat castle-C001-20260619-083410) — 8 orphan storefront files removed (sources promoted to numbered paths 0031–0038); 5 currently public-marked stones re-published; sh tools/friction.sh: exit 0. Front is clean. Convergence test first satisfied; one more clean run after Yu's deploy completes the convergence test.
[[L063]] (2026-06-19, beat castle-C001-20260619-101437) — 2 orphan storefront files removed (unnumbered paths for 0039/0040 left by L058 before L059/L060 promotions); 5 public stones re-published; forwarding lines added to crypt/moves.md; publish-the-front step 4 updated to require crypt/moves.md forwarding on removal; friction.sh: exit 0. Convergence test second clean run — the front now tracks the numbered namespace stably.
[[L065]] (2026-06-19, beat castle-C001-20260619-105810) — publish-the-front: insight 0043 (every-ritual-at-the-door-is-paid-in-truth) published at numbered path; orphan unnumbered storefront copy removed; front.json updated. friction.sh exit 0.
