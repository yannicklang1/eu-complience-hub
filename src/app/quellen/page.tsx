import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quellenbibliothek — Alle offiziellen Rechtstexte & Behörden",
  description:
    "Alle offiziellen Quellen auf einen Blick: EU-Verordnungen, Richtlinien, österreichische Gesetze und Aufsichtsbehörden. Direkt-Links zu EUR-Lex, RIS, JusLine und mehr.",
  keywords:
    "EU Rechtstexte, EUR-Lex, NIS2 Volltext, AI Act Verordnung, DORA Volltext, CRA Volltext, DSGVO Text, NISG 2026, GmbHG, AktG, Compliance Quellen",
  openGraph: {
    title: "Quellenbibliothek — Alle offiziellen Rechtstexte",
    description: "EU-Verordnungen, Richtlinien, österreichische Gesetze und Aufsichtsbehörden. Direkt-Links zu allen Volltexten.",
    url: "https://eu-compliance-hub.eu/quellen",
  },
  alternates: { canonical: "https://eu-compliance-hub.eu/quellen" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Quellenbibliothek — Offizielle EU-Rechtstexte & Behörden",
  url: "https://eu-compliance-hub.eu/quellen",
  description: "Kuratierte Sammlung aller offiziellen EU-Rechtstexte, österreichischen Gesetze und Aufsichtsbehörden.",
  inLanguage: "de",
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
};

/* ═══════════════════════════════════════════════════════════
   SOURCE DATA — Consolidated from all 5 Guides + additional
   ═══════════════════════════════════════════════════════════ */

interface SourceEntry {
  title: string;
  url: string;
  desc: string;
  type: "Verordnung" | "EU-Richtlinie" | "Gesetz AT" | "Aufsicht AT" | "Behörde" | "Leitfaden" | "Studie" | "Norm";
}

interface SourceGroup {
  regulation: string;
  accent: string;
  guideUrl: string;
  sources: SourceEntry[];
}

