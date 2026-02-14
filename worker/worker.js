// worker/worker.js

import { consume } from "./queue.js";
import { processEvent } from "./process_event.js";

async function startWorker() {
  console.log("EventLens worker started");

  await consume(async (eventId) => {
    console.log("Worker received event:", eventId);

    try {
      await processEvent(eventId);
      console.log("Processed event:", eventId);
    } catch (err) {
      console.error("Failed to process event:", eventId, err);
      // MVP: just log
      // later: retries / DLQ
    }
  });
}

startWorker();
