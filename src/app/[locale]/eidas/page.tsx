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
    title: "eIDAS 2.0 – EU Digital Identity Wallet Guide 2026",
    description:
      "eIDAS 2.0 komplett erklärt: EU Digital Identity Wallet, elektronische Signaturen, Qualified Trust Services, Akzeptanzpflicht für Plattformen. Verordnung (EU) 2024/1183.",
    ogDescription:
      "eIDAS 2.0: EU-Wallet, elektronische Identität, Qualified Trust Services und Compliance-Pflichten.",
    keywords:
      "eIDAS 2.0, EU Digital Identity Wallet, Verordnung 2024/1183, EUDIW, elektronische Signatur, Qualified Trust Services, ID Austria, AusweisApp, KYC EU",
  },
  en: {
    title: "eIDAS 2.0 – EU Digital Identity Wallet Explained",
    description:
      "eIDAS 2.0 fully explained: EU Digital Identity Wallet, electronic signatures, trust services, qualified certificates. Guide for European businesses.",
    ogDescription:
      "EU Digital Identity Wallet, trust services and electronic signatures under eIDAS 2.0.",
    keywords:
      "eIDAS 2.0, EU Digital Identity Wallet, EUDIW, electronic signature, trust services, digital identity",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("eidas", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("eidas", locale, META, {
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2024/1183 – eIDAS 2.0",
    legislationId: "(EU) 2024/1183"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("eidas", locale, "eIDAS 2.0"),
  };
}

export default async function EIDASPage({ params }: { params: Promise<{ locale: string }> }) {
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
