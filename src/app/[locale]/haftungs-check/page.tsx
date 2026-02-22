import dynamic from "next/dynamic";
import { LOCALES, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { createElement } from "react";
import {
  buildGuideMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  type GuideMetaStrings,
} from "@/lib/guide-metadata";
import GuideContent from "./GuideContent";

const GuideContentEN = dynamic(() => import("./GuideContent.en"), { ssr: true });

/* Map locale → component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: GuideContentEN,
  fr: GuideContentEN,
  es: GuideContentEN,
  it: GuideContentEN,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

const META: Partial<Record<Locale, GuideMetaStrings>> = {
  de: {
    title: "Geschäftsführer-Haftung – Persönliche Risiken bei EU-Compliance-Verstößen",
    description:
      "Geschäftsführer-Haftung bei NIS2, DORA, AI Act & CRA: Wann haften Sie persönlich? Organhaftung, Bußgelder, Sorgfaltspflichten und Enthaftungsstrategien im Überblick.",
    ogDescription:
      "NIS2, DORA, AI Act, CRA: Wann haften Geschäftsführer persönlich? Organhaftung, Bußgelder & Enthaftungsstrategien.",
    keywords:
      "Geschäftsführer-Haftung, Organhaftung, persönliche Haftung, NIS2, NISG 2026, DORA, AI Act, CRA, Compliance, Sorgfaltspflicht, Geschäftsleitung, Vorstand",
  },
  en: {
    title: "Liability Check – EU AI Act & Product Liability Rules",
    description:
      "Personal liability risks under EU AI Act and Product Liability Directive: manager responsibility, D&O insurance, compliance obligations. Guide for executives.",
    ogDescription:
      "Personal liability for managers under EU AI Act and Product Liability Directive. Compliance guide.",
    keywords:
      "AI liability, product liability, manager liability, D&O insurance, EU AI Act liability",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("haftungs-check", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("haftungs-check", locale, META, {
    datePublished: "2026-02-18",
    dateModified: "2026-02-20"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("haftungs-check", locale, "Haftungs-Check"),
  };
}

export default async function HaftungsCheckPage({ params }: { params: Promise<{ locale: string }> }) {
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
      {createElement(CONTENT_MAP[locale] ?? GuideContent)}
    </>
  );
}
