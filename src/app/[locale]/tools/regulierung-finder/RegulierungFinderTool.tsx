"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Regulierung-Finder — Interactive Quiz
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
  relevance: "hoch" | "mittel" | "niedrig";
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
    title: "Wie groß ist Ihr Unternehmen?",
    subtitle: "Mitarbeiterzahl und Jahresumsatz bestimmen viele Pflichten",
    type: "single",
    options: [
      { value: "micro", label: "Kleinstunternehmen", description: "< 10 Mitarbeiter, < 2 Mio. € Umsatz" },
      { value: "small", label: "Kleinunternehmen", description: "10–49 Mitarbeiter, < 10 Mio. € Umsatz" },
      { value: "medium", label: "Mittleres Unternehmen", description: "50–249 Mitarbeiter, < 50 Mio. € Umsatz" },
      { value: "large", label: "Großunternehmen", description: "250+ Mitarbeiter oder > 50 Mio. € Umsatz" },
    ],
  },
  {
    id: "sector",
    title: "In welcher Branche sind Sie tätig?",
    subtitle: "Wählen Sie alle zutreffenden Bereiche",
    type: "multi",
    options: [
      { value: "it", label: "IT / Software / Cloud" },
      { value: "finance", label: "Finanzwesen / Versicherung" },
      { value: "health", label: "Gesundheitswesen / Pharma" },
      { value: "energy", label: "Energie / Versorgung" },
      { value: "manufacturing", label: "Produktion / Industrie" },
      { value: "transport", label: "Transport / Logistik" },
      { value: "retail", label: "Handel / E-Commerce" },
      { value: "telecom", label: "Telekommunikation" },
      { value: "public", label: "Öffentlicher Sektor" },
      { value: "other", label: "Andere Branche" },
    ],
  },
  {
    id: "data",
    title: "Welche Daten verarbeiten Sie?",
    subtitle: "Wählen Sie alle zutreffenden Kategorien",
    type: "multi",
    options: [
      { value: "personal", label: "Personenbezogene Daten", description: "Kunden, Mitarbeiter, Nutzer" },
      { value: "sensitive", label: "Besondere Kategorien", description: "Gesundheit, Religion, Biometrie" },
      { value: "children", label: "Daten von Minderjährigen" },
      { value: "financial", label: "Finanzdaten / Zahlungsdaten" },
      { value: "b2b", label: "Nur B2B-/Geschäftsdaten" },
      { value: "iot", label: "IoT-/Sensordaten" },
    ],
  },
  {
    id: "activities",
    title: "Welche Aktivitäten treffen auf Sie zu?",
    subtitle: "Wählen Sie alle zutreffenden Tätigkeiten",
    type: "multi",
    options: [
      { value: "ai", label: "Einsatz oder Entwicklung von KI-Systemen" },
      { value: "software", label: "Software- oder Hardware-Produkte mit digitalen Elementen" },
      { value: "critical-infra", label: "Betrieb kritischer Infrastruktur" },
      { value: "online-platform", label: "Online-Plattform / Marktplatz / Soziales Netzwerk" },
      { value: "esg", label: "Nachhaltigkeitsberichterstattung / ESG" },
      { value: "crypto", label: "Krypto-Assets / Blockchain / DeFi" },
      { value: "cross-border", label: "Grenzüberschreitender Datenverkehr" },
      { value: "ecommerce", label: "Elektronischer Geschäftsverkehr" },
      { value: "eid", label: "Elektronische Identifizierung / Vertrauensdienste" },
    ],
  },
  {
    id: "location",
    title: "Wo ist Ihr Unternehmen ansässig / tätig?",
    subtitle: "Wählen Sie alle zutreffenden Regionen",
    type: "multi",
    options: [
      { value: "at", label: "Österreich" },
      { value: "de", label: "Deutschland" },
      { value: "eu", label: "Anderer EU-/EWR-Staat" },
      { value: "non-eu", label: "Außerhalb der EU (mit EU-Kunden)" },
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

  /* ── DSGVO ── */
  if (data.some((d) => ["personal", "sensitive", "children", "financial"].includes(d)) && hasEUCustomers) {
    results.push({
      key: "dsgvo",
      name: "DSGVO",
      subtitle: "Datenschutz-Grundverordnung",
      href: "/dsgvo",
      relevance: "hoch",
      color: "#2563eb",
      reason: "Sie verarbeiten personenbezogene Daten mit EU-Bezug.",
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
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: isCriticalInfra ? "hoch" : "hoch",
      color: "#dc2626",
      reason: isNis2Size
        ? "Ihr Unternehmen fällt aufgrund von Branche und Größe unter NIS2."
        : "Sie betreiben kritische Infrastruktur.",
    });
  } else if (isNis2Sector && !isNis2Size) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: "niedrig",
      color: "#dc2626",
      reason: "Ihre Branche fällt unter NIS2, aber Ihr Unternehmen liegt unter den Schwellenwerten.",
    });
  }

  /* ── AI Act ── */
  if (activities.includes("ai")) {
    results.push({
      key: "ai-act",
      name: "EU AI Act",
      subtitle: "KI-Verordnung",
      href: "/eu-ai-act",
      relevance: "hoch",
      color: "#7c3aed",
      reason: "Sie setzen KI-Systeme ein oder entwickeln solche.",
    });
  }

  /* ── DORA ── */
  if (sectors.includes("finance") || (sectors.includes("it") && data.includes("financial"))) {
    results.push({
      key: "dora",
      name: "DORA",
      subtitle: "Digital Operational Resilience Act",
      href: "/dora",
      relevance: sectors.includes("finance") ? "hoch" : "mittel",
      color: "#0891b2",
      reason: sectors.includes("finance")
        ? "Als Finanzunternehmen fallen Sie direkt unter DORA."
        : "Als IT-Dienstleister für Finanzunternehmen könnten Sie als kritischer IKT-Drittanbieter gelten.",
    });
  }

  /* ── CRA ── */
  if (activities.includes("software") || (sectors.includes("manufacturing") && activities.includes("ai"))) {
    results.push({
      key: "cra",
      name: "Cyber Resilience Act",
      subtitle: "Cybersicherheit für Produkte",
      href: "/cra",
      relevance: "hoch",
      color: "#ea580c",
      reason: "Sie stellen Produkte mit digitalen Elementen her oder vertreiben diese.",
    });
  }

  /* ── CSRD / ESG ── */
  if (activities.includes("esg") || (size === "large" && isEU)) {
    results.push({
      key: "csrd",
      name: "CSRD / ESG",
      subtitle: "Nachhaltigkeitsberichterstattung",
      href: "/csrd-esg",
      relevance: size === "large" ? "hoch" : "mittel",
      color: "#16a34a",
      reason: size === "large"
        ? "Als großes EU-Unternehmen sind Sie zur Nachhaltigkeitsberichterstattung verpflichtet."
        : "Nachhaltigkeitsberichterstattung könnte für Sie relevant werden.",
    });
  }

  /* ── DSA ── */
  if (activities.includes("online-platform")) {
    results.push({
      key: "dsa",
      name: "Digital Services Act",
      subtitle: "Plattformregulierung",
      href: "/dsa",
      relevance: "hoch",
      color: "#6366f1",
      reason: "Als Online-Plattform oder Marktplatz fallen Sie unter den DSA.",
    });
  }

  /* ── MiCA ── */
  if (activities.includes("crypto")) {
    results.push({
      key: "mica",
      name: "MiCA",
      subtitle: "Markets in Crypto-Assets",
      href: "/mica",
      relevance: "hoch",
      color: "#f59e0b",
      reason: "Sie sind im Bereich Krypto-Assets / Blockchain tätig.",
    });
  }

  /* ── Data Act ── */
  if (data.includes("iot") || (sectors.includes("manufacturing") && hasEUCustomers)) {
    results.push({
      key: "data-act",
      name: "Data Act",
      subtitle: "Datenzugangsverordnung",
      href: "/data-act",
      relevance: data.includes("iot") ? "hoch" : "mittel",
      color: "#0d9488",
      reason: data.includes("iot")
        ? "Sie verarbeiten IoT-/Sensordaten und müssen Datenzugang gewähren."
        : "Als Produkthersteller könnten Datenzugangspflichten auf Sie zukommen.",
    });
  }

  /* ── ePrivacy ── */
  if (activities.includes("ecommerce") || data.includes("personal")) {
    const isDirectlyAffected = activities.includes("ecommerce");
    results.push({
      key: "eprivacy",
      name: "ePrivacy",
      subtitle: "Datenschutz in der elektronischen Kommunikation",
      href: "/eprivacy",
      relevance: isDirectlyAffected ? "mittel" : "niedrig",
      color: "#8b5cf6",
      reason: isDirectlyAffected
        ? "Für elektronischen Geschäftsverkehr gelten ePrivacy-Pflichten (Cookies, Tracking)."
        : "Cookie-/Tracking-Regelungen betreffen auch Ihre Website.",
    });
  }

  /* ── eIDAS ── */
  if (activities.includes("eid") || sectors.includes("public")) {
    results.push({
      key: "eidas",
      name: "eIDAS 2.0",
      subtitle: "Elektronische Identifizierung",
      href: "/eidas",
      relevance: activities.includes("eid") ? "hoch" : "mittel",
      color: "#059669",
      reason: activities.includes("eid")
        ? "Sie bieten elektronische Identifizierung oder Vertrauensdienste an."
        : "Im öffentlichen Sektor sind eIDAS-konforme Identifizierungen relevant.",
    });
  }

  /* ── Produkthaftung ── */
  if (activities.includes("software") || sectors.includes("manufacturing")) {
    results.push({
      key: "produkthaftung",
      name: "EU-Produkthaftung",
      subtitle: "Neue Produkthaftungsrichtlinie",
      href: "/produkthaftung",
      relevance: "mittel",
      color: "#b91c1c",
      reason: "Die neue Produkthaftungsrichtlinie erstreckt sich auch auf Software und digitale Produkte.",
    });
  }

  /* ── EHDS ── */
  if (sectors.includes("health")) {
    results.push({
      key: "ehds",
      name: "EHDS",
      subtitle: "European Health Data Space",
      href: "/ehds",
      relevance: "mittel",
      color: "#0ea5e9",
      reason: "Im Gesundheitswesen wird der EU-Gesundheitsdatenraum relevant.",
    });
  }

  /* ── Sort by relevance ── */
  const order = { hoch: 0, mittel: 1, niedrig: 2 };
  results.sort((a, b) => order[a.relevance] - order[b.relevance]);

  return results;
}

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function RegulierungFinderTool() {
  const { locale } = useTranslations();
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-5">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              <span className="text-xs font-semibold text-yellow-400">Kostenloser Selbst-Check</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Regulierung-
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Finder
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Finden Sie in wenigen Schritten heraus, welche EU-Regulierungen für Ihr Unternehmen relevant sind.
            </p>
          </div>
        </section>

        {/* ── Progress Bar ── */}
        {!isResults && (
          <div className="max-w-2xl mx-auto px-6 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Schritt {step + 1} von {totalSteps}</span>
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
                        Zurück
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
                        {step === totalSteps - 1 ? "Auswerten" : "Weiter"}
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
                      Ihre Regulierungen
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {results.length === 0
                        ? "Basierend auf Ihren Angaben konnten keine eindeutigen Regulierungen zugeordnet werden."
                        : `${results.filter((r) => r.relevance === "hoch").length} hoch relevante, ${results.filter((r) => r.relevance === "mittel").length} mittel relevante${results.filter((r) => r.relevance === "niedrig").length > 0 ? `, ${results.filter((r) => r.relevance === "niedrig").length} niedrig relevante` : ""} Regulierungen identifiziert.`}
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
                                    reg.relevance === "hoch"
                                      ? "bg-red-500/15 text-red-400"
                                      : reg.relevance === "mittel"
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
                      Erneut starten
                    </button>
                    <Link
                      href={`/${locale}/tools/compliance-checkliste`}
                      className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-900 text-center transition-all"
                      style={{
                        background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                      }}
                    >
                      Zur Compliance-Checkliste
                    </Link>
                  </div>

                  {/* Next Steps — Cross-links to other tools */}
                  <div className="mt-8">
                    <ToolNextSteps
                      currentTool="regulierung-finder"
                      subtext="Jetzt wissen Sie, welche Regulierungen relevant sind. Vertiefen Sie Ihre Analyse:"
                    />
                  </div>

                  {/* CTA Card */}
                  <div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-6 text-center">
                    <p className="text-sm text-slate-300 mb-3">
                      Möchten Sie einen personalisierten Compliance-Report?
                    </p>
                    <Link
                      href={`/${locale}/kontakt`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Kostenlosen Compliance-Report erstellen
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
