/* ══════════════════════════════════════════════════════════════
   Cost Estimator — Shared Logic
   Extracted from KostenKalkulatorTool.tsx for reuse in
   Report Engine + API routes
   ══════════════════════════════════════════════════════════════ */

export type CompanySize = "micro" | "small" | "medium" | "large";
export type MaturityLevel = "none" | "basic" | "advanced";

export interface CostBreakdownItem {
  item: string;
  min: number;
  max: number;
}

export interface RegulationCost {
  key: string;
  name: string;
  href: string;
  color: string;
  minCost: number;
  maxCost: number;
  breakdown: CostBreakdownItem[];
}

export const COMPANY_SIZES: { value: CompanySize; label: string; desc: string }[] = [
  { value: "micro", label: "Kleinstunternehmen", desc: "1–9 Mitarbeiter" },
  { value: "small", label: "Kleinunternehmen", desc: "10–49 Mitarbeiter" },
  { value: "medium", label: "Mittleres Unternehmen", desc: "50–249 Mitarbeiter" },
  { value: "large", label: "Großunternehmen", desc: "250+ Mitarbeiter" },
];

export const MATURITY_LEVELS: { value: MaturityLevel; label: string; desc: string }[] = [
  { value: "none", label: "Kein bestehendes System", desc: "Keine Compliance-Strukturen vorhanden" },
  { value: "basic", label: "Grundlegende Maßnahmen", desc: "Basis-Datenschutz und IT-Sicherheit" },
  { value: "advanced", label: "Fortgeschritten", desc: "ISMS oder Compliance-Framework vorhanden" },
];

export const COST_REGULATIONS = [
  { key: "dsgvo", name: "DSGVO", color: "#2563eb", href: "/dsgvo" },
  { key: "nis2", name: "NIS2 / NISG 2026", color: "#dc2626", href: "/nisg-2026" },
  { key: "ai-act", name: "AI Act", color: "#7c3aed", href: "/eu-ai-act" },
  { key: "dora", name: "DORA", color: "#0891b2", href: "/dora" },
  { key: "cra", name: "CRA", color: "#ea580c", href: "/cra" },
  { key: "csrd", name: "CSRD / ESG", color: "#16a34a", href: "/csrd-esg" },
] as const;

const SIZE_MULTIPLIER: Record<CompanySize, number> = {
  micro: 0.3,
  small: 0.6,
  medium: 1.0,
  large: 2.0,
};

const MATURITY_DISCOUNT: Record<MaturityLevel, number> = {
  none: 1.0,
  basic: 0.7,
  advanced: 0.4,
};

const BASE_COSTS: Record<string, { items: { item: string; min: number; max: number }[] }> = {
  dsgvo: {
    items: [
      { item: "Verarbeitungsverzeichnis & Gap-Analyse", min: 2000, max: 5000 },
      { item: "Datenschutzerklärung & Verträge", min: 1500, max: 4000 },
      { item: "TOM-Implementierung", min: 3000, max: 8000 },
      { item: "Schulungen & Awareness", min: 1000, max: 3000 },
      { item: "Datenschutzbeauftragter (extern, jährlich)", min: 3000, max: 8000 },
    ],
  },
  nis2: {
    items: [
      { item: "Risikomanagement & Gap-Analyse", min: 8000, max: 20000 },
      { item: "ISMS-Aufbau / ISO 27001", min: 15000, max: 50000 },
      { item: "Incident-Response-Prozesse", min: 5000, max: 15000 },
      { item: "Lieferketten-Sicherheit", min: 3000, max: 10000 },
      { item: "GF-Schulung & Governance", min: 2000, max: 5000 },
      { item: "Technische Maßnahmen (Monitoring, SIEM)", min: 10000, max: 40000 },
    ],
  },
  "ai-act": {
    items: [
      { item: "KI-Inventar & Risikobewertung", min: 3000, max: 10000 },
      { item: "Konformitätsdokumentation", min: 5000, max: 15000 },
      { item: "Bias-Testing & Monitoring", min: 4000, max: 12000 },
      { item: "Transparenz-Maßnahmen", min: 2000, max: 5000 },
      { item: "Schulungen (KI-Kompetenz)", min: 1500, max: 4000 },
    ],
  },
  dora: {
    items: [
      { item: "IKT-Risikomanagement-Framework", min: 10000, max: 30000 },
      { item: "Incident-Reporting-System", min: 5000, max: 15000 },
      { item: "Resilience-Testing (TLPT)", min: 8000, max: 25000 },
      { item: "Third-Party-Risk-Management", min: 5000, max: 15000 },
      { item: "Information-Sharing-Rahmenwerk", min: 2000, max: 5000 },
    ],
  },
  cra: {
    items: [
      { item: "Security-by-Design-Review", min: 5000, max: 15000 },
      { item: "Schwachstellenmanagement (SBOM)", min: 4000, max: 12000 },
      { item: "Konformitätsbewertung", min: 8000, max: 25000 },
      { item: "Security-Update-Prozesse (5 Jahre)", min: 3000, max: 10000 },
      { item: "Dokumentation & CE-Kennzeichnung", min: 2000, max: 6000 },
    ],
  },
  csrd: {
    items: [
      { item: "Wesentlichkeitsanalyse (Double Materiality)", min: 8000, max: 20000 },
      { item: "ESG-Datenbeschaffung & KPIs", min: 5000, max: 15000 },
      { item: "ESRS-konformer Bericht", min: 10000, max: 30000 },
      { item: "Prüfung durch Wirtschaftsprüfer", min: 5000, max: 15000 },
      { item: "Software & Tools", min: 3000, max: 10000 },
    ],
  },
};

/* ── Cost estimation logic ── */
export function estimateCosts(
  selectedRegs: string[],
  size: CompanySize,
  maturity: MaturityLevel,
): RegulationCost[] {
  const sm = SIZE_MULTIPLIER[size];
  const md = MATURITY_DISCOUNT[maturity];

  return selectedRegs.map((key) => {
    const base = BASE_COSTS[key];
    const reg = COST_REGULATIONS.find((r) => r.key === key);

    if (!base || !reg) {
      return {
        key,
        name: reg?.name ?? key,
        href: reg?.href ?? "#",
        color: reg?.color ?? "#64748b",
        minCost: 0,
        maxCost: 0,
        breakdown: [],
      };
    }

    const breakdown = base.items.map((item) => ({
      item: item.item,
      min: Math.round((item.min * sm * md) / 100) * 100,
      max: Math.round((item.max * sm * md) / 100) * 100,
    }));

    const minCost = breakdown.reduce((sum, b) => sum + b.min, 0);
    const maxCost = breakdown.reduce((sum, b) => sum + b.max, 0);

    return { key, name: reg.name, href: reg.href, color: reg.color, minCost, maxCost, breakdown };
  });
}

export function formatEuro(amount: number): string {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k €`;
  }
  return `${amount.toLocaleString("de-AT")} €`;
}
