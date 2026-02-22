"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DEADLINES, isPast } from "@/data/deadlines";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";
import type { RegulationKey } from "@/i18n/country/types";

/* ─── Regulation name → CountryData key mapping ─── */
const REG_TO_KEY: Record<string, RegulationKey> = {
  DORA: "dora",
  "AI Act": "ai-act",
  NISG: "nis2",
  CRA: "cra",
  CSRD: "csrd",
  BaFG: "bafg",
  HSchG: "hschg",
  DSGVO: "dsgvo",
  MiCA: "mica",
  "Green Claims": "green-claims",
  DPP: "dpp",
  PLD: "produkthaftung",
  DSA: "dsa",
  "Data Act": "data-act",
  eIDAS: "eidas",
  EHDS: "ehds",
  ePrivacy: "eprivacy",
};

/* ─── Data ─── */
const timelineEvents = DEADLINES.map((d) => ({
  date: d.label,
  title: d.title,
  desc: d.desc,
  color: d.color,
  reg: d.reg,
  iso: d.iso,
  countryKey: REG_TO_KEY[d.reg],
}));

const ITEMS = timelineEvents.length;

/* ─── Single Timeline Item ─── */
function TimelineItem({
  ev,
  index,
  scrollYProgress,
  authority,
}: {
  ev: (typeof timelineEvents)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  authority?: string;
}) {
  const past = isPast(ev.iso);

  // Each item gets a slice of the total scroll progress.
  // We use a scroll range of ~0.04 to ~0.92 so items animate in the
  // visible portion. First items appear early, last items near the end.
  const rangeStart = 0.04;
  const rangeEnd = 0.92;
  const range = rangeEnd - rangeStart;
  const segmentSize = range / ITEMS;
  const start = rangeStart + index * segmentSize;
  const fullyVisible = start + segmentSize * 0.55;

  const opacity = useTransform(scrollYProgress, [start, fullyVisible, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [start, fullyVisible], [40, 0]);
  const scale = useTransform(scrollYProgress, [start, fullyVisible], [0.96, 1]);

  return (
    <motion.div
      className="flex items-start gap-5 sm:gap-8"
      style={{ opacity, y, scale }}
    >
      {/* Left: dot + line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="relative">
          <div
            className="w-4 h-4 rounded-full border-2"
            style={{
              background: past ? ev.color : "#060c1a",
              borderColor: ev.color,
            }}
          />
          {!past && (
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: ev.color }}
            />
          )}
        </div>
        {/* Connecting line (not on last item) */}
        {index < ITEMS - 1 && (
          <div
            className="w-px h-16 sm:h-20 mt-2"
            style={{
              background: `linear-gradient(to bottom, ${ev.color}40, transparent)`,
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-4">
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-2"
          style={{ background: `${ev.color}15` }}
        >
          <span
            className="font-mono text-[11px] font-semibold"
            style={{ color: ev.color }}
          >
            {ev.reg}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] font-bold text-white/60">
            {ev.date}
          </span>
          {past && (
            <>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[10px] font-semibold text-emerald-400">
                In Kraft
              </span>
            </>
          )}
        </div>
        <h3
          className={`font-[Syne] font-bold text-lg mb-1 ${
            past ? "text-white/50" : "text-white"
          }`}
        >
          {ev.title}
        </h3>
        <p className="text-sm text-white/35 leading-relaxed max-w-sm">
          {ev.desc}
        </p>
        {authority && (
          <p className="text-[11px] text-white/25 mt-1 font-mono">
            Aufsicht: {authority}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Progress Dots ─── */
function ProgressDots({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="hidden lg:flex flex-col items-center gap-2 absolute right-8 top-1/2 -translate-y-1/2">
      {timelineEvents.map((ev, i) => {
        const segmentSize = 1 / (ITEMS + 2);
        const threshold = (i + 1.5) * segmentSize;
        return (
          <ProgressDot
            key={i}
            scrollYProgress={scrollYProgress}
            threshold={threshold}
            color={ev.color}
          />
        );
      })}
    </div>
  );
}

function ProgressDot({
  scrollYProgress,
  threshold,
  color,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
  color: string;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold],
    [0.2, 1],
  );
  const dotScale = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold],
    [0.6, 1],
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{
        background: color,
        opacity,
        scale: dotScale,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function StickyTimeline() {
  const { countryCode, countryData } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(ITEMS + 3) * 100}svh` }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-svh overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #060c1a 0%, #0a1633 50%, #060c1a 100%)",
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(10,37,64,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Progress bar at top */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] z-20"
          style={{
            width: progressWidth,
            background:
              "linear-gradient(90deg, #0A2540, #60a5fa, #0A2540)",
          }}
        />

        {/* Content area */}
        <div className="relative h-full flex flex-col justify-center max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          {/* Section header — always visible */}
          <div className="mb-10 flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#FACC15]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-[#FACC15]">
                Zeitplan 2025 – 2027
              </span>
              {countryMeta && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-3">
              Compliance-<span className="text-[#FACC15]">Timeline.</span>
            </h2>
            <p className="text-white/35 text-base sm:text-lg max-w-md">
              Alle wichtigen Fristen auf einen Blick. Plane voraus.
            </p>
          </div>

          {/* Timeline items */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden flex flex-col justify-start">
            <div className="space-y-1">
              {timelineEvents.map((ev, i) => {
                const regData = ev.countryKey ? countryData?.regulations?.[ev.countryKey] : undefined;
                return (
                  <TimelineItem
                    key={i}
                    ev={ev}
                    index={i}
                    scrollYProgress={scrollYProgress}
                    authority={regData?.authority}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress dots (desktop) */}
        <ProgressDots scrollYProgress={scrollYProgress} />

        {/* Scroll hint at bottom */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.1, 0.9, 1],
              [0.6, 0.3, 0.3, 0],
            ),
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/20">
            Scrollen
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/10 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/30 animate-scroll-dot" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
