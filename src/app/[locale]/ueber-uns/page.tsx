import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Static params for all locales ── */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* ── Per-locale metadata ── */
interface MetaStrings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

const META: Record<string, MetaStrings> = {
  de: {
    title: `${SITE_NAME} -- Wer wir sind`,
    description:
      "Der EU Compliance Hub macht europaeische Regulierungen verstaendlich. Unser Ziel: Unternehmen jeder Groesse beim Einhalten von NIS2, AI Act, DORA, DSGVO und mehr unterstuetzen.",
    ogTitle: `${SITE_NAME} -- Wer wir sind`,
    ogDescription:
      "Europaeische Regulierungen verstaendlich aufbereitet fuer Unternehmen jeder Groesse.",
  },
  en: {
    title: `${SITE_NAME} -- Who We Are`,
    description:
      "The EU Compliance Hub makes European regulations understandable. Our goal: supporting companies of all sizes in complying with NIS2, AI Act, DORA, GDPR and more.",
    ogTitle: `${SITE_NAME} -- Who We Are`,
    ogDescription:
      "European regulations made accessible for companies of all sizes.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.de;
  const canonical = `${BASE_URL}/${locale}/ueber-uns`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/ueber-uns`;
  }
  languages["x-default"] = `${BASE_URL}/de/ueber-uns`;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[locale as Locale] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_OG[l],
      ),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* ── Per-locale content data ── */
interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface TargetGroupItem {
  icon: string;
  title: string;
  description: string;
}

interface PageContent {
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;
  missionP3: string;
  targetGroupsTitle: string;
  valuesTitle: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton1: string;
  ctaButton2: string;
  values: ValueItem[];
  stats: StatItem[];
  targetGroups: TargetGroupItem[];
  breadcrumbLabel: string;
}

const CONTENT: Record<string, PageContent> = {
  de: {
    heroTitle1: "Europaeische Regulierungen. ",
    heroTitle2: "Klar erklaert.",
    heroDesc:
      "Der EU Compliance Hub ist die zentrale Informationsplattform fuer EU-Regulierungen. Wir machen komplexe Gesetze verstaendlich und helfen Unternehmen jeder Groesse, ihre Compliance-Pflichten zu erfuellen.",
    missionTitle: "Unsere Mission",
    missionP1:
      "Die EU reguliert so schnell wie nie zuvor: NIS2, AI Act, DORA, CRA, CSRD, BaFG, DSA, Data Act -- allein zwischen 2024 und 2027 treten ueber ein Dutzend neue Gesetze in Kraft. Fuer viele Unternehmen ist es kaum moeglich, den Ueberblick zu behalten.",
    missionP2:
      "Der EU Compliance Hub loest dieses Problem. Wir analysieren jede relevante EU-Regulierung und bereiten sie so auf, dass sie verstaendlich, handlungsorientiert und immer aktuell ist. Jeder Guide enthaelt: Wer ist betroffen? Was muss getan werden? Bis wann? Was passiert bei Verstoessen?",
    missionP3:
      "Unser Ziel ist es, dass kein Unternehmen in Oesterreich, Deutschland oder der Schweiz durch mangelnde Information ein Compliance-Risiko eingeht.",
    targetGroupsTitle: "Fuer wen ist der EU Compliance Hub?",
    valuesTitle: "Unsere Prinzipien",
    ctaTitle: "Bereit fuer Compliance?",
    ctaDesc:
      "Starten Sie mit unserer Compliance-Checkliste oder abonnieren Sie das Compliance-Briefing fuer regelmaessige Updates.",
    ctaButton1: "Compliance-Checkliste starten",
    ctaButton2: "Alle Regulierungen ansehen",
    breadcrumbLabel: "Ueber uns",
    values: [
      { icon: "\uD83C\uDFAF", title: "Verstaendlichkeit", description: "EU-Regulierungen in klarer Sprache, nicht im Juristendeutsch. Jeder Guide ist so geschrieben, dass auch Nicht-Juristen die Kernpflichten sofort verstehen." },
      { icon: "\uD83D\uDD0D", title: "Quellenbasiert", description: "Jede Angabe ist mit der offiziellen Rechtsquelle verlinkt. Wir zitieren EU-Amtsblaetter, nationale Gesetzblaetter und offizielle Behoerden-Dokumente." },
      { icon: "\u26A1", title: "Praxisnah", description: "Keine abstrakten Theorien, sondern konkrete Handlungsempfehlungen. Fristen, Strafen, Checklisten und Tools -- alles was Sie fuer die Umsetzung brauchen." },
      { icon: "\uD83D\uDD12", title: "Unabhaengig", description: "Keine Werbung, keine bezahlten Empfehlungen. Unsere Tool-Vergleiche und Software-Empfehlungen basieren auf objektiven Kriterien." },
      { icon: "\uD83C\uDF0D", title: "AT/DACH-Fokus", description: "Wir beruecksichtigen die nationale Umsetzung in Oesterreich, Deutschland und der Schweiz -- nicht nur die EU-Ebene." },
      { icon: "\uD83D\uDCC8", title: "Aktuell gehalten", description: "Regulierungen aendern sich. Unsere Guides werden regelmaessig aktualisiert und mit einem Pruefdatum versehen." },
    ],
    stats: [
      { value: "18+", label: "EU-Regulierungen" },
      { value: "8", label: "Interaktive Tools" },
      { value: "70+", label: "Glossar-Eintraege" },
      { value: "100%", label: "Unabhaengig" },
    ],
    targetGroups: [
      { icon: "\uD83C\uDFE2", title: "KMUs & Mittelstand", description: "Sie muessen Regulierungen umsetzen, haben aber kein 10-koepfiges Compliance-Team? Unsere Guides bringen alles auf den Punkt." },
      { icon: "\uD83C\uDFD7\uFE0F", title: "Konzerne & Enterprise", description: "Schneller Ueberblick fuer interne Compliance-Abteilungen. Regulierungsvergleiche und Reifegrad-Assessments auf Enterprise-Niveau." },
      { icon: "\u2696\uFE0F", title: "Berater & Auditoren", description: "Nutzen Sie unsere Tools und Checklisten als Einstieg fuer Mandantengespraeche. Fristen, Strafen und Anforderungen kompakt aufbereitet." },
      { icon: "\uD83D\uDCBB", title: "IT & Sicherheitsteams", description: "NIS2, DORA, CRA -- die technischen Anforderungen im Klartext. Von Incident-Response bis Secure-by-Design." },
    ],
  },
  en: {
    heroTitle1: "European Regulations. ",
    heroTitle2: "Clearly Explained.",
    heroDesc:
      "The EU Compliance Hub is the central information platform for EU regulations. We make complex laws understandable and help companies of all sizes fulfil their compliance obligations.",
    missionTitle: "Our Mission",
    missionP1:
      "The EU is regulating faster than ever: NIS2, AI Act, DORA, CRA, CSRD, BaFG, DSA, Data Act -- more than a dozen new laws come into force between 2024 and 2027 alone. For many companies, keeping track is nearly impossible.",
    missionP2:
      "The EU Compliance Hub solves this problem. We analyse every relevant EU regulation and present it in a way that is understandable, action-oriented and always up to date. Every guide covers: Who is affected? What needs to be done? By when? What happens in case of violations?",
    missionP3:
      "Our goal is that no company in Austria, Germany or Switzerland takes on compliance risk due to a lack of information.",
    targetGroupsTitle: "Who is the EU Compliance Hub for?",
    valuesTitle: "Our Principles",
    ctaTitle: "Ready for Compliance?",
    ctaDesc:
      "Start with our compliance checklist or subscribe to the compliance briefing for regular updates.",
    ctaButton1: "Start Compliance Checklist",
    ctaButton2: "View All Regulations",
    breadcrumbLabel: "About Us",
    values: [
      { icon: "\uD83C\uDFAF", title: "Clarity", description: "EU regulations in plain language, not legalese. Every guide is written so that non-lawyers can immediately understand the core obligations." },
      { icon: "\uD83D\uDD0D", title: "Source-Based", description: "Every statement is linked to the official legal source. We cite EU official journals, national gazettes and official authority documents." },
      { icon: "\u26A1", title: "Practical", description: "No abstract theories, but concrete recommendations for action. Deadlines, fines, checklists and tools -- everything you need for implementation." },
      { icon: "\uD83D\uDD12", title: "Independent", description: "No advertising, no paid recommendations. Our tool comparisons and software recommendations are based on objective criteria." },
      { icon: "\uD83C\uDF0D", title: "AT/DACH Focus", description: "We consider national implementation in Austria, Germany and Switzerland -- not just the EU level." },
      { icon: "\uD83D\uDCC8", title: "Kept Up to Date", description: "Regulations change. Our guides are regularly updated and marked with a review date." },
    ],
    stats: [
      { value: "18+", label: "EU Regulations" },
      { value: "8", label: "Interactive Tools" },
      { value: "70+", label: "Glossary Entries" },
      { value: "100%", label: "Independent" },
    ],
    targetGroups: [
      { icon: "\uD83C\uDFE2", title: "SMEs & Mid-Market", description: "Need to implement regulations but don't have a 10-person compliance team? Our guides get straight to the point." },
      { icon: "\uD83C\uDFD7\uFE0F", title: "Corporates & Enterprise", description: "Quick overview for internal compliance departments. Regulatory comparisons and maturity assessments at enterprise level." },
      { icon: "\u2696\uFE0F", title: "Consultants & Auditors", description: "Use our tools and checklists as a starting point for client discussions. Deadlines, fines and requirements in compact form." },
      { icon: "\uD83D\uDCBB", title: "IT & Security Teams", description: "NIS2, DORA, CRA -- the technical requirements in plain language. From incident response to secure-by-design." },
    ],
  },
};

function getContent(locale: string) {
  return CONTENT[locale] ?? CONTENT.de;
}

/* ── Page component ── */
export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = getContent(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbLabel, item: `${BASE_URL}/${locale}/ueber-uns` },
    ],
  };

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "en" ? `About ${SITE_NAME}` : `Ueber ${SITE_NAME}`,
    description: (META[locale] ?? META.de).description,
    url: `${BASE_URL}/${locale}/ueber-uns`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      description:
        locale === "en"
          ? "Central information platform for EU regulations. 18+ regulations clearly explained, interactive tools and industry guides."
          : "Zentrale Informationsplattform fuer EU-Regulierungen. 18+ Regulierungen verstaendlich erklaert, interaktive Tools und Branchen-Guides.",
      foundingDate: "2026",
      areaServed: [
        { "@type": "Country", name: "AT" },
        { "@type": "Country", name: "DE" },
        { "@type": "Country", name: "CH" },
      ],
      knowsAbout: [
        "EU Compliance",
        "NIS2 Directive",
        "DORA",
        "EU AI Act",
        "Cyber Resilience Act",
        "DSGVO / GDPR",
        "CSRD / ESG Reporting",
        "BaFG / Barrierefreiheit",
        "HSchG / Whistleblower",
        "Cybersecurity Regulation",
      ],
      numberOfEmployees: { "@type": "QuantitativeValue", value: "1-10" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              {c.heroTitle1}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {c.heroTitle2}
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {c.heroDesc}
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {c.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/5 bg-slate-900/40 p-5 text-center">
                  <div className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-yellow-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-8 sm:p-10">
              <h2 className="font-[Syne] font-bold text-xl text-white mb-4">{c.missionTitle}</h2>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>{c.missionP1}</p>
                <p>{c.missionP2}</p>
                <p>{c.missionP3}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Target Groups ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-8 text-center">
              {c.targetGroupsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.targetGroups.map((tg) => (
                <div key={tg.title} className="rounded-xl border border-white/5 bg-slate-900/40 p-5">
                  <span className="text-2xl mb-3 block" aria-hidden="true">{tg.icon}</span>
                  <h3 className="font-bold text-sm text-white mb-2">{tg.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-8 text-center">
              {c.valuesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.values.map((v) => (
                <div key={v.title} className="rounded-xl border border-white/5 bg-slate-900/40 p-5">
                  <span className="text-2xl mb-3 block" aria-hidden="true">{v.icon}</span>
                  <h3 className="font-bold text-sm text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
              {c.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools/compliance-checkliste"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                }}
              >
                {c.ctaButton1}
              </Link>
              <Link
                href="/wissen"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-slate-200 transition-colors"
              >
                {c.ctaButton2}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
