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
    title: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
    description:
      "EHDS komplett erklärt: Pflichten für Gesundheitsdaten-Inhaber, EHR-Systeme, Primär- & Sekundärnutzung, Patientenrechte, Interoperabilität (HL7 FHIR). Guide für eHealth & Pharma.",
    ogDescription:
      "EHDS-Pflichten: EHR-Systeme, Primär- & Sekundärnutzung von Gesundheitsdaten, Patientenrechte und Compliance-Fahrplan.",
    keywords:
      "EHDS, European Health Data Space, Gesundheitsdatenraum, Verordnung 2025/327, eHealth Compliance, EHR System, Gesundheitsdaten EU, HL7 FHIR, Primärnutzung Sekundärnutzung",
  },
  en: {
    title: "EHDS – European Health Data Space Explained",
    description:
      "European Health Data Space explained: primary and secondary use of health data, patient rights, data access bodies. Guide for healthcare organizations.",
    ogDescription:
      "Primary and secondary use of health data and patient rights under the EHDS.",
    keywords:
      "EHDS, European Health Data Space, health data, medical data, patient rights, EHR",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("ehds", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("ehds", locale, META, {
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2025/327 – European Health Data Space",
    legislationId: "(EU) 2025/327"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("ehds", locale, "EHDS"),
  };
}

export default async function EHDSPage({ params }: { params: Promise<{ locale: string }> }) {
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
