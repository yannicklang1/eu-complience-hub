import dynamic from "next/dynamic";
import { LOCALES, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import {
  buildGuideMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  type GuideMetaStrings,
  type FaqItem,
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

function getGuideContent(locale: string) {
  return CONTENT_MAP[locale] ?? GuideContent;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

const META: Partial<Record<Locale, GuideMetaStrings>> = {
  de: {
    title: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
    description:
      "Data Act komplett erklärt: IoT-Datenzugang, B2B-Datenweitergabe, Cloud-Switching, faire Vertragsklauseln, Notfall-Datenzugang für Behörden. Gilt ab 12. September 2025.",
    ogDescription:
      "Data-Act-Pflichten: IoT-Datenzugang, Cloud-Switching-Recht, faire Vertragsklauseln und Compliance-Fahrplan.",
    keywords:
      "Data Act, Verordnung 2023/2854, IoT Daten EU, Cloud Switching, Datenzugang Recht, B2B Datenweitergabe, FRAND, Smart Products Daten, Data Act Compliance",
  },
  en: {
    title: "Data Act – EU Data Access & Sharing Rules",
    description:
      "EU Data Act explained: data sharing obligations for IoT manufacturers, data portability, cloud switching rights. Guide for European businesses.",
    ogDescription:
      "IoT data sharing, portability rights and cloud switching under the EU Data Act.",
    keywords:
      "Data Act, data sharing, IoT data, data portability, cloud switching, EU data governance",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("data-act", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("data-act", locale, META, {
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2023/2854 – Data Act",
    legislationId: "(EU) 2023/2854"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("data-act", locale, "Data Act"),
  };
}

export default async function DataActPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const Content = getGuideContent(locale);
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
