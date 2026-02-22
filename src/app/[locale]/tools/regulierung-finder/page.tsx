import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import RegulierungFinderTool from "./RegulierungFinderTool";

const RegulierungFinderToolEN = dynamic(() => import("./RegulierungFinderTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: RegulierungFinderToolEN,
};

function getToolContent(locale: string) {
  return CONTENT_MAP[locale] ?? RegulierungFinderTool;
}

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
    title: "Regulierung-Finder \u2014 Welche EU-Gesetze betreffen Sie?",
    description:
      "Finden Sie in 3 Minuten heraus, welche EU-Regulierungen f\u00fcr Ihr Unternehmen relevant sind. Kostenloser Selbst-Check f\u00fcr NIS2, DSGVO, AI Act, DORA, CRA, CSRD und mehr.",
    ogDescription:
      "In 3 Minuten herausfinden welche EU-Regulierungen f\u00fcr Ihr Unternehmen relevant sind. Kostenlos.",
    keywords:
      "EU Regulierung Check, Compliance Check, NIS2, DSGVO, AI Act, DORA, CRA, CSRD, Regulierung finden, Compliance-Pflichten, EU-Gesetze Unternehmen",
  },
  en: {
    title: "Regulation Finder \u2014 Which EU Laws Apply to You?",
    description:
      "Find out in 3 minutes which EU regulations are relevant for your company. Free self-assessment for NIS2, GDPR, AI Act, DORA, CRA, CSRD and more.",
    ogDescription:
      "Find out in 3 minutes which EU regulations are relevant for your company. Free.",
    keywords:
      "EU regulation check, compliance check, NIS2, GDPR, AI Act, DORA, CRA, CSRD, regulation finder, compliance obligations, EU laws company",
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

  const slug = "tools/regulierung-finder";
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
    name: isEn ? "EU Regulation Finder" : "EU Regulierung-Finder",
    url: `${BASE_URL}/${locale}/tools/regulierung-finder`,
    description: isEn
      ? "Free self-assessment: Find out which EU regulations are relevant for your company."
      : "Kostenloser Selbst-Check: Finden Sie heraus, welche EU-Regulierungen f\u00fcr Ihr Unternehmen relevant sind.",
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
        name: isEn ? "Regulation Finder" : "Regulierung-Finder",
        item: `${BASE_URL}/${locale}/tools/regulierung-finder`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function RegulierungFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getToolContent(locale);
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
      <Content />
    </>
  );
}
