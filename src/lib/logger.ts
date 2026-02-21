/**
 * Structured server-side logger.
 *
 * In production the messages are JSON-formatted (easy to parse in Vercel / CloudWatch).
 * In development, keeps the human-readable console.error format.
 *
 * Usage:
 *   import { log } from "@/lib/logger";
 *   log.error("[subscribe]", "Insert failed", { code: err.code });
 *   log.warn("[leads]", "Rate limit hit", { ip });
 */

const IS_PROD = process.env.NODE_ENV === "production";

function formatMessage(
  level: "error" | "warn" | "info",
  context: string,
  message: string,
  meta?: Record<string, unknown>,
) {
  if (IS_PROD) {
    // Structured JSON for log aggregation (Vercel, Datadog, etc.)
    return JSON.stringify({
      level,
      context,
      message,
      ...meta,
      timestamp: new Date().toISOString(),
    });
  }
  // Human-readable for local dev
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  return `${context} ${message}${metaStr}`;
}

export const log = {
  error(context: string, message: string, meta?: Record<string, unknown>) {
    console.error(formatMessage("error", context, message, meta));
  },
  warn(context: string, message: string, meta?: Record<string, unknown>) {
    console.warn(formatMessage("warn", context, message, meta));
  },
  info(context: string, message: string, meta?: Record<string, unknown>) {
    if (!IS_PROD) {
      console.info(formatMessage("info", context, message, meta));
    }
  },
};
