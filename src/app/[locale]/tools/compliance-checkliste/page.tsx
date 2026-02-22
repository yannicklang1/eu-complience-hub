import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ChecklistTool from "./ChecklistTool";

const ChecklistToolEN = dynamic(() => import("./ChecklistTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: ChecklistToolEN,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

interface MetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

const META: Partial<Record<Locale, MetaStrings>> = {
  de: {
    title: "Compliance-Checkliste \u2013 EU-Regulierungen im \u00dcberblick",
    description:
      "Interaktive Checkliste f\u00fcr EU-Compliance: Pr\u00fcfen Sie in wenigen Minuten, welche Regulierungen (NIS2, AI Act, DORA, DSGVO, CRA, CSRD) Ihr Unternehmen betreffen und wo Handlungsbedarf besteht.",
    ogDescription:
      "Pr\u00fcfen Sie in wenigen Minuten, welche EU-Regulierungen Ihr Unternehmen betreffen und wo Handlungsbedarf besteht.",
    keywords:
      "Compliance Checkliste, EU Regulierung, NIS2, AI Act, DORA, DSGVO, CRA, CSRD, Compliance Check, Selbsttest, Unternehmen",
  },
  en: {
    title: "Compliance Checklist \u2013 EU Regulations at a Glance",
    description:
      "Interactive checklist for EU compliance: Find out in minutes which regulations (NIS2, AI Act, DORA, GDPR, CRA, CSRD) affect your company and where action is needed.",
    ogDescription:
      "Find out in minutes which EU regulations affect your company and where action is needed.",
    keywords:
      "compliance checklist, EU regulation, NIS2, AI Act, DORA, GDPR, CRA, CSRD, compliance check, self-test, company",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "tools/compliance-checkliste";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* -- Per-locale JSON-LD -- */

function buildJsonLd(locale: string) {
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isEn ? "EU Compliance Checklist" : "EU Compliance-Checkliste",
    url: `${BASE_URL}/${locale}/tools/compliance-checkliste`,
    description: isEn
      ? "Interactive checklist: Which EU regulations affect your company? NIS2, AI Act, DORA, GDPR, CRA, CSRD — check all obligations."
      : "Interaktive Checkliste: Welche EU-Regulierungen betreffen Ihr Unternehmen? NIS2, AI Act, DORA, DSGVO, CRA, CSRD \u2013 alle Pflichten pr\u00fcfen.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/${locale}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: isEn ? "Compliance Checklist" : "Compliance-Checkliste",
        item: `${BASE_URL}/${locale}/tools/compliance-checkliste`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function ComplianceChecklistePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
      {createElement(CONTENT_MAP[locale] ?? ChecklistTool)}
    </>
  );
}
