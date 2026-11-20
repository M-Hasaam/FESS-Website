export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly buckets = new Map<string, number[]>();

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(key: string, now = Date.now()): RateLimitDecision {
    const cutoff = now - this.windowMs;
    const existing = (this.buckets.get(key) ?? []).filter((ts) => ts > cutoff);

    if (existing.length >= this.maxRequests) {
      const oldest = existing[0] ?? now;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldest + this.windowMs - now) / 1000)
      );
      this.buckets.set(key, existing);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    existing.push(now);
    this.buckets.set(key, existing);

    // Periodic cleanup when map grows large
    if (this.buckets.size > 1000) {
      for (const [bucketKey, timestamps] of this.buckets.entries()) {
        if (timestamps.every((ts) => ts <= cutoff)) {
          this.buckets.delete(bucketKey);
        }
      }
    }

    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - existing.length),
      retryAfterSeconds: 0,
    };
  }
}
