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
    title: "Green Claims Directive – Anti-Greenwashing Guide 2026",
    description:
      "Green Claims Directive komplett erklärt: Welche Werbeaussagen ab 2026/2027 illegal sind, Nachweispflichten, Zertifizierungen, Strafen bis 4% des Jahresumsatzes. Guide für Marketing & E-Commerce.",
    ogDescription:
      "Welche Umweltaussagen ab 2026/2027 illegal sind, Nachweispflichten und Compliance-Fahrplan für Marketing & E-Commerce.",
    keywords:
      "Green Claims Directive, Anti-Greenwashing, Richtlinie 2024/825, klimaneutral illegal, nachhaltig Werbung EU, Greenwashing Strafe, Umweltaussagen Nachweis, LCA-Zertifizierung",
  },
  en: {
    title: "Green Claims Directive – Sustainable Marketing Rules",
    description:
      "Green Claims Directive explained: substantiation of environmental claims, prohibited greenwashing, certification requirements. Guide for European companies.",
    ogDescription:
      "Substantiation of green claims and prohibition of greenwashing under the Green Claims Directive.",
    keywords:
      "Green Claims Directive, greenwashing, environmental claims, sustainability marketing, eco labels",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("green-claims", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("green-claims", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2024/825 – Empowering Consumers for the Green Transition",
    legislationId: "(EU) 2024/825"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("green-claims", locale, "Green Claims Directive"),
  };
}

export default async function GreenClaimsPage({ params }: { params: Promise<{ locale: string }> }) {
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
