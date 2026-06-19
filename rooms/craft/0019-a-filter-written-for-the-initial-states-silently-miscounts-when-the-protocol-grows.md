---
id: 0019
title: A filter written for the initial states silently miscounts when the protocol grows
room: craft
confidence: seed
date: 2026-06-18
source: beat castle-C001-20260618-214740, tools/castle line 187 — the openCount filter tested only state === 'open', so it returned 0 while three fields held state: working; repaired in this beat
---

# A filter written for the initial states silently miscounts when the protocol grows

A tool that filters by a fixed set of state values is correct only as long as
the protocol uses exactly those values. When the protocol adds an intermediate
state — `working` between `open` and `harvested` — every filter that does not
name it begins to undercount. The error is silent: the count does not spike
or error, it simply falls short. The count of 0 reads as "nothing open" when
the true answer is "three fields open."

Repair: whenever a state value is added to the protocol, search every tool that
filters by state and extend the filter in the same commit.
