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
    title: "ePrivacy – Cookie-Recht, Tracking & Einwilligung Guide 2026",
    description:
      "ePrivacy-Richtlinie & nationale Umsetzung erklärt: Cookie-Consent, Tracking-Regeln, Direktmarketing, Server-Side Tracking, TDDDG, TKG 2021. Alles für DACH-Compliance.",
    ogDescription:
      "ePrivacy-Regeln: Cookie-Consent, Tracking, Direktmarketing und Consent-Management-Pflichten für DACH-Unternehmen.",
    keywords:
      "ePrivacy, Cookie Consent, Tracking Recht EU, ePrivacy-Richtlinie, TDDDG, TKG 2021, Cookie Banner, Consent Management Platform, Server-Side Tracking, Cookieless",
  },
  en: {
    title: "ePrivacy Regulation – Cookie Rules & Digital Privacy",
    description:
      "ePrivacy Regulation explained: cookie consent, electronic communications rules, spam regulations, tracking technologies. Guide for European businesses.",
    ogDescription:
      "Cookie consent, tracking rules and e-communications obligations under ePrivacy.",
    keywords:
      "ePrivacy, cookie consent, tracking, e-Privacy Regulation, PECR, electronic communications",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("eprivacy", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("eprivacy", locale, META, {
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie 2002/58/EG – ePrivacy-Richtlinie (geändert durch 2009/136/EG)",
    legislationId: "2002/58/EG"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("eprivacy", locale, "ePrivacy"),
  };
}

export default async function EPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
