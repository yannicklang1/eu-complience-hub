"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  companySize: string;
  branche: string;
  annualRevenue: string;
  sectors: string[];
  dataTypes: string[];
  activities: string[];
  locations: string[];
  maturityAnswers: { category: string; level: number }[];
  urgency: string;
  message: string;
  gdprConsent: boolean;
  commercialConsent: boolean;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM: FormData = {
  contactName: "",
  email: "",
  companyName: "",
  phone: "",
  companySize: "",
  branche: "",
  annualRevenue: "",
  sectors: [],
  dataTypes: [],
  activities: [],
  locations: [],
  maturityAnswers: [
    { category: "governance", level: 0 },
    { category: "datenschutz", level: 0 },
    { category: "cybersicherheit", level: 0 },
    { category: "ki", level: 0 },
    { category: "reporting", level: 0 },
  ],
  urgency: "",
  message: "",
  gdprConsent: false,
  commercialConsent: false,
};

/* ── Static Data ── */

const COMPANY_SIZES = [
  {
    value: "micro",
    label: "Kleinstunternehmen",
    description: "1-9 Mitarbeiter, < 2 Mio. \u20AC Umsatz",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    value: "small",
    label: "Kleinunternehmen",
    description: "10-49 Mitarbeiter, < 10 Mio. \u20AC Umsatz",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    value: "medium",
    label: "Mittleres Unternehmen",
    description: "50-249 Mitarbeiter, < 50 Mio. \u20AC Umsatz",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 3v18m4.5-18v18m4.5-18v18m4.5-18v18m4.5-18v18M3.75 3h16.5M3.75 9h16.5m-16.5 6h16.5" />
      </svg>
    ),
  },
  {
    value: "large",
    label: "Gro\u00DFunternehmen",
    description: "250+ Mitarbeiter, > 50 Mio. \u20AC Umsatz",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
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
  { value: "ai", label: "Einsatz oder Entwicklung von KI-Systemen" },
  { value: "software", label: "Software-/Hardware-Produkte mit digitalen Elementen" },
  { value: "critical-infra", label: "Betrieb kritischer Infrastruktur" },
  { value: "online-platform", label: "Online-Plattform / Marktplatz" },
  { value: "esg", label: "Nachhaltigkeitsberichterstattung / ESG" },
  { value: "crypto", label: "Krypto-Assets / Blockchain" },
  { value: "cross-border", label: "Grenz\u00FCberschreitender Datenverkehr" },
  { value: "ecommerce", label: "Elektronischer Gesch\u00E4ftsverkehr" },
  { value: "eid", label: "Elektronische Identifizierung" },
] as const;

const LOCATIONS = [
  { value: "at", label: "\u00D6sterreich" },
  { value: "de", label: "Deutschland" },
  { value: "eu", label: "Anderer EU-/EWR-Staat" },
  { value: "non-eu", label: "Au\u00DFerhalb der EU (mit EU-Kunden)" },
] as const;

const MATURITY_QUESTIONS = [
  { category: "governance", label: "Gibt es eine klar definierte Compliance-Verantwortung?" },
  { category: "datenschutz", label: "Sind Datenschutz-Grundlagen umgesetzt (Verarbeitungsverzeichnis, TOMs)?" },
  { category: "cybersicherheit", label: "Gibt es ein ISMS oder dokumentierte IT-Sicherheitsma\u00DFnahmen?" },
  { category: "ki", label: "Sind eingesetzte KI-Systeme inventarisiert und klassifiziert?" },
  { category: "reporting", label: "Werden Compliance-Ma\u00DFnahmen dokumentiert und auditiert?" },
] as const;

