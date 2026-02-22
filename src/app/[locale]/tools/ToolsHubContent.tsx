"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Tools Hub — Central landing page for all interactive tools
   ══════════════════════════════════════════════════════════════ */

type ToolCategory = "all" | "analysis" | "assessment" | "calculator" | "directory";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  badge?: string;
  category: ToolCategory;
  features: string[];
  duration: string;
}

const TOOLS: Tool[] = [
  {
    title: "Regulierung-Finder",
    description:
      "Finden Sie in 5 Schritten heraus, welche der 14+ EU-Regulierungen für Ihr Unternehmen relevant sind.",
    href: "/tools/regulierung-finder",
    icon: "🧭",
    accent: "#FACC15",
    badge: "Beliebt",
    category: "analysis",
    features: ["14 Regulierungen", "5-Schritt-Quiz", "Relevanz-Bewertung"],
    duration: "~3 Min.",
  },
  {
    title: "NIS2-Betroffenheits-Check",
    description:
      "Prüfen Sie, ob Ihr Unternehmen unter die NIS2-Richtlinie (NISG 2026) fällt und welche Pflichten gelten.",
    href: "/tools/nis2-betroffenheits-check",
    icon: "🛡️",
    accent: "#1e40af",
    badge: "Top Tool",
    category: "analysis",
    features: ["Sektor-Analyse", "Größen-Check", "Pflichten-Übersicht"],
    duration: "~2 Min.",
  },
  {
    title: "Compliance-Checkliste",
    description:
      "Interaktive Checkliste: Prüfen Sie systematisch alle EU-Compliance-Pflichten für Ihr Unternehmen.",
    href: "/tools/compliance-checkliste",
    icon: "✅",
    accent: "#059669",
    category: "assessment",
    features: ["Alle Regulierungen", "Fortschritts-Tracking", "Export"],
    duration: "~10 Min.",
  },
  {
    title: "Haftungs-Prüfer",
    description:
      "Ermitteln Sie das persönliche Haftungsrisiko der Geschäftsführung bei Compliance-Verstößen.",
    href: "/tools/haftungs-pruefer",
    icon: "⚖️",
    accent: "#dc2626",
    category: "assessment",
    features: ["GF-Haftung", "Risiko-Matrix", "Maßnahmen-Plan"],
    duration: "~3 Min.",
  },
  {
    title: "Bußgeld-Rechner",
    description:
      "Berechnen Sie den möglichen Strafrahmen bei Verstößen gegen EU-Regulierungen wie NIS2, DSGVO und AI Act.",
    href: "/tools/bussgeld-rechner",
    icon: "💸",
    accent: "#b91c1c",
    category: "calculator",
    features: ["Alle Strafrahmen", "Umsatz-basiert", "Vergleichs-Tabelle"],
    duration: "~2 Min.",
  },
  {
    title: "Kosten-Kalkulator",
    description:
      "Schätzen Sie das Compliance-Budget für Ihr Unternehmen — aufgeschlüsselt nach Regulierung und Kostenstelle.",
    href: "/tools/kosten-kalkulator",
    icon: "💰",
    accent: "#16a34a",
    badge: "Neu",
    category: "calculator",
    features: ["Budget-Planung", "Kosten-Aufschlüsselung", "Synergien"],
    duration: "~3 Min.",
  },
  {
    title: "Reifegrad-Check",
    description:
      "Messen Sie den Compliance-Reifegrad Ihres Unternehmens über 5 Kategorien und 25 Fragen — mit A-E Bewertung.",
    href: "/tools/reifegrad-check",
    icon: "📊",
    accent: "#7c3aed",
    badge: "Neu",
    category: "assessment",
    features: ["25 Fragen", "5 Kategorien", "A–E Bewertung"],
    duration: "~5 Min.",
  },
  {
    title: "ISMS-Software-Vergleich",
    description:
      "Vergleichen Sie ISMS- und Compliance-Software-Lösungen — mit Bewertungen, Preisen und Feature-Vergleichen.",
    href: "/tools/isms-software-vergleich",
    icon: "🔍",
    accent: "#0891b2",
    category: "directory",
    features: ["Software-Bewertungen", "Preis-Vergleich", "Feature-Matrix"],
    duration: "~5 Min.",
  },
];

