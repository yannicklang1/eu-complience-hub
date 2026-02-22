"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/i18n/use-translations";
import type { FAQItem } from "./page";

/* ══════════════════════════════════════════════════════════════
   FAQ Content — Client Component with filtering + accordion
   ══════════════════════════════════════════════════════════════ */

const CATEGORIES = [
  "Alle",
  "Allgemein",
  "DSGVO",
  "NIS2",
  "AI Act",
  "DORA",
  "CRA",
  "CSRD",
  "MiCA",
  "BaFG",
  "Green Claims",
  "Data Act",
  "DPP",
  "eIDAS",
  "EHDS",
  "ePrivacy",
  "Produkthaftung",
  "Haftung",
  "Plattform",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Allgemein: "#6366f1",
  DSGVO: "#2563eb",
  NIS2: "#dc2626",
  "AI Act": "#7c3aed",
  DORA: "#0891b2",
  CRA: "#ea580c",
  CSRD: "#16a34a",
  MiCA: "#f59e0b",
  BaFG: "#2563eb",
  "Green Claims": "#059669",
  "Data Act": "#0ea5e9",
  DPP: "#14b8a6",
  eIDAS: "#0891b2",
  EHDS: "#ec4899",
  ePrivacy: "#8b5cf6",
  Produkthaftung: "#d97706",
  Haftung: "#b91c1c",
  Plattform: "#FACC15",
};

export default function FAQContent({ faqData }: { faqData: FAQItem[] }) {
  const { locale } = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [search, setSearch] = useState("");
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "Alle" || item.category === activeCategory;
      const matchesSearch =
        search === "" ||
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqData, activeCategory, search]);

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIndices(new Set(filtered.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenIndices(new Set());
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Häufige{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Fragen
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Antworten auf die wichtigsten Fragen zu EU-Regulierungen — verständlich erklärt für Entscheider und Compliance-Verantwortliche.
            </p>
          </div>
        </section>

        {/* ── Search + Filter ── */}
        <section className="px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-5">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Frage suchen..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-yellow-400/40 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setOpenIndices(new Set());
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                        : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Expand/Collapse */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-slate-500">
                {filtered.length} Frage{filtered.length !== 1 ? "n" : ""} gefunden
              </span>
              <div className="flex gap-3">
                <button
                  onClick={expandAll}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Alle öffnen
                </button>
                <button
                  onClick={collapseAll}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Alle schließen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Items ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto space-y-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const isOpen = openIndices.has(i);
                const catColor = CATEGORY_COLORS[item.category] ?? "#6366f1";
                return (
                  <motion.div
                    key={item.question}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 overflow-hidden">
                      <button
                        onClick={() => toggleItem(i)}
                        className="w-full flex items-start gap-3 px-5 py-4 text-left cursor-pointer group"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                          style={{ background: catColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="text-[10px] font-mono font-semibold uppercase tracking-wider"
                              style={{ color: catColor }}
                            >
                              {item.category}
                            </span>
                          </div>
                          <h3 className="font-[Syne] font-semibold text-[15px] text-white group-hover:text-yellow-400 transition-colors leading-snug">
                            {item.question}
                          </h3>
                        </div>
                        <svg
                          className={`w-5 h-5 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pl-10">
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm mb-4">
                  Keine passenden Fragen gefunden.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("Alle");
                  }}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12 rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-6 sm:p-8 text-center">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-2">
              Ihre Frage war nicht dabei?
            </h2>
            <p className="text-sm text-slate-400 mb-5">
              Erstellen Sie einen kostenlosen Compliance-Report — personalisiert für Ihr Unternehmen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/kontakt`}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                }}
              >
                Compliance-Report erstellen
              </Link>
              <Link
                href={`/${locale}/tools/regulierung-finder`}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
              >
                Regulierung-Finder starten
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
