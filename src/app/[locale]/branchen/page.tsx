import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/constants";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BranchenIcon from "@/components/BranchenIcon";
import { branchen, regulations } from "@/data/branchenData";

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
  keywords: string;
}

const META: Record<string, MetaStrings> = {
  de: {
    title: "Branchen-Compliance -- EU-Regulierungen nach Branche",
    description:
      "EU-Compliance nach Branche: Finden Sie NIS2, AI Act, DORA und CRA-Anforderungen speziell fuer Ihre Branche. 17 Branchen, 4+ Regulierungen.",
    ogTitle: "Branchen-Compliance -- EU-Regulierungen nach Branche",
    ogDescription:
      "Finden Sie EU-Compliance-Anforderungen speziell fuer Ihre Branche.",
    keywords:
      "NIS2 Branche, AI Act Branche, DORA Branche, CRA Branche, Compliance nach Branche, EU Regulierung Maschinenbau, EU Regulierung Finanzdienstleistung, EU Regulierung Gesundheitswesen",
  },
  en: {
    title: "Industry Compliance -- EU Regulations by Industry",
    description:
      "EU compliance by industry: Find NIS2, AI Act, DORA and CRA requirements specific to your industry. 17 industries, 4+ regulations.",
    ogTitle: "Industry Compliance -- EU Regulations by Industry",
    ogDescription:
      "Find EU compliance requirements specific to your industry.",
    keywords:
      "NIS2 industry, AI Act industry, DORA industry, CRA industry, compliance by industry, EU regulation manufacturing, EU regulation financial services, EU regulation healthcare",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.de;
  const canonical = `${BASE_URL}/${locale}/branchen`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/branchen`;
  }
  languages["x-default"] = `${BASE_URL}/de/branchen`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
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

/* ── Per-locale UI strings ── */
const UI = {
  de: {
    home: "Startseite",
    breadcrumb: "Branchen",
    programmaticSeo: "Programmatic SEO",
    pagesLabel: (n: number) => `${n}+ Seiten`,
    heroTitle: "EU-Compliance nach Branche",
    heroDesc:
      "Finden Sie die fuer Ihre Branche relevanten EU-Regulierungen -- mit konkreten Pflichten, Fristen und Handlungsschritten.",
    statBranchen: "Branchen",
    statRegulierungen: "Regulierungen",
    statGuides: "Branchen-Guides",
    annexI: "Anhang I",
    annexII: "Anhang II",
    forLabel: "fuer",
    ctaTitle: "Nicht sicher, ob Ihre Branche betroffen ist?",
    ctaDesc: "Nutzen Sie unsere kostenlosen Tools fuer eine individuelle Einschaetzung.",
    nis2Check: "NIS2-Betroffenheits-Check",
    liabilityCheck: "GF-Haftungs-Pruefer",
    fineCalc: "Bussgeld-Rechner",
  },
  en: {
    home: "Home",
    breadcrumb: "Industries",
    programmaticSeo: "Programmatic SEO",
    pagesLabel: (n: number) => `${n}+ pages`,
    heroTitle: "EU Compliance by Industry",
    heroDesc:
      "Find the EU regulations relevant to your industry -- with specific obligations, deadlines and action steps.",
    statBranchen: "Industries",
    statRegulierungen: "Regulations",
    statGuides: "Industry Guides",
    annexI: "Annex I",
    annexII: "Annex II",
    forLabel: "for",
    ctaTitle: "Not sure if your industry is affected?",
    ctaDesc: "Use our free tools for an individual assessment.",
    nis2Check: "NIS2 Impact Check",
    liabilityCheck: "CEO Liability Check",
    fineCalc: "Fine Calculator",
  },
} as const;

function getUI(locale: string) {
  return UI[locale as keyof typeof UI] ?? UI.de;
}

const branchenList = Object.values(branchen);
const totalPages = branchenList.reduce(
  (sum, b) => sum + b.relevantRegulations.length,
  0
);

/* ── Page component ── */
export default async function BranchenHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = getUI(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "en" ? "EU Compliance by Industry" : "EU-Compliance nach Branche",
    description: (META[locale] ?? META.de).description,
    url: `${BASE_URL}/${locale}/branchen`,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: ui.breadcrumb, item: `${BASE_URL}/${locale}/branchen` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #0A254025 0%, transparent 70%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <nav className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                {ui.home}
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                {ui.breadcrumb}
              </span>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
                {ui.programmaticSeo}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white bg-[#0A2540]">
                {ui.pagesLabel(totalPages)}
              </span>
            </div>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              {ui.heroTitle}
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
              {ui.heroDesc}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { value: `${branchenList.length}`, label: ui.statBranchen },
                {
                  value: `${Object.keys(regulations).length}`,
                  label: ui.statRegulierungen,
                },
                { value: `${totalPages}+`, label: ui.statGuides },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                >
                  <div
                    className="font-[Syne] font-extrabold text-xl text-[#FACC15]"
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section
          className="py-12 lg:py-16"
          style={{
            background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {/* Regulation legend */}
            <div className="flex flex-wrap gap-3 mb-10">
              {Object.values(regulations).map((reg) => (
                <div
                  key={reg.slug}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white text-xs font-medium"
                  style={{
                    borderColor: `${reg.accent}30`,
                    color: reg.accent,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: reg.accent }}
                  />
                  {reg.name}
                </div>
              ))}
            </div>

            {/* Industry cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {branchenList.map((b) => (
                <div
                  key={b.slug}
                  id={b.slug}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: "#d8dff015" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0A2540]/[0.06] flex items-center justify-center text-[#0A2540]">
                      <BranchenIcon icon={b.icon} />
                    </div>
                    <div>
                      <h2 className="font-[Syne] font-bold text-base text-[#060c1a]">
                        {b.name}
                      </h2>
                      {b.nis2Sector && (
                        <span className="text-[10px] font-mono text-[#0ea5e9]">
                          NIS2{" "}
                          {b.nis2Sector === "annex1"
                            ? ui.annexI
                            : ui.annexII}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Regulation badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {b.relevantRegulations.map((rSlug) => {
                      const reg = regulations[rSlug];
                      if (!reg) return null;
                      return (
                        <span
                          key={rSlug}
                          className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold"
                          style={{
                            background: `${reg.accent}12`,
                            color: reg.accent,
                            border: `1px solid ${reg.accent}25`,
                          }}
                        >
                          {reg.name}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links to each regulation page */}
                  <div className="space-y-1.5">
                    {b.relevantRegulations.map((rSlug) => {
                      const reg = regulations[rSlug];
                      if (!reg) return null;
                      return (
                        <Link
                          key={rSlug}
                          href={`/branchen/${b.slug}/${rSlug}`}
                          className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg text-sm text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.03] transition-all group"
                        >
                          <span>
                            {reg.name} {ui.forLabel} {b.name}
                          </span>
                          <svg
                            className="w-3.5 h-3.5 text-[#7a8db0] group-hover:text-[#0A2540] group-hover:translate-x-0.5 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl p-8 text-center bg-gradient-to-r from-[#0A2540]/[0.06] to-[#0ea5e9]/[0.06] border border-[#0A2540]/10">
              <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-3">
                {ui.ctaTitle}
              </h2>
              <p className="text-[#3a4a6b] text-sm mb-6 max-w-lg mx-auto">
                {ui.ctaDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/nis2-betroffenheits-check"
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "#0ea5e9" }}
                >
                  {ui.nis2Check}
                </Link>
                <Link
                  href="/tools/haftungs-pruefer"
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5 border"
                  style={{
                    background: "white",
                    color: "#ef4444",
                    borderColor: "#ef444440",
                  }}
                >
                  {ui.liabilityCheck}
                </Link>
                <Link
                  href="/tools/bussgeld-rechner"
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5 border"
                  style={{
                    background: "white",
                    color: "#d97706",
                    borderColor: "#d9770640",
                  }}
                >
                  {ui.fineCalc}
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
