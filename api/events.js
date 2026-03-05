import { db } from "./db.js";

export async function listEvents(req, res) {
  try {
    const result = await db.query(`
      SELECT
        id,
        kind,
        source,
        occurred_at
        
      FROM events_raw
      ORDER BY occurred_at DESC
      LIMIT 100
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("listEvents failed:", err);
    res.status(500).json({ error: "Internal error" });
  }
}