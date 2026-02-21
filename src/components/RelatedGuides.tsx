"use client";

import Link from "next/link";

/* ── Guide Metadata ── */
interface GuideInfo {
  slug: string;
  short: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  accent: string;
}

const GUIDES: Record<string, GuideInfo> = {
  "nisg-2026": {
    slug: "/nisg-2026",
    short: "NISG 2026",
    title: "NIS2-Umsetzung in Österreich",
    badge: "Ab Okt 2025",
    badgeColor: "#dc2626",
    accent: "#1e40af",
  },
  "eu-ai-act": {
    slug: "/eu-ai-act",
    short: "AI Act",
    title: "KI-Regulierung der EU",
    badge: "Stufenweise",
    badgeColor: "#7c3aed",
    accent: "#7c3aed",
  },
  dora: {
    slug: "/dora",
    short: "DORA",
    title: "Digitale Resilienz im Finanzsektor",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#0369a1",
  },
  cra: {
    slug: "/cra",
    short: "CRA",
    title: "Cyber Resilience Act",
    badge: "Ab Sep 2026",
    badgeColor: "#dc2626",
    accent: "#dc2626",
  },
  dsgvo: {
    slug: "/dsgvo",
    short: "DSGVO",
    title: "Datenschutz-Grundverordnung",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#0e7490",
  },
  "csrd-esg": {
    slug: "/csrd-esg",
    short: "CSRD/ESG",
    title: "Nachhaltigkeitsberichterstattung",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#047857",
  },
  bafg: {
    slug: "/bafg",
    short: "BaFG",
    title: "Barrierefreiheitsgesetz",
    badge: "Ab Jun 2025",
    badgeColor: "#dc2626",
    accent: "#7e22ce",
  },
  hschg: {
    slug: "/hschg",
    short: "HSchG",
    title: "Hinweisgeberschutzgesetz",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#b45309",
  },
  produkthaftung: {
    slug: "/produkthaftung",
    short: "PLD",
    title: "Neue Produkthaftungsrichtlinie",
    badge: "Ab Dez 2026",
    badgeColor: "#dc2626",
    accent: "#991b1b",
  },
  "digitaler-produktpass": {
    slug: "/digitaler-produktpass",
    short: "DPP",
    title: "Digitaler Produktpass (ESPR)",
    badge: "Ab 2027",
    badgeColor: "#dc2626",
    accent: "#166534",
  },
  "green-claims": {
    slug: "/green-claims",
    short: "Green Claims",
    title: "Anti-Greenwashing-Richtlinie",
    badge: "Ab Mär 2026",
    badgeColor: "#dc2626",
    accent: "#15803d",
  },
  mica: {
    slug: "/mica",
    short: "MiCA",
    title: "Krypto-Regulierung",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#a16207",
  },
  dsa: {
    slug: "/dsa",
    short: "DSA",
    title: "Digital Services Act",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#4338ca",
  },
  "data-act": {
    slug: "/data-act",
    short: "Data Act",
    title: "Datenzugangsrechte",
    badge: "Ab Sep 2025",
    badgeColor: "#dc2626",
    accent: "#0f766e",
  },
  eprivacy: {
    slug: "/eprivacy",
    short: "ePrivacy",
    title: "Cookie-Recht & Tracking",
    badge: "In Kraft",
    badgeColor: "#059669",
    accent: "#6d28d9",
  },
  eidas: {
    slug: "/eidas",
    short: "eIDAS 2.0",
    title: "EU Digital Identity Wallet",
    badge: "Ab 2026",
    badgeColor: "#dc2626",
    accent: "#0e7490",
  },
  ehds: {
    slug: "/ehds",
    short: "EHDS",
    title: "Europäischer Gesundheitsdatenraum",
    badge: "Ab 2027",
    badgeColor: "#dc2626",
    accent: "#be123c",
  },
  "haftungs-check": {
    slug: "/haftungs-check",
    short: "Haftungs-Check",
    title: "Geschäftsführer-Haftung",
    accent: "#0A2540",
  },
};

/* ── Relationship Map ── */
const RELATIONSHIPS: Record<string, string[]> = {
  "nisg-2026": ["dora", "cra", "haftungs-check"],
  "eu-ai-act": ["dsgvo", "produkthaftung", "haftungs-check"],
  dora: ["nisg-2026", "dsgvo", "mica"],
  cra: ["nisg-2026", "produkthaftung", "digitaler-produktpass"],
  dsgvo: ["eprivacy", "eu-ai-act", "ehds"],
  "csrd-esg": ["green-claims", "digitaler-produktpass", "bafg"],
  bafg: ["dsa", "csrd-esg", "dsgvo"],
  hschg: ["dsgvo", "haftungs-check", "nisg-2026"],
  produkthaftung: ["eu-ai-act", "cra", "haftungs-check"],
  "digitaler-produktpass": ["cra", "csrd-esg", "green-claims"],
  "green-claims": ["csrd-esg", "digitaler-produktpass", "dsgvo"],
  mica: ["dora", "dsgvo", "dsa"],
  dsa: ["eprivacy", "dsgvo", "eu-ai-act"],
  "data-act": ["dsgvo", "digitaler-produktpass", "eprivacy"],
  eprivacy: ["dsgvo", "dsa", "data-act"],
  eidas: ["dsgvo", "dsa", "ehds"],
  ehds: ["dsgvo", "eidas", "eprivacy"],
  "haftungs-check": ["nisg-2026", "dora", "eu-ai-act"],
};

/* ── Component ── */
export default function RelatedGuides({
  currentGuide,
  accent = "#0A2540",
}: {
  currentGuide: string;
  accent?: string;
}) {
  const related = RELATIONSHIPS[currentGuide];
  if (!related || related.length === 0) return null;

  const guides = related
    .map((key) => GUIDES[key])
    .filter(Boolean);

  if (guides.length === 0) return null;

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <svg
          className="w-5 h-5 flex-shrink-0"
          style={{ color: accent }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-1.027l4.5-4.5a4.5 4.5 0 00-6.364-6.364l-1.757 1.757"
          />
        </svg>
        <h3
          className="font-[Syne] font-bold text-lg"
          style={{ color: accent }}
        >
          Verwandte Regulierungen
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.slug}
            className="group relative flex flex-col rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "white",
              borderColor: "#d8dff0",
              boxShadow: "0 2px 8px rgba(0,20,60,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md text-white"
                style={{ background: guide.accent }}
              >
                {guide.short}
              </span>
              {guide.badge && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white"
                  style={{ background: guide.badgeColor }}
                >
                  {guide.badge}
                </span>
              )}
            </div>

            <span className="text-[13px] font-semibold text-[#1a2238] group-hover:text-[#0A2540] leading-snug">
              {guide.title}
            </span>

            <span
              className="mt-2 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: guide.accent }}
            >
              Guide lesen →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
