"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/i18n/use-translations";
import {
  ALL_ENTRIES,
  CATEGORIES,
  REGULATION_COLORS,
  filterEntries,
  type VerzeichnisEntry,
  type VerzeichnisCategory,
  type Regulation,
  type Region,
} from "@/data/verzeichnisData";

/* ═══════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════ */

const ACCENT = "#6366f1";

const ALL_REGULATIONS: Regulation[] = [
  "NIS2",
  "AI Act",
  "DORA",
  "CRA",
  "DSGVO",
  "eIDAS",
];

const ALL_REGIONS: Region[] = ["AT", "DE", "CH", "EU-weit"];

const REGION_LABELS: Record<Region, string> = {
  AT: "\u00D6sterreich",
  DE: "Deutschland",
  CH: "Schweiz",
  "EU-weit": "EU-weit",
};

/* ═══════════════════════════════════════════════════════════
   Animation Variants (typed objects, no `as const`)
   ═══════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

const heroStatVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════════
   Icon helpers
   ═══════════════════════════════════════════════════════════ */

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconExternalLink({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconMapPin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function IconX({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   Custom Select Dropdown
   ═══════════════════════════════════════════════════════════ */

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 whitespace-nowrap ${
          value !== ("all" as T)
            ? "bg-indigo-50 border-indigo-200 text-indigo-700"
            : "bg-white border-[#d8dff0] text-[#3a4a6b] hover:border-indigo-200 hover:bg-indigo-50/50"
        }`}
      >
        <span className="font-mono text-[10px] tracking-wider uppercase text-[#7a8db0] mr-1">
          {label}:
        </span>
        <span>{selectedLabel}</span>
        <IconChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1.5 z-50 min-w-[180px] rounded-xl border border-[#d8dff0] bg-white shadow-xl shadow-indigo-900/10 py-1.5 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  value === opt.value
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-[#3a4a6b] hover:bg-[#f4f6fc]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Entry Card
   ═══════════════════════════════════════════════════════════ */

function EntryCard({ entry }: { entry: VerzeichnisEntry }) {
  const categoryMeta = CATEGORIES.find((c) => c.category === entry.category);

  return (
    <motion.div
      variants={cardVariant}
      layout
      className={`group relative rounded-2xl border bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/[0.06] ${
        entry.featured
          ? "border-amber-200 hover:border-amber-300"
          : "border-[#d8dff0] hover:border-indigo-200"
      }`}
    >
      {/* Featured gold top bar */}
      {entry.featured && (
        <div
          className="h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
          }}
        />
      )}

      <div className="p-6 lg:p-7">
        {/* Top Row: Logo + Name + Featured Badge */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo Circle */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{
              background: categoryMeta
                ? `${categoryMeta.accent}12`
                : "#f4f6fc",
              boxShadow: categoryMeta
                ? `0 4px 16px ${categoryMeta.accent}10`
                : "none",
            }}
          >
            {entry.logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-[Syne] font-bold text-lg text-[#060c1a] tracking-tight leading-tight">
                {entry.name}
              </h3>
              {entry.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold font-mono tracking-wide">
                  <span className="text-amber-500">&#9733;</span> Empfohlen
                </span>
              )}
            </div>
            <p className="text-sm text-[#7a8db0] mt-0.5 leading-snug">
              {entry.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
          {entry.description}
        </p>

        {/* Regulation Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.regulations.map((reg) => {
            const c = REGULATION_COLORS[reg];
            return (
              <span
                key={reg}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-mono tracking-wide border"
                style={{
                  background: c.bg,
                  color: c.text,
                  borderColor: c.border,
                }}
              >
                {reg}
              </span>
            );
          })}
        </div>

        {/* Region + Target Size badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {entry.regions.map((reg) => (
            <span
              key={reg}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wide bg-[#f4f6fc] text-[#7a8db0] border border-[#e8ecf4]"
            >
              {reg}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wide bg-indigo-50 text-indigo-500 border border-indigo-100">
            {entry.targetSize}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#7a8db0]">
            Preis:
          </span>
          <span className="text-sm font-semibold text-[#060c1a]">
            {entry.priceInfo}
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-5">
          {entry.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2.5">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${ACCENT}15` }}
              >
                <IconCheck className="w-3 h-3 text-indigo-500" />
              </div>
              <span className="text-[13px] text-[#3a4a6b] leading-relaxed">
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-5 text-[#7a8db0]">
          <IconMapPin className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium">{entry.location}</span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#e8ecf4]">
          <a
            href={entry.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #818cf8)`,
              boxShadow: `0 4px 16px ${ACCENT}30`,
            }}
          >
            {entry.ctaLabel}
            <IconExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={entry.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#7a8db0] hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 border border-transparent hover:border-indigo-100"
          >
            Website besuchen
            <IconExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Category Section
   ═══════════════════════════════════════════════════════════ */

function CategorySection({
  category,
  entries,
}: {
  category: (typeof CATEGORIES)[number];
  entries: VerzeichnisEntry[];
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className="mb-16"
    >
      {/* Category Header */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center gap-4 mb-3"
      >
        <div
          className="w-1 h-10 rounded-full"
          style={{ background: category.accent }}
        />
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <h2 className="font-[Syne] font-extrabold text-2xl tracking-tight text-[#060c1a]">
            {category.label}
          </h2>
          <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#f4f6fc] text-[#7a8db0] border border-[#e8ecf4]">
            {entries.length}
          </span>
        </div>
      </motion.div>

      <motion.p
        variants={fadeInUp}
        className="text-sm text-[#7a8db0] leading-relaxed mb-8 ml-5 pl-4 border-l-2 border-[#e8ecf4]"
      >
        {category.description}
      </motion.p>

      {/* Cards Grid */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Animated Counter
   ═══════════════════════════════════════════════════════════ */

function AnimatedStat({
  value,
  label,
  delay = 0,
}: {
  value: number | string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={heroStatVariant}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="flex items-center gap-3"
    >
      <span className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-white">
        {value}
      </span>
      <span className="text-sm text-white/40 leading-tight">{label}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function VerzeichnisContent() {
  const { locale } = useTranslations();
  /* ── Filter state ── */
  const [categoryFilter, setCategoryFilter] = useState<
    VerzeichnisCategory | "all"
  >("all");
  const [regulationFilter, setRegulationFilter] = useState<
    Regulation | "all"
  >("all");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Filtered entries ── */
  const filtered = useMemo(
    () =>
      filterEntries(ALL_ENTRIES, {
        category: categoryFilter,
        regulation: regulationFilter,
        region: regionFilter,
        search: searchQuery,
      }),
    [categoryFilter, regulationFilter, regionFilter, searchQuery]
  );

  /* ── Group by category ── */
  const groupedByCategory = useMemo(() => {
    const map = new Map<VerzeichnisCategory, VerzeichnisEntry[]>();
    for (const entry of filtered) {
      const existing = map.get(entry.category) ?? [];
      existing.push(entry);
      map.set(entry.category, existing);
    }
    return map;
  }, [filtered]);

  /* ── Has active filters ── */
  const hasActiveFilters =
    categoryFilter !== "all" ||
    regulationFilter !== "all" ||
    regionFilter !== "all" ||
    searchQuery.trim().length > 0;

  function resetFilters() {
    setCategoryFilter("all");
    setRegulationFilter("all");
    setRegionFilter("all");
    setSearchQuery("");
  }

  return (
    <>
      <Header />
      <main>
        {/* ════════════════════════════════════════════════
           HERO
           ════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060c1a] via-[#0a1628] to-[#060c1a]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Gradient bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8">
              <Link
                href={`/${locale}`}
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Startseite
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                Compliance-Verzeichnis
              </span>
            </nav>

            <div className="flex items-start gap-5">
              {/* Hero icon */}
              <div
                className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0"
                style={{ background: `${ACCENT}25` }}
              >
                <svg
                  className="w-7 h-7 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
                    Verzeichnis
                  </span>
                  <span
                    className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white"
                    style={{ background: ACCENT }}
                  >
                    Kuratiert
                  </span>
                </div>
                <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
                  Compliance-Verzeichnis
                </h1>
                <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Software, Auditoren, Kanzleien &amp; Berater f&uuml;r Ihre
                  EU-Compliance &mdash; kuratiert und nach Regulierung
                  filterbar.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-white/[0.06]">
              <AnimatedStat
                value={ALL_ENTRIES.length}
                label="Anbieter"
                delay={0.1}
              />
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <AnimatedStat
                value={CATEGORIES.length}
                label="Kategorien"
                delay={0.2}
              />
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <AnimatedStat
                value={ALL_REGULATIONS.length}
                label="Regulierungen"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
           STICKY FILTER BAR
           ════════════════════════════════════════════════ */}
        <div className="sticky top-[72px] z-40 border-b border-[#e8ecf4]">
          <div className="bg-white/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                {/* Filter dropdowns */}
                <div className="flex flex-wrap items-center gap-2">
                  <FilterSelect<VerzeichnisCategory | "all">
                    label="Kategorie"
                    value={categoryFilter}
                    onChange={setCategoryFilter}
                    options={[
                      { value: "all", label: "Alle" },
                      ...CATEGORIES.map((c) => ({
                        value: c.category,
                        label: `${c.icon} ${c.label}`,
                      })),
                    ]}
                  />

                  <FilterSelect<Regulation | "all">
                    label="Regulierung"
                    value={regulationFilter}
                    onChange={setRegulationFilter}
                    options={[
                      { value: "all", label: "Alle" },
                      ...ALL_REGULATIONS.map((r) => ({
                        value: r,
                        label: r,
                      })),
                    ]}
                  />

                  <FilterSelect<Region | "all">
                    label="Region"
                    value={regionFilter}
                    onChange={setRegionFilter}
                    options={[
                      { value: "all", label: "Alle" },
                      ...ALL_REGIONS.map((r) => ({
                        value: r,
                        label: REGION_LABELS[r],
                      })),
                    ]}
                  />
                </div>

                {/* Search + Count */}
                <div className="flex items-center gap-3 flex-1 lg:justify-end">
                  {/* Search input */}
                  <div className="relative flex-1 lg:flex-none lg:w-64">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8db0]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Anbieter suchen..."
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#d8dff0] bg-white text-sm text-[#060c1a] placeholder:text-[#7a8db0]/60 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8db0] hover:text-[#3a4a6b] transition-colors"
                      >
                        <IconX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Result count badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[12px] font-bold tracking-wide border whitespace-nowrap"
                      style={{
                        background: "#f0f0ff",
                        color: ACCENT,
                        borderColor: "#e0e0ff",
                      }}
                    >
                      {filtered.length} Ergebnis
                      {filtered.length !== 1 ? "se" : ""}
                    </span>

                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold tracking-wide text-[#7a8db0] hover:text-red-500 hover:bg-red-50 border border-[#e8ecf4] hover:border-red-200 transition-all duration-200"
                      >
                        <IconX className="w-3 h-3" />
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
           FRESHNESS NOTICE
           ════════════════════════════════════════════════ */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>Stand: Februar 2026.</strong>{" "}
                Preise und Funktionen können sich ändern.
              </span>
            </div>
            <a
              href="mailto:hello@eu-compliance-hub.eu?subject=Verzeichnis-Korrektur"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
              Fehler melden
            </a>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
           RESULTS
           ════════════════════════════════════════════════ */}
        <section
          className="py-16 lg:py-20"
          style={{
            background:
              "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(99,102,241,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            {/* Results or Empty State */}
            {filtered.length > 0 ? (
              CATEGORIES.map((cat) => {
                const entries = groupedByCategory.get(cat.category);
                if (!entries || entries.length === 0) return null;
                return (
                  <CategorySection
                    key={cat.category}
                    category={cat}
                    entries={entries}
                  />
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#f4f6fc] border border-[#e8ecf4] flex items-center justify-center mx-auto mb-6">
                  <IconSearch className="w-8 h-8 text-[#7a8db0]" />
                </div>
                <h3 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-2">
                  Keine Ergebnisse gefunden
                </h3>
                <p className="text-sm text-[#7a8db0] mb-6 max-w-md mx-auto">
                  Ihre Filterauswahl liefert keine Treffer. Versuchen Sie,
                  die Filter anzupassen oder zur&uuml;ckzusetzen.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-[Syne] font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, #818cf8)`,
                    boxShadow: `0 4px 16px ${ACCENT}30`,
                  }}
                >
                  Filter zur&uuml;cksetzen
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
           CTA: Listing Promotion
           ════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#060c1a] via-[#0e1c40] to-[#0a1628]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 80% 30%, rgba(99,102,241,0.1) 0%, transparent 60%)",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-10 bg-indigo-400/40" />
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-indigo-400 font-medium">
                    F&uuml;r Anbieter
                  </span>
                  <div className="h-px w-10 bg-indigo-400/40" />
                </div>

                <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.05] mb-6">
                  Ihr Unternehmen{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    hier listen?
                  </span>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
              >
                Erreichen Sie Entscheider, die aktiv nach
                Compliance-L&ouml;sungen suchen. Unser kuratiertes
                Verzeichnis bietet Premium-Platzierungen mit garantierter
                Sichtbarkeit.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
              >
                {[
                  {
                    icon: "&#9733;",
                    label: "Featured-Platzierung",
                    desc: "Gold-Badge & Top-Position",
                  },
                  {
                    icon: "\uD83D\uDCCA",
                    label: "Performance-Reports",
                    desc: "Klicks & Impressionen",
                  },
                  {
                    icon: "\uD83C\uDFAF",
                    label: "Zielgruppe",
                    desc: "Compliance-Entscheider",
                  },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-start gap-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-lg flex-shrink-0">
                      <span
                        dangerouslySetInnerHTML={{ __html: feature.icon }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/80">
                        {feature.label}
                      </div>
                      <div className="text-[12px] text-white/30">
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <a
                  href="mailto:hello@eu-compliance-hub.eu?subject=Verzeichnis-Listing"
                  className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-[Syne] font-bold text-[15px] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
                    color: "#0A2540",
                    boxShadow:
                      "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                  }}
                >
                  <IconMail className="w-5 h-5" />
                  <span className="relative z-10">Kontakt aufnehmen</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <p className="font-mono text-[11px] text-white/20 mt-6 tracking-wide">
                  Unverbindliche Anfrage. Antwort innerhalb von 24 Stunden.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
