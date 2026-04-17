"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";
import { evaluateRegulations, type Answer } from "@/lib/regulation-evaluator";

/* ══════════════════════════════════════════════════════════════
   KontaktContent — 5-Step Compliance Report Wizard
   Replaces the old contact form with a guided flow that
   generates a personalized compliance report.
   ══════════════════════════════════════════════════════════════ */

/* ── Types ── */
interface FormData {
  contactName: string;
  email: string;
  companyName: string;
  phone: string;
  employeeCount: string;
  annualRevenue: string;
  companySize: string; // derived from employees + revenue
  /** Börsennotiert / Public Interest Entity (für CSRD & Prospekt-VO) */
  isListed: boolean;
  branche: string;
  sectors: string[];
  dataTypes: string[];
  activities: string[];
  locations: string[];
  /** Produktkategorien (für DPP/ESPR, BaFG, CRA) */
  productCategories: string[];
  /** Marketing-Claims (für Green Claims / Empowering Consumers) */
  marketingClaims: string[];
  /** Certifications & standards already in place (ISO 27001, SOC 2, etc.) */
  certifications: string[];
  /** Cloud/IT stack — influences DSGVO third-country transfers, DORA TPRM */
  itStack: string[];
  /** Data export countries (for DSGVO Chapter V analysis) */
  dataExportCountries: string[];
  /** Incident history last 24 months */
  incidentHistory: string[];
  maturityAnswers: { category: string; level: number }[];
  urgency: string;
  message: string;
  gdprConsent: boolean;
  commercialConsent: boolean;
}

type SubmitStatus = "idle" | "submitting" | "preview" | "purchasing" | "success" | "error";

/* Preview data returned from /api/report/preview */
interface PreviewData {
  reportToken: string;
  regulations: {
    key: string;
    name: string;
    subtitle?: string;
    href?: string;
    relevance: string;
    color: string;
    reason?: string;
  }[];
  regulationsCount: number;
  highCount: number;
  mediumCount: number;
  maturityGrade: string;
  topActions?: {
    phaseLabel: string;
    action: string;
    regulationName: string;
    effort: string;
    color: string;
  }[];
  nextDeadline: { label: string; date: string; daysUntil: number } | null;
}

/* Derive company size from employee count + revenue */
function deriveCompanySize(employees: string, revenue: string): string {
  // EU SME definition: size = max(employee-based, revenue-based)
  const empSizeMap: Record<string, number> = { "1-9": 0, "10-49": 1, "50-249": 2, "250-999": 3, "1000+": 3 };
  const revSizeMap: Record<string, number> = { "< 2 Mio. \u20AC": 0, "2-10 Mio. \u20AC": 1, "10-50 Mio. \u20AC": 2, "> 50 Mio. \u20AC": 3 };
  const empLevel = empSizeMap[employees] ?? -1;
  const revLevel = revSizeMap[revenue] ?? -1;
  const level = Math.max(empLevel, revLevel);
  if (level <= 0) return "micro";
  if (level === 1) return "small";
  if (level === 2) return "medium";
  return "large";
}

const INITIAL_FORM: FormData = {
  contactName: "",
  email: "",
  companyName: "",
  phone: "",
  employeeCount: "",
  annualRevenue: "",
  companySize: "",
  isListed: false,
  branche: "",
  sectors: [],
  dataTypes: [],
  activities: [],
  locations: [],
  productCategories: [],
  marketingClaims: [],
  certifications: [],
  itStack: [],
  dataExportCountries: [],
  incidentHistory: [],
  maturityAnswers: [
    { category: "governance", level: 0 },
    { category: "datenschutz", level: 0 },
    { category: "cybersecurity", level: 0 },
    { category: "ki-compliance", level: 0 },
    { category: "reporting", level: 0 },
  ],
  urgency: "",
  message: "",
  gdprConsent: false,
  commercialConsent: false,
};

/* ── Static Data ── */

const EMPLOYEE_RANGES = [
  { value: "1-9", label: "1–9 Mitarbeiter" },
  { value: "10-49", label: "10–49 Mitarbeiter" },
  { value: "50-249", label: "50–249 Mitarbeiter" },
  { value: "250-999", label: "250–999 Mitarbeiter" },
  { value: "1000+", label: "1.000+ Mitarbeiter" },
] as const;

const COMPANY_SIZES = [
  { value: "micro", label: "Kleinstunternehmen" },
  { value: "small", label: "Kleinunternehmen" },
  { value: "medium", label: "Mittleres Unternehmen" },
  { value: "large", label: "Gro\u00DFunternehmen" },
] as const;

const BRANCHEN = [
  "IT / Software",
  "Finanzwesen",
  "Gesundheitswesen",
  "Energie",
  "Produktion / Industrie",
  "Transport / Logistik",
  "Handel / E-Commerce",
  "Telekommunikation",
  "\u00D6ffentlicher Sektor",
  "Chemie & Pharma",
  "Sonstige",
] as const;

const REVENUE_RANGES = [
  "< 2 Mio. \u20AC",
  "2-10 Mio. \u20AC",
  "10-50 Mio. \u20AC",
  "> 50 Mio. \u20AC",
] as const;

const DATA_TYPES = [
  { value: "personal", label: "Personenbezogene Daten", desc: "Kunden, Mitarbeiter, Nutzer" },
  { value: "sensitive", label: "Besondere Kategorien", desc: "Gesundheit, Religion, Biometrie" },
  { value: "children", label: "Daten von Minderj\u00E4hrigen", desc: null },
  { value: "financial", label: "Finanzdaten / Zahlungsdaten", desc: null },
  { value: "b2b", label: "Nur B2B-/Gesch\u00E4ftsdaten", desc: null },
  { value: "iot", label: "IoT-/Sensordaten", desc: null },
] as const;

const ACTIVITIES = [
  { value: "ai", label: "Einsatz oder Entwicklung von KI-Systemen", desc: "z.B. Chatbots, ML-Modelle, Bewerber-Screening, Recommendation Engines" },
  { value: "software", label: "Entwicklung von Software-/Hardware-Produkten", desc: "Produkte mit digitalen Elementen — Apps, Plugins, IoT-Geräte, Firmware" },
  { value: "critical-infra", label: "Betrieb kritischer Infrastruktur", desc: "Energie, Wasser, Gesundheit, Transport, digitale Infrastruktur" },
  { value: "online-platform", label: "Online-Plattform / Marktplatz / Soziales Netzwerk", desc: "Nutzer stellen Inhalte bereit oder handeln untereinander" },
  { value: "esg", label: "Nachhaltigkeitsberichterstattung / ESG", desc: "Sie erstellen oder planen einen Nachhaltigkeitsbericht" },
  { value: "crypto", label: "Krypto-Assets / Blockchain / DeFi", desc: "Token-Emission, Custody, Handel, Beratung" },
  { value: "cross-border", label: "Internationale Datenübertragungen", desc: "Daten werden regelmäßig in Drittländer übermittelt (z.B. USA, Indien)" },
  { value: "ecommerce", label: "E-Commerce / Online-Verkauf an Verbraucher", desc: "Webshop, Online-Bestellung, digitale Verträge mit Konsumenten" },
  { value: "eid", label: "Vertrauensdienste / E-Signaturen", desc: "Qualifizierte elektronische Signaturen, Zeitstempel, EUDI-Wallet" },
] as const;

