import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `${SITE_NAME} – Wer wir sind`,
  description:
    "Der EU Compliance Hub macht europäische Regulierungen verständlich. Unser Ziel: Unternehmen jeder Größe beim Einhalten von NIS2, AI Act, DORA, DSGVO und mehr unterstützen.",
  openGraph: {
    title: `${SITE_NAME} – Wer wir sind`,
    description:
      "Europäische Regulierungen verständlich aufbereitet für Unternehmen jeder Größe.",
    url: `${BASE_URL}/ueber-uns`,
  },
  alternates: {
    canonical: `${BASE_URL}/ueber-uns`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Über uns", item: `${BASE_URL}/ueber-uns` },
  ],
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Über ${SITE_NAME}`,
  description:
    "Der EU Compliance Hub macht europäische Regulierungen verständlich — für KMUs, Startups und Konzerne in Österreich und der EU.",
  url: `${BASE_URL}/ueber-uns`,
  inLanguage: "de",
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
      "Zentrale Informationsplattform für EU-Regulierungen. 18+ Regulierungen verständlich erklärt, interaktive Tools und Branchen-Guides.",
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

const VALUES = [
  {
    icon: "\uD83C\uDFAF",
    title: "Verständlichkeit",
    description: "EU-Regulierungen in klarer Sprache, nicht im Juristendeutsch. Jeder Guide ist so geschrieben, dass auch Nicht-Juristen die Kernpflichten sofort verstehen.",
  },
  {
    icon: "\uD83D\uDD0D",
    title: "Quellenbasiert",
    description: "Jede Angabe ist mit der offiziellen Rechtsquelle verlinkt. Wir zitieren EU-Amtsblätter, nationale Gesetzblätter und offizielle Behörden-Dokumente.",
  },
  {
    icon: "\u26A1",
    title: "Praxisnah",
    description: "Keine abstrakten Theorien, sondern konkrete Handlungsempfehlungen. Fristen, Strafen, Checklisten und Tools — alles was Sie für die Umsetzung brauchen.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Unabhängig",
    description: "Keine Werbung, keine bezahlten Empfehlungen. Unsere Tool-Vergleiche und Software-Empfehlungen basieren auf objektiven Kriterien.",
  },
  {
    icon: "\uD83C\uDF0D",
    title: "AT/DACH-Fokus",
    description: "Wir berücksichtigen die nationale Umsetzung in Österreich, Deutschland und der Schweiz — nicht nur die EU-Ebene.",
  },
  {
    icon: "\uD83D\uDCC8",
    title: "Aktuell gehalten",
    description: "Regulierungen ändern sich. Unsere Guides werden regelmäßig aktualisiert und mit einem Prüfdatum versehen.",
  },
];

const STATS = [
  { value: "18+", label: "EU-Regulierungen" },
  { value: "8", label: "Interaktive Tools" },
  { value: "70+", label: "Glossar-Einträge" },
  { value: "100%", label: "Unabhängig" },
];

const TARGET_GROUPS = [
  {
    icon: "🏢",
    title: "KMUs & Mittelstand",
    description: "Sie müssen Regulierungen umsetzen, haben aber kein 10-köpfiges Compliance-Team? Unsere Guides bringen alles auf den Punkt.",
  },
  {
    icon: "🏗️",
    title: "Konzerne & Enterprise",
    description: "Schneller Überblick für interne Compliance-Abteilungen. Regulierungsvergleiche und Reifegrad-Assessments auf Enterprise-Niveau.",
  },
  {
    icon: "⚖️",
    title: "Berater & Auditoren",
    description: "Nutzen Sie unsere Tools und Checklisten als Einstieg für Mandantengespräche. Fristen, Strafen und Anforderungen kompakt aufbereitet.",
  },
  {
    icon: "💻",
    title: "IT & Sicherheitsteams",
    description: "NIS2, DORA, CRA — die technischen Anforderungen im Klartext. Von Incident-Response bis Secure-by-Design.",
  },
];

export default function UeberUnsPage() {
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
              Europäische Regulierungen.{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Klar erklärt.
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Der EU Compliance Hub ist die zentrale Informationsplattform für EU-Regulierungen. Wir machen komplexe Gesetze verständlich und helfen Unternehmen jeder Größe, ihre Compliance-Pflichten zu erfüllen.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat) => (
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
              <h2 className="font-[Syne] font-bold text-xl text-white mb-4">Unsere Mission</h2>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Die EU reguliert so schnell wie nie zuvor: NIS2, AI Act, DORA, CRA, CSRD, BaFG, DSA, Data Act — allein zwischen 2024 und 2027 treten über ein Dutzend neue Gesetze in Kraft. Für viele Unternehmen ist es kaum möglich, den Überblick zu behalten.
                </p>
                <p>
                  Der EU Compliance Hub löst dieses Problem. Wir analysieren jede relevante EU-Regulierung und bereiten sie so auf, dass sie verständlich, handlungsorientiert und immer aktuell ist. Jeder Guide enthält: Wer ist betroffen? Was muss getan werden? Bis wann? Was passiert bei Verstößen?
                </p>
                <p>
                  Unser Ziel ist es, dass kein Unternehmen in Österreich, Deutschland oder der Schweiz durch mangelnde Information ein Compliance-Risiko eingeht.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Target Groups ── */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-8 text-center">
              Für wen ist der EU Compliance Hub?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TARGET_GROUPS.map((tg) => (
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
              Unsere Prinzipien
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUES.map((v) => (
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
              Bereit für Compliance?
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
              Starten Sie mit unserer Compliance-Checkliste oder abonnieren Sie das Compliance-Briefing für regelmäßige Updates.
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
                Compliance-Checkliste starten
              </Link>
              <Link
                href="/wissen"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-slate-200 transition-colors"
              >
                Alle Regulierungen ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
