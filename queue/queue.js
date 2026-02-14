import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379
});

const QUEUE_KEY = "eventlens:queue";

/**
 * Enqueue an event for processing
 */
export async function enqueue(eventId) {
  await redis.lpush(QUEUE_KEY, eventId);
}

/**
 * Consume events forever
 * handler(eventId) is called for each job
 */
export async function consume(handler) {
  while (true) {
    // BRPOP blocks until an item is available
    const [, eventId] = await redis.brpop(QUEUE_KEY, 0);
    await handler(eventId);
  }
}
