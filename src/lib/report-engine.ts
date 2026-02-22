/* ══════════════════════════════════════════════════════════════
   Report Engine — Data Aggregation for Premium PDF Reports
   Orchestrates all evaluation logic and data sources
   Generates fine exposure, roadmaps, risk analysis, software recs
   Supports multilingual output via PDFMessages
   ══════════════════════════════════════════════════════════════ */

import { evaluateRegulations, type EvaluatedRegulation, type Answer } from "@/lib/regulation-evaluator";
import { estimateCosts, type CompanySize, type MaturityLevel, type RegulationCost } from "@/lib/cost-estimator";
import { calculateQuickMaturity, type QuickMaturityAnswer, type MaturityGrade, type CategoryResult } from "@/lib/maturity-scorer";
import { CHECKLIST_REGULATIONS, type RegulationChecklist } from "@/data/checklist-data";
import { DEADLINES, daysUntil, type Deadline } from "@/data/deadlines";
import { calculateFineExposure, resolveRevenue, formatFineAmount, FINE_RULES, type FineExposureResult } from "@/data/fine-data";
import { getUniqueRecommendations, type PDFToolRecommendation } from "@/data/software-recommendations";
import { COUNTRY_META } from "@/i18n/country";
import type { EUCountryCode } from "@/i18n/config";
import type { CountryRegulationData } from "@/i18n/country/types";
import { tReplace, type PDFMessages } from "@/i18n/pdf";

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

/** Country context resolved for PDF report personalization */
export interface ReportCountryContext {
  code: string;
  nameDE: string;
  flag: string;
  /** Per-regulation country-specific data (authority, law name, fines, status) */
  regulationData: Partial<Record<string, CountryRegulationData>>;
}

/** Critical risk for executive summary */
export interface CriticalRisk {
  regulationName: string;
  regulationKey: string;
  riskLevel: "kritisch" | "hoch" | "mittel";
  description: string;
  maxFine: string;
  color: string;
}

/** Roadmap item for action plan */
export interface RoadmapItem {
  phase: 1 | 2 | 3;
  phaseLabel: string;
  action: string;
  regulationKey: string;
  regulationName: string;
  effort: "niedrig" | "mittel" | "hoch";
  responsible: string;
  color: string;
}

/** Software recommendation with regulation context */
export interface ReportSoftwareRec extends PDFToolRecommendation {
  regulationKeys: string[];
}

/** Maturity-to-checklist mapping result */
export interface ChecklistItemStatus {
  id: string;
  text: string;
  status: "unchecked" | "partial" | "compliant";
}

export interface ReportData {
  /* Input echo */
  input: ReportInput;
  generatedAt: string;
  reportId: string;
  /* Regulation analysis */
  regulations: EvaluatedRegulation[];
  highRelevanceCount: number;
  mediumRelevanceCount: number;
  lowRelevanceCount: number;
  /* Cost estimation */
  costs: RegulationCost[];
  totalCostMin: number;
  totalCostMax: number;
  /* Fine exposure */
  fineExposures: FineExposureResult[];
  totalFineExposure: number;
  estimatedRevenue: number;
  /* Maturity */
  maturityResults: CategoryResult[];
  maturityPercentage: number;
  maturityGrade: MaturityGrade;
  /* Deadlines */
  relevantDeadlines: (Deadline & { daysLeft: number })[];
  nextCriticalDeadline: (Deadline & { daysLeft: number }) | null;
  /* Checklists (maturity-aware) */
  relevantChecklists: RegulationChecklist[];
  checklistStatuses: Record<string, ChecklistItemStatus[]>;
  /* Risks & Actions */
  criticalRisks: CriticalRisk[];
  topActions: string[];
  roadmapItems: RoadmapItem[];
  /* Software */
  softwareRecommendations: ReportSoftwareRec[];
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
  return {
    code: countryCode,
    nameDE: meta.nameDE,
    flag: meta.flag,
    regulationData: {},
  };
}

