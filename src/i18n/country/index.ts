/* ─────────────────── Country Data Index ─────────────────── */

import type { CountryData, RegulationKey, CountryRegulationData } from "./types";
import type { EUCountryCode } from "@/i18n/config";

// Lazy-load country data to avoid large bundles
const countryModules: Record<EUCountryCode, () => Promise<{ default: CountryData }>> = {
  AT: () => import("./AT"),
  BE: () => import("./BE"),
  BG: () => import("./BG"),
  HR: () => import("./HR"),
  CY: () => import("./CY"),
  CZ: () => import("./CZ"),
  DK: () => import("./DK"),
  EE: () => import("./EE"),
  FI: () => import("./FI"),
  FR: () => import("./FR"),
  DE: () => import("./DE"),
  GR: () => import("./GR"),
  HU: () => import("./HU"),
  IE: () => import("./IE"),
  IT: () => import("./IT"),
  LV: () => import("./LV"),
  LT: () => import("./LT"),
  LU: () => import("./LU"),
  MT: () => import("./MT"),
  NL: () => import("./NL"),
  PL: () => import("./PL"),
  PT: () => import("./PT"),
  RO: () => import("./RO"),
  SK: () => import("./SK"),
  SI: () => import("./SI"),
  ES: () => import("./ES"),
  SE: () => import("./SE"),
};

/** Cache for loaded country data */
const cache = new Map<EUCountryCode, CountryData>();

/** Load country data for a specific country code */
export async function getCountryData(code: EUCountryCode): Promise<CountryData | null> {
  if (cache.has(code)) return cache.get(code)!;
  const loader = countryModules[code];
  if (!loader) return null;
  const mod = await loader();
  cache.set(code, mod.default);
  return mod.default;
}

/** Get regulation-specific data for a country */
export async function getCountryRegulationData(
  code: EUCountryCode,
  regulation: RegulationKey
): Promise<CountryRegulationData | null> {
  const country = await getCountryData(code);
  return country?.regulations?.[regulation] ?? null;
}

/** Get all EU country codes */
export const EU_COUNTRY_CODES: EUCountryCode[] = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
];

/** Synchronous country metadata (no regulation details, always available) */
export const COUNTRY_META: Record<EUCountryCode, {
  nameDE: string;
  nameEN: string;
  nameLocal: string;
  flag: string;
}> = {
  AT: { nameDE: "Österreich", nameEN: "Austria", nameLocal: "Österreich", flag: "🇦🇹" },
  BE: { nameDE: "Belgien", nameEN: "Belgium", nameLocal: "België / Belgique", flag: "🇧🇪" },
  BG: { nameDE: "Bulgarien", nameEN: "Bulgaria", nameLocal: "България", flag: "🇧🇬" },
  HR: { nameDE: "Kroatien", nameEN: "Croatia", nameLocal: "Hrvatska", flag: "🇭🇷" },
  CY: { nameDE: "Zypern", nameEN: "Cyprus", nameLocal: "Κύπρος", flag: "🇨🇾" },
  CZ: { nameDE: "Tschechien", nameEN: "Czech Republic", nameLocal: "Česká republika", flag: "🇨🇿" },
  DK: { nameDE: "Dänemark", nameEN: "Denmark", nameLocal: "Danmark", flag: "🇩🇰" },
  EE: { nameDE: "Estland", nameEN: "Estonia", nameLocal: "Eesti", flag: "🇪🇪" },
  FI: { nameDE: "Finnland", nameEN: "Finland", nameLocal: "Suomi", flag: "🇫🇮" },
  FR: { nameDE: "Frankreich", nameEN: "France", nameLocal: "France", flag: "🇫🇷" },
  DE: { nameDE: "Deutschland", nameEN: "Germany", nameLocal: "Deutschland", flag: "🇩🇪" },
  GR: { nameDE: "Griechenland", nameEN: "Greece", nameLocal: "Ελλάδα", flag: "🇬🇷" },
  HU: { nameDE: "Ungarn", nameEN: "Hungary", nameLocal: "Magyarország", flag: "🇭🇺" },
  IE: { nameDE: "Irland", nameEN: "Ireland", nameLocal: "Éire / Ireland", flag: "🇮🇪" },
  IT: { nameDE: "Italien", nameEN: "Italy", nameLocal: "Italia", flag: "🇮🇹" },
  LV: { nameDE: "Lettland", nameEN: "Latvia", nameLocal: "Latvija", flag: "🇱🇻" },
  LT: { nameDE: "Litauen", nameEN: "Lithuania", nameLocal: "Lietuva", flag: "🇱🇹" },
  LU: { nameDE: "Luxemburg", nameEN: "Luxembourg", nameLocal: "Lëtzebuerg", flag: "🇱🇺" },
  MT: { nameDE: "Malta", nameEN: "Malta", nameLocal: "Malta", flag: "🇲🇹" },
  NL: { nameDE: "Niederlande", nameEN: "Netherlands", nameLocal: "Nederland", flag: "🇳🇱" },
  PL: { nameDE: "Polen", nameEN: "Poland", nameLocal: "Polska", flag: "🇵🇱" },
  PT: { nameDE: "Portugal", nameEN: "Portugal", nameLocal: "Portugal", flag: "🇵🇹" },
  RO: { nameDE: "Rumänien", nameEN: "Romania", nameLocal: "România", flag: "🇷🇴" },
  SK: { nameDE: "Slowakei", nameEN: "Slovakia", nameLocal: "Slovensko", flag: "🇸🇰" },
  SI: { nameDE: "Slowenien", nameEN: "Slovenia", nameLocal: "Slovenija", flag: "🇸🇮" },
  ES: { nameDE: "Spanien", nameEN: "Spain", nameLocal: "España", flag: "🇪🇸" },
  SE: { nameDE: "Schweden", nameEN: "Sweden", nameLocal: "Sverige", flag: "🇸🇪" },
};

export type { CountryData, CountryRegulationData, RegulationKey };
