"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";
import type { RegulationKey } from "@/i18n/country/types";

/* ══════════════════════════════════════════════════════════════
   Data Model — Regulation Checklists
   ══════════════════════════════════════════════════════════════ */

interface CheckItem {
  id: string;
  text: string;
  hint?: string;
}

interface RegulationChecklist {
  key: string;
  countryKey: RegulationKey;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
  icon: string;
  href: string;
  deadline?: string;
  items: CheckItem[];
}

const REGULATIONS: RegulationChecklist[] = [
  {
    key: "nis2",
    countryKey: "nis2",
    title: "NIS2 / NISG 2026",
    shortTitle: "NIS2",
    description: "Netz- und Informationssicherheit für wesentliche und wichtige Einrichtungen",
    accent: "#3b82f6",
    icon: "\uD83D\uDEE1\uFE0F",
    href: "/nisg-2026",
    deadline: "17. Oktober 2025",
    items: [
      { id: "nis2-1", text: "Betroffenheitsprüfung durchgeführt (Sektor, Größe, Umsatz)", hint: "Nutzen Sie unseren NIS2 Betroffenheits-Check" },
      { id: "nis2-2", text: "Risikomanagement-Framework implementiert" },
      { id: "nis2-3", text: "Incident-Response-Plan erstellt (72h-Meldefrist)" },
      { id: "nis2-4", text: "Business Continuity Management (BCM) eingerichtet" },
      { id: "nis2-5", text: "Supply-Chain-Sicherheit bewertet" },
      { id: "nis2-6", text: "Geschäftsleitung im Cybersecurity geschult (Haftung!)" },
      { id: "nis2-7", text: "Technische Maßnahmen: MFA, Verschlüsselung, Netzwerksegmentierung" },
      { id: "nis2-8", text: "Meldepflichten und Kontakt zur Behörde definiert" },
    ],
  },
  {
    key: "dsgvo",
    countryKey: "dsgvo",
    title: "DSGVO",
    shortTitle: "DSGVO",
    description: "Datenschutz-Grundverordnung — Schutz personenbezogener Daten",
    accent: "#8b5cf6",
    icon: "\uD83D\uDD12",
    href: "/dsgvo",
    items: [
      { id: "dsgvo-1", text: "Verarbeitungsverzeichnis (Art. 30) aktuell und vollständig" },
      { id: "dsgvo-2", text: "Datenschutz-Folgenabschätzung (DSFA) bei Hochrisiko-Verarbeitung" },
      { id: "dsgvo-3", text: "Auftragsverarbeiter-Verträge (AVV) mit allen Dienstleistern" },
      { id: "dsgvo-4", text: "Einwilligungsmanagement (Cookie-Banner, Opt-In) rechtskonform" },
      { id: "dsgvo-5", text: "Datenschutzerklärung aktuell und vollständig" },
      { id: "dsgvo-6", text: "Betroffenenrechte-Prozess implementiert (Auskunft, Löschung)" },
      { id: "dsgvo-7", text: "Technisch-organisatorische Maßnahmen (TOMs) dokumentiert" },
      { id: "dsgvo-8", text: "Data-Breach-Notifikation (72h) vorbereitet" },
    ],
  },
  {
    key: "ai-act",
    countryKey: "ai-act",
    title: "EU AI Act",
    shortTitle: "AI Act",
    description: "KI-Verordnung — Regulierung von Künstlicher Intelligenz",
    accent: "#06b6d4",
    icon: "\uD83E\uDD16",
    href: "/eu-ai-act",
    deadline: "August 2025 (Verbote), August 2026 (Hochrisiko)",
    items: [
      { id: "ai-1", text: "AI-Systeme inventarisiert und Risikoklasse bestimmt" },
      { id: "ai-2", text: "Verbotene KI-Praktiken ausgeschlossen (Social Scoring etc.)" },
      { id: "ai-3", text: "Hochrisiko-Systeme mit Konformitätsbewertung" },
      { id: "ai-4", text: "Transparenzpflichten für Chatbots/Deepfakes umgesetzt" },
      { id: "ai-5", text: "AI Literacy für Mitarbeiter sichergestellt" },
      { id: "ai-6", text: "Dokumentationspflichten und technische Doku erstellt" },
      { id: "ai-7", text: "Menschliche Aufsicht bei KI-Entscheidungen gewährleistet" },
    ],
  },
  {
    key: "dora",
    countryKey: "dora",
    title: "DORA",
    shortTitle: "DORA",
    description: "Digital Operational Resilience Act — IT-Resilienz im Finanzsektor",
    accent: "#f59e0b",
    icon: "\uD83C\uDFE6",
    href: "/dora",
    deadline: "17. Januar 2025 (in Kraft)",
    items: [
      { id: "dora-1", text: "IKT-Risikomanagement-Rahmenwerk aufgebaut" },
      { id: "dora-2", text: "IKT-Vorfallmeldung an Aufsichtsbehörde vorbereitet" },
      { id: "dora-3", text: "Threat-Led Penetration Testing (TLPT) geplant" },
      { id: "dora-4", text: "Drittparteien-IKT-Risikomanagement implementiert" },
      { id: "dora-5", text: "Register kritischer IKT-Dienstleister geführt" },
      { id: "dora-6", text: "Business-Continuity- und Disaster-Recovery-Pläne getestet" },
    ],
  },
  {
    key: "cra",
    countryKey: "cra",
    title: "Cyber Resilience Act",
    shortTitle: "CRA",
    description: "Cybersicherheit für Produkte mit digitalen Elementen",
    accent: "#ef4444",
    icon: "\uD83D\uDDA5\uFE0F",
    href: "/cra",
    deadline: "September 2026 (Meldepflichten), September 2027 (vollständig)",
    items: [
      { id: "cra-1", text: "Produkte mit digitalen Elementen identifiziert" },
      { id: "cra-2", text: "Security-by-Design in Entwicklungsprozess integriert" },
      { id: "cra-3", text: "Schwachstellen-Management-Prozess eingerichtet" },
      { id: "cra-4", text: "Software-Stückliste (SBOM) erstellt" },
      { id: "cra-5", text: "Sicherheitsupdates für den Supportzeitraum geplant" },
      { id: "cra-6", text: "Konformitätsbewertung für die Produktkategorie vorbereitet" },
    ],
  },
  {
    key: "csrd",
    countryKey: "csrd",
    title: "CSRD / ESG",
    shortTitle: "CSRD",
    description: "Nachhaltigkeitsberichterstattung nach European Sustainability Reporting Standards",
    accent: "#10b981",
    icon: "\uD83C\uDF3F",
    href: "/csrd-esg",
    deadline: "Ab 2024 (große Unternehmen), Ab 2025 (KMU)",
    items: [
      { id: "csrd-1", text: "Betroffenheit nach Unternehmensgröße geprüft" },
      { id: "csrd-2", text: "Doppelte Wesentlichkeitsanalyse durchgeführt" },
      { id: "csrd-3", text: "ESRS-Datenpunkte identifiziert und erfasst" },
      { id: "csrd-4", text: "ESG-Datenerhebungsprozesse aufgesetzt" },
      { id: "csrd-5", text: "Prüfer/Wirtschaftsprüfer für Nachhaltigkeitsbericht ausgewählt" },
      { id: "csrd-6", text: "Taxonomie-Konformität der Wirtschaftstätigkeiten geprüft" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════════ */

export default function ChecklistTool() {
  const { locale } = useTranslations();
  const { countryCode, countryData } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedReg, setExpandedReg] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((key: string) => {
    setExpandedReg((prev) => (prev === key ? null : key));
  }, []);

  /* ── Stats ── */
  const totalItems = useMemo(() => REGULATIONS.reduce((s, r) => s + r.items.length, 0), []);
  const checkedCount = checkedItems.size;
  const overallPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const regStats = useMemo(() => {
    return REGULATIONS.map((r) => {
      const checked = r.items.filter((i) => checkedItems.has(i.id)).length;
      const percent = r.items.length > 0 ? Math.round((checked / r.items.length) * 100) : 0;
      return { key: r.key, checked, total: r.items.length, percent };
    });
  }, [checkedItems]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Interaktives Tool
              </div>
              {countryMeta && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span>{countryMeta.flag}</span>
                  <span className="text-xs font-semibold text-slate-400">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              EU Compliance-
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Checkliste</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Prüfen Sie Punkt für Punkt, welche Anforderungen der wichtigsten EU-Regulierungen Ihr Unternehmen bereits erfüllt und wo noch Handlungsbedarf besteht.
            </p>

            {/* Overall Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Gesamtfortschritt</span>
                <span className="font-mono font-bold text-yellow-400">
                  {checkedCount}/{totalItems} ({overallPercent}%)
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #FACC15, #EAB308)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Regulation Cards ── */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {REGULATIONS.map((reg) => {
              const stats = regStats.find((s) => s.key === reg.key)!;
              const isExpanded = expandedReg === reg.key;
              const regData = countryData?.regulations?.[reg.countryKey];
              const displayDeadline = regData?.nationalDeadline ?? reg.deadline;

              return (
                <div
                  key={reg.key}
                  className="rounded-2xl border overflow-hidden transition-colors duration-200"
                  style={{
                    borderColor: isExpanded ? `${reg.accent}40` : "rgba(255,255,255,0.06)",
                    background: isExpanded ? "rgba(15,23,42,0.9)" : "rgba(15,23,42,0.5)",
                  }}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => toggleExpand(reg.key)}
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-2xl flex-shrink-0" aria-hidden="true">{reg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-[Syne] font-bold text-lg sm:text-xl text-white">
                          {reg.title}
                        </h2>
                        {displayDeadline && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold text-white/80 bg-white/10">
                            Frist: {displayDeadline}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-1">{reg.description}</p>
                    </div>

                    {/* Mini Progress */}
                    <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold" style={{ color: reg.accent }}>
                          {stats.percent}%
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {stats.checked}/{stats.total}
                        </div>
                      </div>
                      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: reg.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.percent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0 text-slate-500"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>

                  {/* Expandable Checklist */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 space-y-1">
                          <div className="h-px bg-white/5 mb-4" />
                          {reg.items.map((item) => {
                            const isChecked = checkedItems.has(item.id);
                            return (
                              <label
                                key={item.id}
                                className="flex items-start gap-3 py-3 px-3 rounded-xl cursor-pointer transition-colors hover:bg-white/5 group/item"
                              >
                                <div className="pt-0.5 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isChecked}
                                    onChange={() => toggleItem(item.id)}
                                  />
                                  <div
                                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                                    style={{
                                      borderColor: isChecked ? reg.accent : "rgba(255,255,255,0.15)",
                                      backgroundColor: isChecked ? reg.accent : "transparent",
                                    }}
                                  >
                                    {isChecked && (
                                      <motion.svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                      >
                                        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </motion.svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span
                                    className="text-sm leading-relaxed transition-colors"
                                    style={{
                                      color: isChecked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)",
                                      textDecoration: isChecked ? "line-through" : "none",
                                    }}
                                  >
                                    {item.text}
                                  </span>
                                  {item.hint && (
                                    <p className="text-xs text-slate-500 mt-1">{item.hint}</p>
                                  )}
                                </div>
                              </label>
                            );
                          })}

                          {/* Link to guide + country info */}
                          <div className="pt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/${locale}${reg.href}`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                                style={{ color: reg.accent }}
                              >
                                Zum {reg.shortTitle}-Leitfaden
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </div>
                            {regData?.authority && countryMeta && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{countryMeta.flag}</span>
                                <span>Aufsicht:</span>
                                {regData.authorityUrl ? (
                                  <a href={regData.authorityUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 underline underline-offset-2 hover:text-white transition-colors">
                                    {regData.authority}
                                  </a>
                                ) : (
                                  <span className="text-slate-400">{regData.authority}</span>
                                )}
                                {regData.nationalLawName && (
                                  <span className="ml-2 px-1.5 py-0.5 rounded bg-white/5 text-slate-500 text-[10px] font-mono">
                                    {regData.nationalLawName}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ── Show Results Button ── */}
          {checkedCount > 0 && (
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <button
                onClick={() => setShowResults(!showResults)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                {showResults ? "Auswertung ausblenden" : "Auswertung anzeigen"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Results Panel ── */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto mt-8"
              >
                <div className="rounded-2xl border border-yellow-400/15 bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8">
                  <h3 className="font-[Syne] font-bold text-xl text-white mb-6">
                    Ihre Compliance-Auswertung
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {REGULATIONS.map((reg) => {
                      const stats = regStats.find((s) => s.key === reg.key)!;
                      const status = stats.percent === 100
                        ? "complete"
                        : stats.percent >= 50
                          ? "progress"
                          : stats.checked > 0
                            ? "started"
                            : "open";

                      return (
                        <div
                          key={reg.key}
                          className="rounded-xl border p-4"
                          style={{
                            borderColor: `${reg.accent}20`,
                            background: `${reg.accent}08`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">{reg.icon}</span>
                            <span className="font-bold text-sm text-white">{reg.shortTitle}</span>
                            <span className="ml-auto text-xs font-mono" style={{ color: reg.accent }}>
                              {stats.percent}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${stats.percent}%`,
                                background: reg.accent,
                              }}
                            />
                          </div>
                          <div className="text-[11px]" style={{
                            color: status === "complete" ? "#10b981" :
                              status === "progress" ? reg.accent :
                                status === "started" ? "#f59e0b" : "#64748b",
                          }}>
                            {status === "complete" && "\u2705 Vollständig"}
                            {status === "progress" && `\u23F3 ${stats.total - stats.checked} Punkte offen`}
                            {status === "started" && `\u26A0\uFE0F ${stats.total - stats.checked} Punkte offen`}
                            {status === "open" && "Noch nicht begonnen"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-white mb-1">
                          Compliance-Briefing abonnieren
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Erhalten Sie Fristen-Warnungen und Updates zu allen EU-Regulierungen direkt in Ihren Posteingang.
                        </p>
                      </div>
                      <Link
                        href={`/${locale}/fristen-radar`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs text-slate-900 flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #FACC15, #EAB308)",
                        }}
                      >
                        Zum Fristen-Radar
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Next Steps ── */}
          <div className="max-w-4xl mx-auto mt-8 px-4">
            <ToolNextSteps
              currentTool="compliance-checkliste"
              subtext="Ergänzen Sie Ihre Checkliste mit weiteren Analysen und Planungstools."
            />
          </div>

          {/* ── Disclaimer ── */}
          <div className="max-w-4xl mx-auto mt-8 px-4">
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Diese Checkliste dient als Orientierungshilfe und ersetzt keine Rechtsberatung. Die Anforderungen variieren je nach Unternehmensgröße, Branche und spezifischer Situation.{" "}
              <Link href={`/${locale}/haftungsausschluss`} className="underline underline-offset-2 hover:text-slate-400">
                Haftungsausschluss
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
