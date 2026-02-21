"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FristenRadarSignup from "@/components/FristenRadarSignup";
import { DEADLINES, isPast, daysUntil, formatDateDE, type Deadline } from "@/data/deadlines";

/* ═══════ All unique regulation names from DEADLINES ═══════ */
const ALL_REGULATIONS = Array.from(new Set(DEADLINES.map((d) => d.reg)));

/* ═══════ Year range ═══════ */
const ALL_YEARS = Array.from(new Set(DEADLINES.map((d) => new Date(d.iso).getFullYear()))).sort();

/* ═══════ Status filter options ═══════ */
type StatusFilter = "all" | "upcoming" | "past";

/* ═══════ Animation helpers ═══════ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ═══════ Countdown Badge ═══════ */
function CountdownBadge({ iso }: { iso: string }) {
  const days = daysUntil(iso);
  const past = days < 0;

  if (past) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
        ✓ In Kraft
      </span>
    );
  }

  const urgent = days <= 90;
  const warning = days <= 180;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border ${
        urgent
          ? "bg-red-50 text-red-600 border-red-200"
          : warning
          ? "bg-amber-50 text-amber-600 border-amber-200"
          : "bg-blue-50 text-blue-600 border-blue-200"
      }`}
    >
      {urgent && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
      {days === 0 ? "Heute" : `${days} Tage`}
    </span>
  );
}

/* ═══════ Progress Bar (visual timeline position) ═══════ */
function TimelineProgress({ deadlines }: { deadlines: Deadline[] }) {
  const upcoming = deadlines.filter((d) => !isPast(d.iso));
  const pastCount = deadlines.length - upcoming.length;
  const pct = deadlines.length > 0 ? Math.round((pastCount / deadlines.length) * 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 rounded-full bg-[#e8ecf4] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-mono text-[#7a8db0] whitespace-nowrap">
        {pastCount}/{deadlines.length} in Kraft
      </span>
    </div>
  );
}

/* ═══════ Filter Chip ═══════ */
function FilterChip({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${
        active
          ? "text-white shadow-sm"
          : "bg-white text-[#3a4a6b] border-[#d8dff0] hover:border-[#0A2540]/20 hover:bg-[#f4f6fc]"
      }`}
      style={
        active
          ? {
              background: color ?? "#0A2540",
              borderColor: color ?? "#0A2540",
            }
          : undefined
      }
    >
      {label}
    </button>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function FristenRadarPage() {
  const [selectedRegs, setSelectedRegs] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  /* ── Toggle regulation ── */
  function toggleReg(reg: string) {
    setSelectedRegs((prev) => {
      const next = new Set(prev);
      if (next.has(reg)) next.delete(reg);
      else next.add(reg);
      return next;
    });
  }

  /* ── Filtered deadlines ── */
  const filtered = useMemo(() => {
    return DEADLINES.filter((d) => {
      if (selectedRegs.size > 0 && !selectedRegs.has(d.reg)) return false;
      if (statusFilter === "upcoming" && isPast(d.iso)) return false;
      if (statusFilter === "past" && !isPast(d.iso)) return false;
      if (selectedYear && new Date(d.iso).getFullYear() !== selectedYear) return false;
      return true;
    });
  }, [selectedRegs, statusFilter, selectedYear]);

  /* ── Group by year ── */
  const groupedByYear = useMemo(() => {
    const map = new Map<number, Deadline[]>();
    for (const d of filtered) {
      const year = new Date(d.iso).getFullYear();
      const list = map.get(year) ?? [];
      list.push(d);
      map.set(year, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [filtered]);

  /* ── Next upcoming deadline ── */
  const nextDeadline = useMemo(() => {
    return DEADLINES.find((d) => !isPast(d.iso)) ?? null;
  }, []);

  /* ── Has active filters ── */
  const hasFilters = selectedRegs.size > 0 || statusFilter !== "all" || selectedYear !== null;

  function resetFilters() {
    setSelectedRegs(new Set());
    setStatusFilter("all");
    setSelectedYear(null);
  }

  /* ── Regulation color lookup ── */
  const regColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const d of DEADLINES) map[d.reg] = d.color;
    return map;
  }, []);

  /* ── Guide link lookup ── */
  const guideLinks: Record<string, string> = {
    DORA: "/dora",
    "AI Act": "/eu-ai-act",
    NISG: "/nisg-2026",
    CRA: "/cra",
    CSRD: "/csrd-esg",
    BaFG: "/bafg",
    HSchG: "/hschg",
    DSGVO: "/dsgvo",
    MiCA: "/mica",
    "Green Claims": "/green-claims",
    DPP: "/digitaler-produktpass",
    PLD: "/produkthaftung",
    DSA: "/dsa",
    "Data Act": "/data-act",
    eIDAS: "/eidas",
    EHDS: "/ehds",
    ePrivacy: "/eprivacy",
  };

  return (
    <>
      <Header />
      <main>
        {/* ═══════ Hero ═══════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#060c1a] via-[#0a1628] to-[#060c1a]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,37,64,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-blue-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Interaktives Tool
              </div>

              <h1 className="font-[Syne] font-[800] text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-5">
                Fristen-
                <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Radar
                </span>
              </h1>
              <p className="text-lg text-[#94a3c4] max-w-xl mx-auto leading-relaxed mb-8">
                {DEADLINES.length} EU-Compliance-Deadlines auf einen Blick.
                Filtern Sie nach Regulierung, Jahr oder Status — finden Sie genau die Fristen, die Sie betreffen.
              </p>

              {/* ── Next deadline highlight ── */}
              {nextDeadline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm"
                >
                  <span className="text-xs text-white/40">Nächste Frist:</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {formatDateDE(nextDeadline.iso)}
                  </span>
                  <span className="text-sm text-white/60">—</span>
                  <span className="text-sm text-white/80">{nextDeadline.reg}: {nextDeadline.title}</span>
                  <CountdownBadge iso={nextDeadline.iso} />
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ═══════ Filter Bar (sticky) ═══════ */}
        <div className="sticky top-[72px] z-40 border-b border-[#e8ecf4]">
          <div className="bg-white/80 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-4">
              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#7a8db0] mr-1">
                  Status:
                </span>
                {(["all", "upcoming", "past"] as StatusFilter[]).map((s) => (
                  <FilterChip
                    key={s}
                    label={s === "all" ? "Alle" : s === "upcoming" ? "Bevorstehend" : "In Kraft"}
                    active={statusFilter === s}
                    color={s === "upcoming" ? "#1e40af" : s === "past" ? "#059669" : "#0A2540"}
                    onClick={() => setStatusFilter(s)}
                  />
                ))}

                <span className="mx-2 w-px h-5 bg-[#e8ecf4]" />

                <span className="font-mono text-[10px] tracking-wider uppercase text-[#7a8db0] mr-1">
                  Jahr:
                </span>
                <FilterChip
                  label="Alle"
                  active={selectedYear === null}
                  onClick={() => setSelectedYear(null)}
                />
                {ALL_YEARS.map((y) => (
                  <FilterChip
                    key={y}
                    label={String(y)}
                    active={selectedYear === y}
                    onClick={() => setSelectedYear(selectedYear === y ? null : y)}
                  />
                ))}
              </div>

              {/* Regulation Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#7a8db0] mr-1">
                  Regulierung:
                </span>
                {ALL_REGULATIONS.map((reg) => (
                  <FilterChip
                    key={reg}
                    label={reg}
                    active={selectedRegs.has(reg)}
                    color={regColorMap[reg]}
                    onClick={() => toggleReg(reg)}
                  />
                ))}

                {hasFilters && (
                  <>
                    <span className="mx-1 w-px h-5 bg-[#e8ecf4]" />
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-medium text-[#7a8db0] hover:text-red-500 hover:bg-red-50 border border-[#e8ecf4] hover:border-red-200 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reset
                    </button>
                  </>
                )}

                <span className="ml-auto font-mono text-[12px] font-bold text-[#7a8db0]">
                  {filtered.length} Frist{filtered.length !== 1 ? "en" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ Timeline Progress ═══════ */}
        <section className="bg-[#f4f6fc] pt-8 pb-2">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <TimelineProgress deadlines={filtered} />
          </div>
        </section>

        {/* ═══════ Deadline List grouped by year ═══════ */}
        <section className="py-12 bg-[#f4f6fc]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#e8ecf4] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#7a8db0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="font-[Syne] font-bold text-lg text-[#060c1a] mb-2">Keine Fristen gefunden</h3>
                <p className="text-sm text-[#7a8db0] mb-4">Passe die Filter an, um Deadlines zu sehen.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0A2540] hover:bg-[#0A2540]/90 transition-colors"
                >
                  Filter zurücksetzen
                </button>
              </motion.div>
            ) : (
              <div className="space-y-10">
                {groupedByYear.map(([year, deadlines]) => {
                  const allPast = deadlines.every((d) => isPast(d.iso));
                  return (
                    <YearGroup
                      key={year}
                      year={year}
                      deadlines={deadlines}
                      allPast={allPast}
                      guideLinks={guideLinks}
                    />
                  );
                })}
              </div>
            )}

            <p className="text-center text-xs text-[#7a8db0] mt-10">
              Stand: {new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })}.
              Änderungen durch delegierte Rechtsakte möglich. Alle Angaben ohne Gewähr.
            </p>
          </div>
        </section>

        {/* ═══════ Compliance-Briefing CTA ═══════ */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A2540]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,20,80,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-[Syne] font-[800] text-3xl md:text-4xl text-white mb-4">
              Compliance-Briefing aktivieren
            </h2>
            <p className="text-white/45 mb-8 max-w-md mx-auto">
              Ihr regulatorisches Frühwarnsystem — nur bei kritischen Fristen und Gesetzesänderungen. Maximal 3× pro Monat.
            </p>
            <FristenRadarSignup variant="hero" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ═══════ Collapsible Year Group ═══════ */
