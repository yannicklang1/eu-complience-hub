/* ─────────────────── i18n Configuration ─────────────────── */

export const LOCALES = ["de", "en", "fr", "es", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Display names in each language's own script */
export const LOCALE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  es: "Español",
  it: "Italiano",
};

/** HTML lang attribute values */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  de: "de",
  en: "en",
  fr: "fr",
  es: "es",
  it: "it",
};

/** OpenGraph locale strings */
export const LOCALE_OG: Record<Locale, string> = {
  de: "de_AT",
  en: "en_GB",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
};

/** Flag emojis per locale */
export const LOCALE_FLAGS: Record<Locale, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
  it: "🇮🇹",
};

/** Map Vercel geo country codes to preferred locale */
export const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // German-speaking
  AT: "de", DE: "de", CH: "de", LI: "de",
  // French-speaking
  FR: "fr", BE: "fr", LU: "fr", MC: "fr",
  // Spanish-speaking
  ES: "es",
  // Italian-speaking
  IT: "it",
  // English fallback for remaining EU countries
  IE: "en", MT: "en", NL: "en", DK: "en", SE: "en", FI: "en",
  PL: "en", CZ: "en", SK: "en", HU: "en", RO: "en", BG: "en",
  HR: "en", SI: "en", EE: "en", LV: "en", LT: "en", CY: "en",
  GR: "en", PT: "en",
  // Non-EU but common
  GB: "en", US: "en", NO: "en",
};

/** All 27 EU member state codes */
export const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
] as const;
export type EUCountryCode = (typeof EU_COUNTRIES)[number];
