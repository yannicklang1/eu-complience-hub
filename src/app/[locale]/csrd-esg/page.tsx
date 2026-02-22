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
    title: "CSRD/ESG-Guide – Nachhaltigkeitsberichterstattung komplett erklärt",
    description:
      "CSRD vollständig erklärt: ESRS Standards, Doppelte Wesentlichkeit, Omnibus I Änderungen, NaBeG Österreich, Strafen bis 100.000 € und Compliance-Fahrplan. Praxisguide für Unternehmen.",
    ogDescription:
      "ESRS Standards, Doppelte Wesentlichkeit, Omnibus I, NaBeG & Compliance-Fahrplan der EU-Nachhaltigkeitsberichterstattung.",
    keywords:
      "CSRD, ESG, Nachhaltigkeitsbericht, ESRS, Double Materiality, NaBeG, Sustainability Reporting, NFRD, Corporate Sustainability, Omnibus, Nachhaltigkeitsberichterstattung, Österreich",
  },
  en: {
    title: "CSRD & ESG – Sustainability Reporting Explained",
    description:
      "CSRD and ESG reporting fully explained: reporting obligations, ESRS standards, double materiality assessment. Guide for European companies.",
    ogDescription:
      "Reporting obligations, ESRS standards and double materiality under CSRD/ESG. Guide for companies.",
    keywords:
      "CSRD, ESG reporting, sustainability reporting, ESRS, double materiality, non-financial reporting",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("csrd-esg", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("csrd-esg", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2022/2464 – Corporate Sustainability Reporting Directive (CSRD)",
    legislationId: "(EU) 2022/2464"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("csrd-esg", locale, "CSRD & ESG"),
  };
}

export default async function CSRDESGPage({ params }: { params: Promise<{ locale: string }> }) {
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