function YearGroup({
  year,
  deadlines,
  allPast,
  guideLinks,
}: {
  year: number;
  deadlines: Deadline[];
  allPast: boolean;
  guideLinks: Record<string, string>;
}) {
  const [open, setOpen] = useState(!allPast);

  return (
    <div>
      {/* Year header — clickable to toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex items-center gap-3 mb-5 w-full text-left"
        aria-expanded={open}
      >
        <span className="font-[Syne] font-[800] text-2xl text-[#060c1a]">{year}</span>
        <span className="flex-1 h-px bg-[#d8dff0]" aria-hidden="true" />
        {allPast ? (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            ✓ {deadlines.length} in Kraft
          </span>
        ) : (
          <span className="text-xs font-mono text-[#7a8db0]">
            {deadlines.filter((d) => !isPast(d.iso)).length} bevorstehend
          </span>
        )}
        <svg
          className={`w-4 h-4 text-[#7a8db0] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`year-${year}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {deadlines.map((d, idx) => (
                <motion.div
                  key={`${d.reg}-${d.iso}-${idx}`}
                  variants={item}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e8ecf4] hover:border-[#0A2540]/10 hover:shadow-sm transition-all duration-200 group/card"
                >
                  {/* Color dot */}
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0 ring-4 ring-opacity-10"
                    style={{ backgroundColor: d.color, boxShadow: `0 0 0 4px ${d.color}1a` }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#7a8db0] uppercase tracking-wider">
                          {d.reg}
                        </span>
                        <h3 className="font-[Syne] font-bold text-sm text-[#060c1a] leading-snug mt-0.5">
                          {d.title}
                        </h3>
                      </div>
                      <CountdownBadge iso={d.iso} />
                    </div>
                    <p className="text-[13px] text-[#5a6a8a] leading-relaxed mt-1">{d.desc}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] font-mono text-[#7a8db0]">
                        {formatDateDE(d.iso)}
                      </span>
                      {guideLinks[d.reg] && (
                        <Link
                          href={guideLinks[d.reg]}
                          className="text-[11px] font-semibold text-[#0A2540]/60 hover:text-[#0A2540] transition-colors"
                        >
                          Guide →
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
