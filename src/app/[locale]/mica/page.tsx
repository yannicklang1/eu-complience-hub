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
    title: "MiCA – Markets in Crypto-Assets Regulation Guide 2026",
    description:
      "MiCA komplett erklärt: Lizenzpflichten für Krypto-Dienstleister, CASP-Lizenz, Asset-Referenced Token, E-Money Token, Whitepaper-Pflicht, Strafen bis 15 Mio. €. Guide für Krypto-Startups & FinTechs.",
    ogDescription:
      "CASP-Lizenzpflichten, Whitepaper-Anforderungen, ART/EMT-Regeln und Compliance-Fahrplan für Krypto-Unternehmen in der EU.",
    keywords:
      "MiCA, Markets in Crypto-Assets, Verordnung 2023/1114, CASP Lizenz, Krypto Regulierung EU, Asset-Referenced Token, E-Money Token, Krypto Compliance, VASP EU",
  },
  en: {
    title: "MiCA – Markets in Crypto-Assets Regulation Explained",
    description:
      "MiCA fully explained: crypto-asset service providers, stablecoin rules, licensing requirements, investor protection. Guide for crypto businesses.",
    ogDescription:
      "Licensing, stablecoin rules and investor protection under MiCA. Complete guide for crypto businesses.",
    keywords:
      "MiCA, crypto regulation EU, crypto-asset service providers, stablecoin, CASP, digital assets",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("mica", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("mica", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2023/1114 – Markets in Crypto-Assets",
    legislationId: "(EU) 2023/1114"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("mica", locale, "MiCA"),
  };
}

export default async function MiCAPage({ params }: { params: Promise<{ locale: string }> }) {
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
