// Best-effort in-memory rate limit for the chat endpoint. This resets on server restart and
// is per-instance only (a serverless/edge deployment with multiple instances won't share
// this state) — it stops casual abuse/spam, not a determined attacker. For hard guarantees,
// front this with a platform-level rate limiter (e.g. Cloudflare/Vercel edge rate limiting).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

const buckets = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  bucket.count += 1;
  return { allowed: true };
}

// Periodically drop stale buckets so this map doesn't grow unbounded on a long-lived server.
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, bucket] of buckets) {
        if (now - bucket.windowStart > WINDOW_MS) buckets.delete(key);
      }
    },
    30 * 60 * 1000,
  ).unref?.();
}
