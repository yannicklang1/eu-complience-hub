import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import WissenContent from "./WissenContent";

const WissenContentEN = dynamic(() => import("./WissenContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: WissenContentEN,
};

function getContent(locale: string) {
  return CONTENT_MAP[locale] ?? WissenContent;
}

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
    title: "Wissen \u2013 Alle EU-Regulierungen & Compliance-Ressourcen",
    description:
      "Ihr Compliance-Wissenszentrum: 18 EU-Regulierungen erkl\u00e4rt, interaktive Tools, Branchen-Guides, Glossar und mehr. Alles was Ihr Unternehmen f\u00fcr EU-Compliance braucht.",
    ogDescription:
      "18 EU-Regulierungen erkl\u00e4rt, interaktive Tools und Branchen-Guides. Alles f\u00fcr Ihre EU-Compliance.",
    keywords:
      "EU Compliance Wissen, EU Regulierungen \u00dcbersicht, NIS2 Guide, AI Act Guide, DORA Guide, DSGVO Guide, Compliance Ressourcen, EU Gesetzgebung",
  },
  en: {
    title: "Knowledge \u2013 All EU Regulations & Compliance Resources",
    description:
      "Your compliance knowledge centre: 18 EU regulations explained, interactive tools, industry guides, glossary and more. Everything your company needs for EU compliance.",
    ogDescription:
      "18 EU regulations explained, interactive tools and industry guides. Everything for your EU compliance.",
    keywords:
      "EU compliance knowledge, EU regulations overview, NIS2 guide, AI Act guide, DORA guide, GDPR guide, compliance resources, EU legislation",
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

  const slug = "wissen";
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
    "@type": "CollectionPage",
    name: isEn ? "EU Compliance Knowledge Centre" : "EU Compliance Wissenszentrum",
    description: isEn
      ? "Comprehensive collection of guides, tools and resources on EU regulations and compliance requirements."
      : "Umfassende Sammlung von Leitf\u00e4den, Tools und Ressourcen zu EU-Regulierungen und Compliance-Anforderungen.",
    url: `${BASE_URL}/${locale}/wissen`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Knowledge" : "Wissen",
        item: `${BASE_URL}/${locale}/wissen`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function WissenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getContent(locale);
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
      <Suspense>
        <Content />
      </Suspense>
    </>
  );
}
