import express from "express";
import { ingest } from "./ingest.js";
import { listEvents } from "./events.js";
import { replayEvent } from "./replay.js";
import { enqueue } from "./queue.js";
import { db } from "./db.js";
import {randomUUID} from "crypto";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function runMigrations() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename); 
  const migrationsDir = path.join(__dirname,"db/migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Running migration: ${file}`);
    await db.query(sql);
  }
}

await runMigrations();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.post("/ingest", ingest);
app.get("/events", listEvents);
// app.get("/events/:id", getEvent);
app.post("/events/:id/replay", replayEvent);

app.post("/events", async (req, res) => {
  try {
    console.log("POST /events hit", req.body);

    const { event_type, source, payload,  trace_id } = req.body || {};

    if (!event_type || !source || !payload) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const eventId = randomUUID();   // ← defined here

    await db.query(
      `
      INSERT INTO events_raw (
        id, kind, source, trace_id,
        payload, occurred_at
      )
      VALUES ($1,$2,$3,$4,$5,now())
      `,
      [
        eventId,
        event_type,
        source,
        trace_id || null,
        payload,
      ]
    );

    await enqueue(eventId);

    // MUST be inside the same try block
    res.json({
      ok: true,
      event_id: eventId,
    });

  } catch (err) {
    console.error("EVENT POST FAILED:", err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(4000, () => {
  console.log("EventLens API running on http://localhost:4000");
});
