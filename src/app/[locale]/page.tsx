"use client";

import { useState, useEffect, useRef, useMemo, useCallback, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FristenRadarSignup from "@/components/FristenRadarSignup";
import AnimatedCounter from "@/components/AnimatedCounter";
import { DEADLINES, isPast, daysUntil } from "@/data/deadlines";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";
import type { Messages } from "@/i18n/messages/de";

/* Lazy-load ComplianceRadar — heavy framer-motion animation, desktop-only */
const ComplianceRadar = dynamic(() => import("@/components/ComplianceRadar"), {
  ssr: false,
});

/* ─── Static layout data (non-translatable) ─── */

const pillarMeta = [
  { id: "nisg" as const, acronym: "NISG", status: "upcoming" as const, deadline: "2026-10-01", penalty: "10 Mio. € / 2%", href: "/nisg-2026", icon: "shield", accent: "#1e40af", accentLight: "#e8ecff", accentMid: "#c7d2fe" },
  { id: "aiact" as const, acronym: "AI Act", status: "upcoming" as const, deadline: "2026-08-02", penalty: "35 Mio. € / 7%", href: "/eu-ai-act", icon: "brain", accent: "#7c3aed", accentLight: "#f3f0ff", accentMid: "#e0d4ff" },
  { id: "dora" as const, acronym: "DORA", status: "live" as const, deadline: "2025-01-17", penalty: "1% tägl. Umsatz", href: "/dora", icon: "building", accent: "#059669", accentLight: "#ecfdf5", accentMid: "#c6f6d5" },
  { id: "cra" as const, acronym: "CRA", status: "upcoming" as const, deadline: "2026-09-11", penalty: "15 Mio. € / 2.5%", href: "/cra", icon: "cpu", accent: "#ea580c", accentLight: "#fff7ed", accentMid: "#fed7aa" },
];

const toolsMeta = [
  { href: "/tools/regulierung-finder", icon: "compass", accent: "#FACC15", accentLight: "#fef9e7" },
  { href: "/tools/compliance-checkliste", icon: "list", accent: "#FACC15", accentLight: "#fef9e7" },
  { href: "/haftungs-check", icon: "scale", accent: "#0A2540", accentLight: "#e8eeff" },
  { href: "/fristen-radar", icon: "calendar", accent: "#1e40af", accentLight: "#e8ecff" },
  { href: "/tools/kosten-kalkulator", icon: "coins", accent: "#16a34a", accentLight: "#f0fdf4" },
  { href: "/glossar", icon: "book", accent: "#7c3aed", accentLight: "#f3f0ff" },
];

const secondaryRegMeta = [
  { key: "dsgvo" as const, acronym: "DSGVO & KI", href: "/dsgvo", accent: "#7c3aed", icon: "lock" },
  { key: "csrd" as const, acronym: "CSRD / ESG", href: "/csrd-esg", accent: "#16a34a", icon: "layers" },
  { key: "bafg" as const, acronym: "BaFG", href: "/bafg", accent: "#2563eb", icon: "accessibility" },
  { key: "hschg" as const, acronym: "HSchG", href: "/hschg", accent: "#d97706", icon: "megaphone" },
  { key: "greenClaims" as const, acronym: "Green Claims", href: "/green-claims", accent: "#059669", icon: "leaf" },
  { key: "mica" as const, acronym: "MiCA", href: "/mica", accent: "#f59e0b", icon: "bitcoin" },
  { key: "dpp" as const, acronym: "DPP / ESPR", href: "/digitaler-produktpass", accent: "#14b8a6", icon: "qrcode" },
  { key: "pld" as const, acronym: "PLD", href: "/produkthaftung", accent: "#ef4444", icon: "alert" },
  { key: "dsa" as const, acronym: "DSA", href: "/dsa", accent: "#6366f1", icon: "globe" },
  { key: "dataAct" as const, acronym: "Data Act", href: "/data-act", accent: "#0ea5e9", icon: "database" },
  { key: "eprivacy" as const, acronym: "ePrivacy", href: "/eprivacy", accent: "#a855f7", icon: "cookie" },
  { key: "eidas" as const, acronym: "eIDAS 2.0", href: "/eidas", accent: "#0891b2", icon: "fingerprint" },
  { key: "ehds" as const, acronym: "EHDS", href: "/ehds", accent: "#ec4899", icon: "heart" },
];

const quickStartMeta = [
  { step: "01", href: "/tools/regulierung-finder", accent: "#FACC15" },
  { step: "02", href: "/tools/compliance-checkliste", accent: "#10b981" },
  { step: "03", href: "/tools/kosten-kalkulator", accent: "#3b82f6" },
];

const newsColors = ["#1e40af", "#2563eb", "#16a34a"];
const newsHrefs = ["/nisg-2026", "/bafg", "/csrd-esg"];

const regListColors = [
  "#1e40af", "#7c3aed", "#059669", "#ea580c", "#7c3aed", "#16a34a",
  "#2563eb", "#d97706", "#059669", "#f59e0b", "#14b8a6", "#ef4444",
  "#6366f1", "#0ea5e9", "#a855f7", "#0891b2", "#ec4899", "#0A2540",
];

/** Build translated pillars by merging meta + messages */
function buildPillars(pd: Messages["home"]["pillarData"]) {
  return pillarMeta.map(m => ({
    ...m,
    fullName: pd[m.id].fullName,
    tagline: pd[m.id].tagline,
    statusLabel: pd[m.id].statusLabel,
    affected: pd[m.id].affected,
    keyFacts: pd[m.id].keyFacts,
  }));
}

/** Build translated tools list by merging meta + messages */
function buildToolsList(items: Messages["home"]["tools"]["items"]) {
  return toolsMeta.map((m, i) => ({ ...m, ...items[i] }));
}

/* ─── Small Brand Shield for cards ─── */
function BrandShieldSmall({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
      <path d="M32 4 L55 14.5 V30 C55 44 45 54 32 60 C19 54 9 44 9 30 V14.5 Z"
        fill="url(#card-shield-grad2)" stroke="rgba(250,204,21,0.2)" strokeWidth="0.5" />
      <path d="M32 10 L50 18.5 V30 C50 42 42 50 32 55 C22 50 14 42 14 30 V18.5 Z"
        fill="url(#card-shield-inner2)" />
      <text x="32" y="43" textAnchor="middle" fontFamily="Syne, Georgia, serif"
        fontWeight="700" fontSize="30" fill="#FACC15">&#167;</text>
      <defs>
        <linearGradient id="card-shield-grad2" x1="9" y1="4" x2="55" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F2D58" /><stop offset="1" stopColor="#0A2540" />
        </linearGradient>
        <linearGradient id="card-shield-inner2" x1="14" y1="10" x2="50" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B2245" /><stop offset="1" stopColor="#071B33" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Icon Components ─── */
function IconShield({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function IconBrain({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 4.5 7.2A5 5 0 0 1 18 14a5 5 0 0 1-3.5 4.8V22h-5v-3.2A5 5 0 0 1 6 14a5 5 0 0 1 1.5-4.8A5 5 0 0 1 12 2z" /><path d="M12 2v6m-4 4h8" /></svg>;
}
function IconBuilding({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18m6-18v18M3 9h18M3 15h18" /></svg>;
}
function IconCpu({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m-3 6h3M20 9h3m-3 6h3" /></svg>;
}
function IconScale({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18m-7-4l3.5-9h7L19 17M8 17h3m2 0h3" /><circle cx="12" cy="3" r="1" /></svg>;
}
function IconCoins({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h2v4" /></svg>;
}
function IconList({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
}
function IconBook({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
}
function IconCalendar({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>;
}
function IconChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>;
}
function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>;
}
function IconArrowDown({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7l7 7 7-7" /></svg>;
}
function IconCompass({ className = "w-6 h-6" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
}

const iconMap: Record<string, (props: { className?: string }) => ReactNode> = {
  shield: IconShield, brain: IconBrain, building: IconBuilding, cpu: IconCpu,
  scale: IconScale, coins: IconCoins, list: IconList, book: IconBook, calendar: IconCalendar,
  compass: IconCompass,
};

/* ── Secondary regulation icons (for "Weitere Regulierungen" section) ── */
function IconLock({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
}
function IconLayers({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>;
}
function IconAccessibility({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="1.5" /><path d="M7 8l5 1 5-1" /><path d="M12 9v4" /><path d="M8 20l4-7 4 7" /></svg>;
}
function IconMegaphone({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}
function IconLeaf({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" /></svg>;
}
function IconBitcoin({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" /></svg>;
}
function IconQrCode({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="3" height="3" /><path d="M21 14h-3v3" /><path d="M21 21v-3h-3" /></svg>;
}
function IconAlertTriangle({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
}
function IconGlobe({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function IconDatabase({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
}
function IconCookie({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" /></svg>;
}
function IconFingerprint({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" /><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" /></svg>;
}
function IconHeart({ className = "w-5 h-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
}

const secondaryIconMap: Record<string, (props: { className?: string }) => ReactNode> = {
  lock: IconLock, layers: IconLayers, accessibility: IconAccessibility, megaphone: IconMegaphone,
  leaf: IconLeaf, bitcoin: IconBitcoin, qrcode: IconQrCode, alert: IconAlertTriangle,
  globe: IconGlobe, database: IconDatabase, cookie: IconCookie, fingerprint: IconFingerprint, heart: IconHeart,
};

/* ─── Countdown ─── */
function Countdown({ deadline, label, inForceLabel, daysUntilLabel }: { deadline: string; label: string; inForceLabel: string; daysUntilLabel: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const d = Math.floor((new Date(deadline).getTime() - Date.now()) / 86400000);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(d);
  }, [deadline]);
  if (days === null) return null;

  /* Already past or today → show "In Kraft" badge */
  if (days <= 0) {
    return (
      <div className="inline-flex items-center gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="font-mono text-[11px] font-semibold text-emerald-400">{label}</span>
        <span className="font-mono text-[11px] text-emerald-400/60">{inForceLabel}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-2.5 transition-all hover:bg-white/[0.08]">
      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse-dot" />
      <span className="font-mono text-sm font-bold text-white">{days}</span>
      <span className="font-mono text-[11px] text-white/55">{daysUntilLabel} {label}</span>
    </div>
  );
}

/* ─── Animated stat ─── */
function Stat({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`text-center transition-all duration-700 overflow-hidden px-2 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="font-[Syne] font-extrabold text-white leading-none tracking-tight flex items-baseline justify-center gap-1 flex-wrap">
        <span className="text-4xl sm:text-5xl md:text-6xl">{value}</span>
        {suffix && <span className="text-lg sm:text-xl md:text-2xl text-white/60 font-bold shrink-0">{suffix}</span>}
      </div>
      <div className="text-xs sm:text-sm text-white/50 mt-2 tracking-wide">{label}</div>
    </div>
  );
}

/* ─── Reveal on scroll ─── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`h-px w-10 ${dark ? "bg-blue-400" : "bg-[#0A2540]"}`} />
      <span className={`font-mono text-[11px] tracking-[0.2em] uppercase font-medium ${dark ? "text-blue-400" : "text-[#0A2540]"}`}>
        {children}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */
export default function HomePage() {
  const { messages, locale } = useTranslations();
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const h = messages.home;

  const pillars = useMemo(() => buildPillars(h.pillarData), [h.pillarData]);
  const toolsList = useMemo(() => buildToolsList(h.tools.items), [h.tools.items]);

  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");
  const filtered = useMemo(
    () => pillars.filter(p => filter === "all" || p.status === filter),
    [filter, pillars],
  );

  /* ── Mouse parallax for hero radar ── */
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 50, damping: 20 });

  /* Grid overlay parallax: moves opposite to mouse */
  const gridTx = useTransform(smoothMouseX, [-1, 1], [12, -12]);
  const gridTy = useTransform(smoothMouseY, [-1, 1], [10, -10]);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawMouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawMouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  }, [rawMouseX, rawMouseY]);

  const handleHeroMouseLeave = useCallback(() => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  return (
    <>
      <Header />
      <main>

        {/* ════════ HERO ════════ */}
        <section
          aria-label={h.aria.hero}
          className="relative h-svh max-h-svh flex flex-col overflow-hidden"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Multi-layer gradient bg */}
          <div className="absolute inset-0 bg-[#040a18]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0a1a55 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 80% 20%, #0A2540 0%, transparent 50%)" }} />

          {/* Animated gradient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] left-[55%] w-[600px] h-[600px] rounded-full animate-float" style={{ background: "radial-gradient(circle, rgba(10,37,64,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full animate-float-delayed" style={{ background: "radial-gradient(circle, rgba(10,37,64,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
          </div>

          {/* Subtle grid overlay — parallax: moves opposite to mouse */}
          <motion.div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px", x: gridTx, y: gridTy }} />

          {/* Compliance Radar — animated hero visual with parallax */}
          <div className="absolute top-12 right-0 md:right-8 lg:right-16 pointer-events-none hidden md:block w-[340px] h-[340px] lg:w-[420px] lg:h-[420px]">
            <ComplianceRadar className="w-full h-full" mouseX={smoothMouseX} mouseY={smoothMouseY} />
          </div>

          {/* Gradient bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040a18] to-transparent pointer-events-none" />

          {/* Content — flex-1 + overflow-hidden ensures scroll indicator always visible */}
          <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-20 pb-0 overflow-hidden">
            {/* Overline */}
            <div className="flex items-center gap-3 mb-5 animate-slide-up opacity-0 flex-shrink-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/60 font-medium">
                eu-compliance-hub.eu
              </span>
              <div className="flex items-center gap-1.5 ml-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="font-mono text-[10px] text-emerald-400 font-medium">LIVE</span>
              </div>
              {countryMeta && (
                <div className="flex items-center gap-1.5 ml-1 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>

            {/* Title — responsive font sizing with svh-aware clamp */}
            <h1 className="animate-slide-up opacity-0 font-[Syne] font-extrabold leading-[0.88] tracking-[-0.03em] mb-4 flex-shrink-0"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <span className="text-white">{h.hero.title1}</span>
              <br />
              <span className="text-white">{h.hero.title2}</span>
              <br />
              <span className="inline-block mt-1 bg-gradient-to-r from-[#FACC15] via-amber-300 to-[#FACC15] bg-clip-text text-transparent animate-gradient">
                {h.hero.title3}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-slide-up opacity-0 text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mb-6 flex-shrink-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
              {h.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-slide-up opacity-0 flex-shrink-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              <Link href="#regulierungen"
                className="group relative inline-flex items-center gap-3 rounded-2xl px-7 py-3.5 font-[Syne] font-bold text-[#0A2540] text-[15px] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)", boxShadow: "0 8px 32px rgba(250,204,21,0.35), 0 2px 8px rgba(250,204,21,0.2)" }}>
                <span className="relative z-10">{h.hero.ctaPrimary}</span>
                <IconArrowDown className="w-4 h-4 relative z-10 transition-transform group-hover:translate-y-0.5" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href={`/${locale}/haftungs-check`}
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:-translate-y-0.5 hover:border-white/20">
                {h.hero.ctaSecondary}
                <IconArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Deadlines */}
            <div className="flex flex-wrap gap-3 mt-6 animate-slide-up opacity-0 flex-shrink-0" style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}>
              <Countdown deadline="2025-06-28" label="BaFG" inForceLabel={h.countdown.inForce} daysUntilLabel={h.countdown.daysUntil} />
              <Countdown deadline="2026-08-02" label="AI Act" inForceLabel={h.countdown.inForce} daysUntilLabel={h.countdown.daysUntil} />
              <Countdown deadline="2026-09-11" label="CRA Phase 1" inForceLabel={h.countdown.inForce} daysUntilLabel={h.countdown.daysUntil} />
              <Countdown deadline="2026-10-01" label="NISG" inForceLabel={h.countdown.inForce} daysUntilLabel={h.countdown.daysUntil} />
            </div>
          </div>

          {/* Scroll indicator — flex-shrink-0 guarantees visibility */}
          <div className="relative z-10 flex justify-center py-5 animate-fade-in flex-shrink-0" style={{ animationDelay: "1s" }}>
            <a href="#regulierungen" className="flex flex-col items-center gap-1.5 text-white/45 hover:text-white/60 transition-colors duration-300 group cursor-pointer">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">{h.hero.scroll}</span>
              <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5 transition-all group-hover:border-white/30">
                <div className="w-1 h-2 rounded-full bg-white/60 animate-scroll-dot" />
              </div>
            </a>
          </div>
        </section>

        {/* ════════ TICKER ════════ */}
        <div className="relative bg-[#0A2540] py-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#002288] to-[#0A2540]" />
          <div className="relative flex animate-ticker" style={{ width: "max-content" }}>
            {[...h.ticker, ...h.ticker].map((item, i) => (
              <span key={i} className="flex items-center gap-3.5 px-10 font-mono text-[12px] text-white/70 whitespace-nowrap tracking-wide">
                <span className="h-1 w-1 rounded-full bg-[#FACC15] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ════════ STATS ════════ */}
        <section aria-label={h.aria.stats} className="relative bg-[#060c1a] py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(10,37,64,0.15) 0%, transparent 70%)" }} />
          <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <Stat value="18" suffix={h.stats.regulations} label={h.stats.inOverview} />
            <Stat value="35M" suffix="€" label={h.stats.maxFine} />
            <Stat value="27" suffix={h.stats.countries} label={h.stats.countryLabel} />
            <Stat value="2026" suffix="" label={h.stats.complianceYear} />
          </div>
        </section>

        {/* ════════ REGULATION PILLARS ════════ */}
        <section id="regulierungen" aria-label={h.aria.regulations} className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(10,37,64,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section header */}
            <Reveal>
              <SectionLabel>{h.pillars.sectionLabel}</SectionLabel>
              <h2 className="font-[Syne] font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#060c1a] leading-[0.95] mb-5">
                {h.pillars.title1}<br />
                <span className="bg-gradient-to-r from-[#0A2540] to-[#163560] bg-clip-text text-transparent">{h.pillars.title2}</span>
              </h2>
              <p className="text-lg text-[#3a4a6b] max-w-lg leading-relaxed mb-10">
                {h.pillars.subtitle}
              </p>
            </Reveal>

            {/* Filter */}
            <Reveal delay={100}>
              <div className="flex gap-2 mb-14">
                {(["all", "live", "upcoming"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-5 py-2.5 rounded-xl font-mono text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                      filter === f
                        ? "bg-[#0A2540] text-white shadow-lg shadow-blue-900/25"
                        : "bg-white text-[#3a4a6b] border border-[#d0d8ea] hover:border-[#0A2540]/20 hover:shadow-md hover:shadow-blue-900/[0.06]"
                    }`}>
                    {f === "all" ? h.pillars.filterAll : f === "live" ? h.pillars.filterLive : h.pillars.filterUpcoming}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <PillarCard p={p} labels={{ maxPenalty: h.pillars.maxPenalty, affects: h.pillars.affects }} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ WEITERE REGULIERUNGEN ════════ */}
        <section aria-label={h.aria.moreRegulations} className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Reveal>
              <SectionLabel>{h.secondary.sectionLabel}</SectionLabel>
              <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl tracking-tight text-[#060c1a] leading-[1.05] mb-4">
                {h.secondary.title1}{" "}
                <span className="bg-gradient-to-r from-[#0A2540] to-[#163560] bg-clip-text text-transparent">{h.secondary.title2}</span>
              </h2>
              <p className="text-base text-[#3a4a6b] max-w-lg leading-relaxed mb-12">
                {h.secondary.subtitle}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {secondaryRegMeta.map((reg, i) => {
                const regT = h.secondary.regulations[reg.key];
                const RegIcon = secondaryIconMap[reg.icon];
                const isInForce = regT.badge.toLowerCase().includes("kraft") || regT.badge.toLowerCase().includes("force") || regT.badge.toLowerCase().includes("vigor") || regT.badge.toLowerCase().includes("vigore") || regT.badge.toLowerCase().includes("vigueur");
                const isUpdate = regT.badge.toLowerCase().includes("update");
                return (
                <Reveal key={reg.acronym} delay={i * 80}>
                  <Link href={reg.href}
                    className="group block rounded-2xl border border-[#d8dff0] bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/[0.06] hover:-translate-y-1 hover:border-[#0A2540]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: reg.accent }} />
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${reg.accent}12`, color: reg.accent }}>
                        {RegIcon && <RegIcon className="w-5 h-5" />}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold ${
                        isInForce
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isUpdate
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {regT.badge}
                      </span>
                    </div>
                    <div className="font-[Syne] font-bold text-base text-[#060c1a] mb-1 group-hover:text-[#0A2540] transition-colors">
                      {reg.acronym}
                    </div>
                    <div className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">{regT.tagline}</div>
                    <div className="flex items-center gap-1 text-[12px] font-semibold transition-colors" style={{ color: reg.accent }}>
                      {h.secondary.readGuide}
                      <IconChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════ TIMELINE PREVIEW ════════ */}
        <section aria-label={h.aria.timeline} className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060c1a 0%, #0a1633 50%, #060c1a 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(10,37,64,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#FACC15]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-[#FACC15]">
                  {h.timeline.sectionLabel}
                </span>
              </div>
              <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-3">
                {h.timeline.title1}<span className="text-[#FACC15]">{h.timeline.title2}</span>
              </h2>
              <p className="text-white/55 text-base sm:text-lg max-w-md mb-12">
                {h.timeline.subtitle}
              </p>
            </Reveal>

            {/* Compact preview of next deadlines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {DEADLINES.filter(d => !isPast(d.iso)).slice(0, 6).map((d, i) => {
                const days = daysUntil(d.iso);
                return (
                  <Reveal key={`${d.reg}-${d.iso}`} delay={i * 80}>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 transition-all hover:bg-white/[0.07] hover:border-white/15">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[11px] font-bold tracking-wide" style={{ color: d.color }}>{d.reg}</span>
                        <span className="font-mono text-[10px] text-amber-400 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          {days} {h.timeline.days}
                        </span>
                      </div>
                      <div className="font-[Syne] font-bold text-white text-sm mb-1">{d.title}</div>
                      <div className="font-mono text-[11px] text-white/45">{d.label}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Already active — collapsed by default */}
            <Reveal delay={200}>
              <PastDeadlinesToggle alreadyInForceLabel={h.timeline.alreadyInForce} />
            </Reveal>

            {/* CTA to full timeline */}
            <Reveal delay={300}>
              <div className="text-center">
                <Link
                  href={`/${locale}/timeline`}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-[#FACC15]/30 bg-[#FACC15]/10 backdrop-blur-sm px-8 py-4 font-[Syne] font-bold text-[15px] text-[#FACC15] transition-all duration-300 hover:bg-[#FACC15]/20 hover:-translate-y-1 hover:border-[#FACC15]/50 hover:shadow-lg hover:shadow-[#FACC15]/10"
                >
                  {h.timeline.ctaTimeline}
                  <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════ TRUST SIGNALS ════════ */}
        <section aria-label={h.aria.trust} className="py-16 bg-white border-b border-[#e8ecf4]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { target: 18, suffix: "+", label: h.trust.regulationsExplained, icon: (
                  <svg className="w-6 h-6 mx-auto mb-3 text-[#b89b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                )},
                { target: 8, suffix: "", label: h.trust.freeTools, icon: (
                  <svg className="w-6 h-6 mx-auto mb-3 text-[#b89b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
                  </svg>
                )},
                { target: 70, suffix: "+", label: h.trust.glossaryEntries, icon: (
                  <svg className="w-6 h-6 mx-auto mb-3 text-[#b89b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                )},
                { target: 100, suffix: "%", label: h.trust.independentAdFree, icon: (
                  <svg className="w-6 h-6 mx-auto mb-3 text-[#b89b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                )},
              ].map((stat) => (
                <Reveal key={stat.label}>
                  <div>
                    {stat.icon}
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      duration={2}
                      className="font-[Syne] font-extrabold text-3xl text-[#060c1a] mb-1 block"
                    />
                    <div className="text-xs text-[#7a8db0] font-medium">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ QUICK START ════════ */}
        <section aria-label={h.aria.quickStart} className="py-20 lg:py-24 bg-[#060c1a] relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.04) 0%, transparent 70%)" }} />
          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <Reveal>
              <div className="text-center mb-12">
                <span className="inline-block font-mono text-[11px] font-semibold tracking-widest uppercase text-[#FACC15] mb-4">
                  {h.quickStart.sectionLabel}
                </span>
                <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-[1.05] mb-4">
                  {h.quickStart.title}
                </h2>
                <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
                  {h.quickStart.subtitle}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickStartMeta.map((meta, i) => {
                const stepT = h.quickStart.steps[i];
                const item = { ...meta, title: stepT.title, desc: stepT.desc, cta: stepT.cta };
                return item;
              }).map((item, i) => (
                <Reveal key={item.step} delay={i * 100}>
                  <Link
                    href={item.href}
                    className="group flex flex-col h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="font-[Syne] font-extrabold text-2xl"
                        style={{ color: item.accent }}
                      >
                        {item.step}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <h3 className="font-[Syne] font-bold text-lg text-white mb-2 group-hover:text-[#FACC15] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
                      {item.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: item.accent }}
                    >
                      {item.cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ TOOLS ════════ */}
        <section id="tools" aria-label={h.aria.tools} className="py-28 lg:py-36 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(10,37,64,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Reveal>
              <SectionLabel>{h.tools.sectionLabel}</SectionLabel>
              <h2 className="font-[Syne] font-extrabold text-4xl md:text-5xl tracking-tight text-[#060c1a] mb-5">
                {h.tools.title1} <span className="bg-gradient-to-r from-[#0A2540] to-[#163560] bg-clip-text text-transparent">{h.tools.title2}</span>
              </h2>
              <p className="text-lg text-[#3a4a6b] max-w-lg leading-relaxed mb-14">
                {h.tools.subtitle}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {toolsList.map((t, i) => (
                <Reveal key={t.title} delay={i * 100}>
                  <ToolCard t={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ WHY US ════════ */}
        <section aria-label={h.aria.whyUs} className="py-28 lg:py-36 bg-white relative overflow-hidden">
          {/* Subtle bg accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(10,37,64,0.04) 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <Reveal>
                <SectionLabel>{h.whyUs.sectionLabel}</SectionLabel>
                <h2 className="font-[Syne] font-extrabold text-4xl md:text-5xl tracking-tight text-[#060c1a] leading-[1.05] mb-6">
                  {h.whyUs.title1}{" "}
                  <span className="bg-gradient-to-r from-[#0A2540] to-[#163560] bg-clip-text text-transparent">{h.whyUs.title2}</span>
                </h2>
                <p className="text-lg text-[#3a4a6b] leading-relaxed mb-10">
                  {h.whyUs.subtitle}
                </p>
                <div className="space-y-6">
                  {h.whyUs.benefits.map(({ title, desc }) => (
                    <div key={title} className="flex items-start gap-4 group">
                      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300" style={{ background: "#e8eeff" }}>
                        <IconCheck className="w-3.5 h-3.5 text-[#0A2540]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[15px] text-[#060c1a] mb-0.5">{title}</div>
                        <div className="text-sm text-[#7a8db0] leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Visual card */}
              <Reveal delay={200}>
                <div className="relative">
                  {/* Card */}
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
                    {/* Card header */}
                    <div className="bg-gradient-to-br from-[#060c1a] via-[#0a1a44] to-[#0A2540] p-8 pb-6">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                            <BrandShieldSmall size={28} />
                          </div>
                          <div>
                            <div className="text-white font-[Syne] font-bold text-sm leading-none">EU Compliance Hub</div>
                            <div className="font-mono text-[10px] text-white/45 mt-0.5">eu-compliance-hub.eu</div>
                          </div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-white/45 uppercase tracking-[0.15em] mb-3">{h.whyUs.cardRegulations}</div>
                    </div>
                    {/* Card body */}
                    <div className="bg-[#0a1633]">
                      {h.whyUs.regList.map((r, i) => {
                        const color = regListColors[i];
                        const live = r.label === h.whyUs.cardActive;
                        return (
                          <div key={r.name} className={`flex items-center justify-between px-8 py-2.5 ${i < 17 ? "border-b border-white/[0.04]" : ""}`}>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                              <span className="text-sm text-white/70 font-medium">{r.name}</span>
                            </div>
                            <span className={`text-[11px] font-mono px-3 py-1 rounded-lg font-medium ${
                              live
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-white/[0.04] text-white/55 border border-white/[0.06]"
                            }`}>
                              {r.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 animate-float">
                    <div className="rounded-2xl px-5 py-2.5 font-[Syne] font-bold text-sm text-white shadow-xl"
                      style={{ background: "linear-gradient(135deg, #0A2540 0%, #163560 100%)", boxShadow: "0 12px 40px rgba(10,37,64,0.35)" }}>
                      {h.whyUs.freeBadge}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════ NEWS PREVIEW ════════ */}
        <section aria-label={h.aria.news} className="py-16 lg:py-20 relative overflow-hidden bg-[#f4f6fc]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="font-[Syne] font-extrabold text-3xl md:text-4xl text-[#060c1a] tracking-tight leading-tight mb-3">
                  {h.news.title}
                </h2>
                <p className="text-[#7a8db0] text-base max-w-lg mx-auto">
                  {h.news.subtitle}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {h.news.items.map((newsItem, idx) => {
                const news = { ...newsItem, color: newsColors[idx], href: newsHrefs[idx] };
                return news;
              }).map((news) => (
                <Reveal key={news.title}>
                  <Link
                    href={news.href}
                    className="group block rounded-2xl bg-white border border-[#d8dff0] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/[0.06] hover:border-[#b8c4e0] h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-mono text-[#7a8db0]">{news.date}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${news.color}15`, color: news.color }}>
                        {news.label}
                      </span>
                    </div>
                    <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] group-hover:text-[#1e40af] transition-colors mb-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-[#7a8db0]">{news.desc}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/${locale}/aktuelles`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[Syne] font-bold text-sm text-white bg-[#0A2540] hover:-translate-y-0.5 transition-all">
                  {h.news.ctaNews}
                  <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${locale}/vergleich`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[Syne] font-semibold text-sm text-[#3a4a6b] border border-[#d8dff0] hover:bg-white hover:border-[#b8c4e0] transition-all">
                  {h.news.ctaCompare}
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════ COMPLIANCE-REPORT CTA (Haupt-CTA) ════════ */}
        <section aria-label={h.aria.report} className="py-24 lg:py-32 relative overflow-hidden">
          {/* Rich golden-navy gradient background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A2540 0%, #0d1f3c 40%, #122042 60%, #0A2540 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(250,204,21,0.08) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 80% 30%, rgba(250,204,21,0.05) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <Reveal>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20 mb-6">
                    <svg className="w-4 h-4 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                    <span className="text-[12px] font-bold text-[#FACC15] tracking-wide uppercase">{h.report.badge}</span>
                  </div>

                  <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl md:text-[2.75rem] text-white tracking-tight leading-[1.05] mb-5">
                    {h.report.title1}<br />
                    <span className="bg-gradient-to-r from-[#FACC15] via-amber-300 to-[#FACC15] bg-clip-text text-transparent">
                      {h.report.title2}
                    </span>
                  </h2>

                  <p className="text-base text-white/60 leading-relaxed mb-8 max-w-md">
                    {h.report.subtitle}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: "📊", title: h.report.benefit1Title, desc: h.report.benefit1Desc },
                      { icon: "💰", title: h.report.benefit2Title, desc: h.report.benefit2Desc },
                      { icon: "📄", title: h.report.benefit3Title, desc: h.report.benefit3Desc },
                    ].map(b => (
                      <div key={b.title} className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-lg">
                          {b.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-[14px] text-white mb-0.5">{b.title}</div>
                          <div className="text-[13px] text-white/45 leading-relaxed">{b.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/kontakt`}
                    className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-[Syne] font-bold text-[#0A2540] text-[15px] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)", boxShadow: "0 8px 32px rgba(250,204,21,0.35), 0 2px 8px rgba(250,204,21,0.2)" }}
                  >
                    <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="relative z-10">{h.report.ctaCreate}</span>
                    <IconArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <p className="text-[12px] text-white/35 mt-4">
                    {h.report.ctaSubtitle}
                  </p>
                </div>
              </Reveal>

              {/* Right: Visual card preview */}
              <Reveal delay={200}>
                <div className="relative">
                  {/* Report preview card */}
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                    {/* Card header */}
                    <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-[Syne] font-bold text-white">{h.report.previewTitle}</div>
                        <div className="text-[11px] font-mono text-white/40">{h.report.previewCompany}</div>
                      </div>
                    </div>

                    {/* Report preview items */}
                    <div className="p-6 space-y-4">
                      {/* Maturity grade */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">{h.report.previewMaturity}</div>
                          <div className="text-sm font-semibold text-white">{h.report.previewMaturityLabel}</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                          <span className="font-[Syne] font-extrabold text-xl text-amber-400">B</span>
                        </div>
                      </div>

                      {/* Applicable regulations */}
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-3">{h.report.previewRegulations}</div>
                        <div className="flex flex-wrap gap-2">
                          {["NISG", "AI Act", "DSGVO", "CRA", "CSRD"].map(r => (
                            <span key={r} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-semibold text-blue-300">
                              {r}
                            </span>
                          ))}
                          <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.06] text-[11px] font-mono text-white/40">
                            {h.report.previewMore}
                          </span>
                        </div>
                      </div>

                      {/* Cost estimate */}
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">{h.report.previewCost}</div>
                        <div className="font-[Syne] font-bold text-xl text-white">
                          {h.report.previewCostRange}
                        </div>
                        <div className="text-[11px] text-white/40 mt-0.5">{h.report.previewCostLabel}</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-3 -right-3 animate-float">
                    <div className="rounded-xl px-4 py-2 font-[Syne] font-bold text-xs text-[#0A2540]"
                      style={{ background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)", boxShadow: "0 8px 24px rgba(250,204,21,0.3)" }}>
                      {h.report.pdfDownload}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════ COMPLIANCE-BRIEFING (Newsletter) ════════ */}
        <section aria-label={h.aria.newsletter} className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A2540]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,20,80,0.5) 0%, transparent 70%)" }} />

          <div className="relative max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-[Syne] font-[800] text-3xl md:text-4xl text-white mb-4">
              {h.newsletter.title}
            </h2>
            <p className="text-white/45 mb-8 max-w-md mx-auto">
              {h.newsletter.subtitle}
            </p>
            <FristenRadarSignup variant="hero" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   PAST DEADLINES TOGGLE (collapsed by default)
   ═══════════════════════════════════════════════════ */
function PastDeadlinesToggle({ alreadyInForceLabel }: { alreadyInForceLabel: string }) {
  const [open, setOpen] = useState(false);
  const pastDeadlines = DEADLINES.filter(d => isPast(d.iso));

  return (
    <div className="mb-10">
      <button
        onClick={() => setOpen(o => !o)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all hover:bg-emerald-500/15 hover:border-emerald-500/30"
        aria-expanded={open}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono text-[12px] text-emerald-400 font-semibold">
          {pastDeadlines.length} {alreadyInForceLabel}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-emerald-400/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="flex flex-wrap gap-3">
          {pastDeadlines.map(d => (
            <div key={`${d.reg}-${d.iso}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] text-emerald-400 font-semibold">{d.reg}</span>
              <span className="font-mono text-[10px] text-emerald-400/70">{d.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PILLAR CARD
   ═══════════════════════════════════════════════════ */
function PillarCard({ p, labels }: { p: ReturnType<typeof buildPillars>[0]; labels: { maxPenalty: string; affects: string } }) {
  const Icon = iconMap[p.icon];
  return (
    <Link href={p.href}
      className="group block rounded-3xl bg-white border border-[#d8dff0] p-8 lg:p-9 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/[0.08] hover:border-[#b8c4e0] relative overflow-hidden">
      {/* Subtle accent line at top */}
      <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full transition-all duration-500 group-hover:left-0 group-hover:right-0" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`, opacity: 0.4 }} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ background: p.accentLight, color: p.accent, boxShadow: `0 0 0 0 ${p.accent}20` }}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-[Syne] font-extrabold text-2xl text-[#060c1a] tracking-tight leading-none">{p.acronym}</h3>
            <p className="font-mono text-[11px] text-[#7a8db0] mt-1">{p.tagline}</p>
          </div>
        </div>

        {/* Status badge */}
        <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold border ${
          p.status === "live"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${p.status === "live" ? "bg-emerald-500 animate-pulse-dot" : "bg-blue-500"}`} />
          {p.statusLabel}
        </div>
      </div>

      {/* Full name */}
      <p className="text-[15px] text-[#3a4a6b] mb-6 leading-relaxed">{p.fullName}</p>

      {/* Key facts — 2-column grid on wider cards for better text flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-7">
        {p.keyFacts.map(f => (
          <div key={f} className="flex items-start gap-2.5 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]" style={{ background: p.accent, opacity: 0.4 }} />
            <span className="text-[13px] text-[#7a8db0] leading-snug">{f}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between pt-6 border-t border-[#e8ecf4]">
        <div>
          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">{labels.maxPenalty}</div>
          <div className="font-[Syne] font-bold text-sm" style={{ color: "#dc2626" }}>{p.penalty}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">{labels.affects}</div>
          <div className="text-[13px] font-semibold text-[#3a4a6b]">{p.affected}</div>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: p.accentLight, color: p.accent }}>
          <IconChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   TOOL CARD
   ═══════════════════════════════════════════════════ */
function ToolCard({ t }: { t: ReturnType<typeof buildToolsList>[0] }) {
  const Icon = iconMap[t.icon];
  return (
    <Link href={t.href}
      className="group flex flex-col rounded-3xl bg-white border border-[#d8dff0] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/[0.08] hover:border-[#b8c4e0] relative overflow-hidden h-full">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, opacity: 0.3 }} />

      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: t.accentLight, color: t.accent }}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <span className="font-mono text-[11px] font-semibold px-3 py-1.5 rounded-lg border"
          style={{ background: t.accentLight, color: t.accent, borderColor: `${t.accent}20` }}>
          {t.badge}
        </span>
      </div>

      <h3 className="font-[Syne] font-extrabold text-xl text-[#060c1a] mb-2.5 tracking-tight">{t.title}</h3>
      <p className="text-sm text-[#7a8db0] leading-relaxed mb-8 flex-1">{t.desc}</p>

      <div className="flex items-center gap-2 font-semibold text-sm transition-all group-hover:gap-3" style={{ color: t.accent }}>
        {t.cta}
        <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
