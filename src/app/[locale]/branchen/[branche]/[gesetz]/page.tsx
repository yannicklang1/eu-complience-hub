import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/constants";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import BranchenLandingPage from "@/components/BranchenLandingPage";
import {
  branchen,
  regulations,
  getAllBranchenGesetzParams,
  getBranchenRegContent,
} from "@/data/branchenData";

/* ── Static Generation: generate all industry x regulation x locale combos ── */
export function generateStaticParams() {
  const branchenParams = getAllBranchenGesetzParams();
  return LOCALES.flatMap((locale) =>
    branchenParams.map((p) => ({ locale, ...p }))
  );
}

/* ── Dynamic Metadata ── */
type PageProps = { params: Promise<{ locale: string; branche: string; gesetz: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, branche: bSlug, gesetz: gSlug } = await params;
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];
  if (!branche || !regulation) return {};

  const content = getBranchenRegContent(branche, regulation);
  const canonical = `${BASE_URL}/${locale}/branchen/${bSlug}/${gSlug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/branchen/${bSlug}/${gSlug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/branchen/${bSlug}/${gSlug}`;

  return {
    title: content.title,
    description: content.metaDescription,
    keywords: `${regulation.name} ${branche.name}, ${regulation.name} Compliance ${branche.name}, ${branche.name} ${regulation.name} Pflichten, ${regulation.name} Oesterreich ${branche.name}`,
    openGraph: {
      title: content.title,
      description: content.metaDescription,
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

/* ── Breadcrumb JSON-LD ── */
function getBreadcrumbJsonLd(locale: string, bSlug: string, gSlug: string) {
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];
  if (!branche || !regulation) return null;

  const forLabel = locale === "en" ? "for" : "fuer";
  const industriesLabel = locale === "en" ? "Industries" : "Branchen";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: industriesLabel, item: `${BASE_URL}/${locale}/branchen` },
      { "@type": "ListItem", position: 3, name: `${regulation.name} ${forLabel} ${branche.name}`, item: `${BASE_URL}/${locale}/branchen/${bSlug}/${gSlug}` },
    ],
  };
}

/* ── JSON-LD ── */
function getJsonLd(locale: string, bSlug: string, gSlug: string) {
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];
  if (!branche || !regulation) return null;
  const content = getBranchenRegContent(branche, regulation);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    url: `${BASE_URL}/${locale}/branchen/${bSlug}/${gSlug}`,
    inLanguage: locale,
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
    about: [
      { "@type": "Thing", name: regulation.fullName },
      { "@type": "Thing", name: branche.name },
    ],
    // FAQ schema for rich snippets
    mainEntity: getBranchenRegContent(branche, regulation).faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ── Page Component ── */
export default async function BranchenGesetzPage({ params }: PageProps) {
  const { locale, branche: bSlug, gesetz: gSlug } = await params;
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];

  if (!branche || !regulation) notFound();
  if (!branche.relevantRegulations.includes(gSlug)) notFound();

  const content = getBranchenRegContent(branche, regulation);

  // Other regulations for this industry (exclude current)
  const otherRegulations = branche.relevantRegulations
    .filter((s) => s !== gSlug)
    .map((s) => regulations[s])
    .filter(Boolean);

  // Other industries that have this regulation (exclude current, max 8)
  const otherBranchen = Object.values(branchen)
    .filter((b) => b.slug !== bSlug && b.relevantRegulations.includes(gSlug))
    .slice(0, 8);

  const jsonLd = getJsonLd(locale, bSlug, gSlug);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(locale, bSlug, gSlug);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <BranchenLandingPage
        branche={branche}
        regulation={regulation}
        content={content}
        otherRegulations={otherRegulations}
        otherBranchen={otherBranchen}
      />
    </>
  );
}