const SOURCE_GROUPS: SourceGroup[] = [
  {
    regulation: "EU AI Act",
    accent: "#0A2540",
    guideUrl: "/eu-ai-act",
    sources: [
      { title: "Verordnung (EU) 2024/1689 — EU AI Act (Volltext DE)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu", desc: "Offizielle deutsche Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "EU AI Act — englische Fassung", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng", desc: "Offizielle englische Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "Anhang III — Hochrisiko-KI-Systeme", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1689#anx_III", desc: "Vollständige Liste der Hochrisiko-Anwendungsbereiche", type: "Verordnung" },
      { title: "EU AI Office — Europäischer Ansatz für KI", url: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence", desc: "EU-Kommission: KI-Strategie, Leitlinien und Umsetzung", type: "Behörde" },
      { title: "RTR — KI-Servicestelle Österreich", url: "https://www.rtr.at", desc: "Rundfunk und Telekom Regulierungs-GmbH — KI-Aufsicht", type: "Aufsicht AT" },
      { title: "Digital Omnibus Verordnung — Entwurf", url: "https://ec.europa.eu/commission/presscorner/detail/de/ip_25_2882", desc: "EU-Kommission: Vereinfachungspaket für KMUs (Nov. 2025)", type: "Behörde" },
    ],
  },
  {
    regulation: "NIS2 / NISG 2026",
    accent: "#0ea5e9",
    guideUrl: "/nisg-2026",
    sources: [
      { title: "Richtlinie (EU) 2022/2555 — NIS2 (Volltext DE)", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/deu", desc: "Offizielle deutsche Fassung im EUR-Lex Portal", type: "EU-Richtlinie" },
      { title: "NIS2-Richtlinie — englische Fassung", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng", desc: "Offizielle englische Fassung im EUR-Lex Portal", type: "EU-Richtlinie" },
      { title: "NISG 2026 — BGBl. I Nr. 94/2025", url: "https://www.ris.bka.gv.at/eli/bgbl/I/2025/94", desc: "Österreichisches Bundesgesetzblatt — Volltext des NISG 2026", type: "Gesetz AT" },
      { title: "NISG 2026 — Parlamentarischer Prozess", url: "https://www.parlament.gv.at/gegenstand/XXVIII/I/308", desc: "Regierungsvorlage und Beschlussfassung im Nationalrat", type: "Gesetz AT" },
      { title: "CERT.at — Nationales CSIRT", url: "https://cert.at", desc: "Computer Emergency Response Team — Vorfallmeldungen", type: "Aufsicht AT" },
      { title: "BMI — Cybersicherheitsbehörde", url: "https://www.bmi.gv.at", desc: "Bundesministerium für Inneres — zuständige Aufsichtsbehörde", type: "Aufsicht AT" },
    ],
  },
  {
    regulation: "DORA",
    accent: "#10b981",
    guideUrl: "/dora",
    sources: [
      { title: "Verordnung (EU) 2022/2554 — DORA (Volltext DE)", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/deu", desc: "Offizielle deutsche Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "DORA — englische Fassung", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng", desc: "Offizielle englische Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "FMA — DORA-Informationsseite", url: "https://www.fma.gv.at/querschnittsthemen/dora/", desc: "Finanzmarktaufsicht Österreich — Leitfäden und FAQs", type: "Aufsicht AT" },
      { title: "EBA — DORA Regulierungsstandards", url: "https://www.eba.europa.eu/activities/direct-supervisory-powers/digital-operational-resilience-act", desc: "Regulierungs- und Durchführungsstandards zu DORA", type: "Behörde" },
      { title: "OeNB — TIBER-AT Framework", url: "https://www.oenb.at", desc: "Oesterreichische Nationalbank — TIBER-Penetrationstests", type: "Aufsicht AT" },
    ],
  },
  {
    regulation: "Cyber Resilience Act",
    accent: "#8b5cf6",
    guideUrl: "/cra",
    sources: [
      { title: "Verordnung (EU) 2024/2847 — CRA (Volltext DE)", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu", desc: "Offizielle deutsche Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "CRA — englische Fassung", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng", desc: "Offizielle englische Fassung im EUR-Lex Portal", type: "Verordnung" },
      { title: "EU-Kommission — Cyber Resilience Act", url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act", desc: "Hintergrundinformationen, FAQ und Factsheets", type: "Behörde" },
      { title: "ENISA — Europäische Cybersecurity-Agentur", url: "https://www.enisa.europa.eu", desc: "Zentrale Schwachstellenmeldeplattform nach CRA", type: "Behörde" },
      { title: "Richtlinie (EU) 2024/2853 — Produkthaftung", url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu", desc: "Neue EU-Produkthaftungsrichtlinie — erstreckt sich auf Software", type: "EU-Richtlinie" },
    ],
  },
  {
    regulation: "DSGVO",
    accent: "#6366f1",
    guideUrl: "#",
    sources: [
      { title: "Verordnung (EU) 2016/679 — DSGVO (Volltext DE)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679", desc: "Datenschutz-Grundverordnung — offizieller Volltext", type: "Verordnung" },
      { title: "DSGVO — englische Fassung", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679", desc: "General Data Protection Regulation — offizieller Volltext", type: "Verordnung" },
      { title: "DSB — Datenschutzbehörde Österreich", url: "https://www.dsb.gv.at", desc: "Österreichische Aufsichtsbehörde für Datenschutz", type: "Aufsicht AT" },
    ],
  },
  {
    regulation: "Österreichisches Gesellschaftsrecht",
    accent: "#dc2626",
    guideUrl: "/haftungs-check",
    sources: [
      { title: "§ 25 GmbHG — Sorgfaltspflicht Geschäftsführer", url: "https://www.jusline.at/gesetz/gmbhg/paragraf/25", desc: "Sorgfaltspflicht und Verantwortlichkeit der GmbH-Geschäftsführer", type: "Gesetz AT" },
      { title: "§ 84 AktG — Sorgfaltspflicht Vorstand", url: "https://www.jusline.at/gesetz/aktg/paragraf/84", desc: "Sorgfaltspflicht und Verantwortlichkeit der AG-Vorstände", type: "Gesetz AT" },
      { title: "Unternehmensgesetzbuch (UGB) — JusLine", url: "https://www.jusline.at/gesetz/ugb", desc: "Handelsrechtliche Grundlagen für unternehmerische Sorgfaltspflichten", type: "Gesetz AT" },
    ],
  },
  {
    regulation: "Green Claims Directive",
    accent: "#059669",
    guideUrl: "/green-claims",
    sources: [
      { title: "Richtlinie (EU) 2024/825 — Green Claims Directive (Volltext)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A52023PC0166", desc: "Vorschlag für eine Richtlinie über Umweltaussagen — Volltext", type: "EU-Richtlinie" },
      { title: "Richtlinie (EU) 2024/825 — Empowering Consumers", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024L0825", desc: "Verbraucherstärkung für den grünen Übergang — offizielle Fassung", type: "EU-Richtlinie" },
      { title: "EU-Kommission — Green Claims Initiative", url: "https://environment.ec.europa.eu/topics/circular-economy/green-claims_en", desc: "Hintergründe, Factsheets und FAQ zur Green Claims Initiative", type: "Behörde" },
      { title: "BEUC — Green Claims: What Consumers Need", url: "https://www.beuc.eu/sites/default/files/publications/beuc-x-2023-046_green_claims_directive.pdf", desc: "Verbraucherverband-Position zur Green Claims Directive", type: "Studie" },
      { title: "ISO 14021 — Umweltbezogene Kennzeichnung", url: "https://www.iso.org/standard/66652.html", desc: "Selbstdeklarierte umweltbezogene Angaben — Typ-II-Umweltkennzeichnung", type: "Norm" },
      { title: "ISO 14044 — Lebenszyklusanalyse (LCA)", url: "https://www.iso.org/standard/38498.html", desc: "Anforderungen und Anleitungen zur Ökobilanzierung", type: "Norm" },
    ],
  },
  {
    regulation: "MiCA — Krypto-Regulierung",
    accent: "#f59e0b",
    guideUrl: "/mica",
    sources: [
      { title: "Verordnung (EU) 2023/1114 — MiCA (Volltext DE)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1114", desc: "Markets in Crypto-Assets Regulation — offizielle deutsche Fassung", type: "Verordnung" },
      { title: "ESMA — MiCA Level-2 Maßnahmen und Q&A", url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica", desc: "Europäische Wertpapieraufsicht: Durchführungsstandards zu MiCA", type: "Behörde" },
      { title: "EBA — MiCA für E-Geld-Token", url: "https://www.eba.europa.eu/regulation-and-policy/crypto-assets", desc: "Europäische Bankenaufsicht: Regulierung von Krypto-Assets", type: "Behörde" },
      { title: "BaFin — MiCA in Deutschland", url: "https://www.bafin.de/DE/RechtUndGrundsaetze/RechtlicheGrundlagen/Gesetze_Verordnungen/MiCA/mica_node.html", desc: "Deutsche Finanzaufsicht: Umsetzung und Lizenzverfahren", type: "Behörde" },
      { title: "EU-Kommission — Digital Finance Package", url: "https://finance.ec.europa.eu/digital-finance/digital-finance-package_en", desc: "Gesamtstrategie: MiCA, DORA und Pilotregime für DLT", type: "Behörde" },
      { title: "FATF — Crypto-Asset Guidance", url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/guidance-rba-virtual-assets-2021.html", desc: "Internationale Geldwäsche-Leitlinien für virtuelle Assets", type: "Leitfaden" },
    ],
  },
  {
    regulation: "Digitaler Produktpass (DPP)",
    accent: "#14b8a6",
    guideUrl: "/digitaler-produktpass",
    sources: [
      { title: "Verordnung (EU) 2024/1781 — ESPR (Volltext DE)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1781", desc: "Ökodesign für nachhaltige Produkte — offizielle deutsche Fassung", type: "Verordnung" },
      { title: "EU-Kommission — Digital Product Passport", url: "https://environment.ec.europa.eu/topics/circular-economy/digital-product-passport_en", desc: "Hintergründe und Roadmap zum Digitalen Produktpass", type: "Behörde" },
      { title: "Verordnung (EU) 2023/1542 — Batterien-Verordnung", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1542", desc: "DPP-Pflicht für Batterien ab Februar 2027", type: "Verordnung" },
      { title: "ECOS — Digital Product Passport Position Paper", url: "https://ecostandard.org/wp-content/uploads/2023/03/ECOS-DPP-Position-Paper.pdf", desc: "Umweltstandardisierungs-Organisation: Empfehlungen zum DPP", type: "Studie" },
      { title: "GS1 — Digital Product Passport Standards", url: "https://www.gs1.org/standards/digital-product-passport", desc: "Internationale Datenstandards für den Produktpass", type: "Norm" },
      { title: "EU-Kommission — Textilstrategie", url: "https://environment.ec.europa.eu/topics/circular-economy/textiles_en", desc: "DPP für Textilien und Kreislaufwirtschaftsstrategie", type: "Behörde" },
    ],
  },
  {
    regulation: "Neue Produkthaftung (PLD)",
    accent: "#ef4444",
    guideUrl: "/produkthaftung",
    sources: [
      { title: "Richtlinie (EU) 2024/2853 — Produkthaftung (Volltext DE)", url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu", desc: "Neue Produkthaftungsrichtlinie — Software als Produkt", type: "EU-Richtlinie" },
      { title: "EU-Kommission — Neue Produkthaftungsrichtlinie", url: "https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-liability_de", desc: "Hintergründe und FAQ zur überarbeiteten PLD", type: "Behörde" },
      { title: "BMJ — Umsetzung PLD in Deutschland", url: "https://www.bmj.de/DE/Themen/GerichteUndRechtsstaat/Produkthaftung/produkthaftung_node.html", desc: "Bundesministerium der Justiz: Umsetzungsstand in Deutschland", type: "Behörde" },
      { title: "Verordnung (EU) 2024/1689 — EU AI Act", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu", desc: "KI-Verordnung — Haftungskomponente ergänzt die PLD", type: "Verordnung" },
      { title: "Verordnung (EU) 2024/2847 — Cyber Resilience Act", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu", desc: "CRA definiert Cybersicherheitspflichten für Softwareprodukte", type: "Verordnung" },
      { title: "GDV — Cyber-Versicherung und neue Produkthaftung", url: "https://www.gdv.de/de/themen/news/was-unternehmen-zur-neuen-eu-produkthaftung-wissen-muessen-126864", desc: "Gesamtverband der Deutschen Versicherungswirtschaft: Analyse", type: "Studie" },
    ],
  },
];

/* ── Type color mapping ── */
function getTypeBadge(type: string): { bg: string; text: string; border: string } {
  switch (type) {
    case "Verordnung": return { bg: "#0A2540/08", text: "#0A2540", border: "#0A2540/20" };
    case "EU-Richtlinie": return { bg: "#0A2540/08", text: "#0A2540", border: "#0A2540/20" };
    case "Gesetz AT": return { bg: "#dc2626/08", text: "#dc2626", border: "#dc2626/20" };
    case "Aufsicht AT": return { bg: "#dc2626/08", text: "#b91c1c", border: "#b91c1c/20" };
    case "Behörde": return { bg: "#7c3aed/08", text: "#7c3aed", border: "#7c3aed/20" };
    case "Leitfaden": return { bg: "#059669/08", text: "#059669", border: "#059669/20" };
    case "Studie": return { bg: "#2563eb/08", text: "#2563eb", border: "#2563eb/20" };
    case "Norm": return { bg: "#0891b2/08", text: "#0891b2", border: "#0891b2/20" };
    default: return { bg: "#f4f6fc", text: "#7a8db0", border: "#d8dff0" };
  }
}

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

function getFaviconUrl(url: string): string {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`; } catch { return ""; }
}

/* Total source count */
const totalSources = SOURCE_GROUPS.reduce((sum, g) => sum + g.sources.length, 0);

export default function QuellenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <nav className="flex items-center gap-2 mb-8">
              <Link href="/" className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">Startseite</Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Quellenbibliothek</span>
            </nav>

            <div className="flex items-start gap-5">
              <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0 bg-indigo-500/20">
                <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">Referenzen</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white bg-indigo-600">
                    {totalSources} Quellen
                  </span>
                </div>
                <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
                  Quellenbibliothek
                </h1>
                <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Alle offiziellen Rechtstexte, Behörden und Aufsichtsstellen auf einen Blick. Direkt-Links zu EUR-Lex, RIS, JusLine und nationalen Aufsichtsbehörden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-10 pb-8 border-b border-[#d8dff0]">
              {[
                { label: "EU-Verordnungen", count: SOURCE_GROUPS.reduce((s, g) => s + g.sources.filter((x) => x.type === "Verordnung").length, 0), color: "#0A2540" },
                { label: "EU-Richtlinien", count: SOURCE_GROUPS.reduce((s, g) => s + g.sources.filter((x) => x.type === "EU-Richtlinie").length, 0), color: "#0A2540" },
                { label: "AT-Gesetze", count: SOURCE_GROUPS.reduce((s, g) => s + g.sources.filter((x) => x.type === "Gesetz AT").length, 0), color: "#dc2626" },
                { label: "Behörden & Aufsicht", count: SOURCE_GROUPS.reduce((s, g) => s + g.sources.filter((x) => x.type === "Aufsicht AT" || x.type === "Behörde").length, 0), color: "#7c3aed" },
                { label: "Studien & Normen", count: SOURCE_GROUPS.reduce((s, g) => s + g.sources.filter((x) => x.type === "Studie" || x.type === "Norm" || x.type === "Leitfaden").length, 0), color: "#0891b2" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-[Syne] font-extrabold text-xl" style={{ color: stat.color }}>{stat.count}</span>
                  <span className="font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Source groups */}
            <div className="space-y-12">
              {SOURCE_GROUPS.map((group) => (
                <div key={group.regulation}>
                  {/* Group header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full" style={{ background: group.accent }} />
                      <h2 className="font-[Syne] font-extrabold text-xl text-[#060c1a]">{group.regulation}</h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold" style={{ color: group.accent, background: `${group.accent}10`, border: `1px solid ${group.accent}20` }}>
                        {group.sources.length} Quellen
                      </span>
                    </div>
                    {group.guideUrl !== "#" && (
                      <Link
                        href={group.guideUrl}
                        className="text-[12px] font-medium transition-colors flex items-center gap-1 hover:gap-2"
                        style={{ color: group.accent }}
                      >
                        Zum Guide
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    )}
                  </div>

                  {/* Source cards */}
                  <div className="grid gap-2.5">
                    {group.sources.map((source, i) => {
                      const badge = getTypeBadge(source.type);
                      return (
                        <a
                          key={i}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-4 rounded-2xl border border-[#d8dff0] bg-white p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:border-opacity-50"
                        >
                          {/* Favicon */}
                          <img
                            src={getFaviconUrl(source.url)}
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 rounded-sm mt-0.5 flex-shrink-0"
                          />

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-[Syne] font-bold text-[13px] sm:text-sm text-[#060c1a] group-hover:text-[color:var(--accent)] transition-colors truncate"
                                style={{ "--accent": group.accent } as React.CSSProperties}
                              >
                                {source.title}
                              </span>
                              <span
                                className="text-[9px] px-2 py-0.5 rounded-md font-mono font-bold border flex-shrink-0"
                                style={{
                                  background: `${badge.text}08`,
                                  color: badge.text,
                                  borderColor: `${badge.text}20`,
                                }}
                              >
                                {source.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#7a8db0] font-mono truncate">{getDomain(source.url)}</span>
                              <span className="text-[#d8dff0]">&middot;</span>
                              <span className="text-[12px] text-[#7a8db0] leading-relaxed line-clamp-1">{source.desc}</span>
                            </div>
                          </div>

                          {/* External link icon */}
                          <svg
                            className="w-4 h-4 text-[#c8d0e0] group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0 mt-1"
                            style={{ "--accent": group.accent } as React.CSSProperties}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA / Disclaimer */}
            <div className="mt-16 pt-10 border-t border-[#d8dff0]">
              <div className="rounded-2xl bg-white border border-[#d8dff0] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Über unsere Quellen</h3>
                    <p className="text-[14px] text-[#3a4a6b] leading-relaxed">
                      Alle Inhalte auf EU Compliance Hub basieren ausschließlich auf offiziellen Primärquellen: EU-Verordnungen und Richtlinien
                      (EUR-Lex), österreichische Bundesgesetze (RIS), sowie Informationen nationaler und europäischer Aufsichtsbehörden.
                      Unsere Guides werden regelmäßig gegen die Originalquellen geprüft. Letzte Prüfung: <strong>18. Februar 2026</strong>.
                    </p>
                    <p className="text-[12px] text-[#7a8db0] mt-3">
                      Fehlt eine Quelle oder ist ein Link veraltet?{" "}
                      <Link href="/impressum" className="underline underline-offset-2 hover:text-[#3a4a6b] transition-colors">
                        Kontaktieren Sie uns
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
