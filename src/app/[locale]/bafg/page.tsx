import dynamic from "next/dynamic";
import { LOCALES, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import {
  buildGuideMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  type GuideMetaStrings,
} from "@/lib/guide-metadata";
import GuideContent from "./GuideContent";
import { createElement } from "react";

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
    title: "BaFG-Guide – Barrierefreiheitsgesetz komplett erklärt",
    description:
      "BaFG vollständig erklärt: European Accessibility Act, WCAG 2.1 AA, EN 301 549, betroffene Produkte & Dienste, Ausnahmen, Strafen bis 80.000 € und Compliance-Fahrplan. Praxisguide für österreichische Unternehmen.",
    ogDescription:
      "European Accessibility Act in Österreich: WCAG-Anforderungen, betroffene Dienste, Ausnahmen & Compliance-Fahrplan.",
    keywords:
      "BaFG, Barrierefreiheitsgesetz, EAA, European Accessibility Act, WCAG, EN 301 549, Barrierefreiheit, Accessibility, digitale Barrierefreiheit, Österreich, E-Commerce",
  },
  en: {
    title: "BaFG – Austrian Financial Market Authority Act",
    description:
      "BaFG (Financial Market Authority Act) explained: supervisory obligations, compliance requirements, fines and procedures for Austrian financial institutions.",
    ogDescription:
      "Supervisory obligations and compliance requirements under Austria’s BaFG. Guide for financial institutions.",
    keywords:
      "BaFG, FMA Austria, financial market supervision, banking compliance, financial regulation Austria",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("bafg", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("bafg", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2019/882 – European Accessibility Act / BaFG",
    legislationId: "(EU) 2019/882"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("bafg", locale, "BaFG"),
  };
}

export default async function BaFGPage({ params }: { params: Promise<{ locale: string }> }) {
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