const CATEGORIES: { value: ToolCategory; label: string; icon: string }[] = [
  { value: "all", label: "Alle Tools", icon: "⚡" },
  { value: "analysis", label: "Analyse", icon: "🔎" },
  { value: "assessment", label: "Bewertung", icon: "📋" },
  { value: "calculator", label: "Rechner", icon: "🧮" },
  { value: "directory", label: "Verzeichnis", icon: "📖" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
      >
        <span className="font-semibold text-[14px] text-slate-200 leading-snug">
          {question}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <p className="text-sm text-slate-400 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ToolsHubContent() {
  const { locale } = useTranslations();
  const [category, setCategory] = useState<ToolCategory>("all");

  const filtered =
    category === "all" ? TOOLS : TOOLS.filter((t) => t.category === category);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
              <span className="text-yellow-400 text-xs font-semibold">
                {TOOLS.length} kostenlose Tools
              </span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance-
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Interaktive Werkzeuge für Ihre EU-Compliance — von der
              Betroffenheitsanalyse über Kostenplanung bis zum Reifegrad-Check.
              Sofort nutzbar, keine Registrierung nötig.
            </p>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="px-6 pb-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                        : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06] hover:text-slate-300"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Tools Grid ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((tool) => (
                  <motion.div
                    key={tool.href}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/${locale}${tool.href}`}
                      className="group block rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: `${tool.accent}15` }}
                        >
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-[Syne] font-bold text-[17px] text-white group-hover:text-yellow-400 transition-colors truncate">
                              {tool.title}
                            </h2>
                            {tool.badge && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                                style={{
                                  background: `${tool.accent}20`,
                                  color: tool.accent,
                                }}
                              >
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      {/* Features + Duration */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.features.map((f) => (
                            <span
                              key={f}
                              className="px-2 py-1 rounded-md bg-white/[0.04] text-[11px] text-slate-500 font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-600 font-mono flex-shrink-0 ml-3">
                          {tool.duration}
                        </span>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex justify-end mt-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-yellow-400/10 group-hover:border-yellow-400/20 transition-all">
                          <svg
                            className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-sm">
                  Keine Tools in dieser Kategorie.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Additional Resources ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-4 text-center">
              Weitere Ressourcen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: "Compliance-Verzeichnis", description: "Auditoren & Berater finden", href: `/${locale}/compliance-verzeichnis`, icon: "📇" },
                { title: "Fristen-Radar", description: "Alle Deadlines im Blick", href: `/${locale}/fristen-radar`, icon: "📅" },
                { title: "Compliance-Timeline", description: "Fristen 2025–2027", href: `/${locale}/timeline`, icon: "🗓️" },
                { title: "Compliance-Glossar", description: "Fachbegriffe erklärt", href: `/${locale}/glossar`, icon: "📚" },
              ].map((res) => (
                <Link
                  key={res.href}
                  href={res.href}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <span className="text-lg">{res.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-yellow-400 transition-colors">
                      {res.title}
                    </p>
                    <p className="text-xs text-slate-500">{res.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-6 text-center">
              Häufige Fragen zu den Tools
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Sind die EU-Compliance-Tools kostenlos?",
                  a: "Ja, alle Tools auf dem EU Compliance Hub sind vollständig kostenlos und sofort nutzbar — ohne Registrierung oder Anmeldung. Die Berechnungen erfolgen lokal in Ihrem Browser.",
                },
                {
                  q: "Wie genau sind die Ergebnisse der Compliance-Tools?",
                  a: "Unsere Tools liefern eine qualifizierte Ersteinschätzung auf Basis aktueller EU-Regulierungen. Sie ersetzen keine individuelle Rechtsberatung, bieten aber eine fundierte Orientierung für die weitere Compliance-Planung.",
                },
                {
                  q: "Welches Tool sollte ich zuerst verwenden?",
                  a: "Starten Sie mit dem Regulierung-Finder, um herauszufinden, welche EU-Regulierungen für Ihr Unternehmen relevant sind. Danach empfehlen wir den NIS2-Betroffenheits-Check und die Compliance-Checkliste für eine detaillierte Analyse.",
                },
                {
                  q: "Werden meine Daten gespeichert oder an Dritte weitergegeben?",
                  a: "Nein. Alle Berechnungen und Analysen unserer interaktiven Tools erfolgen ausschließlich lokal in Ihrem Browser. Es werden keine personenbezogenen Daten an Server übermittelt oder gespeichert.",
                },
              ].map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-8 sm:p-10 text-center">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
              Persönliche Compliance-Beratung
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Unsere Tools geben Ihnen eine erste Einschätzung. Für eine
              personalisierte Compliance-Analyse erstellen Sie Ihren kostenlosen
              Report — individuell auf Ihr Unternehmen zugeschnitten.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/kontakt`}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow:
                    "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Compliance-Report erstellen
              </Link>
              <Link
                href={`/${locale}/faq`}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
              >
                Häufige Fragen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
