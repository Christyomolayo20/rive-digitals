interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Simple in-memory sliding-window rate limiter per client IP.
 * Default: maximum 5 submissions per 10-minute window.
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup of expired keys
  if (rateLimitStore.size > 500) {
    rateLimitStore.forEach((record, key) => {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    });
  }

  const existing = rateLimitStore.get(identifier);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  rateLimitStore.set(identifier, existing);

  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
