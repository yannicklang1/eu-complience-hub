import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import VergleichContent from "./VergleichContent";

const VergleichContentEN = dynamic(() => import("./VergleichContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: VergleichContentEN,
};

function getContent(locale: string) {
  return CONTENT_MAP[locale] ?? VergleichContent;
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
    title: "Regulierungsvergleich \u2013 EU-Compliance im \u00dcberblick",
    description:
      "Vergleichen Sie 9 EU-Regulierungen wie NIS2, AI Act, DORA, DSGVO, CRA, CSRD, MiCA, Data Act und BaFG auf einen Blick: Anwendungsbereich, Bu\u00dfgelder, Fristen, Pflichten und betroffene Unternehmen.",
    ogDescription:
      "Vergleichen Sie EU-Regulierungen auf einen Blick: Bu\u00dfgelder, Fristen, Pflichten.",
    keywords:
      "EU Regulierung Vergleich, NIS2 vs DORA, AI Act Vergleich, Compliance Vergleich, EU Gesetze \u00dcbersicht, Bu\u00dfgelder Vergleich, DSGVO NIS2 Unterschied, MiCA Vergleich, Data Act Vergleich",
  },
  en: {
    title: "Regulation Comparison \u2013 EU Compliance at a Glance",
    description:
      "Compare 9 EU regulations such as NIS2, AI Act, DORA, GDPR, CRA, CSRD, MiCA, Data Act and BaFG at a glance: scope, fines, deadlines, obligations and affected companies.",
    ogDescription:
      "Compare EU regulations at a glance: fines, deadlines, obligations.",
    keywords:
      "EU regulation comparison, NIS2 vs DORA, AI Act comparison, compliance comparison, EU laws overview, fines comparison, GDPR NIS2 difference, MiCA comparison, Data Act comparison",
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

  const slug = "vergleich";
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Regulation Comparison" : "Regulierungsvergleich",
        item: `${BASE_URL}/${locale}/vergleich`,
      },
    ],
  };

  return { breadcrumbJsonLd };
}

export default async function VergleichPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getContent(locale);
  const { breadcrumbJsonLd } = buildJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Content />
    </>
  );
}
