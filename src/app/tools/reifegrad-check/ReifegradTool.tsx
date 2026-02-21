"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";

/* ══════════════════════════════════════════════════════════════
   Compliance-Reifegrad-Check — Self-Assessment Tool
   Rates company compliance maturity across 5 categories
   ══════════════════════════════════════════════════════════════ */

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: { id: string; text: string }[];
}

const CATEGORIES: Category[] = [
  {
    id: "governance",
    title: "Governance & Organisation",
    icon: "🏛️",
    color: "#6366f1",
    questions: [
      { id: "g1", text: "Es gibt eine klar definierte Compliance-Verantwortung (Person/Abteilung)" },
      { id: "g2", text: "Die Geschäftsleitung wird regelmäßig über Compliance-Themen informiert" },
      { id: "g3", text: "Es existiert ein dokumentiertes Compliance-Management-System (CMS)" },
      { id: "g4", text: "Compliance-Richtlinien sind allen Mitarbeitern zugänglich" },
      { id: "g5", text: "Es gibt ein Budget für Compliance-Maßnahmen" },
    ],
  },
  {
    id: "datenschutz",
    title: "Datenschutz (DSGVO)",
    icon: "🔒",
    color: "#2563eb",
    questions: [
      { id: "d1", text: "Ein Verarbeitungsverzeichnis (Art. 30 DSGVO) ist vorhanden und aktuell" },
      { id: "d2", text: "Datenschutz-Folgenabschätzungen werden bei Bedarf durchgeführt" },
      { id: "d3", text: "Es gibt einen Prozess für Betroffenenanfragen (Auskunft, Löschung etc.)" },
      { id: "d4", text: "Auftragsverarbeitungs-Verträge (AVV) sind mit allen Dienstleistern geschlossen" },
      { id: "d5", text: "Datenpannen werden innerhalb von 72 Stunden gemeldet" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersicherheit (NIS2/CRA)",
    icon: "🛡️",
    color: "#dc2626",
    questions: [
      { id: "c1", text: "Ein ISMS (z.B. ISO 27001) ist implementiert oder in Planung" },
      { id: "c2", text: "Regelmäßige Risikoanalysen für IT-Systeme werden durchgeführt" },
      { id: "c3", text: "Es gibt einen dokumentierten Incident-Response-Plan" },
      { id: "c4", text: "Mitarbeiter werden regelmäßig zu IT-Sicherheit geschult" },
      { id: "c5", text: "Lieferketten-Risiken werden systematisch bewertet" },
    ],
  },
  {
    id: "ki-compliance",
    title: "KI & Technologie (AI Act)",
    icon: "🤖",
    color: "#7c3aed",
    questions: [
      { id: "k1", text: "Eingesetzte KI-Systeme sind inventarisiert und klassifiziert" },
      { id: "k2", text: "Es gibt Richtlinien für den verantwortungsvollen KI-Einsatz" },
      { id: "k3", text: "Menschliche Aufsicht über KI-Entscheidungen ist gewährleistet" },
      { id: "k4", text: "Betroffene werden über den KI-Einsatz informiert" },
      { id: "k5", text: "KI-Systeme werden auf Bias und Diskriminierung geprüft" },
    ],
  },
  {
    id: "reporting",
    title: "Berichterstattung & Dokumentation",
    icon: "📊",
    color: "#16a34a",
    questions: [
      { id: "r1", text: "Compliance-Maßnahmen werden dokumentiert und nachvollziehbar aufbewahrt" },
      { id: "r2", text: "Nachhaltigkeits-/ESG-Berichterstattung ist etabliert oder in Planung" },
      { id: "r3", text: "Regelmäßige interne Audits finden statt" },
      { id: "r4", text: "Ein Hinweisgebersystem (Whistleblowing) ist eingerichtet" },
      { id: "r5", text: "Compliance-Schulungen werden dokumentiert und deren Wirksamkeit geprüft" },
    ],
  },
];

type Rating = 0 | 1 | 2 | 3; // 0=n/a, 1=not, 2=partial, 3=fully
const RATING_LABELS: Record<Rating, string> = {
  0: "Nicht zutreffend",
  1: "Nicht umgesetzt",
  2: "Teilweise umgesetzt",
  3: "Vollständig umgesetzt",
};
const RATING_COLORS: Record<Rating, string> = {
  0: "#64748b",
  1: "#ef4444",
  2: "#f59e0b",
  3: "#10b981",
};

/* ── Scoring ── */
function calculateResults(ratings: Record<string, Rating>) {
  return CATEGORIES.map((cat) => {
    const applicable = cat.questions.filter((q) => (ratings[q.id] ?? 0) !== 0);
    if (applicable.length === 0) return { ...cat, score: 0, maxScore: 0, percentage: 0 };
    const score = applicable.reduce((sum, q) => sum + ((ratings[q.id] ?? 0) as number), 0);
    const maxScore = applicable.length * 3;
    return { ...cat, score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  });
}

function getOverallGrade(percentage: number): { label: string; color: string; description: string } {
  if (percentage >= 80) return { label: "A – Vorbildlich", color: "#10b981", description: "Ihr Unternehmen ist hervorragend aufgestellt. Fokussieren Sie auf kontinuierliche Verbesserung und bleiben Sie bei Gesetzesänderungen am Ball." };
  if (percentage >= 60) return { label: "B – Fortgeschritten", color: "#3b82f6", description: "Gute Grundlage vorhanden. Schließen Sie die verbleibenden Lücken systematisch und dokumentieren Sie alle Maßnahmen." };
  if (percentage >= 40) return { label: "C – Grundlegend", color: "#f59e0b", description: "Erste Maßnahmen sind umgesetzt, aber es gibt deutlichen Handlungsbedarf. Priorisieren Sie die Bereiche mit dem niedrigsten Score." };
  if (percentage >= 20) return { label: "D – Anfänger", color: "#f97316", description: "Erhebliche Compliance-Lücken bestehen. Beginnen Sie mit den kritischsten Regulierungen (DSGVO, ggf. NIS2) und bauen Sie schrittweise auf." };
  return { label: "E – Kritisch", color: "#ef4444", description: "Dringender Handlungsbedarf. Das Risiko für Bußgelder und Haftung ist hoch. Suchen Sie professionelle Beratung und starten Sie sofort mit grundlegenden Maßnahmen." };
}

/* ═══════════════════════ Component ═══════════════════════ */

export default function ReifegradTool() {
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeCat, setActiveCat] = useState(0);

  const currentCat = CATEGORIES[activeCat];
  const answeredCount = Object.keys(ratings).length;
  const totalQuestions = CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const results = useMemo(() => calculateResults(ratings), [ratings]);
  const overallPercentage = useMemo(() => {
    const applicableResults = results.filter((r) => r.maxScore > 0);
    if (applicableResults.length === 0) return 0;
    const totalScore = applicableResults.reduce((s, r) => s + r.score, 0);
    const totalMax = applicableResults.reduce((s, r) => s + r.maxScore, 0);
    return totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  }, [results]);
  const grade = useMemo(() => getOverallGrade(overallPercentage), [overallPercentage]);

  const setRating = (qId: string, value: Rating) => {
    setRatings((prev) => ({ ...prev, [qId]: value }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* Hero */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/20 mb-5">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <span className="text-xs font-semibold text-indigo-400">Selbstbewertung</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance-
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Reifegrad</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens in 5 Kategorien und erhalten Sie konkrete Handlungsempfehlungen.
            </p>
          </div>
        </section>

        {/* Progress */}
        <div className="max-w-2xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{answeredCount} von {totalQuestions} Fragen beantwortet</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
            />
          </div>
        </div>

        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            {!showResults ? (
              <>
                {/* Category Tabs */}
                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                  {CATEGORIES.map((cat, i) => {
                    const catAnswered = cat.questions.filter((q) => ratings[q.id] !== undefined).length;
                    const isComplete = catAnswered === cat.questions.length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCat(i)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                          activeCat === i
                            ? "bg-white/10 text-white border border-white/10"
                            : "text-slate-500 hover:text-slate-300 border border-transparent"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="hidden sm:inline">{cat.title.split(" ")[0]}</span>
                        {isComplete && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Questions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCat.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{currentCat.icon}</span>
                        <div>
                          <h2 className="font-[Syne] font-bold text-lg text-white">{currentCat.title}</h2>
                          <p className="text-xs text-slate-500">Bewerten Sie jede Aussage für Ihr Unternehmen</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentCat.questions.map((q) => (
                          <div key={q.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <p className="text-sm text-slate-300 mb-3">{q.text}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {([3, 2, 1, 0] as Rating[]).map((val) => {
                                const isSelected = ratings[q.id] === val;
                                return (
                                  <button
                                    key={val}
                                    onClick={() => setRating(q.id, val)}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                                      isSelected
                                        ? "text-white"
                                        : "text-slate-500 border-white/5 hover:border-white/10"
                                    }`}
                                    style={isSelected ? { background: `${RATING_COLORS[val]}25`, borderColor: `${RATING_COLORS[val]}50`, color: RATING_COLORS[val] } : {}}
                                  >
                                    {RATING_LABELS[val]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Nav */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => setActiveCat((p) => Math.max(0, p - 1))}
                          disabled={activeCat === 0}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        >
                          ← Zurück
                        </button>
                        {activeCat < CATEGORIES.length - 1 ? (
                          <button
                            onClick={() => setActiveCat((p) => p + 1)}
                            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 transition cursor-pointer"
                          >
                            Weiter →
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowResults(true)}
                            disabled={answeredCount === 0}
                            className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)", boxShadow: answeredCount > 0 ? "0 8px 32px rgba(250,204,21,0.3)" : "none" }}
                          >
                            Auswertung anzeigen
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              /* Results */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Overall Grade */}
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 text-center mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Ihr Compliance-Reifegrad</p>
                  <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-4" style={{ borderColor: grade.color }}>
                    <span className="font-[Syne] font-extrabold text-3xl" style={{ color: grade.color }}>{overallPercentage}%</span>
                  </div>
                  <h2 className="font-[Syne] font-bold text-xl mb-2" style={{ color: grade.color }}>{grade.label}</h2>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">{grade.description}</p>
                </div>

                {/* Category Bars */}
                <div className="space-y-3 mb-6">
                  {results.map((r) => (
                    <div key={r.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{r.icon}</span>
                          <span className="text-sm font-semibold text-white">{r.title}</span>
                        </div>
                        <span className="text-sm font-mono font-bold" style={{ color: r.color }}>
                          {r.maxScore > 0 ? `${r.percentage}%` : "–"}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: r.color }}
                          initial={{ width: 0 }}
                          animate={{ width: r.maxScore > 0 ? `${r.percentage}%` : "0%" }}
                          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] as const }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => { setShowResults(false); setActiveCat(0); }}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition cursor-pointer"
                  >
                    Bewertung anpassen
                  </button>
                  <Link
                    href="/kontakt"
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-900 text-center"
                    style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)", boxShadow: "0 8px 32px rgba(250,204,21,0.3)" }}
                  >
                    Beratung anfragen
                  </Link>
                </div>

                {/* Cross-links */}
                <ToolNextSteps
                  currentTool="reifegrad-check"
                  subtext="Reifegrad ermittelt? Vertiefen Sie Ihre Compliance-Planung mit diesen Tools."
                />
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
