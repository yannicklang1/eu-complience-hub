/**
 * Simple in-memory rate limiter for API routes.
 *
 * Usage:
 *   import { createRateLimiter } from "@/lib/rate-limit";
 *   const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });
 *
 *   // In your route handler:
 *   const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
 *   if (limiter.isLimited(ip)) {
 *     return NextResponse.json({ error: "Zu viele Anfragen." }, { status: 429 });
 *   }
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  /** Time window in milliseconds (default: 60 000 = 1 min) */
  windowMs?: number;
  /** Maximum requests per window per key (default: 5) */
  max?: number;
  /** Cleanup interval in milliseconds (default: 300 000 = 5 min) */
  cleanupMs?: number;
}

export function createRateLimiter(opts: RateLimiterOptions = {}) {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 5;
  const cleanupMs = opts.cleanupMs ?? 5 * 60_000;

  const store = new Map<string, RateLimitEntry>();

  // Periodic cleanup of expired entries
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store) {
        if (now > entry.resetAt) store.delete(key);
      }
    }, cleanupMs);
  }

  return {
    /**
     * Check if a key (typically an IP address) has exceeded the rate limit.
     * Returns `true` if the request should be blocked.
     */
    isLimited(key: string): boolean {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now > entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return false;
      }

      entry.count++;
      return entry.count > max;
    },
  };
}

/** Pre-configured limiter for public form submissions (5 req / min) */
export const publicFormLimiter = createRateLimiter({ windowMs: 60_000, max: 5 });

/** Stricter limiter for admin endpoints (10 req / min) */
export const adminLimiter = createRateLimiter({ windowMs: 60_000, max: 10 });

/**
 * Extract client IP from request headers (Vercel / Cloudflare compatible).
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
