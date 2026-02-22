import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ReifegradTool from "./ReifegradTool";

const ReifegradToolEN = dynamic(() => import("./ReifegradTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: ReifegradToolEN,
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
    title: "Compliance-Reifegrad-Check \u2014 Wie gut sind Sie aufgestellt?",
    description:
      "Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens in 5 Kategorien. Erhalten Sie eine visuelle Auswertung mit konkreten Handlungsempfehlungen.",
    ogDescription:
      "Bewerten Sie den Reifegrad Ihrer Compliance in 5 Kategorien. Kostenloser Selbst-Check.",
    keywords:
      "Compliance Reifegrad, Compliance Assessment, Compliance Maturity, ISMS Reifegrad, Compliance Selbstbewertung, EU Compliance Score",
  },
  en: {
    title: "Compliance Maturity Check \u2014 How Well Are You Prepared?",
    description:
      "Assess your company's compliance maturity across 5 categories. Get a visual evaluation with concrete recommendations for action.",
    ogDescription:
      "Assess your compliance maturity across 5 categories. Free self-assessment.",
    keywords:
      "compliance maturity, compliance assessment, ISMS maturity, compliance self-assessment, EU compliance score",
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

  const slug = "tools/reifegrad-check";
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
    name: isEn ? "Compliance Maturity Check" : "Compliance-Reifegrad-Check",
    url: `${BASE_URL}/${locale}/tools/reifegrad-check`,
    description: isEn
      ? "Assess your company's compliance maturity with concrete recommendations."
      : "Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens mit konkreten Handlungsempfehlungen.",
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
        name: isEn ? "Maturity Check" : "Reifegrad-Check",
        item: `${BASE_URL}/${locale}/tools/reifegrad-check`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function ReifegradCheckPage({
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
      {createElement(CONTENT_MAP[locale] ?? ReifegradTool)}
    </>
  );
}
