import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import NIS2CheckTool from "./NIS2CheckTool";

const NIS2CheckToolEN = dynamic(() => import("./NIS2CheckTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: NIS2CheckToolEN,
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
    title: "NIS2 Betroffenheits-Check \u2014 Sind Sie betroffen?",
    description:
      "Finden Sie in 2 Minuten heraus, ob Ihr Unternehmen unter die NIS2-Richtlinie (NISG 2026) f\u00e4llt. Kostenloser Selbst-Check mit personalisierter Auswertung.",
    ogDescription:
      "In 2 Minuten herausfinden ob Ihr Unternehmen unter NIS2/NISG 2026 f\u00e4llt. Kostenloser Check.",
    keywords:
      "NIS2 Check, NIS2 betroffen, NISG 2026, NIS2 Betroffenheit, NIS2 Selbsttest, NIS2 Quiz, wesentliche Einrichtung, wichtige Einrichtung",
  },
  en: {
    title: "NIS2 Applicability Check \u2014 Are You Affected?",
    description:
      "Find out in 2 minutes whether your company falls under the NIS2 Directive (NISG 2026). Free self-assessment with personalised results.",
    ogDescription:
      "Find out in 2 minutes if your company is subject to NIS2/NISG 2026. Free check.",
    keywords:
      "NIS2 check, NIS2 affected, NISG 2026, NIS2 applicability, NIS2 self-test, NIS2 quiz, essential entity, important entity",
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

  const slug = "tools/nis2-betroffenheits-check";
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
    name: isEn ? "NIS2 Applicability Check" : "NIS2 Betroffenheits-Check",
    url: `${BASE_URL}/${locale}/tools/nis2-betroffenheits-check`,
    description: isEn
      ? "Free self-assessment: Find out whether your company falls under the NIS2 Directive."
      : "Kostenloser Selbst-Check: Finden Sie heraus, ob Ihr Unternehmen unter die NIS2-Richtlinie f\u00e4llt.",
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
        name: isEn ? "NIS2 Applicability Check" : "NIS2 Betroffenheits-Check",
        item: `${BASE_URL}/${locale}/tools/nis2-betroffenheits-check`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function NIS2CheckPage({
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
      {createElement(CONTENT_MAP[locale] ?? NIS2CheckTool)}
    </>
  );
}
