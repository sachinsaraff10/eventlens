CREATE TABLE IF NOT EXISTS events_raw (
  id UUID PRIMARY KEY,

  kind TEXT NOT NULL,              -- http.request, job.run, error, db.query
  name TEXT,                       -- optional semantic label (route, job name)

  source TEXT NOT NULL,            -- service name
  trace_id UUID,                   -- correlation root
  parent_id UUID,                  -- causal parent (optional)

  severity TEXT,                   -- info | warning | error

  payload JSONB NOT NULL,          -- raw observed data
  -- meta JSONB,                      -- headers, timings, env, etc

  occurred_at TIMESTAMP NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT now()
);
