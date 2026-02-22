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
    title: "DORA – Digital Operational Resilience Act komplett erklärt",
    description:
      "DORA vollständig erklärt: IKT-Risikomanagement, Incident Reporting, Resilience Testing, Third-Party-Management. Guide für den europäischen Finanzsektor.",
    ogDescription:
      "IKT-Risikomanagement, Incident Reporting, TLPT & Third-Party-Management für den Finanzsektor.",
    keywords:
      "DORA, Digital Operational Resilience Act, IKT-Risikomanagement, Finanzsektor, Cyber-Resilienz, FMA, Incident Reporting, TLPT, Third-Party",
  },
  en: {
    title: "DORA – Digital Operational Resilience Act Explained",
    description:
      "DORA fully explained: ICT risk management, incident reporting, digital resilience testing, third-party risk. Guide for financial sector companies.",
    ogDescription:
      "ICT risk management, incident reporting and resilience testing under DORA. Guide for the financial sector.",
    keywords:
      "DORA, Digital Operational Resilience Act, ICT risk, financial sector cybersecurity, incident reporting",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("dora", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("dora", locale, META, {
    datePublished: "2026-02-18",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2022/2554 – Digital Operational Resilience Act",
    legislationId: "(EU) 2022/2554"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("dora", locale, "DORA"),
  };
}

export default async function DORAPage({ params }: { params: Promise<{ locale: string }> }) {
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
