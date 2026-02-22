/* ─────────────────── Server-side Message Loader ─────────────────── */

import type { Messages } from "./messages/de";
import type { Locale } from "./config";
import { DEFAULT_LOCALE } from "./config";

/**
 * Cache for loaded message modules.
 * Since this runs at build time (SSG), the cache helps avoid
 * re-importing the same locale module multiple times.
 */
const messageCache = new Map<Locale, Messages>();

/**
 * Load UI messages for a given locale.
 * Falls back to DEFAULT_LOCALE (de) if the locale file is not found.
 *
 * Usage in Server Components / generateMetadata:
 * ```ts
 * const messages = await getMessages("en");
 * ```
 */
export async function getMessages(locale: Locale): Promise<Messages> {
  // Return from cache if available
  const cached = messageCache.get(locale);
  if (cached) return cached;

  try {
    const mod = await import(`./messages/${locale}`);
    const messages: Messages = mod.default;
    messageCache.set(locale, messages);
    return messages;
  } catch {
    // Fallback to default locale
    if (locale !== DEFAULT_LOCALE) {
      console.warn(`[i18n] Messages for "${locale}" not found, falling back to "${DEFAULT_LOCALE}"`);
      return getMessages(DEFAULT_LOCALE);
    }
    throw new Error(`[i18n] Could not load messages for default locale "${DEFAULT_LOCALE}"`);
  }
}

/**
 * Synchronous helper for server-side translation resolution.
 * Resolves a dot-path key from a messages object.
 */
export function resolveMessage(messages: Messages, path: string): string {
  const parts = path.split(".");
  let current: unknown = messages;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return path;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}
