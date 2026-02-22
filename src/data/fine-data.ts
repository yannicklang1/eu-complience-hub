/* ══════════════════════════════════════════════════════════════
   Fine Data — EU Regulation Penalty Rules
   Extracted from BussgeldRechnerTool for reuse in Report Engine
   All amounts based on official EU regulation texts
   ══════════════════════════════════════════════════════════════ */

export interface FineRule {
  /** Regulation key matching regulation-evaluator keys */
  key: string;
  /** Display name */
  name: string;
  /** Fixed maximum fine in EUR */
  fixedMax: number;
  /** Percentage of global annual turnover */
  percentMax: number;
  /** Whether "whichever is higher" applies */
  higherOfTwo: boolean;
  /** EU regulation article reference */
  article: string;
}

/**
 * EU-wide maximum fine rules per regulation.
 * These are the MAXIMUM penalties defined in EU regulation texts.
 * Actual sanctions may vary by member state and circumstance.
 */
export const FINE_RULES: FineRule[] = [
  {
    key: "ai-act",
    name: "EU AI Act",
    fixedMax: 35_000_000,
    percentMax: 7,
    higherOfTwo: true,
    article: "Art. 99 AI Act",
  },
  {
    key: "dsgvo",
    name: "DSGVO",
    fixedMax: 20_000_000,
    percentMax: 4,
    higherOfTwo: true,
    article: "Art. 83 Abs. 5 DSGVO",
  },
  {
    key: "cra",
    name: "Cyber Resilience Act",
    fixedMax: 15_000_000,
    percentMax: 2.5,
    higherOfTwo: true,
    article: "Art. 64 CRA",
  },
  {
    key: "nis2",
    name: "NIS2 / NISG 2026",
    fixedMax: 10_000_000,
    percentMax: 2,
    higherOfTwo: true,
    article: "Art. 34 NIS2",
  },
  {
    key: "dora",
    name: "DORA",
    fixedMax: 5_000_000,
    percentMax: 1,
    higherOfTwo: true,
    article: "Art. 50 ff. DORA",
  },
  {
    key: "csrd",
    name: "CSRD / ESG",
    fixedMax: 10_000_000,
    percentMax: 5,
    higherOfTwo: false,
    article: "Art. 28a CSRD (nat. Umsetzung)",
  },
  {
    key: "dsa",
    name: "Digital Services Act",
    fixedMax: 0,
    percentMax: 6,
    higherOfTwo: false,
    article: "Art. 52 DSA",
  },
  {
    key: "mica",
    name: "MiCA",
    fixedMax: 5_000_000,
    percentMax: 3,
    higherOfTwo: true,
    article: "Art. 111 MiCA",
  },
];

/** Lookup fine rule by regulation key */
export function getFineRule(key: string): FineRule | undefined {
  return FINE_RULES.find((r) => r.key === key);
}

export interface FineExposureResult {
  key: string;
  name: string;
  /** Calculated maximum fine in EUR */
  maxFine: number;
  /** How the fine was calculated */
  calculation: string;
  /** Article reference */
  article: string;
}

/** Revenue string → approximate numeric value in EUR */
const REVENUE_MAP: Record<string, number> = {
  "< 2M": 1_000_000,
  "2-10M": 5_000_000,
  "10-50M": 25_000_000,
  "> 50M": 100_000_000,
};

/** Resolve annual revenue string to numeric value */
export function resolveRevenue(annualRevenue?: string): number {
  if (!annualRevenue) return 10_000_000; // default to 10M for estimation
  return REVENUE_MAP[annualRevenue] ?? 10_000_000;
}

/**
 * Calculate maximum fine exposure for a given regulation and revenue.
 * Returns the applicable maximum fine based on "higher of two" rules.
 */
export function calculateFineExposure(
  key: string,
  annualRevenue: number,
): FineExposureResult | null {
  const rule = getFineRule(key);
  if (!rule) return null;

  const percentFine = Math.round(annualRevenue * (rule.percentMax / 100));
  let maxFine: number;
  let calculation: string;

  if (rule.higherOfTwo) {
    maxFine = Math.max(rule.fixedMax, percentFine);
    if (percentFine > rule.fixedMax) {
      calculation = `${rule.percentMax}% des Jahresumsatzes (${formatFineAmount(percentFine)})`;
    } else {
      calculation = `Festbetrag: ${formatFineAmount(rule.fixedMax)}`;
    }
  } else if (rule.fixedMax > 0) {
    maxFine = rule.fixedMax;
    calculation = `Bis zu ${formatFineAmount(rule.fixedMax)}`;
  } else {
    maxFine = percentFine;
    calculation = `Bis zu ${rule.percentMax}% des Jahresumsatzes`;
  }

  return {
    key,
    name: rule.name,
    maxFine,
    calculation,
    article: rule.article,
  };
}

/** Format EUR amount for display: 35 Mio. EUR, 1,5 Mrd. EUR, etc. */
export function formatFineAmount(amount: number): string {
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} Mrd. EUR`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} Mio. EUR`;
  }
  if (amount >= 1000) {
    return `${Math.round(amount / 1000)}k EUR`;
  }
  return `${amount.toLocaleString("de-AT")} EUR`;
}
