/**
 * Central deadline definitions for all EU regulations.
 * Used by StickyTimeline, FristenRadarPage, Countdown, homepage, etc.
 *
 * `past` is computed dynamically from `Date.now()` — no hardcoded booleans.
 */

export interface Deadline {
  /** ISO date string: "YYYY-MM-DD" */
  iso: string;
  /** Display label in German, e.g. "Jan 2025" or "17. Jan. 2025" */
  label: string;
  /** Regulation acronym */
  reg: "DORA" | "AI Act" | "NISG" | "CRA" | "CSRD" | "BaFG" | "HSchG" | "DSGVO" | "MiCA" | "Green Claims" | "DPP" | "PLD" | "DSA" | "Data Act" | "eIDAS" | "EHDS" | "ePrivacy";
  /** Short event title */
  title: string;
  /** One-line description */
  desc: string;
  /** Accent color for the regulation */
  color: string;
}

/** All known EU compliance deadlines, chronologically sorted */
export const DEADLINES: Deadline[] = [
  {
    iso: "2024-02-17",
    label: "Feb 2024",
    reg: "DSA",
    title: "DSA vollständig in Kraft",
    desc: "Alle Vermittlungsdienste müssen DSA-Pflichten erfüllen.",
    color: "#6366f1",
  },
  {
    iso: "2024-12-30",
    label: "Dez 2024",
    reg: "MiCA",
    title: "MiCA vollständig in Kraft",
    desc: "Alle Pflichten für CASP und Token-Emittenten gelten.",
    color: "#f59e0b",
  },
  {
    iso: "2025-01-17",
    label: "Jan 2025",
    reg: "DORA",
    title: "DORA in Kraft",
    desc: "Vollumfänglich für alle Finanzinstitute.",
    color: "#059669",
  },
  {
    iso: "2025-01-01",
    label: "Jan 2025",
    reg: "CSRD",
    title: "CSRD Wave 2",
    desc: "Große Unternehmen (>250 MA) berichten erstmals.",
    color: "#16a34a",
  },
  {
    iso: "2025-02-02",
    label: "Feb 2025",
    reg: "AI Act",
    title: "AI Act Verbote",
    desc: "Verbotene KI-Praktiken treten in Kraft.",
    color: "#7c3aed",
  },
  {
    iso: "2025-06-28",
    label: "Jun 2025",
    reg: "BaFG",
    title: "BaFG in Kraft",
    desc: "Barrierefreiheitspflicht für digitale Produkte & Dienste.",
    color: "#2563eb",
  },
  {
    iso: "2025-08-02",
    label: "Aug 2025",
    reg: "AI Act",
    title: "AI Act GPAI",
    desc: "GPAI-Pflichten und Governance-Regeln gelten.",
    color: "#7c3aed",
  },
  {
    iso: "2025-09-12",
    label: "Sep 2025",
    reg: "Data Act",
    title: "Data Act in Kraft",
    desc: "IoT-Datenzugang, Cloud-Switching und B2B-Datenregeln gelten.",
    color: "#0ea5e9",
  },
  {
    iso: "2026-03-13",
    label: "Mär 2026",
    reg: "DORA",
    title: "DORA IKT-Register",
    desc: "Informationsregister bei FMA einzureichen.",
    color: "#059669",
  },
  {
    iso: "2026-01-01",
    label: "Jan 2026",
    reg: "CSRD",
    title: "NaBeG AT Phase 1",
    desc: "Große PIE-Unternehmen berichten nach ESRS in Österreich.",
    color: "#16a34a",
  },
  {
    iso: "2026-05-20",
    label: "Mai 2026",
    reg: "eIDAS",
    title: "eIDAS 2.0 Wallet",
    desc: "EU Digital Identity Wallets müssen verfügbar sein.",
    color: "#0891b2",
  },
  {
    iso: "2026-08-02",
    label: "Aug 2026",
    reg: "AI Act",
    title: "AI Act Hochrisiko",
    desc: "Vollpflichten für Hochrisiko-KI-Systeme.",
    color: "#7c3aed",
  },
  {
    iso: "2026-09-11",
    label: "Sep 2026",
    reg: "CRA",
    title: "CRA Phase 1",
    desc: "Meldepflichten 24h/72h an ENISA.",
    color: "#ea580c",
  },
  {
    iso: "2026-10-01",
    label: "Okt 2026",
    reg: "NISG",
    title: "NISG 2026",
    desc: "Alle Pflichten für betroffene Einrichtungen.",
    color: "#1e40af",
  },
  {
    iso: "2026-12-31",
    label: "Dez 2026",
    reg: "NISG",
    title: "NISG Registrierung",
    desc: "Registrierung beim BSC verpflichtend.",
    color: "#1e40af",
  },
  {
    iso: "2027-03-26",
    label: "Mär 2027",
    reg: "EHDS",
    title: "EHDS Primärnutzung",
    desc: "Patientenrechte und Zugang zu eigenen Gesundheitsdaten.",
    color: "#ec4899",
  },
  {
    iso: "2027-03-27",
    label: "Mär 2027",
    reg: "Green Claims",
    title: "Green Claims Umsetzung",
    desc: "Nationale Umsetzung der Anti-Greenwashing-Richtlinie.",
    color: "#059669",
  },
  {
    iso: "2027-06-01",
    label: "Jun 2027",
    reg: "DPP",
    title: "DPP Batterien",
    desc: "Digitaler Produktpass für Batterien verpflichtend.",
    color: "#14b8a6",
  },
  {
    iso: "2027-12-09",
    label: "Dez 2027",
    reg: "PLD",
    title: "PLD Umsetzung",
    desc: "Nationale Umsetzung der neuen Produkthaftungsrichtlinie.",
    color: "#ef4444",
  },
  {
    iso: "2027-12-11",
    label: "Dez 2027",
    reg: "CRA",
    title: "CRA Phase 2",
    desc: "CE-Kennzeichnung wird verpflichtend.",
    color: "#ea580c",
  },
  {
    iso: "2030-01-01",
    label: "Jan 2030",
    reg: "DPP",
    title: "DPP Textil & Elektronik",
    desc: "Produktpass für Textilien und Elektronik verpflichtend.",
    color: "#14b8a6",
  },
];

/** Check if a deadline is in the past */
export function isPast(isoDate: string): boolean {
  return new Date(isoDate).getTime() < Date.now();
}

/** Calculate days until a deadline (negative = past) */
export function daysUntil(isoDate: string): number {
  return Math.floor((new Date(isoDate).getTime() - Date.now()) / 86_400_000);
}

/** Format an ISO date to German display format: "17. Jan. 2025" */
export function formatDateDE(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("de-AT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
