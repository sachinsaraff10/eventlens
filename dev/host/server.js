import express from "express";
import { eventLensMiddleware } from "../../packages/express/src/middleware.js";

const app = express();

app.use(
  eventLensMiddleware({
    endpoint: "http://localhost:4000",
    source: "dev-host"
  })
);

app.get("/ok", (req, res) => {
  res.json({ ok: true });
});

app.get("/error", (req, res) => {
  res.status(500).json({ error: "boom" });
});

app.get("/slow", async (req, res) => {
  await new Promise(r => setTimeout(r, 300));
  res.json({ slow: true });
});

app.listen(3001, () => {
  console.log("Host harness running on http://localhost:3001");
});