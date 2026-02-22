import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import KontaktContent from "./KontaktContent";

const KontaktContentEN = dynamic(() => import("./KontaktContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: KontaktContentEN,
};

function getContent(locale: string) {
  return CONTENT_MAP[locale] ?? KontaktContent;
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
    title: "Compliance-Report \u2013 Kostenlose Analyse f\u00fcr Ihr Unternehmen",
    description:
      "Erhalten Sie einen personalisierten Compliance-Report mit Regulierungsanalyse, Kostensch\u00e4tzung, Reifegrad-Bewertung und Software-Empfehlungen \u2014 kostenlos per E-Mail.",
    ogDescription:
      "Personalisierter Compliance-Report mit Regulierungsanalyse, Kostensch\u00e4tzung und Handlungsempfehlungen.",
    keywords:
      "Compliance Report, EU Regulierung Analyse, NIS2 Check, DSGVO Compliance, Kostensch\u00e4tzung, Reifegrad",
  },
  en: {
    title: "Compliance Report \u2013 Free Analysis for Your Company",
    description:
      "Get a personalised compliance report with regulatory analysis, cost estimate, maturity assessment and software recommendations \u2014 free by email.",
    ogDescription:
      "Personalised compliance report with regulatory analysis, cost estimate and recommendations.",
    keywords:
      "compliance report, EU regulation analysis, NIS2 check, GDPR compliance, cost estimate, maturity assessment",
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

  const slug = "kontakt";
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Compliance Report" : "Compliance-Report",
        item: `${BASE_URL}/${locale}/kontakt`,
      },
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isEn ? "Compliance Report Generator" : "Compliance-Report Generator",
    url: `${BASE_URL}/${locale}/kontakt`,
    description: isEn
      ? "Personalised compliance report with regulatory analysis, cost estimate and recommendations."
      : "Personalisierter Compliance-Report mit Regulierungsanalyse, Kostensch\u00e4tzung und Handlungsempfehlungen.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  return { breadcrumbJsonLd, contactJsonLd };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getContent(locale);
  const { breadcrumbJsonLd, contactJsonLd } = buildJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Content />
    </>
  );
}
