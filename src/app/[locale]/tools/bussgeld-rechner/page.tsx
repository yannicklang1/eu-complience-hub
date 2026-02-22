import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import BussgeldRechnerTool from "./BussgeldRechnerTool";

const BussgeldRechnerToolEN = dynamic(() => import("./BussgeldRechnerTool.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: BussgeldRechnerToolEN,
};

function getToolContent(locale: string) {
  return CONTENT_MAP[locale] ?? BussgeldRechnerTool;
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
    title: "Bußgeld-Rechner \u2014 Compliance-Risiko in Euro",
    description:
      "Berechnen Sie Ihr maximales Bußgeldrisiko bei NIS2, DORA, AI Act, CRA und DSGVO. Geben Sie Ihren Jahresumsatz ein und sehen Sie die Zahlen.",
    ogDescription: "Maximales Bußgeldrisiko bei NIS2, DORA, AI Act, CRA & DSGVO berechnen.",
    keywords:
      "Bußgeld Rechner, NIS2 Strafe, DORA Bußgeld, AI Act Strafe, CRA Bußgeld, DSGVO Strafe, Compliance Kosten, EU Regulierung Strafe",
  },
  en: {
    title: "Fine Calculator \u2014 Compliance Risk in Euros",
    description:
      "Calculate your maximum fine risk for NIS2, DORA, AI Act, CRA and GDPR. Enter your annual revenue and see the numbers.",
    ogDescription: "Calculate maximum fine risk for NIS2, DORA, AI Act, CRA & GDPR.",
    keywords:
      "fine calculator, NIS2 penalty, DORA fine, AI Act penalty, CRA fine, GDPR penalty, compliance costs, EU regulation fine",
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

  const slug = "tools/bussgeld-rechner";
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
    name: isEn ? "EU Compliance Fine Calculator" : "EU Compliance Bu\u00dfgeld-Rechner",
    url: `${BASE_URL}/${locale}/tools/bussgeld-rechner`,
    description: isEn
      ? "Calculate your maximum fine risk for EU regulations."
      : "Berechnen Sie Ihr maximales Bu\u00dfgeldrisiko bei EU-Regulierungen.",
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
        name: isEn ? "Fine Calculator" : "Bu\u00dfgeld-Rechner",
        item: `${BASE_URL}/${locale}/tools/bussgeld-rechner`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function BussgeldRechnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getToolContent(locale);
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
