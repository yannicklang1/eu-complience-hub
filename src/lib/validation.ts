/**
 * Shared input validation and sanitization helpers for API routes.
 */

/** Basic email format check */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize user input: trim, limit to `maxLen` characters,
 * return `null` for non-strings or empty values.
 */
export function sanitize(value: unknown, maxLen = 500): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, maxLen) || null;
}

/**
 * Validate and normalize an email address.
 * Returns the lowercase, trimmed email or `null` if invalid.
 */
export function validateEmail(value: unknown): string | null {
  const email = sanitize(value)?.toLowerCase() ?? null;
  if (!email || !EMAIL_RE.test(email)) return null;
  return email;
}
