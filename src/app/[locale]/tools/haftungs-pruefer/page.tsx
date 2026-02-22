import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import HaftungsPrueferTool from "./HaftungsPrueferTool";

const HaftungsPrueferToolEN = dynamic(() => import("./HaftungsPrueferTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: HaftungsPrueferToolEN,
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
    title: "GF-Haftungs-Pr\u00fcfer \u2014 Ihr pers\u00f6nliches Haftungsrisiko",
    description:
      "Wie hoch ist Ihr pers\u00f6nliches Haftungsrisiko als Gesch\u00e4ftsf\u00fchrer bei NIS2, DORA, AI Act & CRA? Kostenloser Selbst-Check mit Risiko-Score.",
    ogDescription:
      "Wie hoch ist Ihr pers\u00f6nliches Haftungsrisiko als GF bei EU-Regulierungen? Kostenloser Check.",
    keywords:
      "Gesch\u00e4ftsf\u00fchrer Haftung, NIS2 Haftung, DORA Haftung, AI Act Haftung, CRA Haftung, GmbHG \u00a7 25, AktG \u00a7 84, D&O Versicherung, Compliance Haftung",
  },
  en: {
    title: "Director Liability Check \u2014 Your Personal Liability Risk",
    description:
      "How high is your personal liability risk as a director for NIS2, DORA, AI Act & CRA? Free self-assessment with risk score.",
    ogDescription:
      "How high is your personal liability risk as a director for EU regulations? Free check.",
    keywords:
      "director liability, NIS2 liability, DORA liability, AI Act liability, CRA liability, D&O insurance, compliance liability",
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

  const slug = "tools/haftungs-pruefer";
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
    name: isEn ? "Director Liability Check" : "GF-Haftungs-Pr\u00fcfer",
    url: `${BASE_URL}/${locale}/tools/haftungs-pruefer`,
    description: isEn
      ? "Free self-assessment: How high is your personal liability risk as a director?"
      : "Kostenloser Selbst-Check: Wie hoch ist Ihr pers\u00f6nliches Haftungsrisiko als Gesch\u00e4ftsf\u00fchrer?",
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
        name: isEn ? "Director Liability Check" : "GF-Haftungs-Pr\u00fcfer",
        item: `${BASE_URL}/${locale}/tools/haftungs-pruefer`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function HaftungsPrueferPage({
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
      {createElement(CONTENT_MAP[locale] ?? HaftungsPrueferTool)}
    </>
  );
}
