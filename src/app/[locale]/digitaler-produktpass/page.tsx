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
    title: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
    description:
      "Digitaler Produktpass komplett erklärt: Welche Produkte ab wann betroffen sind, Datenanforderungen, QR-Code-Pflicht, ESPR-Verordnung, Strafen. Guide für Hersteller, Importeure & Händler.",
    ogDescription:
      "Pflichtangaben, Produktkategorien, Fristen und Compliance-Fahrplan für den Digitalen Produktpass nach ESPR.",
    keywords:
      "Digitaler Produktpass, DPP, ESPR, Ecodesign Regulation, Verordnung 2024/1781, Produktpass EU, Supply Chain Transparenz, Circulor, PLM Software",
  },
  en: {
    title: "Digital Product Passport – EU Ecodesign Requirements",
    description:
      "Digital Product Passport (DPP) explained: mandatory data requirements, QR code implementation, sector timelines. Guide for manufacturers and importers.",
    ogDescription:
      "Mandatory data requirements and sector timelines for the EU Digital Product Passport.",
    keywords:
      "Digital Product Passport, DPP, Ecodesign Regulation, product sustainability, circular economy",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("digitaler-produktpass", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("digitaler-produktpass", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2024/1781 – Ecodesign for Sustainable Products Regulation",
    legislationId: "(EU) 2024/1781"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("digitaler-produktpass", locale, "Digitaler Produktpass"),
  };
}

export default async function DigitalerProduktpassPage({ params }: { params: Promise<{ locale: string }> }) {
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