const LOCATIONS = [
  { value: "at", label: "\u00D6sterreich" },
  { value: "de", label: "Deutschland" },
  { value: "eu", label: "Anderer EU-/EWR-Staat" },
  { value: "non-eu", label: "Au\u00DFerhalb der EU (mit EU-Kunden)" },
] as const;

const PRODUCT_CATEGORIES = [
  { value: "none", label: "Keine physischen Produkte", desc: "Reines Dienstleistungs- oder Softwareunternehmen" },
  { value: "hardware-consumer", label: "Consumer-Hardware", desc: "IoT-Geräte, Smart Home, Wearables" },
  { value: "hardware-b2b", label: "B2B-Hardware/IT-Produkte", desc: "Server, Netzwerk, Industrie-Komponenten" },
  { value: "batteries", label: "Batterien & Akkus", desc: "DPP ab Feb 2027 verpflichtend" },
  { value: "textiles", label: "Textilien & Bekleidung", desc: "DPP ab 2027/2028" },
  { value: "electronics", label: "Elektronikgeräte", desc: "DPP + CE-Kennzeichnung" },
  { value: "furniture", label: "Möbel", desc: "ESPR-relevant" },
  { value: "building", label: "Bauprodukte", desc: "BauPVO + ESPR" },
  { value: "chemicals", label: "Chemikalien & Kunststoffe", desc: "REACH + ESPR" },
  { value: "ebooks", label: "E-Books / Digitale Medien", desc: "BaFG Barrierefreiheit" },
  { value: "terminals", label: "Self-Service-/Zahlungsterminals", desc: "BaFG Barrierefreiheit" },
  { value: "medical", label: "Medizinprodukte", desc: "MDR + AI Act Annex I" },
  { value: "software-product", label: "Software-Produkte (SaaS, Apps, Plugins)", desc: "CRA + PLD" },
] as const;

const MARKETING_CLAIMS = [
  { value: "none", label: "Keine werblichen Umweltaussagen", desc: null },
  { value: "climate-neutral", label: "\u201EKlimaneutral\u201C / \u201ECO\u2082-neutral\u201C", desc: "Green Claims: wissenschaftlicher Nachweis erforderlich" },
  { value: "sustainable", label: "\u201ENachhaltig\u201C / \u201E\u00D6kologisch\u201C", desc: "Green Claims: Beleg zwingend" },
  { value: "green", label: "\u201EGr\u00FCn\u201C / \u201EUmweltfreundlich\u201C", desc: "ECD: verboten ohne Nachweis" },
  { value: "recyclable", label: "\u201ERecycelbar\u201C / \u201ERecycling-Anteil X%\u201C", desc: "Nachweispflicht" },
  { value: "eco-labels", label: "Eigene \u00D6ko-Labels / Nachhaltigkeits-Siegel", desc: "Regulierte Labels n\u00F6tig (EU Ecolabel etc.)" },
  { value: "offset", label: "CO\u2082-Kompensation beworben", desc: "ab 2026 nicht mehr als Alleinstellung zul\u00E4ssig" },
];

const CERTIFICATIONS = [
  { value: "iso-27001", label: "ISO/IEC 27001", desc: "Informationssicherheits-Managementsystem" },
  { value: "iso-27701", label: "ISO/IEC 27701", desc: "Datenschutz-Erweiterung zu 27001" },
  { value: "iso-9001", label: "ISO 9001", desc: "Qualit\u00E4tsmanagement" },
  { value: "soc2", label: "SOC 2 Type II", desc: "US-Trust-Service-Kriterien" },
  { value: "tisax", label: "TISAX", desc: "Automotive-Informationssicherheit" },
  { value: "vds", label: "VdS 10000 / 10010", desc: "KMU-Cyber-Standard" },
  { value: "bsi", label: "BSI IT-Grundschutz", desc: "Deutscher Beh\u00F6rden-Standard" },
  { value: "c5", label: "BSI C5", desc: "Cloud-Computing-Compliance" },
  { value: "nen-7510", label: "NEN 7510", desc: "Health-Informationssicherheit (NL)" },
  { value: "none", label: "Keine Zertifizierungen", desc: null },
] as const;

const IT_STACK = [
  { value: "aws", label: "AWS", desc: "Amazon Web Services" },
  { value: "azure", label: "Microsoft Azure", desc: "inkl. M365 / Entra ID" },
  { value: "gcp", label: "Google Cloud (GCP)", desc: null },
  { value: "m365", label: "Microsoft 365 / Office 365", desc: null },
  { value: "google-workspace", label: "Google Workspace", desc: null },
  { value: "saas-heavy", label: "Mehrheitlich SaaS", desc: "10+ Drittanbieter-Apps" },
  { value: "on-premise", label: "On-Premise / eigenes RZ", desc: null },
  { value: "hybrid", label: "Hybrid-Umgebung", desc: "Mix aus Cloud und On-Premise" },
  { value: "eu-cloud", label: "EU-Only Cloud (OVH, Hetzner, IONOS)", desc: null },
] as const;

const DATA_EXPORT_COUNTRIES = [
  { value: "no-export", label: "Kein Datenexport au\u00DFerhalb EU/EWR", desc: null },
  { value: "us", label: "USA", desc: "DSGVO Kap. V / EU-US DPF erforderlich" },
  { value: "uk", label: "UK", desc: "Adequacy-Beschluss vorhanden" },
  { value: "ch", label: "Schweiz", desc: "Adequacy-Beschluss vorhanden" },
  { value: "india", label: "Indien", desc: "Ohne Adequacy \u2014 SCC n\u00F6tig" },
  { value: "china", label: "China", desc: "Ohne Adequacy \u2014 TIA zwingend" },
  { value: "other-third", label: "Andere Drittl\u00E4nder", desc: null },
] as const;

const INCIDENT_HISTORY = [
  { value: "no-incidents", label: "Keine Vorf\u00E4lle", desc: "in den letzten 24 Monaten" },
  { value: "data-breach", label: "Datenschutzvorfall", desc: "Mit/ohne Meldung an DSB" },
  { value: "ransomware", label: "Ransomware / Malware-Vorfall", desc: null },
  { value: "phishing", label: "Erfolgreicher Phishing-Angriff", desc: null },
  { value: "insider", label: "Insider-Bedrohung", desc: "z.B. Datendiebstahl durch MA" },
  { value: "supply-chain", label: "Lieferketten-Vorfall", desc: "Betroffener Dienstleister" },
  { value: "audit-finding", label: "Kritische Audit-Feststellung", desc: "Extern oder intern" },
  { value: "dsb-complaint", label: "Beschwerde bei Datenschutzbeh\u00F6rde", desc: null },
] as const;

