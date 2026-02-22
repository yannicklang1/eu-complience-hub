/* ══════════════════════════════════════════════════════════════
   Report Engine — Data Aggregation for PDF Reports
   Orchestrates all evaluation logic and data sources
   ══════════════════════════════════════════════════════════════ */

import { evaluateRegulations, type EvaluatedRegulation, type Answer } from "@/lib/regulation-evaluator";
import { estimateCosts, type CompanySize, type MaturityLevel, type RegulationCost } from "@/lib/cost-estimator";
import { calculateQuickMaturity, type QuickMaturityAnswer, type MaturityGrade, type CategoryResult } from "@/lib/maturity-scorer";
import { CHECKLIST_REGULATIONS, type RegulationChecklist } from "@/data/checklist-data";
import { DEADLINES, daysUntil, type Deadline } from "@/data/deadlines";
import { COUNTRY_META } from "@/i18n/country";
import type { EUCountryCode } from "@/i18n/config";
import type { CountryRegulationData } from "@/i18n/country/types";

/* ── Types ── */
export interface ReportInput {
  /* Company profile */
  contactName: string;
  email: string;
  companyName: string;
  phone?: string;
  /* Company classification */
  companySize: CompanySize;
  branche: string;
  annualRevenue?: string;
  /* Activities & data */
  sectors: string[];
  dataTypes: string[];
  activities: string[];
  locations: string[];
  /* Maturity quick-check */
  maturityAnswers: QuickMaturityAnswer[];
  /* Meta */
  urgency: string;
  message?: string;
  gdprConsent: boolean;
  commercialConsent: boolean;
  /* Country context (EU-27) */
  country?: string;
  countryName?: string;
}

export interface SoftwareRecommendation {
  name: string;
  tagline: string;
  priceRange: string;
  targetSize: string;
  affiliateUrl: string;
  regulationKeys: string[];
}

/** Country context resolved for PDF report personalization */
export interface ReportCountryContext {
  code: string;
  nameDE: string;
  flag: string;
  /** Per-regulation country-specific data (authority, law name, fines, status) */
  regulationData: Partial<Record<string, CountryRegulationData>>;
}

export interface ReportData {
  /* Input echo */
  input: ReportInput;
  generatedAt: string;
  /* Regulation analysis */
  regulations: EvaluatedRegulation[];
  highRelevanceCount: number;
  mediumRelevanceCount: number;
  lowRelevanceCount: number;
  /* Cost estimation */
  costs: RegulationCost[];
  totalCostMin: number;
  totalCostMax: number;
  /* Maturity */
  maturityResults: CategoryResult[];
  maturityPercentage: number;
  maturityGrade: MaturityGrade;
  /* Deadlines */
  relevantDeadlines: (Deadline & { daysLeft: number })[];
  nextCriticalDeadline: (Deadline & { daysLeft: number }) | null;
  /* Checklists */
  relevantChecklists: RegulationChecklist[];
  /* Top actions */
  topActions: string[];
  /* Country context (EU-27) */
  countryContext: ReportCountryContext | null;
}

/* ── Maturity level inference ── */
function inferMaturityLevel(answers: QuickMaturityAnswer[]): MaturityLevel {
  const avgLevel = answers.length > 0
    ? answers.reduce((sum, a) => sum + a.level, 0) / answers.length
    : 0;
  if (avgLevel >= 2.5) return "advanced";
  if (avgLevel >= 1.5) return "basic";
  return "none";
}

/** Resolve country context synchronously using COUNTRY_META (server-safe) */
function resolveCountryContext(
  countryCode: string | undefined,
): ReportCountryContext | null {
  if (!countryCode || !(countryCode in COUNTRY_META)) return null;
  const meta = COUNTRY_META[countryCode as EUCountryCode];
  // Note: Detailed country regulation data requires async loading via getCountryData().
  // For the synchronous report engine, we provide the basic country context.
  // Full regulation data is populated by the API route when available.
  return {
    code: countryCode,
    nameDE: meta.nameDE,
    flag: meta.flag,
    regulationData: {},
  };
}

