"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

/* ══════════════════════════════════════════════════════════════
   Regulation Finder — Interactive Quiz (English)
   Determines which EU regulations apply to a company
   ══════════════════════════════════════════════════════════════ */

/* ── Types ── */
interface Answer {
  questionId: string;
  values: string[];
}

interface Regulation {
  key: string;
  name: string;
  subtitle: string;
  href: string;
  relevance: "high" | "medium" | "low";
  color: string;
  reason: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: "single" | "multi";
  options: { value: string; label: string; description?: string }[];
}

/* ── Questions ── */
const QUESTIONS: Question[] = [
  {
    id: "size",
    title: "How large is your company?",
    subtitle: "Employee count and annual turnover determine many obligations",
    type: "single",
    options: [
      { value: "micro", label: "Micro-enterprise", description: "< 10 employees, < EUR 2M turnover" },
      { value: "small", label: "Small enterprise", description: "10–49 employees, < EUR 10M turnover" },
      { value: "medium", label: "Medium-sized enterprise", description: "50–249 employees, < EUR 50M turnover" },
      { value: "large", label: "Large enterprise", description: "250+ employees or > EUR 50M turnover" },
    ],
  },
  {
    id: "sector",
    title: "Which industry are you in?",
    subtitle: "Select all applicable sectors",
    type: "multi",
    options: [
      { value: "it", label: "IT / Software / Cloud" },
      { value: "finance", label: "Financial Services / Insurance" },
      { value: "health", label: "Healthcare / Pharma" },
      { value: "energy", label: "Energy / Utilities" },
      { value: "manufacturing", label: "Manufacturing / Industry" },
      { value: "transport", label: "Transport / Logistics" },
      { value: "retail", label: "Retail / E-Commerce" },
      { value: "telecom", label: "Telecommunications" },
      { value: "public", label: "Public Sector" },
      { value: "other", label: "Other Industry" },
    ],
  },
  {
    id: "data",
    title: "What types of data do you process?",
    subtitle: "Select all applicable categories",
    type: "multi",
    options: [
      { value: "personal", label: "Personal data", description: "Customers, employees, users" },
      { value: "sensitive", label: "Special categories", description: "Health, religion, biometrics" },
      { value: "children", label: "Data of minors" },
      { value: "financial", label: "Financial / payment data" },
      { value: "b2b", label: "B2B / business data only" },
      { value: "iot", label: "IoT / sensor data" },
    ],
  },
  {
    id: "activities",
    title: "Which activities apply to you?",
    subtitle: "Select all applicable activities",
    type: "multi",
    options: [
      { value: "ai", label: "Use or development of AI systems" },
      { value: "software", label: "Software or hardware products with digital elements" },
      { value: "critical-infra", label: "Operation of critical infrastructure" },
      { value: "online-platform", label: "Online platform / marketplace / social network" },
      { value: "esg", label: "Sustainability reporting / ESG" },
      { value: "crypto", label: "Crypto assets / Blockchain / DeFi" },
      { value: "cross-border", label: "Cross-border data transfers" },
      { value: "ecommerce", label: "Electronic commerce" },
      { value: "eid", label: "Electronic identification / trust services" },
    ],
  },
  {
    id: "location",
    title: "Where is your company based / operating?",
    subtitle: "Select all applicable regions",
    type: "multi",
    options: [
      { value: "at", label: "Austria" },
      { value: "de", label: "Germany" },
      { value: "eu", label: "Other EU/EEA state" },
      { value: "non-eu", label: "Outside the EU (with EU customers)" },
    ],
  },
];

