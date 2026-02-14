import { enqueue } from "./queue.js";

export async function replayEvent(req, res) {
  const { id } = req.params;

  await enqueue(id);

  res.json({ replay_enqueued: true, event_id: id });
}
