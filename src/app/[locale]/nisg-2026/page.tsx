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
    title: "NISG 2026 – Österreichs NIS2-Umsetzung komplett erklärt",
    description:
      "NISG 2026 vollständig erklärt: Betroffene Sektoren, Meldepflichten, Strafen bis 10 Mio. €, Geschäftsführer-Haftung, Registrierung beim BMI. Guide für österreichische Unternehmen.",
    ogDescription:
      "Betroffene Sektoren, Meldepflichten, Strafen & Geschäftsführer-Haftung der österreichischen NIS2-Umsetzung.",
    keywords:
      "NISG 2026, NIS2, NIS-2-Richtlinie, Cybersecurity, Österreich, Meldepflicht, CERT.at, BMI, Netzwerk-Informationssystem-Sicherheitsgesetz, kritische Infrastruktur",
  },
  en: {
    title: "NISG 2026 – Austria’s NIS2 Implementation Fully Explained",
    description:
      "Everything about NISG 2026: affected sectors, reporting obligations, fines up to €10M, CEO liability and BMI registration. Guide for Austrian companies.",
    ogDescription:
      "Affected sectors, reporting obligations, fines & CEO liability under Austria’s NIS2 implementation.",
    keywords:
      "NISG 2026, NIS2, NIS2 directive, cybersecurity Austria, reporting obligation, CERT.at, BMI, critical infrastructure",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("nisg-2026", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("nisg-2026", locale, META, {
    datePublished: "2026-02-18",
    dateModified: "2026-02-20",
    legislationName: "Richtlinie (EU) 2022/2555 – NIS-2-Richtlinie / NISG 2026",
    legislationId: "(EU) 2022/2555"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("nisg-2026", locale, "NISG 2026"),
  };
}

export default async function NISG2026Page({ params }: { params: Promise<{ locale: string }> }) {
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
