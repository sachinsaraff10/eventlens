import { enqueue } from "./queue.js";
import { db } from "./db.js";

export async function ingest(req, res) {
  const event = req.body;

  await db.query(
    `
    INSERT INTO events_raw (
      id, event_type, source, trace_id,
      actor, subject, payload,
      occurred_at, status
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending')
    `,
    [
      event.id,
      event.event_type,
      event.source,
      event.trace_id,
      event.actor,
      event.subject,
      event.payload,
      event.occurred_at
    ]
  );

  await enqueue(event.id);

  res.status(202).json({ accepted: true, event_id: event.id });
}
