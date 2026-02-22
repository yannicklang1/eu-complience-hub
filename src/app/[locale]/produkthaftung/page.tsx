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
    title: "Neue EU-Produkthaftung (PLD) – Software & KI Haftung Guide 2026",
    description:
      "Neue Produkthaftungsrichtlinie 2024/2853 komplett erklärt: Software als Produkt, KI-Haftung, Beweislastumkehr, unbegrenzte Haftung. Guide für Software-Entwickler, SaaS-Anbieter & KI-Unternehmen.",
    ogDescription:
      "Software als Produkt, Beweislastumkehr und unbegrenzte Haftung: Was Entwickler und SaaS-Anbieter jetzt wissen müssen.",
    keywords:
      "Neue Produkthaftung, PLD, Richtlinie 2024/2853, Software Haftung EU, KI Haftung, Beweislastumkehr, Produkthaftungsrichtlinie, SaaS Haftung, IT-Haftpflicht",
  },
  en: {
    title: "Product Liability Directive – EU Rules for Manufacturers",
    description:
      "EU Product Liability Directive explained: software liability, digital products, burden of proof reversal, compensation rules. Guide for manufacturers.",
    ogDescription:
      "Software liability, digital products and new compensation rules under the EU Product Liability Directive.",
    keywords:
      "Product Liability Directive, software liability, digital products, EU product liability, manufacturer liability",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("produkthaftung", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("produkthaftung", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2024/2853 – Produkthaftung",
    legislationId: "(EU) 2024/2853"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("produkthaftung", locale, "Produkthaftung"),
  };
}

export default async function ProduktHaftungPage({ params }: { params: Promise<{ locale: string }> }) {
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
