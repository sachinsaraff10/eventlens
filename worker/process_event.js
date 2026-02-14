import { db } from "./db.js";
import { processors } from "./user_processors/index.js";
import { randomUUID } from "crypto";

export async function processEvent(rawEventId) {
  // 1. Fetch raw event
  const { rows } = await db.query(
    `SELECT * FROM events_raw WHERE id = $1`,
    [rawEventId]
  );

  if (rows.length === 0) return;

  const raw = rows[0];

  try {
    // 2. Choose processor
    const processor = processors[raw.event_type];

    const processedPayload = processor
      ? await processor(raw)
      : raw.payload; // fallback = identity

    // 3. Insert processed event
    await db.query(
      `
      INSERT INTO events_processed (
        id,
        raw_event_id,
        event_type,
        processed_payload
      ) VALUES ($1, $2, $3, $4)
      `,
      [
        randomUUID(),
        raw.id,
        raw.event_type,
        processedPayload
      ]
    );

    // 4. Mark raw as processed
    await db.query(
      `
      UPDATE events_raw
      SET status = 'processed'
      WHERE id = $1
      `,
      [raw.id]
    );

  } catch (err) {
    // 5. Mark raw as failed
    await db.query(
      `
      UPDATE events_raw
      SET status = 'failed'
      WHERE id = $1
      `,
      [raw.id]
    );

    throw err;
  }
}
