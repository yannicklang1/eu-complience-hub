/* ─────────────────── Country Data Types ─────────────────── */

import type { EUCountryCode } from "@/i18n/config";

/** Implementation status of a national transposition */
export type ImplementationStatus = "implemented" | "pending" | "overdue" | "not_applicable";

/** Per-regulation country-specific data */
export interface CountryRegulationData {
  /** Name of national transposition law (e.g. "NISG 2026") */
  nationalLawName?: string;
  /** National supervisory authority */
  authority: string;
  /** URL of the authority */
  authorityUrl: string;
  /** National transposition deadline (if different from EU) */
  nationalDeadline?: string;
  /** Current implementation status */
  implementationStatus: ImplementationStatus;
  /** National fine ranges (if different from EU default) */
  nationalFines?: string;
  /** Country-specific notes */
  nationalNotes?: string;
}

/** Regulation keys matching our guide slugs */
export type RegulationKey =
  | "nis2"
  | "ai-act"
  | "dora"
  | "cra"
  | "dsgvo"
  | "csrd"
  | "bafg"
  | "hschg"
  | "dsa"
  | "data-act"
  | "eprivacy"
  | "eidas"
  | "ehds"
  | "mica"
  | "green-claims"
  | "produkthaftung"
  | "dpp";

/** Full country data file */
export interface CountryData {
  /** ISO 3166-1 alpha-2 code */
  code: EUCountryCode;
  /** Country name in its own language */
  nameLocal: string;
  /** Country name in English */
  nameEN: string;
  /** Country name in German */
  nameDE: string;
  /** Flag emoji */
  flag: string;
  /** Official language(s) */
  languages: string[];
  /** EU membership year */
  euMemberSince: number;
  /** General data protection authority */
  dpaName: string;
  /** DPA website URL */
  dpaUrl: string;
  /** Cybersecurity authority (CSIRT/NCA) */
  csirtName: string;
  /** CSIRT website URL */
  csirtUrl: string;
  /** Per-regulation data */
  regulations: Partial<Record<RegulationKey, CountryRegulationData>>;
}
