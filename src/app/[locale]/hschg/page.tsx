import dynamic from "next/dynamic";
import { LOCALES, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { createElement } from "react";
import {
  buildGuideMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  type GuideMetaStrings,
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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

const META: Partial<Record<Locale, GuideMetaStrings>> = {
  de: {
    title: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
    description:
      "HSchG vollständig erklärt: EU-Whistleblower-Richtlinie, interne Meldekanäle, Schutz für Hinweisgeber, Strafen bis 40.000 € und Compliance-Fahrplan. Praxisguide für österreichische Unternehmen ab 50 Mitarbeitern.",
    ogDescription:
      "EU-Whistleblower-Richtlinie in Österreich: Meldekanäle, Schutzrechte, Strafen & Compliance-Fahrplan.",
    keywords:
      "HSchG, HinweisgeberInnenschutzgesetz, Whistleblower, Hinweisgeberschutz, Meldekanal, Whistleblower-Richtlinie, BAK, Korruptionsbekämpfung, Österreich, interne Meldestelle",
  },
  en: {
    title: "HSchG – Austrian Product Safety Act Explained",
    description:
      "HSchG (Product Safety Act) explained: product liability, safety obligations, market surveillance, product recalls. Guide for Austrian manufacturers.",
    ogDescription:
      "Product liability, safety obligations and market surveillance under Austria’s HSchG.",
    keywords:
      "HSchG, product safety Austria, product liability, market surveillance, product recall",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("hschg", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("hschg", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2019/1937 – EU-Whistleblower-Richtlinie / HSchG",
    legislationId: "(EU) 2019/1937"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("hschg", locale, "HSchG"),
  };
}

export default async function HSchGPage({ params }: { params: Promise<{ locale: string }> }) {
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