/* ── Main aggregation ── */
export function generateReportData(input: ReportInput): ReportData {
  const generatedAt = new Date().toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  /* 1. Evaluate regulations */
  const answers: Answer[] = [
    { questionId: "size", values: [input.companySize] },
    { questionId: "sector", values: input.sectors },
    { questionId: "data", values: input.dataTypes },
    { questionId: "activities", values: input.activities },
    { questionId: "location", values: input.locations },
  ];
  const regulations = evaluateRegulations(answers);

  const highRelevanceCount = regulations.filter((r) => r.relevance === "hoch").length;
  const mediumRelevanceCount = regulations.filter((r) => r.relevance === "mittel").length;
  const lowRelevanceCount = regulations.filter((r) => r.relevance === "niedrig").length;

  /* 2. Estimate costs (only for hoch/mittel regulations with cost data) */
  const costableKeys = ["dsgvo", "nis2", "ai-act", "dora", "cra", "csrd"];
  const relevantCostKeys = regulations
    .filter((r) => r.relevance !== "niedrig" && costableKeys.includes(r.key))
    .map((r) => r.key);
  const maturityLevel = inferMaturityLevel(input.maturityAnswers);
  const costs = estimateCosts(relevantCostKeys, input.companySize, maturityLevel);
  const totalCostMin = costs.reduce((s, c) => s + c.minCost, 0);
  const totalCostMax = costs.reduce((s, c) => s + c.maxCost, 0);

  /* 3. Maturity assessment */
  const { results: maturityResults, overallPercentage: maturityPercentage, grade: maturityGrade } =
    calculateQuickMaturity(input.maturityAnswers);

  /* 4. Filter relevant deadlines */
  const relevantRegKeys = new Set(
    regulations.filter((r) => r.relevance !== "niedrig").map((r) => r.key),
  );
  // Map regulation keys to deadline reg labels
  const keyToDeadlineReg: Record<string, string[]> = {
    dsgvo: ["DSGVO"],
    nis2: ["NISG"],
    "ai-act": ["AI Act"],
    dora: ["DORA"],
    cra: ["CRA"],
    csrd: ["CSRD"],
    dsa: ["DSA"],
    mica: ["MiCA"],
    "data-act": ["Data Act"],
    eprivacy: ["ePrivacy"],
    eidas: ["eIDAS"],
    produkthaftung: ["PLD"],
    ehds: ["EHDS"],
  };

  const deadlineRegs = new Set<string>();
  for (const key of relevantRegKeys) {
    const labels = keyToDeadlineReg[key] ?? [];
    for (const l of labels) deadlineRegs.add(l);
  }

  const relevantDeadlines = DEADLINES
    .filter((d) => deadlineRegs.has(d.reg))
    .map((d) => ({ ...d, daysLeft: daysUntil(d.iso) }))
    .filter((d) => d.daysLeft > -365) // Include up to 1 year past
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const nextCriticalDeadline = relevantDeadlines.find((d) => d.daysLeft > 0) ?? null;

  /* 5. Filter relevant checklists */
  const relevantChecklists = CHECKLIST_REGULATIONS.filter((c) =>
    relevantRegKeys.has(c.key),
  );

  /* 6. Generate top actions */
  const topActions: string[] = [];

  if (maturityPercentage < 40) {
    topActions.push("Compliance-Verantwortlichkeiten in der Geschäftsleitung definieren und Budget festlegen");
  }

  if (nextCriticalDeadline && nextCriticalDeadline.daysLeft < 180) {
    topActions.push(`${nextCriticalDeadline.title} hat höchste Priorität — Frist in ${nextCriticalDeadline.daysLeft} Tagen`);
  }

  const hochRegulations = regulations.filter((r) => r.relevance === "hoch");
  if (hochRegulations.length > 0) {
    const names = hochRegulations.slice(0, 3).map((r) => r.name).join(", ");
    topActions.push(`Sofortmaßnahmen für ${names} einleiten`);
  }

  if (costs.length > 0 && totalCostMin > 0) {
    topActions.push(`Compliance-Budget von ${formatRange(totalCostMin, totalCostMax)} einplanen`);
  }

  if (topActions.length < 3) {
    topActions.push("Regelmäßige Compliance-Reviews etablieren und Dokumentation pflegen");
  }

  /* 7. Resolve country context */
  const countryContext = resolveCountryContext(input.country);

  return {
    input,
    generatedAt,
    regulations,
    highRelevanceCount,
    mediumRelevanceCount,
    lowRelevanceCount,
    costs,
    totalCostMin,
    totalCostMax,
    maturityResults,
    maturityPercentage,
    maturityGrade,
    relevantDeadlines,
    nextCriticalDeadline,
    relevantChecklists,
    topActions,
    countryContext,
  };
}

function formatRange(min: number, max: number): string {
  const fmtK = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  return `${fmtK(min)} – ${fmtK(max)} €`;
}
