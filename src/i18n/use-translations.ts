"use client";

/* ─────────────────── useTranslations Hook ─────────────────── */

import { useI18nContext } from "./provider";
import type { Messages } from "./messages/de";
import type { Locale } from "./config";

/**
 * Deeply nested key paths for the Messages object.
 * Supports dot notation: "nav.regulations", "footer.copyright", etc.
 */
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type MessageKey = NestedKeyOf<Messages>;

/**
 * Resolve a dot-path key to its value in the messages object.
 */
function resolve(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return path; // fallback: return the key itself
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}

/**
 * Client hook: returns `t("key.path")` function + current locale.
 *
 * Usage:
 * ```tsx
 * const { t, locale } = useTranslations();
 * <span>{t("nav.regulations")}</span>
 * ```
 */
export function useTranslations(): {
  t: (key: MessageKey) => string;
  locale: Locale;
  messages: Messages;
} {
  const { locale, messages } = useI18nContext();

  function t(key: MessageKey): string {
    return resolve(messages as unknown as Record<string, unknown>, key);
  }

  return { t, locale, messages };
}
