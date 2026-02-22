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
    title: "DSGVO & KI 2026 – Datenschutz und Künstliche Intelligenz",
    description:
      "DSGVO & KI 2026: Datenschutz-Grundverordnung im KI-Zeitalter. ChatGPT & Kundendaten, AI Act × DSGVO, DSFA für KI-Systeme, Bußgelder bis 20 Mio. € und Compliance-Fahrplan für österreichische Unternehmen.",
    ogDescription:
      "DSGVO im KI-Zeitalter: ChatGPT & Kundendaten, AI Act × DSGVO, Betroffenenrechte, Bußgelder & Compliance-Fahrplan.",
    keywords:
      "DSGVO, KI, Künstliche Intelligenz, ChatGPT, AI Act DSGVO, Datenschutz-Grundverordnung, GDPR, Datenschutz, Datenschutzbeauftragter, Betroffenenrechte, Verarbeitungsverzeichnis, DSB, DSFA, Datenschutzbehörde Österreich, Bußgeld, Datenverarbeitung, Datenschutz KI",
  },
  en: {
    title: "GDPR – EU Data Protection Regulation Fully Explained",
    description:
      "GDPR comprehensively explained: lawful basis for processing, data subject rights, DPO obligations, fines up to €20M. Guide for European companies.",
    ogDescription:
      "Lawful basis, data subject rights and DPO obligations under GDPR. Comprehensive compliance guide.",
    keywords:
      "GDPR, data protection, data processing, DPO, data subject rights, privacy, EU data protection fines",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildGuideMetadata("dsgvo", locale, META);
}
function buildJsonLd(locale: string) {
  return {
    jsonLd: buildArticleJsonLd("dsgvo", locale, META, {
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    legislationName: "Verordnung (EU) 2016/679 – Datenschutz-Grundverordnung (DSGVO)",
    legislationId: "(EU) 2016/679"
  }),
    breadcrumbJsonLd: buildBreadcrumbJsonLd("dsgvo", locale, "DSGVO"),
  };
}

export default async function DSGVOPage({ params }: { params: Promise<{ locale: string }> }) {
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