/** Generate a short unique report ID */
function generateReportId(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ECH-${datePart}-${randomPart}`;
}

/* ── Maturity category → checklist item mapping ── */
const MATURITY_CHECKLIST_MAP: Record<string, Record<string, string[]>> = {
  governance: {
    nis2: ["nis2-1", "nis2-2", "nis2-6"],
    dora: ["dora-1", "dora-2"],
    csrd: ["csrd-1", "csrd-2"],
  },
  datenschutz: {
    dsgvo: ["dsgvo-1", "dsgvo-2", "dsgvo-3", "dsgvo-4", "dsgvo-5", "dsgvo-6", "dsgvo-7", "dsgvo-8"],
    "ai-act": ["ai-3", "ai-4"],
  },
  cybersecurity: {
    nis2: ["nis2-3", "nis2-4", "nis2-5", "nis2-7", "nis2-8"],
    cra: ["cra-1", "cra-2", "cra-3", "cra-4", "cra-5", "cra-6"],
    dora: ["dora-3", "dora-4", "dora-5", "dora-6"],
  },
  "ki-compliance": {
    "ai-act": ["ai-1", "ai-2", "ai-5", "ai-6", "ai-7"],
  },
  reporting: {
    csrd: ["csrd-3", "csrd-4", "csrd-5", "csrd-6"],
    nis2: ["nis2-8"],
  },
};

/** Map maturity answers to checklist item statuses (i18n-aware) */
function buildChecklistStatuses(
  maturityAnswers: QuickMaturityAnswer[],
  checklists: RegulationChecklist[],
  t: PDFMessages,
): Record<string, ChecklistItemStatus[]> {
  const maturityByCategory: Record<string, number> = {};
  for (const a of maturityAnswers) {
    maturityByCategory[a.category] = a.level;
  }

  const result: Record<string, ChecklistItemStatus[]> = {};

  for (const checklist of checklists) {
    const itemStatusMap: Record<string, "unchecked" | "partial" | "compliant"> = {};

    for (const item of checklist.items) {
      itemStatusMap[item.id] = "unchecked";
    }

    for (const [categoryId, regMap] of Object.entries(MATURITY_CHECKLIST_MAP)) {
      const maturityLevel = maturityByCategory[categoryId] ?? 0;
      const mappedItemIds = regMap[checklist.key] ?? [];

      for (const itemId of mappedItemIds) {
        if (itemId in itemStatusMap) {
          if (maturityLevel >= 3) {
            itemStatusMap[itemId] = "compliant";
          } else if (maturityLevel >= 2) {
            itemStatusMap[itemId] = "partial";
          }
        }
      }
    }

    result[checklist.key] = checklist.items.map((item) => ({
      id: item.id,
      text: t.checklistItems[item.id] ?? item.text,
      status: itemStatusMap[item.id] ?? "unchecked",
    }));
  }

  return result;
}

/** Company size labels for display (German fallback) */
const SIZE_LABELS: Record<string, string> = {
  micro: "Kleinstunternehmen",
  small: "Kleinunternehmen",
  medium: "Mittleres Unternehmen",
  large: "Grossunternehmen",
};

/** Sector labels for display (German fallback) */
const SECTOR_LABELS: Record<string, string> = {
  it: "IT / Software / Cloud",
  finance: "Finanzwesen / Versicherung",
  health: "Gesundheitswesen / Pharma",
  energy: "Energie / Versorgung",
  manufacturing: "Produktion / Industrie",
  transport: "Transport / Logistik",
  retail: "Handel / E-Commerce",
  telecom: "Telekommunikation",
  public: "Oeffentlicher Sektor",
  other: "Andere Branche",
};

/** Regulation name lookup (German fallback) */
const REG_NAMES: Record<string, string> = {
  dsgvo: "DSGVO",
  nis2: "NIS2 / NISG 2026",
  "ai-act": "EU AI Act",
  dora: "DORA",
  cra: "Cyber Resilience Act",
  csrd: "CSRD / ESG",
  dsa: "Digital Services Act",
  mica: "MiCA",
  "data-act": "Data Act",
  eprivacy: "ePrivacy",
  eidas: "eIDAS 2.0",
  produkthaftung: "EU-Produkthaftung",
  ehds: "EHDS",
};

/** Localize regulation results: translate name, subtitle, and reason text */
function localizeRegulations(
  regulations: EvaluatedRegulation[],
  input: ReportInput,
  t: PDFMessages,
): EvaluatedRegulation[] {
  const sizeLabel = t.profile.sizeLabels[input.companySize] ?? input.companySize;
  const sectorLabels = t.profile.sectorLabels;
  const dataLabels = t.profile.dataLabels;

  const fmtSectors = (keys: string[], max = 3): string => {
    const labels = keys.map((s) => sectorLabels[s] ?? s).slice(0, max);
    return labels.join(", ") + (keys.length > max ? ` (+${keys.length - max})` : "");
  };

  const fmtData = (keys: string[], max = 3): string => {
    const labels = keys.map((d) => dataLabels[d] ?? d).slice(0, max);
    return labels.join(", ");
  };

  const e = t.eval;

  return regulations.map((reg) => {
    const name = t.regNames[reg.key] ?? reg.name;
    const subtitle = t.regSubtitles[reg.key] ?? reg.subtitle;
    let reason = reg.reason; // fallback to original

    switch (reg.key) {
      case "dsgvo": {
        const relevantData = input.dataTypes.filter((d) =>
          ["personal", "sensitive", "children", "financial"].includes(d),
        );
        const hasSensitive = input.dataTypes.includes("sensitive") || input.dataTypes.includes("children");
        reason = tReplace(e.dsgvoBase, { sizeLabel, dataTypes: fmtData(relevantData) });
        reason += " " + (hasSensitive ? e.dsgvoSensitive : e.dsgvoStandard);
        break;
      }
      case "nis2": {
        const nis2Sectors = ["it", "energy", "health", "transport", "finance", "telecom", "public"];
        const matched = input.sectors.filter((s) => nis2Sectors.includes(s));
        const isCriticalInfra = input.activities.includes("critical-infra");
        const isNis2Size = ["medium", "large"].includes(input.companySize);

        if (isCriticalInfra) {
          reason = e.nis2CriticalInfra;
        } else if (isNis2Size) {
          const category = input.companySize === "large" ? e.essentialEntity : e.importantEntity;
          reason = tReplace(e.nis2SectorSize, { sizeLabel, sectors: fmtSectors(matched), category });
        }

        if (reg.relevance === "niedrig") {
          reason = tReplace(e.nis2BelowThreshold, { sectors: fmtSectors(matched), sizeLabel });
        } else {
          reason += " " + e.nis2Suffix;
        }
        break;
      }
      case "ai-act": {
        const hasSensitiveAI = input.dataTypes.includes("sensitive") || input.dataTypes.includes("children");
        reason = tReplace(e.aiActBase, { sizeLabel });
        if (hasSensitiveAI) reason += " " + e.aiActSensitive;
        reason += " " + e.aiActBanned;
        break;
      }
      case "dora": {
        const isDirect = input.sectors.includes("finance");
        reason = isDirect
          ? tReplace(e.doraDirect, { sizeLabel })
          : e.doraProvider;
        break;
      }
      case "cra": {
        reason = e.craBase;
        if (input.sectors.includes("manufacturing")) reason += " " + e.craManufacturing;
        break;
      }
      case "csrd": {
        const isDirectCSRD = input.companySize === "large";
        reason = isDirectCSRD
          ? tReplace(e.csrdDirect, { sizeLabel })
          : tReplace(e.csrdIndirect, { sizeLabel });
        break;
      }
      case "dsa":
        reason = e.dsaReason;
        break;
      case "mica":
        reason = tReplace(e.micaReason, { sizeLabel });
        break;
      case "data-act": {
        const isIoT = input.dataTypes.includes("iot");
        reason = isIoT
          ? e.dataActIoT
          : tReplace(e.dataActManufacturer, { sectors: fmtSectors(input.sectors) });
        break;
      }
      case "eprivacy": {
        const isEcommerce = input.activities.includes("ecommerce");
        reason = isEcommerce ? e.eprivacyDirect : e.eprivacyIndirect;
        break;
      }
      case "eidas": {
        const isEid = input.activities.includes("eid");
        reason = isEid ? e.eidasDirect : e.eidasPublic;
        break;
      }
      case "produkthaftung":
        reason = tReplace(e.produkthaftungReason, { sizeLabel, sectors: fmtSectors(input.sectors) });
        break;
      case "ehds":
        reason = tReplace(e.ehdsReason, { sizeLabel });
        break;
    }

    return { ...reg, name, subtitle, reason };
  });
}

/** Localized fine amount formatter using PDFMessages */
function formatFineAmountLocalized(amount: number, t: PDFMessages): string {
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} ${t.risk.billion} EUR`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} ${t.risk.million} EUR`;
  }
  if (amount >= 1000) {
    return `${Math.round(amount / 1000)}k EUR`;
  }
  return `${amount.toLocaleString(t.locale === "de" ? "de-AT" : t.locale)} EUR`;
}

/** Localize fine exposure results: translate name + calculation text */
function localizeFineExposures(
  fines: FineExposureResult[],
  t: PDFMessages,
): FineExposureResult[] {
  return fines.map((fine) => {
    const name = t.regNames[fine.key] ?? fine.name;

    // Re-derive which calculation template applies based on the FINE_RULES data
    const rule = FINE_RULES.find((r) => r.key === fine.key);
    let calculation = fine.calculation; // fallback

    if (rule) {
      // Recalculate to determine which branch was taken
      const fmtAmount = formatFineAmountLocalized(fine.maxFine, t);
      const fmtFixed = formatFineAmountLocalized(rule.fixedMax, t);

      if (rule.higherOfTwo) {
        // "higher of two" — was percent or fixed the winner?
        const estRevenue = rule.percentMax > 0 ? Math.round(fine.maxFine / (rule.percentMax / 100)) : 0;
        const percentFine = Math.round(estRevenue * (rule.percentMax / 100));
        if (percentFine >= rule.fixedMax && fine.maxFine > rule.fixedMax) {
          calculation = tReplace(t.risk.calcPercent, { percent: rule.percentMax, amount: fmtAmount });
        } else {
          calculation = tReplace(t.risk.calcFixed, { amount: fmtFixed });
        }
      } else if (rule.fixedMax > 0) {
        calculation = tReplace(t.risk.calcUpTo, { amount: fmtFixed });
      } else {
        calculation = tReplace(t.risk.calcUpToPercent, { percent: rule.percentMax });
      }
    }

    return { ...fine, name, calculation };
  });
}

/** Build critical risks based on fine magnitude and maturity gaps (i18n-aware) */
function buildCriticalRisks(
  regulations: EvaluatedRegulation[],
  fineExposures: FineExposureResult[],
  maturityPercentage: number,
  t: PDFMessages,
): CriticalRisk[] {
  const risks: CriticalRisk[] = [];
  const hochRegs = regulations.filter((r) => r.relevance === "hoch");

  for (const reg of hochRegs) {
    const fine = fineExposures.find((f) => f.key === reg.key);
    const riskLevel: "kritisch" | "hoch" | "mittel" =
      maturityPercentage < 30 && fine && fine.maxFine >= 10_000_000
        ? "kritisch"
        : fine && fine.maxFine >= 5_000_000
          ? "hoch"
          : "mittel";

    const fineText = fine ? formatFineAmountLocalized(fine.maxFine, t) : "—";

    risks.push({
      regulationName: reg.name,
      regulationKey: reg.key,
      riskLevel,
      description: reg.reason,
      maxFine: fineText,
      color: reg.color,
    });
  }

  const riskOrder = { kritisch: 0, hoch: 1, mittel: 2 };
  risks.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel]);

  return risks.slice(0, 5);
}

/** Build 3-phase roadmap from regulations, deadlines, maturity (i18n-aware) */
function buildRoadmap(
  regulations: EvaluatedRegulation[],
  nextDeadline: (Deadline & { daysLeft: number }) | null,
  maturityPercentage: number,
  t: PDFMessages,
): RoadmapItem[] {
  const items: RoadmapItem[] = [];
  const hochRegs = regulations.filter((r) => r.relevance === "hoch");
  const mittelRegs = regulations.filter((r) => r.relevance === "mittel");

  // Phase 1: Immediate (0-30 days)
  if (maturityPercentage < 40) {
    items.push({
      phase: 1,
      phaseLabel: t.engine.phaseImmediate,
      action: t.engine.appointComplianceOfficer,
      regulationKey: "governance",
      regulationName: t.engine.governanceLabel,
      effort: "niedrig",
      responsible: t.engine.roleManagement,
      color: "#6366f1",
    });
  }

  if (nextDeadline && nextDeadline.daysLeft < 90) {
    const regKey = Object.entries(REG_NAMES).find(
      ([, name]) => nextDeadline.reg.includes(name.split(" ")[0]) || name.includes(nextDeadline.reg),
    )?.[0] ?? "other";
    items.push({
      phase: 1,
      phaseLabel: t.engine.phaseImmediate,
      action: tReplace(t.engine.deadlineUrgent, { title: nextDeadline.title, days: nextDeadline.daysLeft }),
      regulationKey: regKey,
      regulationName: nextDeadline.reg,
      effort: "hoch",
      responsible: t.engine.roleComplianceTeam,
      color: "#ef4444",
    });
  }

  for (const reg of hochRegs.slice(0, 2)) {
    items.push({
      phase: 1,
      phaseLabel: t.engine.phaseImmediate,
      action: tReplace(t.engine.gapAnalysis, { name: reg.name }),
      regulationKey: reg.key,
      regulationName: reg.name,
      effort: "mittel",
      responsible: t.engine.roleComplianceTeam,
      color: reg.color,
    });
  }

  // Phase 2: Short-term (1-3 months)
  for (const reg of hochRegs) {
    items.push({
      phase: 2,
      phaseLabel: t.engine.phaseShortTerm,
      action: tReplace(t.engine.coreImplementation, { name: reg.name }),
      regulationKey: reg.key,
      regulationName: reg.name,
      effort: "hoch",
      responsible: t.engine.roleDeptIT,
      color: reg.color,
    });
  }

  if (maturityPercentage < 60) {
    items.push({
      phase: 2,
      phaseLabel: t.engine.phaseShortTerm,
      action: t.engine.trainingProgram,
      regulationKey: "training",
      regulationName: t.engine.trainingLabel,
      effort: "mittel",
      responsible: t.engine.roleHRCompliance,
      color: "#8b5cf6",
    });
  }

  // Phase 3: Medium-term (3-6 months)
  for (const reg of mittelRegs.slice(0, 3)) {
    items.push({
      phase: 3,
      phaseLabel: t.engine.phaseMediumTerm,
      action: tReplace(t.engine.assessAndPlan, { name: reg.name }),
      regulationKey: reg.key,
      regulationName: reg.name,
      effort: "mittel",
      responsible: t.engine.roleComplianceTeam,
      color: reg.color,
    });
  }

  items.push({
    phase: 3,
    phaseLabel: t.engine.phaseMediumTerm,
    action: t.engine.establishReviews,
    regulationKey: "audit",
    regulationName: t.engine.auditLabel,
    effort: "mittel",
    responsible: t.engine.roleComplianceTeam,
    color: "#16a34a",
  });

  return items;
}

/* ── Main aggregation (i18n-aware) ── */
export function generateReportData(input: ReportInput, t: PDFMessages): ReportData {
  const generatedAt = new Date().toLocaleDateString(t.locale === "de" ? "de-AT" : t.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const reportId = generateReportId();

  /* 1. Evaluate regulations */
  const answers: Answer[] = [
    { questionId: "size", values: [input.companySize] },
    { questionId: "sector", values: input.sectors },
    { questionId: "data", values: input.dataTypes },
    { questionId: "activities", values: input.activities },
    { questionId: "location", values: input.locations },
  ];
  const rawRegulations = evaluateRegulations(answers);
  const regulations = localizeRegulations(rawRegulations, input, t);

  const highRelevanceCount = regulations.filter((r) => r.relevance === "hoch").length;
  const mediumRelevanceCount = regulations.filter((r) => r.relevance === "mittel").length;
  const lowRelevanceCount = regulations.filter((r) => r.relevance === "niedrig").length;

  /* 2. Estimate costs (only for hoch/mittel regulations with cost data) */
  const costableKeys = ["dsgvo", "nis2", "ai-act", "dora", "cra", "csrd"];
  const relevantCostKeys = regulations
    .filter((r) => r.relevance !== "niedrig" && costableKeys.includes(r.key))
    .map((r) => r.key);
  const maturityLevel = inferMaturityLevel(input.maturityAnswers);
  const rawCosts = estimateCosts(relevantCostKeys, input.companySize, maturityLevel);
  // Localize cost breakdown item names and regulation names
  const costs = rawCosts.map((cost) => ({
    ...cost,
    name: t.regNames[cost.key] ?? cost.name,
    breakdown: cost.breakdown.map((item, idx) => ({
      ...item,
      item: t.cost.breakdownItems[`${cost.key}-${idx}`] ?? item.item,
    })),
  }));
  const totalCostMin = costs.reduce((s, c) => s + c.minCost, 0);
  const totalCostMax = costs.reduce((s, c) => s + c.maxCost, 0);

  /* 3. Fine exposure calculation */
  const estimatedRevenue = resolveRevenue(input.annualRevenue);
  const relevantRegKeysForFines = regulations
    .filter((r) => r.relevance !== "niedrig")
    .map((r) => r.key);

  const rawFineExposures: FineExposureResult[] = [];
  for (const key of relevantRegKeysForFines) {
    const result = calculateFineExposure(key, estimatedRevenue);
    if (result) rawFineExposures.push(result);
  }
  const fineExposures = localizeFineExposures(rawFineExposures, t);
  fineExposures.sort((a, b) => b.maxFine - a.maxFine);
  const totalFineExposure = fineExposures.reduce((s, f) => s + f.maxFine, 0);

  /* 4. Maturity assessment (i18n-aware) */
  const { results: rawMaturityResults, overallPercentage: maturityPercentage, grade: rawMaturityGrade } =
    calculateQuickMaturity(input.maturityAnswers);
  // Localize maturity grade label and category titles
  const maturityGrade = {
    ...rawMaturityGrade,
    label: t.maturity.gradeLetterLabels[rawMaturityGrade.letter] ?? rawMaturityGrade.label,
  };
  const maturityResults = rawMaturityResults.map((cat) => ({
    ...cat,
    title: t.maturity.categoryLabels[cat.id] ?? cat.title,
  }));

  /* 5. Filter relevant deadlines */
  const relevantRegKeys = new Set(
    regulations.filter((r) => r.relevance !== "niedrig").map((r) => r.key),
  );
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

  const localeTag = t.locale === "de" ? "de-AT" : t.locale;
  const relevantDeadlines = DEADLINES
    .filter((d) => deadlineRegs.has(d.reg))
    .map((d) => {
      const key = `${d.reg}-${d.iso}`;
      return {
        ...d,
        title: t.deadlines.titles[key] ?? d.title,
        desc: t.deadlines.descs[key] ?? d.desc,
        label: new Date(d.iso).toLocaleDateString(localeTag, { month: "short", year: "numeric" }),
        daysLeft: daysUntil(d.iso),
      };
    })
    .filter((d) => d.daysLeft > -365)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const nextCriticalDeadline = relevantDeadlines.find((d) => d.daysLeft > 0) ?? null;

  /* 6. Filter relevant checklists + maturity-aware statuses */
  const relevantChecklists = CHECKLIST_REGULATIONS.filter((c) =>
    relevantRegKeys.has(c.key),
  );
  const checklistStatuses = buildChecklistStatuses(input.maturityAnswers, relevantChecklists, t);

  /* 7. Build critical risks (i18n-aware) */
  const criticalRisks = buildCriticalRisks(regulations, fineExposures, maturityPercentage, t);

  /* 8. Generate enhanced top actions (i18n-aware) */
  const topActions: string[] = [];

  if (maturityPercentage < 40) {
    topActions.push(t.engine.defineResponsibilities);
  }

  if (nextCriticalDeadline && nextCriticalDeadline.daysLeft < 180) {
    topActions.push(
      tReplace(t.engine.deadlinePriority, { title: nextCriticalDeadline.title, days: nextCriticalDeadline.daysLeft }),
    );
  }

  const hochRegulations = regulations.filter((r) => r.relevance === "hoch");
  if (hochRegulations.length > 0) {
    const names = hochRegulations.slice(0, 3).map((r) => r.name).join(", ");
    topActions.push(tReplace(t.engine.immediateMeasures, { names }));
  }

  if (totalFineExposure > 0) {
    topActions.push(
      tReplace(t.engine.minimizeFineRisk, { amount: formatFineAmount(totalFineExposure) }),
    );
  }

  if (costs.length > 0 && totalCostMin > 0) {
    topActions.push(
      tReplace(t.engine.planBudget, { range: formatRange(totalCostMin, totalCostMax) }),
    );
  }

  if (topActions.length < 4) {
    topActions.push(t.engine.establishRegularReviews);
  }

  /* 9. Build roadmap (i18n-aware) */
  const roadmapItems = buildRoadmap(regulations, nextCriticalDeadline, maturityPercentage, t);

  /* 10. Software recommendations */
  const relevantRegKeysArr = Array.from(relevantRegKeys);
  const softwareRecommendations = getUniqueRecommendations(relevantRegKeysArr, 2)
    .slice(0, 8) as ReportSoftwareRec[];

  /* 11. Resolve country context */
  const countryContext = resolveCountryContext(input.country);

  return {
    input,
    generatedAt,
    reportId,
    regulations,
    highRelevanceCount,
    mediumRelevanceCount,
    lowRelevanceCount,
    costs,
    totalCostMin,
    totalCostMax,
    fineExposures,
    totalFineExposure,
    estimatedRevenue,
    maturityResults,
    maturityPercentage,
    maturityGrade,
    relevantDeadlines,
    nextCriticalDeadline,
    relevantChecklists,
    checklistStatuses,
    criticalRisks,
    topActions,
    roadmapItems,
    softwareRecommendations,
    countryContext,
  };
}

function formatRange(min: number, max: number): string {
  const fmtK = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  return `${fmtK(min)} – ${fmtK(max)} EUR`;
}

export { SIZE_LABELS, SECTOR_LABELS, REG_NAMES };
