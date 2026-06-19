Saw one unconfirmed staging sighting of a dev-store order with test:false.
If dev-store orders can ever arrive unflagged, the billing meter's exclusion
at ingestion is not airtight. Worth a real sample: 100 dev-store orders in
production, assert zero reach the usage meter.

(for: rooms/billing/never-count-test-orders.md — its open crack)
