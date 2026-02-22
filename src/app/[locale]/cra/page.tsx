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
    title: "Cyber Resilience Act (CRA) – Vollständiger Guide",
    description:
      "Cyber Resilience Act komplett erklärt: Security by Design, SBOM-Pflicht, Produktkategorien, CE-Kennzeichnung, Schwachstellenmanagement, Strafen bis 15 Mio. €. Guide für Hersteller, Importeure & Händler.",
    ogDescription:
      "Security by Design, SBOM-Pflicht, Produktkategorien, Strafen & Compliance-Fahrplan des Cyber Resilience Act.",
    keywords:
      "CRA, Cyber Resilience Act, Verordnung 2024/2847, Security by Design, SBOM, CE-Kennzeichnung, IoT-Sicherheit, Produktsicherheit, Schwachstellenmanagement, EU Cybersecurity",
  },
  en: {
    title: "CRA – Cyber Resilience Act Explained",
    description:
      "Cyber Resilience Act fully explained: CE marking for software, security requirements, vulnerability reporting, fines up to €15M. Guide for manufacturers.",
    ogDescription:
      "CE marking for software, security requirements and vulnerability reporting under the CRA. Guide for manufacturers.",
    keywords:
      "CRA, Cyber Resilience Act, software security, CE marking, vulnerability disclosure, IoT security",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("cra", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("cra", locale, META, {
    datePublished: "2026-02-18",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2024/2847 – Cyber Resilience Act",
    legislationId: "(EU) 2024/2847"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("cra", locale, "Cyber Resilience Act"),
  };
}

export default async function CRAPage({ params }: { params: Promise<{ locale: string }> }) {
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
