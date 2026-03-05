import { enqueue } from "./queue.js";
import { db } from "./db.js";

export async function ingest(req, res) {
  const event = req.body;

  await db.query(
    `
    INSERT INTO events_raw (
      id, kind, source, trace_id,
      parent_id,severity , meta,
      occurred_at, received_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending')
    `,
    [
      event.id,
      event.kind,
      event.source,
      event.trace_id,
      event.parent_id,
      event.severity,
      event.meta,
      event.occurred_at,
      event.received_at
    ]
  );

  await enqueue(event.id);

  res.status(202).json({ accepted: true, event_id: event.id });
}
