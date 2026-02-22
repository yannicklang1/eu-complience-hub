"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareBar from "@/components/SocialShareBar";
import { useTranslations } from "@/i18n/use-translations";
import type { NewsItem } from "./page";

/* ══════════════════════════════════════════════════════════════
   Aktuelles / Compliance News — English Version
   ══════════════════════════════════════════════════════════════ */

type FilterType = "all" | "gesetz" | "frist" | "urteil" | "update" | "leitlinie";

const TYPE_META: Record<string, { label: string; color: string; icon: string }> = {
  gesetz: { label: "Legislation", color: "#1e40af", icon: "📜" },
  frist: { label: "Deadline", color: "#dc2626", icon: "⏰" },
  urteil: { label: "Ruling", color: "#7c3aed", icon: "⚖️" },
  update: { label: "Update", color: "#059669", icon: "🔄" },
  leitlinie: { label: "Guideline", color: "#ea580c", icon: "📋" },
};

const REGULATION_COLORS: Record<string, string> = {
  NIS2: "#1e40af",
  "AI Act": "#7c3aed",
  DORA: "#059669",
  CRA: "#ea580c",
  DSGVO: "#2563eb",
  CSRD: "#16a34a",
  BaFG: "#2563eb",
  MiCA: "#f59e0b",
  DSA: "#6366f1",
  PLD: "#ef4444",
  "Green Claims": "#059669",
  DPP: "#14b8a6",
  "Data Act": "#0ea5e9",
  eIDAS: "#0891b2",
  ePrivacy: "#8b5cf6",
  HSchG: "#f97316",
  EHDS: "#ec4899",
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gesetz", label: "Legislation" },
  { value: "frist", label: "Deadlines" },
  { value: "update", label: "Updates" },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

export default function AktuellesContentEN({
  newsItems,
}: {
  newsItems: NewsItem[];
}) {
  const { locale } = useTranslations();
  const [filter, setFilter] = useState<FilterType>("all");

  const sorted = useMemo(() => {
    const items = filter === "all"
      ? [...newsItems]
      : newsItems.filter((n) => n.type === filter);
    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [newsItems, filter]);

  /* Group by year */
  const grouped = useMemo(() => {
    const map = new Map<number, NewsItem[]>();
    for (const item of sorted) {
      const year = new Date(item.date).getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [sorted]);

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
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
              </span>
              <span className="text-yellow-400 text-xs font-semibold">
                Compliance News
              </span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Latest{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                EU Compliance
              </span>{" "}
              News
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Key developments, new legislation and upcoming deadlines —
              concisely summarised for decision-makers and compliance officers.
            </p>
          </div>
        </section>

        {/* ── Filter ── */}
        <section className="px-6 pb-6">
          <div className="max-w-3xl mx-auto flex items-center gap-2 flex-wrap justify-center">
            {FILTERS.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                      : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── News Timeline ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="popLayout">
              {grouped.map(([year, items]) => (
                <motion.div
                  key={year}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-10"
                >
                  {/* Year Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-[Syne] font-extrabold text-2xl text-white">
                      {year}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <span className="text-xs text-slate-500 font-mono">
                      {items.length} {items.length === 1 ? "entry" : "entries"}
                    </span>
                  </div>

                  {/* News Cards */}
                  <div className="space-y-3">
                    {items.map((item) => {
                      const meta = TYPE_META[item.type] ?? TYPE_META.update;
                      const regColor = REGULATION_COLORS[item.regulation] ?? "#6366f1";
                      const upcoming = isUpcoming(item.date);

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`group rounded-xl border bg-slate-900/40 p-5 transition-all duration-200 ${
                              item.important
                                ? "border-yellow-400/20 hover:border-yellow-400/30"
                                : "border-white/5 hover:border-white/10"
                            }`}
                          >
                            {/* Top: Date + Type + Regulation */}
                            <div className="flex items-center gap-2 flex-wrap mb-3">
                              <span className="text-[11px] font-mono text-slate-500">
                                {formatDate(item.date)}
                              </span>
                              {upcoming && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-400">
                                  Upcoming
                                </span>
                              )}
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                  background: `${meta.color}15`,
                                  color: meta.color,
                                }}
                              >
                                {meta.icon} {meta.label}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                  background: `${regColor}15`,
                                  color: regColor,
                                }}
                              >
                                {item.regulation}
                              </span>
                              {item.important && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-yellow-400/15 text-yellow-400">
                                  Important
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-[Syne] font-bold text-[15px] text-white leading-snug mb-2">
                              {item.title}
                            </h3>

                            {/* Summary */}
                            <p className="text-sm text-slate-400 leading-relaxed mb-3">
                              {item.summary}
                            </p>

                            {/* Link */}
                            {item.href && (
                              <Link
                                href={item.href}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400/80 hover:text-yellow-400 transition-colors"
                              >
                                Learn more
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                  />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {sorted.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-sm mb-4">
                  No entries in this category.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  Show all
                </button>
              </div>
            )}

            {/* ── Share ── */}
            <SocialShareBar
              path="/aktuelles"
              title="EU Compliance News & Updates"
              dark
              label="Share news"
              sublabel="Share the latest compliance news with your network"
            />

            {/* ── CTA ── */}
            <div className="mt-4 rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-6 sm:p-8 text-center">
              <h2 className="font-[Syne] font-bold text-lg text-white mb-2">
                Never miss an update
              </h2>
              <p className="text-sm text-slate-400 mb-5">
                Subscribe to our compliance briefing — only for critical
                deadlines and legislative changes, max. 3x/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${locale}/fristen-radar`}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                    boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                  }}
                >
                  Subscribe to compliance briefing
                </Link>
                <Link
                  href={`/${locale}/timeline`}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  View compliance timeline
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
