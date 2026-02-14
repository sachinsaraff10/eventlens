-- =========================
-- Raw immutable events
-- =========================

CREATE TABLE IF NOT EXISTS events_raw (
  id UUID PRIMARY KEY,
  event_type TEXT NOT NULL,
  source TEXT NOT NULL,
  trace_id UUID,

  actor JSONB,
  subject JSONB,

  payload JSONB NOT NULL,

  occurred_at TIMESTAMP NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT now(),

  status TEXT NOT NULL
);

-- =========================
-- Processed / interpreted events
-- =========================

CREATE TABLE IF NOT EXISTS events_processed (
  event_id UUID PRIMARY KEY REFERENCES events_raw(id),

  event_type TEXT NOT NULL,
  source TEXT NOT NULL,
  trace_id UUID,

  actor JSONB,
  subject JSONB,

  occurred_at TIMESTAMP NOT NULL,

  processed_payload JSONB NOT NULL,

  processor_version INTEGER NOT NULL,
  processed_at TIMESTAMP NOT NULL DEFAULT now()
);
