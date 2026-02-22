import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import GlossarContent from "./GlossarContent";

const GlossarContentEN = dynamic(() => import("./GlossarContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: GlossarContentEN,
};

function getContent(locale: string) {
  return CONTENT_MAP[locale] ?? GlossarContent;
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
    title: "Compliance-Glossar \u2013 Fachbegriffe einfach erkl\u00e4rt",
    description:
      "\u00dcber 70 Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und ESG \u2014 verst\u00e4ndlich erkl\u00e4rt. Von AI Act bis Zero-Trust, von DSGVO bis DORA.",
    ogDescription:
      "\u00dcber 70 Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und ESG verst\u00e4ndlich erkl\u00e4rt.",
    keywords:
      "Compliance Glossar, EU Regulierung Begriffe, NIS2 Begriffe, DSGVO Glossar, AI Act Begriffe, DORA Glossar, Cybersecurity Fachbegriffe, ESG Glossar",
  },
  en: {
    title: "Compliance Glossary \u2013 Technical Terms Simply Explained",
    description:
      "Over 70 technical terms from EU compliance, data protection, cybersecurity and ESG \u2014 explained clearly. From AI Act to Zero Trust, from GDPR to DORA.",
    ogDescription:
      "Over 70 technical terms from EU compliance, data protection, cybersecurity and ESG explained clearly.",
    keywords:
      "compliance glossary, EU regulation terms, NIS2 terms, GDPR glossary, AI Act terms, DORA glossary, cybersecurity technical terms, ESG glossary",
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

  const slug = "glossar";
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
    "@type": "DefinedTermSet",
    name: isEn ? "EU Compliance Glossary" : "EU Compliance-Glossar",
    description: isEn
      ? "Technical terms from EU compliance, data protection, cybersecurity and sustainability reporting explained clearly."
      : "Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und Nachhaltigkeitsberichterstattung verst\u00e4ndlich erkl\u00e4rt.",
    url: `${BASE_URL}/${locale}/glossar`,
    inLanguage: locale,
    publisher: {
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
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Glossary" : "Glossar",
        item: `${BASE_URL}/${locale}/glossar`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function GlossarPage({
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
      <Content />
    </>
  );
}
