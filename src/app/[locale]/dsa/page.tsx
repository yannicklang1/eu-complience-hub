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
    title: "Digital Services Act (DSA) – Plattformregulierung Guide 2026",
    description:
      "DSA komplett erklärt: Pflichten für Online-Plattformen, Hosting-Dienste und Suchmaschinen. Notice-and-Action, Transparenzberichte, Werbetransparenz, Minderjährigenschutz. Strafen bis 6% des Umsatzes.",
    ogDescription:
      "DSA-Pflichten für Plattformen: Notice-and-Action, Transparenzberichte, Werbetransparenz und Compliance-Fahrplan.",
    keywords:
      "Digital Services Act, DSA, Verordnung 2022/2065, Plattformregulierung EU, Notice-and-Action, Content Moderation, Transparenzbericht, VLOP, Online-Plattform Pflichten, DSA Compliance",
  },
  en: {
    title: "DSA – Digital Services Act Explained",
    description:
      "Digital Services Act fully explained: illegal content obligations, algorithmic transparency, VLOP requirements, fines up to 6% turnover. Guide for platforms.",
    ogDescription:
      "Illegal content obligations, algorithmic transparency and VLOP requirements under the DSA.",
    keywords:
      "DSA, Digital Services Act, online platforms, illegal content, algorithmic accountability, VLOP",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("dsa", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("dsa", locale, META, {
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2022/2065 – Digital Services Act",
    legislationId: "(EU) 2022/2065"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("dsa", locale, "DSA"),
  };
}

export default async function DSAPage({ params }: { params: Promise<{ locale: string }> }) {
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