const MATURITY_LEVELS = [
  { value: 0, label: "Nicht umgesetzt", color: "border-red-500/30 bg-red-500/10 text-red-400" },
  { value: 1, label: "Teilweise", color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" },
  { value: 2, label: "Vollst\u00E4ndig", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" },
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
  "Reifegrad-Schnellcheck",
  "Zusammenfassung",
] as const;

const TOTAL_STEPS = 5;

/* ── Animation variants ── */
const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/* ══════════════════════════ Component ══════════════════════════ */

export default function KontaktContent() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  /* ── Update helpers ── */
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayValue = useCallback(
    (key: "sectors" | "dataTypes" | "activities" | "locations", value: string) => {
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
        return form.companySize.length > 0 && form.branche.length > 0;
      case 2:
        return true; // all optional, but user can proceed
      case 3:
        return true; // maturity defaults are set, urgency optional
      case 4:
        return form.gdprConsent;
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

    return evaluateRegulations(answers);
  }, [form.companySize, form.branche, form.dataTypes, form.activities, form.locations]);

  /* ── Submit ── */
  const handleSubmit = useCallback(async () => {
    if (!canProceed) return;
    setSubmitStatus("submitting");
    setErrorMessage("");

    const urgencyLabels: Record<string, string> = {
      dringend: "Dringend (n\u00E4chste 4 Wochen)",
      bald: "Bald (1-3 Monate)",
      geplant: "Geplant (3-6 Monate)",
      orientierung: "Erst orientieren",
    };

    const messageWithUrgency = form.urgency
      ? `[Zeitrahmen: ${urgencyLabels[form.urgency] ?? form.urgency}] ${form.message}`
      : form.message;

    // Map branche to sectors for the evaluation engine
    const brancheToSectors: Record<string, string[]> = {
      "IT / Software": ["it"],
      "Finanzwesen": ["finance"],
      "Gesundheitswesen": ["health"],
      "Energie": ["energy"],
      "Produktion / Industrie": ["manufacturing"],
      "Transport / Logistik": ["transport"],
      "Handel / E-Commerce": ["retail"],
      "Telekommunikation": ["telecom"],
      "Öffentlicher Sektor": ["public"],
      "Chemie & Pharma": ["manufacturing", "health"],
    };
    const brancheSectors = brancheToSectors[form.branche] ?? [];
    const allSectors = [...new Set([...form.sectors, ...brancheSectors])];

    const payload = {
      email: form.email,
      contactName: form.contactName,
      companyName: form.companyName,
      phone: form.phone,
      companySize: form.companySize,
      branche: form.branche,
      annualRevenue: form.annualRevenue,
      sectors: allSectors,
      dataTypes: form.dataTypes,
      activities: form.activities,
      locations: form.locations,
      maturityAnswers: form.maturityAnswers,
      urgency: form.urgency,
      message: messageWithUrgency,
      gdprConsent: form.gdprConsent,
      commercialConsent: form.commercialConsent,
    };

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error ?? "Ein Fehler ist aufgetreten.");
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es erneut.");
      setSubmitStatus("error");
    }
  }, [canProceed, form]);

  /* ── Summary label helpers ── */
  const sizeLabel = COMPANY_SIZES.find((s) => s.value === form.companySize)?.label ?? "-";
  const maturityAvg = form.maturityAnswers.reduce((sum, a) => sum + a.level, 0) / form.maturityAnswers.length;
  const maturityLabel = maturityAvg < 0.7 ? "Gering" : maturityAvg < 1.4 ? "Mittel" : "Hoch";

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-5">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-xs font-semibold text-yellow-400">Kostenloser Compliance-Report</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Ihr pers{"\u00F6"}nlicher{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Compliance-Report
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              In 5 Schritten analysieren wir, welche EU-Regulierungen f{"\u00FC"}r Ihr
              Unternehmen relevant sind und wie gut Sie aufgestellt sind.
            </p>
          </div>
        </section>

        {/* ── Progress Bar ── */}
        {submitStatus !== "success" && (
          <div className="max-w-2xl mx-auto px-6 mb-6">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-3">
              {STEP_TITLES.map((title, i) => (
                <button
                  key={title}
                  onClick={() => {
                    // Only allow going back to completed steps
                    if (i < step) setStep(i);
                  }}
                  disabled={i > step}
                  className={`flex flex-col items-center gap-1 group transition-all ${
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
                  <span className={`text-[10px] font-medium hidden sm:block ${
                    i <= step ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {title}
                  </span>
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
            <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1.5">
              <span>Schritt {step + 1} von {TOTAL_STEPS}</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        {/* ── Wizard Steps / Success ── */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                /* ── Success State ── */
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
                    <span className="text-yellow-400 font-semibold">{regulationPreview.length} Regulierungen</span>{" "}
                    analysiert.
                  </p>
                  <p className="text-sm text-slate-400 mb-8">
                    Ihr personalisierter Compliance-Report wurde an{" "}
                    <span className="text-white font-medium">{form.email}</span>{" "}
                    gesendet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/tools"
                      className="px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition-all"
                    >
                      Alle Tools entdecken
                    </Link>
                    <Link
                      href="/"
                      className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900 text-center"
                      style={{
                        background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                      }}
                    >
                      Zur Startseite
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
                      {/* Company Size Cards */}
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
                            <p className="text-xs text-slate-500">W{"\u00E4"}hlen Sie Ihre Unternehmensgr{"\u00F6"}{"\u00DF"}e</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {COMPANY_SIZES.map((size) => {
                            const selected = form.companySize === size.value;
                            return (
                              <button
                                key={size.value}
                                onClick={() => updateField("companySize", size.value)}
                                className={`text-left px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                  selected
                                    ? "border-yellow-400/40 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.08)]"
                                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 transition-colors ${selected ? "text-yellow-400" : "text-slate-500"}`}>
                                    {size.icon}
                                  </div>
                                  <div>
                                    <span className={`text-sm font-semibold block ${selected ? "text-yellow-400" : "text-white"}`}>
                                      {size.label}
                                    </span>
                                    <span className="text-xs text-slate-500 mt-0.5 block">
                                      {size.description}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Branche + Revenue */}
                      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <div>
                            <label htmlFor="revenue-select" className="block text-xs font-semibold text-slate-400 mb-1.5">
                              Ungef{"\u00E4"}hrer Jahresumsatz
                            </label>
                            <select
                              id="revenue-select"
                              value={form.annualRevenue}
                              onChange={(e) => updateField("annualRevenue", e.target.value)}
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

                  {/* ═══ Step 4: Reifegrad-Schnellcheck ═══ */}
                  {step === 3 && (
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

                  {/* ═══ Step 5: Zusammenfassung & Absenden ═══ */}
                  {step === 4 && (
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
                            <SummaryItem label="Gr\u00F6\u00DFe" value={sizeLabel} />
                            <SummaryItem label="Branche" value={form.branche || "-"} />
                            <SummaryItem label="Umsatz" value={form.annualRevenue || "-"} />
                            <SummaryItem label="Reifegrad" value={maturityLabel} />
                          </div>

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
                            <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-yellow-400/80 underline underline-offset-2 hover:text-yellow-400">
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

                    {step < TOTAL_STEPS - 1 ? (
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
                    ) : (
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
                            Report wird erstellt...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            Compliance-Report erstellen
                          </>
                        )}
                      </button>
                    )}
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
