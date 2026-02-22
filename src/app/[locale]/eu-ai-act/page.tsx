import dynamic from "next/dynamic";
import { LOCALES, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import {
  buildGuideMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  type GuideMetaStrings,
} from "@/lib/guide-metadata";
import { createElement } from "react";
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
    title: "EU AI Act – Vollständiger Guide 2026",
    description:
      "EU AI Act komplett erklärt: Risikostufen, Fristen, Strafen bis 35 Mio. €, Pflichten für Hochrisiko-KI, Österreich-spezifische Umsetzung (RTR). Alles für Ihr Unternehmen.",
    ogDescription:
      "Risikostufen, Fristen, Pflichten & Strafen der EU KI-Verordnung. Für österreichische und europäische Unternehmen.",
    keywords:
      "EU AI Act, KI-Verordnung, AI Act Österreich, Hochrisiko KI, KI Regulierung, AI Act Fristen, AI Act Strafen, RTR KI-Servicestelle, GPAI, KI Compliance",
  },
  en: {
    title: "EU AI Act – The Complete Business Compliance Guide",
    description:
      "EU AI Act fully explained: risk categories, compliance obligations, prohibited AI systems, fines up to €35M. Everything European companies need to know.",
    ogDescription:
      "Risk categories, compliance obligations and fines under the EU AI Act. Free guide for businesses.",
    keywords:
      "EU AI Act, artificial intelligence regulation, AI risk categories, AI compliance, GPAI, AI fines",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("eu-ai-act", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("eu-ai-act", locale, META, {
    datePublished: "2026-02-01",
    dateModified: "2026-02-20",
    legislationName: "Regulation (EU) 2024/1689 – Artificial Intelligence Act",
    legislationId: "(EU) 2024/1689"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("eu-ai-act", locale, "EU AI Act"),
  };
}

export default async function EuAiActPage({ params }: { params: Promise<{ locale: string }> }) {
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
