import { db } from "./db.js";

export async function listEvents(req, res) {
  const result = await db.query(
    `
    SELECT
      r.id,
      r.event_type,
      r.source,
      r.occurred_at,
      CASE
        WHEN p.id IS NOT NULL THEN 'processed'
        ELSE 'pending'
      END AS processing_status
    FROM events_raw r
    LEFT JOIN events_processed p
      ON r.id = p.raw_event_id
    ORDER BY r.occurred_at DESC
    LIMIT 100
  `
  );

  res.json(result.rows);
}

export async function getEvent(req, res) {
  const { id } = req.params;

  const result = await db.query(
    `
    SELECT
      r.id,
      r.event_type,
      r.source,
      r.payload AS raw_payload,
      p.processed_payload,
      r.occurred_at
    FROM events_raw r
    LEFT JOIN events_processed p
      ON r.id = p.raw_event_id
    WHERE r.id = $1
    `,
    [id]
  );

  res.json(result.rows[0]);
}
