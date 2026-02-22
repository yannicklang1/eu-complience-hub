import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import KostenKalkulatorTool from "./KostenKalkulatorTool";

const KostenKalkulatorToolEN = dynamic(() => import("./KostenKalkulatorTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: KostenKalkulatorToolEN,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

interface MetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

const META: Partial<Record<Locale, MetaStrings>> = {
  de: {
    title: "Compliance-Kosten-Kalkulator \u2014 Was kostet EU-Compliance?",
    description:
      "Sch\u00e4tzen Sie die Kosten f\u00fcr die Umsetzung von NIS2, DSGVO, AI Act, DORA und weiteren EU-Regulierungen. Kostenloser Kalkulator mit individueller Einsch\u00e4tzung.",
    ogDescription:
      "Sch\u00e4tzen Sie die Kosten f\u00fcr EU-Compliance-Umsetzung. Kostenloser Kalkulator.",
    keywords:
      "Compliance Kosten, NIS2 Kosten, DSGVO Kosten, AI Act Kosten, DORA Kosten, Compliance Budget, EU Regulierung Kosten, Implementierung Kosten",
  },
  en: {
    title: "Compliance Cost Calculator \u2014 What Does EU Compliance Cost?",
    description:
      "Estimate the costs for implementing NIS2, GDPR, AI Act, DORA and other EU regulations. Free calculator with individual assessment.",
    ogDescription:
      "Estimate the costs for EU compliance implementation. Free calculator.",
    keywords:
      "compliance costs, NIS2 costs, GDPR costs, AI Act costs, DORA costs, compliance budget, EU regulation costs, implementation costs",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "tools/kosten-kalkulator";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* -- Per-locale JSON-LD -- */

function buildJsonLd(locale: string) {
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isEn ? "Compliance Cost Calculator" : "Compliance-Kosten-Kalkulator",
    url: `${BASE_URL}/${locale}/tools/kosten-kalkulator`,
    description: isEn
      ? "Free calculator: Estimate the costs for implementing EU regulations for your company."
      : "Kostenloser Kalkulator: Sch\u00e4tzen Sie die Kosten f\u00fcr die Umsetzung von EU-Regulierungen f\u00fcr Ihr Unternehmen.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/${locale}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: isEn ? "Cost Calculator" : "Kosten-Kalkulator",
        item: `${BASE_URL}/${locale}/tools/kosten-kalkulator`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function KostenKalkulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { jsonLd, breadcrumbJsonLd } = buildJsonLd(locale);

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
      {createElement(CONTENT_MAP[locale] ?? KostenKalkulatorTool)}
    </>
  );
}
