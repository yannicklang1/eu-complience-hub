/* ══════════════════════════════════════════════════════════════
   PDF i18n — Loader and helper utilities for PDF translations
   ══════════════════════════════════════════════════════════════ */

import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import type { PDFMessages } from "./types";

/**
 * Load PDF messages for the given locale.
 * Falls back to DEFAULT_LOCALE ("de") if the locale file is missing.
 */
export async function getPDFMessages(locale: Locale): Promise<PDFMessages> {
  try {
    const mod = await import(`./${locale}`);
    return mod.default as PDFMessages;
  } catch {
    // Fallback to default locale
    const fallback = await import(`./${DEFAULT_LOCALE}`);
    return fallback.default as PDFMessages;
  }
}

/**
 * Replace `{{variable}}` placeholders in a template string.
 *
 * @example
 * tReplace("Bussgeld bis {{amount}} EUR", { amount: "20 Mio." })
 * // → "Bussgeld bis 20 Mio. EUR"
 */
export function tReplace(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => String(vars[key] ?? ""),
  );
}

export type { PDFMessages } from "./types";