/* ── Evaluation Logic ── */
function evaluateRegulations(answers: Answer[]): Regulation[] {
  const get = (id: string): string[] =>
    answers.find((a) => a.questionId === id)?.values ?? [];

  const size = get("size")[0] ?? "small";
  const sectors = get("sector");
  const data = get("data");
  const activities = get("activities");
  const locations = get("location");

  const results: Regulation[] = [];
  const isEU = locations.some((l) => ["at", "de", "eu"].includes(l));
  const hasEUCustomers = locations.includes("non-eu") || isEU;

  /* ── GDPR ── */
  if (data.some((d) => ["personal", "sensitive", "children", "financial"].includes(d)) && hasEUCustomers) {
    results.push({
      key: "dsgvo",
      name: "GDPR",
      subtitle: "General Data Protection Regulation",
      href: "/dsgvo",
      relevance: "high",
      color: "#2563eb",
      reason: "You process personal data with an EU connection.",
    });
  }

  /* ── NIS2 / NISG 2026 ── */
  const nis2Sectors = ["it", "energy", "health", "transport", "finance", "telecom", "public"];
  const isNis2Sector = sectors.some((s) => nis2Sectors.includes(s));
  const isNis2Size = ["medium", "large"].includes(size);
  const isCriticalInfra = activities.includes("critical-infra");

  if ((isNis2Sector && isNis2Size) || isCriticalInfra) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Network and Information Security",
      href: "/nisg-2026",
      relevance: "high",
      color: "#dc2626",
      reason: isNis2Size
        ? "Your company falls under NIS2 due to its sector and size."
        : "You operate critical infrastructure.",
    });
  } else if (isNis2Sector && !isNis2Size) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Network and Information Security",
      href: "/nisg-2026",
      relevance: "low",
      color: "#dc2626",
      reason: "Your sector falls under NIS2, but your company is below the thresholds.",
    });
  }

  /* ── AI Act ── */
  if (activities.includes("ai")) {
    results.push({
      key: "ai-act",
      name: "EU AI Act",
      subtitle: "Artificial Intelligence Regulation",
      href: "/eu-ai-act",
      relevance: "high",
      color: "#7c3aed",
      reason: "You use or develop AI systems.",
    });
  }

  /* ── DORA ── */
  if (sectors.includes("finance") || (sectors.includes("it") && data.includes("financial"))) {
    results.push({
      key: "dora",
      name: "DORA",
      subtitle: "Digital Operational Resilience Act",
      href: "/dora",
      relevance: sectors.includes("finance") ? "high" : "medium",
      color: "#0891b2",
      reason: sectors.includes("finance")
        ? "As a financial entity, you fall directly under DORA."
        : "As an IT service provider for financial companies, you may qualify as a critical ICT third-party provider.",
    });
  }

  /* ── CRA ── */
  if (activities.includes("software") || (sectors.includes("manufacturing") && activities.includes("ai"))) {
    results.push({
      key: "cra",
      name: "Cyber Resilience Act",
      subtitle: "Cybersecurity for Products",
      href: "/cra",
      relevance: "high",
      color: "#ea580c",
      reason: "You manufacture or distribute products with digital elements.",
    });
  }

  /* ── CSRD / ESG ── */
  if (activities.includes("esg") || (size === "large" && isEU)) {
    results.push({
      key: "csrd",
      name: "CSRD / ESG",
      subtitle: "Sustainability Reporting",
      href: "/csrd-esg",
      relevance: size === "large" ? "high" : "medium",
      color: "#16a34a",
      reason: size === "large"
        ? "As a large EU company, you are required to produce sustainability reports."
        : "Sustainability reporting may become relevant for you.",
    });
  }

  /* ── DSA ── */
  if (activities.includes("online-platform")) {
    results.push({
      key: "dsa",
      name: "Digital Services Act",
      subtitle: "Platform Regulation",
      href: "/dsa",
      relevance: "high",
      color: "#6366f1",
      reason: "As an online platform or marketplace, you fall under the DSA.",
    });
  }

  /* ── MiCA ── */
  if (activities.includes("crypto")) {
    results.push({
      key: "mica",
      name: "MiCA",
      subtitle: "Markets in Crypto-Assets",
      href: "/mica",
      relevance: "high",
      color: "#f59e0b",
      reason: "You are active in the crypto assets / blockchain space.",
    });
  }

  /* ── Data Act ── */
  if (data.includes("iot") || (sectors.includes("manufacturing") && hasEUCustomers)) {
    results.push({
      key: "data-act",
      name: "Data Act",
      subtitle: "Data Access Regulation",
      href: "/data-act",
      relevance: data.includes("iot") ? "high" : "medium",
      color: "#0d9488",
      reason: data.includes("iot")
        ? "You process IoT/sensor data and must provide data access."
        : "As a product manufacturer, data access obligations may apply to you.",
    });
  }

  /* ── ePrivacy ── */
  if (activities.includes("ecommerce") || data.includes("personal")) {
    const isDirectlyAffected = activities.includes("ecommerce");
    results.push({
      key: "eprivacy",
      name: "ePrivacy",
      subtitle: "Privacy in Electronic Communications",
      href: "/eprivacy",
      relevance: isDirectlyAffected ? "medium" : "low",
      color: "#8b5cf6",
      reason: isDirectlyAffected
        ? "ePrivacy obligations (cookies, tracking) apply to electronic commerce."
        : "Cookie/tracking rules also apply to your website.",
    });
  }

  /* ── eIDAS ── */
  if (activities.includes("eid") || sectors.includes("public")) {
    results.push({
      key: "eidas",
      name: "eIDAS 2.0",
      subtitle: "Electronic Identification",
      href: "/eidas",
      relevance: activities.includes("eid") ? "high" : "medium",
      color: "#059669",
      reason: activities.includes("eid")
        ? "You offer electronic identification or trust services."
        : "In the public sector, eIDAS-compliant identification is relevant.",
    });
  }

  /* ── Product Liability ── */
  if (activities.includes("software") || sectors.includes("manufacturing")) {
    results.push({
      key: "produkthaftung",
      name: "EU Product Liability",
      subtitle: "New Product Liability Directive",
      href: "/produkthaftung",
      relevance: "medium",
      color: "#b91c1c",
      reason: "The new Product Liability Directive also covers software and digital products.",
    });
  }

  /* ── EHDS ── */
  if (sectors.includes("health")) {
    results.push({
      key: "ehds",
      name: "EHDS",
      subtitle: "European Health Data Space",
      href: "/ehds",
      relevance: "medium",
      color: "#0ea5e9",
      reason: "The European Health Data Space is relevant in the healthcare sector.",
    });
  }

  /* ── Sort by relevance ── */
  const order = { high: 0, medium: 1, low: 2 };
  results.sort((a, b) => order[a.relevance] - order[b.relevance]);

  return results;
}

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function RegulierungFinderToolEN() {
  const { locale } = useTranslations();
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [step, setStep] = useState(0); // 0..QUESTIONS.length = quiz, QUESTIONS.length = results
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);

  const totalSteps = QUESTIONS.length;
  const isResults = step >= totalSteps;
  const currentQ = !isResults ? QUESTIONS[step] : null;
  const progress = Math.round((step / totalSteps) * 100);

  const handleSelect = useCallback(
    (value: string) => {
      if (!currentQ) return;

      if (currentQ.type === "single") {
        setCurrentSelection([value]);
      } else {
        setCurrentSelection((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value]
        );
      }
    },
    [currentQ]
  );

  const handleNext = useCallback(() => {
    if (currentSelection.length === 0) return;

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== QUESTIONS[step].id),
      { questionId: QUESTIONS[step].id, values: currentSelection },
    ];
    setAnswers(newAnswers);
    setCurrentSelection([]);
    setStep((s) => s + 1);
  }, [currentSelection, answers, step]);

  const handleBack = useCallback(() => {
    if (step === 0) return;
    const prevQ = QUESTIONS[step - 1];
    const prevAnswer = answers.find((a) => a.questionId === prevQ.id);
    setCurrentSelection(prevAnswer?.values ?? []);
    setStep((s) => s - 1);
  }, [step, answers]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setCurrentSelection([]);
  }, []);

  const results = isResults ? evaluateRegulations(answers) : [];

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
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                <span className="text-xs font-semibold text-yellow-400">Free Self-Assessment</span>
              </div>
              {countryMeta && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Regulation
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {" "}Finder
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Find out in a few steps which EU regulations are relevant to your company.
            </p>
          </div>
        </section>

        {/* ── Progress Bar ── */}
        {!isResults && (
          <div className="max-w-2xl mx-auto px-6 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FACC15, #EAB308)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
              />
            </div>
          </div>
        )}

        {/* ── Quiz / Results ── */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {!isResults && currentQ ? (
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                >
                  <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                    <h2 className="font-[Syne] font-bold text-xl text-white mb-2">
                      {currentQ.title}
                    </h2>
                    <p className="text-sm text-slate-400 mb-6">
                      {currentQ.subtitle}
                    </p>

                    <div className="space-y-2">
                      {currentQ.options.map((opt) => {
                        const selected = currentSelection.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                              selected
                                ? "border-yellow-400/40 bg-yellow-400/10"
                                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-${currentQ.type === "single" ? "full" : "md"} border-2 flex items-center justify-center transition-colors ${
                                  selected
                                    ? "border-yellow-400 bg-yellow-400"
                                    : "border-white/20 bg-transparent"
                                }`}
                              >
                                {selected && (
                                  <svg
                                    className="w-3 h-3 text-slate-900"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <span className="text-sm text-white font-medium">
                                  {opt.label}
                                </span>
                                {opt.description && (
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    {opt.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                      <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentSelection.length === 0}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #FACC15, #EAB308)",
                          boxShadow:
                            currentSelection.length > 0
                              ? "0 8px 32px rgba(250,204,21,0.3)"
                              : "none",
                        }}
                      >
                        {step === totalSteps - 1 ? "Evaluate" : "Next"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : isResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Results Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-yellow-400/15 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-white mb-2">
                      Your Regulations
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {results.length === 0
                        ? "Based on your responses, no clear regulations could be identified."
                        : `${results.filter((r) => r.relevance === "high").length} highly relevant, ${results.filter((r) => r.relevance === "medium").length} moderately relevant${results.filter((r) => r.relevance === "low").length > 0 ? `, ${results.filter((r) => r.relevance === "low").length} low relevance` : ""} regulations identified.`}
                    </p>
                  </div>

                  {/* Results Cards */}
                  <div className="space-y-3">
                    {results.map((reg, i) => (
                      <motion.div
                        key={reg.key}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <Link
                          href={`/${locale}${reg.href}`}
                          className="block rounded-2xl border border-white/5 bg-slate-900/40 p-5 sm:p-6 hover:bg-slate-900/60 hover:border-white/10 transition-all duration-200 group"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: `${reg.color}20` }}
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: reg.color }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-[Syne] font-bold text-white text-base group-hover:text-yellow-400 transition-colors">
                                  {reg.name}
                                </h3>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                                    reg.relevance === "high"
                                      ? "bg-red-500/15 text-red-400"
                                      : reg.relevance === "medium"
                                      ? "bg-yellow-500/15 text-yellow-400"
                                      : "bg-slate-500/15 text-slate-400"
                                  }`}
                                >
                                  {reg.relevance}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mb-2">{reg.subtitle}</p>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {reg.reason}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-slate-600 group-hover:text-yellow-400 transition-colors flex-shrink-0 mt-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRestart}
                      className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition-all cursor-pointer"
                    >
                      Start again
                    </button>
                    <Link
                      href={`/${locale}/tools/compliance-checkliste`}
                      className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-900 text-center transition-all"
                      style={{
                        background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                      }}
                    >
                      Go to Compliance Checklist
                    </Link>
                  </div>

                  {/* Next Steps — Cross-links to other tools */}
                  <div className="mt-8">
                    <ToolNextSteps
                      currentTool="regulierung-finder"
                      subtext="Now you know which regulations are relevant. Deepen your analysis:"
                    />
                  </div>

                  {/* CTA Card */}
                  <div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-6 text-center">
                    <p className="text-sm text-slate-300 mb-3">
                      Would you like a personalised compliance report?
                    </p>
                    <Link
                      href={`/${locale}/kontakt`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Create a free compliance report
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