const MATURITY_QUESTIONS = [
  { category: "governance", label: "Gibt es eine klar definierte Compliance-Verantwortung?" },
  { category: "datenschutz", label: "Sind Datenschutz-Grundlagen umgesetzt (Verarbeitungsverzeichnis, TOMs)?" },
  { category: "cybersecurity", label: "Gibt es ein ISMS oder dokumentierte IT-Sicherheitsma\u00DFnahmen?" },
  { category: "ki-compliance", label: "Sind eingesetzte KI-Systeme inventarisiert und klassifiziert?" },
  { category: "reporting", label: "Werden Compliance-Ma\u00DFnahmen dokumentiert und auditiert?" },
] as const;

const MATURITY_LEVELS = [
  { value: 0, label: "N/A", color: "border-slate-500/30 bg-slate-500/10 text-slate-400" },
  { value: 1, label: "Nicht umgesetzt", color: "border-red-500/30 bg-red-500/10 text-red-400" },
  { value: 2, label: "Teilweise", color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" },
  { value: 3, label: "Vollst\u00E4ndig", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" },
] as const;

const URGENCY_OPTIONS = [
  { value: "dringend", label: "Dringend", desc: "N\u00E4chste 4 Wochen", color: "border-red-500/30 bg-red-500/8 text-red-400" },
  { value: "bald", label: "Bald", desc: "1-3 Monate", color: "border-yellow-500/30 bg-yellow-500/8 text-yellow-400" },
  { value: "geplant", label: "Geplant", desc: "3-6 Monate", color: "border-blue-500/30 bg-blue-500/8 text-blue-400" },
  { value: "orientierung", label: "Erst orientieren", desc: "Kein fester Zeitrahmen", color: "border-slate-500/30 bg-slate-500/8 text-slate-400" },
] as const;

const STEP_TITLES = [
  "Unternehmensprofil",
  "Gr\u00F6\u00DFe & Branche",
  "Aktivit\u00E4ten & Daten",
  "IT-Kontext & Vorf\u00E4lle",
  "Reifegrad-Schnellcheck",
  "Zusammenfassung",
  "Ergebnisse",
] as const;

const TOTAL_STEPS = 7;

/* ── Animation variants ── */
const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/* ══════════════════════════ Component ══════════════════════════ */

/** localStorage key for wizard autosave */
const AUTOSAVE_KEY = "eu-hub-compliance-report-draft";

/**
 * Load autosaved draft from localStorage, or return initial state.
 * Used as lazy initializer for useState to avoid SSR/hydration mismatches.
 */
function loadDraftOrInitial(): { form: FormData; step: number; restored: boolean } {
  if (typeof window === "undefined") {
    return { form: INITIAL_FORM, step: 0, restored: false };
  }
  try {
    const raw = window.localStorage.getItem(AUTOSAVE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { form: FormData; step: number; ts: number };
      // Only restore if saved within last 7 days
      if (saved.ts && Date.now() - saved.ts < 7 * 24 * 60 * 60 * 1000 && saved.form?.companyName) {
        return {
          form: { ...INITIAL_FORM, ...saved.form, gdprConsent: false, commercialConsent: false },
          step: Math.min(saved.step ?? 0, 5),
          restored: true,
        };
      }
    }
  } catch {
    // localStorage unavailable or corrupt — ignore
  }
  return { form: INITIAL_FORM, step: 0, restored: false };
}

export default function KontaktContent() {
  const { locale } = useTranslations();
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [draft] = useState(loadDraftOrInitial);
  const [step, setStep] = useState(draft.step);
  const [form, setForm] = useState<FormData>(draft.form);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [autosaveRestored, setAutosaveRestored] = useState(draft.restored);

  /* ── Autosave: persist on every form/step change (throttled) ── */
  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "preview") {
      // After successful submission, clear the draft
      try { localStorage.removeItem(AUTOSAVE_KEY); } catch { /* ignore */ }
      return;
    }
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(
          AUTOSAVE_KEY,
          JSON.stringify({ form, step, ts: Date.now() }),
        );
      } catch {
        // localStorage full or disabled — ignore
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [form, step, submitStatus]);

  /* ── Reset draft (after restore banner dismiss) ── */
  const resetDraft = useCallback(() => {
    try { localStorage.removeItem(AUTOSAVE_KEY); } catch { /* ignore */ }
    setForm(INITIAL_FORM);
    setStep(0);
    setAutosaveRestored(false);
  }, []);

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  /* ── Update helpers ── */
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayValue = useCallback(
    (key: "sectors" | "dataTypes" | "activities" | "locations" | "certifications" | "itStack" | "dataExportCountries" | "incidentHistory" | "productCategories" | "marketingClaims", value: string) => {
      setForm((prev) => {
        const arr = prev[key];
        return {
          ...prev,
          [key]: arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value],
        };
      });
    },
    []
  );

  const updateMaturity = useCallback(
    (category: string, level: number) => {
      setForm((prev) => ({
        ...prev,
        maturityAnswers: prev.maturityAnswers.map((a) =>
          a.category === category ? { ...a, level } : a
        ),
      }));
    },
    []
  );

  /* ── Validation ── */
  const isEmailValid = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return (
          form.companyName.trim().length > 0 &&
          form.contactName.trim().length > 0 &&
          form.email.trim().length > 0 &&
          isEmailValid(form.email)
        );
      case 1:
        return form.employeeCount.length > 0 && form.branche.length > 0;
      case 2:
        return true; // activities/data optional, user can proceed
      case 3:
        return true; // IT context / incidents optional
      case 4:
        return true; // maturity defaults are set
      case 5:
        return form.gdprConsent;
      case 6:
        return true; // preview step, no validation needed
      default:
        return false;
    }
  }, [step, form, isEmailValid]);

  /* ── Navigation ── */
  const handleNext = useCallback(() => {
    if (!canProceed) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [canProceed]);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  /* ── Regulation preview (for step 5 summary) ── */
  const regulationPreview = useMemo(() => {
    // Map the form branche to sector values used by the evaluator
    const sectorMap: Record<string, string> = {
      "IT / Software": "it",
      "Finanzwesen": "finance",
      "Gesundheitswesen": "health",
      "Energie": "energy",
      "Produktion / Industrie": "manufacturing",
      "Transport / Logistik": "transport",
      "Handel / E-Commerce": "retail",
      "Telekommunikation": "telecom",
      "\u00D6ffentlicher Sektor": "public",
      "Chemie & Pharma": "other",
      "Sonstige": "other",
    };

    const answers: Answer[] = [
      { questionId: "size", values: form.companySize ? [form.companySize] : [] },
      { questionId: "sector", values: form.branche ? [sectorMap[form.branche] ?? "other"] : [] },
      { questionId: "data", values: form.dataTypes },
      { questionId: "activities", values: form.activities },
      { questionId: "location", values: form.locations },
    ];

    return evaluateRegulations(answers, {
      certifications: form.certifications,
      itStack: form.itStack,
      dataExportCountries: form.dataExportCountries,
      incidentHistory: form.incidentHistory,
      productCategories: form.productCategories,
      marketingClaims: form.marketingClaims,
      isListed: form.isListed,
    });
  }, [
    form.companySize,
    form.branche,
    form.dataTypes,
    form.activities,
    form.locations,
    form.certifications,
    form.itStack,
    form.dataExportCountries,
    form.incidentHistory,
    form.productCategories,
    form.marketingClaims,
    form.isListed,
  ]);

  /* ── Build payload (shared between preview + submit) ── */
  const buildPayload = useCallback(() => {
    const urgencyLabels: Record<string, string> = {
      dringend: "Dringend (n\u00E4chste 4 Wochen)",
      bald: "Bald (1-3 Monate)",
      geplant: "Geplant (3-6 Monate)",
      orientierung: "Erst orientieren",
    };

    const messageWithUrgency = form.urgency
      ? `[Zeitrahmen: ${urgencyLabels[form.urgency] ?? form.urgency}] ${form.message}`
      : form.message;

    const brancheToSectors: Record<string, string[]> = {
      "IT / Software": ["it"],
      "Finanzwesen": ["finance"],
      "Gesundheitswesen": ["health"],
      "Energie": ["energy"],
      "Produktion / Industrie": ["manufacturing"],
      "Transport / Logistik": ["transport"],
      "Handel / E-Commerce": ["retail"],
      "Telekommunikation": ["telecom"],
      "\u00D6ffentlicher Sektor": ["public"],
      "Chemie & Pharma": ["manufacturing", "health"],
    };
    const brancheSectors = brancheToSectors[form.branche] ?? [];
    const allSectors = [...new Set([...form.sectors, ...brancheSectors])];

    return {
      email: form.email,
      contactName: form.contactName,
      companyName: form.companyName,
      phone: form.phone,
      companySize: form.companySize,
      branche: form.branche,
      annualRevenue: form.annualRevenue,
      country: countryCode,
      countryName: countryMeta?.nameDE ?? countryCode,
      sectors: allSectors,
      dataTypes: form.dataTypes,
      activities: form.activities,
      locations: form.locations,
      certifications: form.certifications,
      itStack: form.itStack,
      dataExportCountries: form.dataExportCountries,
      incidentHistory: form.incidentHistory,
      productCategories: form.productCategories,
      marketingClaims: form.marketingClaims,
      isListed: form.isListed,
      maturityAnswers: form.maturityAnswers,
      urgency: form.urgency,
      message: messageWithUrgency,
      gdprConsent: form.gdprConsent,
      commercialConsent: form.commercialConsent,
    };
  }, [form, countryCode, countryMeta]);

  /* ── Submit → Free Preview ── */
  const handleSubmit = useCallback(async () => {
    if (!canProceed) return;
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/report/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.loginRequired) {
          setErrorMessage("Bitte melden Sie sich an, um einen Report zu erstellen.");
        } else {
          setErrorMessage(result.error ?? "Ein Fehler ist aufgetreten.");
        }
        setSubmitStatus("error");
        return;
      }

      setPreviewData(result);
      setSubmitStatus("preview");
      setStep(6); // advance to results preview step
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es erneut.");
      setSubmitStatus("error");
    }
  }, [canProceed, buildPayload]);

  /* ── Purchase PDF ── */
  const handlePurchase = useCallback(async () => {
    if (!previewData?.reportToken) return;
    setSubmitStatus("purchasing");
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportToken: previewData.reportToken }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error ?? "Checkout fehlgeschlagen.");
        setSubmitStatus("preview"); // stay on preview
        return;
      }

      // Redirect to LemonSqueezy hosted checkout
      window.location.href = result.checkoutUrl;
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es erneut.");
      setSubmitStatus("preview");
    }
  }, [previewData]);

  /* ── Summary label helpers ── */
  const sizeLabel = COMPANY_SIZES.find((s) => s.value === form.companySize)?.label ?? "-";
  const employeeLabel = EMPLOYEE_RANGES.find((e) => e.value === form.employeeCount)?.label ?? "-";
  const applicable = form.maturityAnswers.filter(a => a.level > 0);
  const maturityAvg = applicable.length > 0
    ? applicable.reduce((sum, a) => sum + a.level, 0) / applicable.length
    : 0;
  const maturityLabel = maturityAvg < 1.5 ? "Gering" : maturityAvg < 2.5 ? "Mittel" : "Hoch";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-xs font-semibold text-yellow-400">Compliance-Report</span>
              </div>
              {countryMeta && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span>{countryMeta.flag}</span>
                  <span className="text-xs font-semibold text-slate-400">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Ihr pers{"\u00F6"}nlicher{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Compliance-Report
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              In 6 Schritten analysieren wir kostenlos, welche EU-Regulierungen f{"\u00FC"}r Ihr
              Unternehmen relevant sind und welche konkreten Ma{"\u00DF"}nahmen Sie umsetzen sollten.
              Den vollst{"\u00E4"}ndigen PDF-Report erhalten Sie f{"\u00FC"}r 149{"\u00A0"}{"\u20AC"}.
            </p>
          </div>
        </section>

        {/* ── Autosave-Banner ── */}
        {autosaveRestored && submitStatus === "idle" && (
          <div className="max-w-2xl mx-auto px-6 mb-4">
            <div className="rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20 p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-400">Entwurf wiederhergestellt</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ihre vorherigen Angaben wurden automatisch geladen. Sie können genau dort weitermachen.
                </p>
              </div>
              <button
                onClick={resetDraft}
                className="flex-shrink-0 text-xs text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Neu beginnen
              </button>
            </div>
          </div>
        )}

        {/* ── Progress Bar ── */}
        {submitStatus !== "success" && submitStatus !== "preview" && submitStatus !== "purchasing" && (
          <div className="max-w-2xl mx-auto px-6 mb-6">
            {/* Current step title (above indicators) */}
            <div className="text-center mb-3">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
                Schritt {step + 1} von {TOTAL_STEPS}
              </p>
              <p className="text-sm font-semibold text-white">
                {STEP_TITLES[step]}
              </p>
            </div>
            {/* Step indicators — dots only, no overlapping labels */}
            <div className="flex items-center justify-between mb-3 gap-2">
              {STEP_TITLES.map((title, i) => (
                <button
                  key={title}
                  onClick={() => {
                    // Only allow going back to completed steps
                    if (i < step) setStep(i);
                  }}
                  disabled={i > step}
                  aria-label={`Schritt ${i + 1}: ${title}`}
                  title={title}
                  className={`flex items-center justify-center group transition-all flex-shrink-0 ${
                    i > step ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i < step
                        ? "bg-yellow-400 text-slate-900"
                        : i === step
                        ? "bg-yellow-400/20 text-yellow-400 ring-2 ring-yellow-400/40"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {i < step ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="sr-only">{title}</span>
                </button>
              ))}
            </div>
            {/* Bar */}
            <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FACC15, #EAB308)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
              />
            </div>
            <div className="flex items-center justify-end text-[10px] text-slate-600 mt-1.5">
              <span>{progress}%</span>
            </div>
          </div>
        )}

        {/* ── Wizard Steps / Success ── */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {submitStatus === "preview" || submitStatus === "purchasing" ? (
                /* ── Step 6: Free Results Preview + Purchase CTA ── */
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Headline */}
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    >
                      <span className="text-2xl font-black text-yellow-400">{previewData?.regulationsCount ?? 0}</span>
                    </motion.div>
                    <h2 className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-white mb-2">
                      {previewData?.regulationsCount ?? 0} von 14 Regulierungen betreffen Sie
                    </h2>
                    <p className="text-sm text-slate-400">
                      Kostenlose Vorschau Ihrer Analyse — basierend auf Ihren Angaben
                    </p>
                  </div>

                  {/* Regulation Badges */}
                  {previewData && previewData.regulations.length > 0 && (
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Relevante Regulierungen
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {previewData.regulations.map((r) => (
                          <span
                            key={r.key}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                            style={{
                              backgroundColor: `${r.color}12`,
                              borderWidth: 1,
                              borderColor: `${r.color}30`,
                              color: r.color,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: r.color }}
                            />
                            {r.name}
                            <span className="opacity-60 font-normal">
                              ({r.relevance})
                            </span>
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        {previewData.highCount} hoch, {previewData.mediumCount} mittel,{" "}
                        {previewData.regulationsCount - previewData.highCount - previewData.mediumCount} niedrig relevante
                      </div>
                    </div>
                  )}

                  {/* Was Sie beachten sollten: High-Priority-Regulierungen mit Begründung */}
                  {previewData && previewData.regulations.filter(r => r.relevance === "hoch").length > 0 && (
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Was Sie beachten sollten
                      </h3>
                      <div className="space-y-3">
                        {previewData.regulations
                          .filter(r => r.relevance === "hoch")
                          .slice(0, 3)
                          .map((r) => (
                            <div
                              key={r.key}
                              className="rounded-xl p-4"
                              style={{
                                backgroundColor: `${r.color}08`,
                                borderWidth: 1,
                                borderColor: `${r.color}20`,
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className="mt-1 flex-shrink-0 w-2 h-2 rounded-full"
                                  style={{ backgroundColor: r.color }}
                                />
                                <div className="min-w-0">
                                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                                    <span className="text-sm font-bold" style={{ color: r.color }}>
                                      {r.name}
                                    </span>
                                    {r.subtitle && (
                                      <span className="text-[11px] text-slate-500 font-normal">
                                        {r.subtitle}
                                      </span>
                                    )}
                                  </div>
                                  {r.reason && (
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                      {r.reason}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <p className="mt-4 text-[11px] text-slate-500 italic">
                        Vollständige Analyse für alle {previewData.regulationsCount} Regulierungen im PDF-Report.
                      </p>
                    </div>
                  )}

                  {/* Erste Schritte: Top-3-Roadmap-Aktionen */}
                  {previewData && previewData.topActions && previewData.topActions.length > 0 && (
                    <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.02] p-6">
                      <h3 className="text-xs font-semibold text-yellow-400/80 uppercase tracking-wider mb-4">
                        Ihre ersten 3 Schritte
                      </h3>
                      <ol className="space-y-3">
                        {previewData.topActions.map((a, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400/15 text-yellow-400 flex items-center justify-center text-xs font-bold"
                            >
                              {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white font-medium mb-0.5">
                                {a.action}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                <span
                                  className="px-1.5 py-0.5 rounded"
                                  style={{ color: a.color, backgroundColor: `${a.color}10` }}
                                >
                                  {a.regulationName}
                                </span>
                                <span>•</span>
                                <span className="uppercase tracking-wider">{a.phaseLabel}</span>
                                <span>•</span>
                                <span>Aufwand: {a.effort}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Maturity Grade */}
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 text-center">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Reifegrad</p>
                      <div className="text-4xl font-black text-yellow-400 mb-1">{previewData?.maturityGrade ?? "–"}</div>
                      <p className="text-xs text-slate-500">
                        {previewData?.maturityGrade === "A" ? "Sehr gut" :
                         previewData?.maturityGrade === "B" ? "Gut" :
                         previewData?.maturityGrade === "C" ? "Mittel" :
                         previewData?.maturityGrade === "D" ? "Mangelhaft" :
                         previewData?.maturityGrade === "E" ? "Kritisch" : "–"}
                      </p>
                    </div>

                    {/* Next Deadline */}
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 text-center">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">N{"\u00E4"}chste Frist</p>
                      <div className="text-lg font-bold text-white mb-1">
                        {previewData?.nextDeadline
                          ? `${previewData.nextDeadline.daysUntil} Tage`
                          : "–"}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {previewData?.nextDeadline?.label ?? "Keine relevante Frist"}
                      </p>
                    </div>
                  </div>

                  {/* What's included in PDF */}
                  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.03] p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-[Syne] font-bold text-lg text-white">
                          Vollst{"\u00E4"}ndiger PDF-Report
                        </h3>
                        <p className="text-xs text-slate-400">
                          Professionelle Detailanalyse f{"\u00FC"}r Ihr Unternehmen
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {[
                        "Detailanalyse pro Regulierung",
                        "Bu\u00DFgeld-Exposition & Risikoanalyse",
                        "3-Phasen Compliance-Roadmap",
                        "Konkrete Handlungsempfehlungen",
                        "Compliance-Checklisten",
                        "Empfohlene Umsetzungspartner",
                        "L\u00E4nderspezifische Details",
                        "Professionelles gebrandetes PDF",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-xs text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Purchase button */}
                    <button
                      onClick={handlePurchase}
                      disabled={submitStatus === "purchasing"}
                      className="w-full py-4 rounded-xl font-bold text-base text-slate-900 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
                      style={{
                        background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        boxShadow: submitStatus !== "purchasing"
                          ? "0 8px 40px rgba(250,204,21,0.35), 0 2px 10px rgba(250,204,21,0.2)"
                          : "none",
                      }}
                    >
                      {submitStatus === "purchasing" ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Weiterleitung zum Checkout...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                          Vollst{"\u00E4"}ndigen PDF-Report erstellen — 149{"\u00A0"}{"\u20AC"}
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-500 text-center mt-3">
                      Einmalzahlung. Sichere Abwicklung {"\u00FC"}ber LemonSqueezy. EU-USt. inklusive.
                    </p>
                  </div>

                  {/* Error message */}
                  {errorMessage && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-4 flex items-center gap-3" role="alert">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <p className="text-sm text-red-400">{errorMessage}</p>
                    </div>
                  )}

                  {/* Free alternative */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-2">
                      Unsere Guides, Tools und das Wissen bleiben kostenlos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href={`/${locale}/tools`}
                        className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:bg-white/[0.04] transition-all"
                      >
                        Kostenlose Tools nutzen
                      </Link>
                      <Link
                        href={`/${locale}/wissen`}
                        className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:bg-white/[0.04] transition-all"
                      >
                        Wissen-Hub erkunden
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : submitStatus === "success" ? (
                /* ── Success State (after purchase redirect back) ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8 sm:p-12 text-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <motion.svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      aria-hidden="true"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    >
                      <motion.path
                        d="M12 20l6 6 10-10"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <h2 className="font-[Syne] font-extrabold text-2xl text-white mb-3">
                    Ihr Report wird erstellt!
                  </h2>
                  <p className="text-sm text-slate-400 mb-2">
                    Basierend auf Ihren Angaben werden{" "}
                    <span className="text-yellow-400 font-semibold">{previewData?.regulationsCount ?? regulationPreview.length} Regulierungen</span>{" "}
                    analysiert.
                  </p>
                  <p className="text-sm text-slate-400 mb-8">
                    Sie erhalten den PDF-Report in K{"\u00FC"}rze per E-Mail an{" "}
                    <span className="text-white font-medium">{form.email}</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/portal"
                      className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900 text-center"
                      style={{
                        background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                      }}
                    >
                      Zum Portal
                    </Link>
                    <Link
                      href={`/${locale}/tools`}
                      className="px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition-all"
                    >
                      Alle Tools entdecken
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* ── Step Panels ── */
                <motion.div
                  key={`step-${step}`}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                >
                  {/* ═══ Step 1: Unternehmensprofil ═══ */}
                  {step === 0 && (
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="font-[Syne] font-bold text-xl text-white">
                            Unternehmensprofil
                          </h2>
                          <p className="text-xs text-slate-500">Wie k{"\u00F6"}nnen wir Sie erreichen?</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField
                            label="Firmenname"
                            value={form.companyName}
                            onChange={(v) => updateField("companyName", v)}
                            placeholder="Muster GmbH"
                            required
                          />
                          <InputField
                            label="Kontaktname"
                            value={form.contactName}
                            onChange={(v) => updateField("contactName", v)}
                            placeholder="Max Mustermann"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField
                            label="E-Mail"
                            value={form.email}
                            onChange={(v) => updateField("email", v)}
                            placeholder="max@unternehmen.at"
                            type="email"
                            required
                          />
                          <InputField
                            label="Telefon"
                            value={form.phone}
                            onChange={(v) => updateField("phone", v)}
                            placeholder="+43 1 234 5678"
                            type="tel"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ═══ Step 2: Groesse & Branche ═══ */}
                  {step === 1 && (
                    <div className="space-y-6">
                      {/* Employees + Revenue */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-xl text-white">
                              Unternehmensgr{"\u00F6"}{"\u00DF"}e
                            </h2>
                            <p className="text-xs text-slate-500">Mitarbeiteranzahl und Jahresumsatz getrennt angeben</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="employee-select" className="block text-xs font-semibold text-slate-400 mb-1.5">
                              Mitarbeiteranzahl <span className="text-red-400">*</span>
                            </label>
                            <select
                              id="employee-select"
                              value={form.employeeCount}
                              onChange={(e) => {
                                updateField("employeeCount", e.target.value);
                                updateField("companySize", deriveCompanySize(e.target.value, form.annualRevenue));
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/40 transition-colors appearance-none cursor-pointer"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                            >
                              <option value="">Bitte w{"\u00E4"}hlen</option>
                              {EMPLOYEE_RANGES.map((e) => (
                                <option key={e.value} value={e.value}>{e.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="revenue-select" className="block text-xs font-semibold text-slate-400 mb-1.5">
                              Ungef{"\u00E4"}hrer Jahresumsatz
                            </label>
                            <select
                              id="revenue-select"
                              value={form.annualRevenue}
                              onChange={(e) => {
                                updateField("annualRevenue", e.target.value);
                                updateField("companySize", deriveCompanySize(form.employeeCount, e.target.value));
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/40 transition-colors appearance-none cursor-pointer"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                            >
                              <option value="">Bitte w{"\u00E4"}hlen</option>
                              {REVENUE_RANGES.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Derived size indicator */}
                        {form.companySize && (
                          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-400/5 border border-yellow-400/15">
                            <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <span className="text-xs text-yellow-400/80">
                              EU-Einstufung: <span className="font-semibold text-yellow-400">{COMPANY_SIZES.find(s => s.value === form.companySize)?.label}</span>
                              {" "}(basierend auf dem h{"\u00F6"}heren Wert von Mitarbeiter/Umsatz)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Branche */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div>
                          <label htmlFor="branche-select" className="block text-xs font-semibold text-slate-400 mb-1.5">
                            Branche <span className="text-red-400">*</span>
                          </label>
                          <select
                            id="branche-select"
                            value={form.branche}
                            onChange={(e) => updateField("branche", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/40 transition-colors appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                          >
                            <option value="">Bitte w{"\u00E4"}hlen</option>
                            {BRANCHEN.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Kapitalmarktorientierung */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="flex-shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={form.isListed}
                              onChange={(e) => updateField("isListed", e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-5 h-5 rounded border-2 border-white/20 peer-checked:bg-yellow-400 peer-checked:border-yellow-400 transition-colors flex items-center justify-center">
                              {form.isListed && (
                                <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">Börsennotiert / Public Interest Entity</div>
                            <div className="text-xs text-slate-500 mt-1">
                              Kapitalmarktorientiert (geregelter Markt), Bank, Versicherung oder anderweitig PIE?
                              Relevant für CSRD-Berichtspflicht und MAR/Prospekt-VO.
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* ═══ Step 3: Aktivitaeten & Daten ═══ */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* Data Types */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">
                              Datenarten
                            </h2>
                            <p className="text-xs text-slate-500">Welche Daten verarbeiten Sie?</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {DATA_TYPES.map((dt) => (
                            <CheckboxCard
                              key={dt.value}
                              checked={form.dataTypes.includes(dt.value)}
                              onChange={() => toggleArrayValue("dataTypes", dt.value)}
                              label={dt.label}
                              description={dt.desc}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">
                              Aktivit{"\u00E4"}ten
                            </h2>
                            <p className="text-xs text-slate-500">Was trifft auf Ihr Unternehmen zu?</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {ACTIVITIES.map((act) => (
                            <CheckboxCard
                              key={act.value}
                              checked={form.activities.includes(act.value)}
                              onChange={() => toggleArrayValue("activities", act.value)}
                              label={act.label}
                              description={act.desc}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Product Categories */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">Produkte</h2>
                            <p className="text-xs text-slate-500">Welche Produkte/Kategorien stellen Sie her oder vertreiben Sie? (Relevant für DPP, CRA, BaFG, PLD)</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PRODUCT_CATEGORIES.map((p) => (
                            <CheckboxCard
                              key={p.value}
                              label={p.label}
                              description={p.desc}
                              checked={form.productCategories.includes(p.value)}
                              onChange={() => toggleArrayValue("productCategories", p.value)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Marketing Claims */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">Werbeaussagen zu Nachhaltigkeit</h2>
                            <p className="text-xs text-slate-500">Nutzen Sie Umwelt- oder Nachhaltigkeitsclaims? (Relevant für Green Claims &amp; Empowering Consumers Directive)</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {MARKETING_CLAIMS.map((c) => (
                            <CheckboxCard
                              key={c.value}
                              label={c.label}
                              description={c.desc}
                              checked={form.marketingClaims.includes(c.value)}
                              onChange={() => toggleArrayValue("marketingClaims", c.value)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Locations */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">
                              Standorte
                            </h2>
                            <p className="text-xs text-slate-500">Wo sind Sie t{"\u00E4"}tig?</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {LOCATIONS.map((loc) => (
                            <CheckboxCard
                              key={loc.value}
                              checked={form.locations.includes(loc.value)}
                              onChange={() => toggleArrayValue("locations", loc.value)}
                              label={loc.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ═══ Step 4: IT-Kontext & Vorfälle ═══ */}
                  {step === 3 && (
                    <div className="space-y-6">
                      {/* Certifications */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">Zertifizierungen</h2>
                            <p className="text-xs text-slate-500">Welche Standards sind bereits umgesetzt?</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {CERTIFICATIONS.map((c) => (
                            <CheckboxCard
                              key={c.value}
                              label={c.label}
                              description={c.desc}
                              checked={form.certifications.includes(c.value)}
                              onChange={() => toggleArrayValue("certifications", c.value)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* IT Stack */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">IT-Stack</h2>
                            <p className="text-xs text-slate-500">Welche Cloud-/IT-Infrastruktur nutzen Sie? (Mehrfachauswahl)</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {IT_STACK.map((i) => (
                            <CheckboxCard
                              key={i.value}
                              label={i.label}
                              description={i.desc}
                              checked={form.itStack.includes(i.value)}
                              onChange={() => toggleArrayValue("itStack", i.value)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Data Export Countries */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">Datenexport-Länder</h2>
                            <p className="text-xs text-slate-500">Werden Daten außerhalb EU/EWR übertragen? (DSGVO Kap. V)</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {DATA_EXPORT_COUNTRIES.map((c) => (
                            <CheckboxCard
                              key={c.value}
                              label={c.label}
                              description={c.desc}
                              checked={form.dataExportCountries.includes(c.value)}
                              onChange={() => toggleArrayValue("dataExportCountries", c.value)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Incident History */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-lg text-white">Vorfall-Historie</h2>
                            <p className="text-xs text-slate-500">Welche Vorfälle gab es in den letzten 24 Monaten?</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {INCIDENT_HISTORY.map((i) => (
                            <CheckboxCard
                              key={i.value}
                              label={i.label}
                              description={i.desc}
                              checked={form.incidentHistory.includes(i.value)}
                              onChange={() => toggleArrayValue("incidentHistory", i.value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ═══ Step 5: Reifegrad-Schnellcheck ═══ */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-[Syne] font-bold text-xl text-white">
                              Reifegrad-Schnellcheck
                            </h2>
                            <p className="text-xs text-slate-500">Bewerten Sie den aktuellen Stand in 5 Kategorien</p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          {MATURITY_QUESTIONS.map((q, qi) => {
                            const current = form.maturityAnswers.find((a) => a.category === q.category);
                            return (
                              <div key={q.category} className="pb-5 border-b border-white/5 last:border-0 last:pb-0">
                                <p className="text-sm text-white mb-3">
                                  <span className="text-yellow-400/60 font-mono text-xs mr-2">{qi + 1}.</span>
                                  {q.label}
                                </p>
                                <div className="flex gap-2">
                                  {MATURITY_LEVELS.map((ml) => {
                                    const isActive = current?.level === ml.value;
                                    return (
                                      <button
                                        key={ml.value}
                                        onClick={() => updateMaturity(q.category, ml.value)}
                                        className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                          isActive
                                            ? ml.color
                                            : "border-white/5 bg-white/[0.02] text-slate-500 hover:bg-white/[0.04]"
                                        }`}
                                      >
                                        {ml.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Urgency */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <h3 className="font-[Syne] font-bold text-lg text-white mb-4">
                          Dringlichkeit
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {URGENCY_OPTIONS.map((urg) => {
                            const selected = form.urgency === urg.value;
                            return (
                              <button
                                key={urg.value}
                                onClick={() => updateField("urgency", selected ? "" : urg.value)}
                                className={`py-3 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                                  selected
                                    ? urg.color
                                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                                }`}
                              >
                                <span className={`text-xs font-bold block ${selected ? "" : "text-slate-300"}`}>
                                  {urg.label}
                                </span>
                                <span className={`text-[10px] block mt-0.5 ${selected ? "opacity-80" : "text-slate-600"}`}>
                                  {urg.desc}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <h3 className="font-[Syne] font-bold text-lg text-white mb-4">
                          Optionale Nachricht
                        </h3>
                        <textarea
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          rows={3}
                          placeholder="Beschreiben Sie kurz Ihre Compliance-Herausforderung oder spezielle Anforderungen..."
                          className="w-full px-4 py-3 rounded-lg bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-yellow-400/40 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* ═══ Step 6: Zusammenfassung & Absenden ═══ */}
                  {step === 5 && (
                    <div className="space-y-6">
                      {/* Summary Card */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden">
                        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                              </svg>
                            </div>
                            <div>
                              <h2 className="font-[Syne] font-bold text-xl text-white">
                                Zusammenfassung
                              </h2>
                              <p className="text-xs text-slate-500">Pr{"\u00FC"}fen Sie Ihre Angaben</p>
                            </div>
                          </div>

                          {/* Company info */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
                            <SummaryItem label="Firma" value={form.companyName} />
                            <SummaryItem label="Kontakt" value={form.contactName} />
                            <SummaryItem label="E-Mail" value={form.email} />
                            <SummaryItem label="Telefon" value={form.phone || "-"} />
                            <SummaryItem label="Mitarbeiter" value={employeeLabel} />
                            <SummaryItem label="Umsatz" value={form.annualRevenue || "-"} />
                            <SummaryItem label="EU-Einstufung" value={sizeLabel} />
                            <SummaryItem label="Branche" value={form.branche || "-"} />
                            <SummaryItem label="Reifegrad" value={maturityLabel} />
                            <SummaryItem label="Börsennotiert / PIE" value={form.isListed ? "Ja" : "Nein"} />
                          </div>

                          {/* Products */}
                          {form.productCategories.filter((p) => p !== "none").length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Produkte</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.productCategories.filter((p) => p !== "none").map((p) => (
                                  <span key={p} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    {PRODUCT_CATEGORIES.find((x) => x.value === p)?.label ?? p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Marketing Claims */}
                          {form.marketingClaims.filter((c) => c !== "none").length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Werbeaussagen (Nachhaltigkeit)</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.marketingClaims.filter((c) => c !== "none").map((c) => (
                                  <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                    {MARKETING_CLAIMS.find((x) => x.value === c)?.label ?? c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Selected items */}
                          {form.dataTypes.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Datenarten</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.dataTypes.map((dt) => (
                                  <span key={dt} className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                    {DATA_TYPES.find((d) => d.value === dt)?.label ?? dt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.activities.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Aktivit{"\u00E4"}ten</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.activities.map((act) => (
                                  <span key={act} className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    {ACTIVITIES.find((a) => a.value === act)?.label ?? act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.locations.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Standorte</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.locations.map((loc) => (
                                  <span key={loc} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    {LOCATIONS.find((l) => l.value === loc)?.label ?? loc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.certifications.filter((c) => c !== "none").length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Zertifizierungen</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.certifications.filter((c) => c !== "none").map((c) => (
                                  <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    {CERTIFICATIONS.find((x) => x.value === c)?.label ?? c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.itStack.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">IT-Stack</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.itStack.map((s) => (
                                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
                                    {IT_STACK.find((x) => x.value === s)?.label ?? s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.dataExportCountries.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Datenexport</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.dataExportCountries.map((c) => (
                                  <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                                    {DATA_EXPORT_COUNTRIES.find((x) => x.value === c)?.label ?? c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.incidentHistory.filter((i) => i !== "no-incidents").length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Vorfälle (24 Monate)</p>
                              <div className="flex flex-wrap gap-1.5">
                                {form.incidentHistory.filter((i) => i !== "no-incidents").map((i) => (
                                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                                    {INCIDENT_HISTORY.find((x) => x.value === i)?.label ?? i}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {form.urgency && (
                            <div className="mb-3">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Dringlichkeit</p>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                                {URGENCY_OPTIONS.find((u) => u.value === form.urgency)?.label ?? form.urgency}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Regulation preview */}
                        <div className="border-t border-white/5 px-6 sm:px-8 py-5 bg-yellow-400/[0.03]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-400/15 flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-white font-semibold">
                                {regulationPreview.length > 0 ? (
                                  <>
                                    Basierend auf Ihren Angaben werden{" "}
                                    <span className="text-yellow-400">{regulationPreview.length} Regulierungen</span>{" "}
                                    analysiert
                                  </>
                                ) : (
                                  "F\u00FCllen Sie die vorherigen Schritte aus, um relevante Regulierungen zu identifizieren"
                                )}
                              </p>
                              {regulationPreview.length > 0 && (
                                <p className="text-xs text-slate-500 mt-1">
                                  {regulationPreview.filter((r) => r.relevance === "hoch").length} hoch,{" "}
                                  {regulationPreview.filter((r) => r.relevance === "mittel").length} mittel,{" "}
                                  {regulationPreview.filter((r) => r.relevance === "niedrig").length} niedrig relevante
                                </p>
                              )}
                            </div>
                          </div>
                          {regulationPreview.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3 ml-11">
                              {regulationPreview.map((r) => (
                                <span
                                  key={r.key}
                                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                                  style={{
                                    backgroundColor: `${r.color}15`,
                                    borderWidth: 1,
                                    borderColor: `${r.color}30`,
                                    color: r.color,
                                  }}
                                >
                                  {r.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Consent */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8 space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5 flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={form.gdprConsent}
                              onChange={(e) => updateField("gdprConsent", e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              form.gdprConsent
                                ? "border-yellow-400 bg-yellow-400"
                                : "border-white/20 bg-transparent group-hover:border-white/30"
                            }`}>
                              {form.gdprConsent && (
                                <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 leading-relaxed">
                            Ich stimme der Verarbeitung meiner Daten gem{"\u00E4"}{"\u00DF"} der{" "}
                            <Link href={`/${locale}/datenschutz`} target="_blank" rel="noopener noreferrer" className="text-yellow-400/80 underline underline-offset-2 hover:text-yellow-400">
                              Datenschutzerkl{"\u00E4"}rung
                            </Link>{" "}
                            zu und willige in die Erstellung eines personalisierten Compliance-Reports ein.{" "}
                            <span className="text-red-400">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5 flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={form.commercialConsent}
                              onChange={(e) => updateField("commercialConsent", e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              form.commercialConsent
                                ? "border-yellow-400 bg-yellow-400"
                                : "border-white/20 bg-transparent group-hover:border-white/30"
                            }`}>
                              {form.commercialConsent && (
                                <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 leading-relaxed">
                            Ich m{"\u00F6"}chte Informationen zu Compliance-Angeboten und -Partnern erhalten (optional, jederzeit widerrufbar).
                          </span>
                        </label>
                      </div>

                      {/* Error */}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          className="rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-4 flex items-center gap-3"
                        >
                          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          <div>
                            <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
                            <button
                              onClick={handleSubmit}
                              className="text-xs text-red-400/80 underline underline-offset-2 mt-1 hover:text-red-300 cursor-pointer"
                            >
                              Erneut versuchen
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* ── Navigation Buttons ── */}
                  <div className="flex items-center justify-between mt-8">
                    {step > 0 ? (
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Zur{"\u00FC"}ck
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 5 ? (
                      <button
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="px-8 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #FACC15, #EAB308)",
                          boxShadow: canProceed
                            ? "0 8px 32px rgba(250,204,21,0.3)"
                            : "none",
                        }}
                      >
                        Weiter
                      </button>
                    ) : step === 5 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceed || submitStatus === "submitting"}
                        className="px-8 py-3 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                        style={{
                          background: "linear-gradient(135deg, #FACC15, #EAB308)",
                          boxShadow:
                            canProceed && submitStatus !== "submitting"
                              ? "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)"
                              : "none",
                        }}
                      >
                        {submitStatus === "submitting" ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Wird analysiert...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                            Kostenlose Analyse starten
                          </>
                        )}
                      </button>
                    ) : null}
                  </div>

                  {/* Step-specific hints */}
                  {step === 0 && (
                    <p className="text-[11px] text-slate-600 text-center mt-4">
                      <span className="text-red-400">*</span> Pflichtfelder. Ihre Daten werden vertraulich behandelt.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ══════════════════════ Sub-Components ══════════════════════ */

/* ── Text Input Field ── */
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-400 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20 transition-all"
      />
    </div>
  );
}

/* ── Checkbox Card ── */
function CheckboxCard({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string | null;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
        checked
          ? "border-yellow-400/40 bg-yellow-400/10"
          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            checked
              ? "border-yellow-400 bg-yellow-400"
              : "border-white/20 bg-transparent"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>
        <div>
          <span className="text-sm text-white font-medium">{label}</span>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ── Summary Item ── */
function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-white truncate">{value}</p>
    </div>
  );
}
