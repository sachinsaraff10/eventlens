// import crypto  from "crypto";
import { randomUUID } from "crypto";
import fetch from "node-fetch";

export function eventLensMiddleware({
  endpoint,
  source,
  sampleRate = 1.0,
  redactHeaders = ["authorization", "cookie"]
}) {
  if (!endpoint || !source) {
    throw new Error("EventLens: endpoint and source are required");
  }

  return function eventLens(req, res, next) {
    // Optional sampling
    if (Math.random() > sampleRate) {
      return next();
    }

    const traceId = randomUUID();
    const start = process.hrtime.bigint();

    // Attach trace for downstream usage
    req.eventlens = { traceId };

    res.on("finish", async () => {
      const durationMs =
        Number(process.hrtime.bigint() - start) / 1_000_000;

      const payload = {
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration_ms: Math.round(durationMs),
        ip: req.ip,
        user_agent: req.headers["user-agent"]
      };

      // Fire-and-forget (never block the app)
      try {
        fetch(`${endpoint}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "http.request",
            source,
            trace_id: traceId,
            payload
          }),
          timeout: 100
        });
      } catch {
        // Silently ignore — observability must not break prod
      }
    });

    next();
  };
}