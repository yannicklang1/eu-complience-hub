import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import FristenRadarPage from "./FristenRadarPage";

const FristenRadarPageEN = dynamic(() => import("./FristenRadarPage.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: FristenRadarPageEN,
};

function getContent(locale: string) {
  return CONTENT_MAP[locale] ?? FristenRadarPage;
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
    title: "Fristen-Radar & Compliance-Briefing \u2013 Alle EU-Deadlines im Blick | EU Compliance Hub",
    description:
      "Interaktiver Fristen-Radar: Alle EU-Compliance-Deadlines filtern nach Regulierung, Jahr und Status. Plus Compliance-Briefing \u2014 Ihr Fr\u00fchwarnsystem bei kritischen Fristen.",
    ogDescription:
      "Interaktiver Fristen-Radar mit 20+ EU-Deadlines. Compliance-Briefing aktivieren \u2014 nur bei kritischen Fristen. Max. 3\u00d7/Monat.",
    keywords:
      "Fristen-Radar, Compliance-Briefing, Compliance Fristen, NIS2 Fristen, DORA Deadlines, AI Act Termine, EU Regulierungen Updates, Compliance \u00d6sterreich",
  },
  en: {
    title: "Deadline Radar & Compliance Briefing \u2013 All EU Deadlines at a Glance | EU Compliance Hub",
    description:
      "Interactive deadline radar: Filter all EU compliance deadlines by regulation, year and status. Plus compliance briefing \u2014 your early warning system for critical deadlines.",
    ogDescription:
      "Interactive deadline radar with 20+ EU deadlines. Activate compliance briefing \u2014 only for critical deadlines. Max 3\u00d7/month.",
    keywords:
      "deadline radar, compliance briefing, compliance deadlines, NIS2 deadlines, DORA deadlines, AI Act dates, EU regulation updates, compliance Austria",
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

  const slug = "fristen-radar";
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
    name: isEn
      ? "Deadline Radar \u2013 EU Compliance Deadlines"
      : "Fristen-Radar \u2013 EU Compliance Deadlines",
    description: isEn
      ? "Interactive tool for filtering and tracking all EU compliance deadlines. Compliance briefing for critical regulatory updates."
      : "Interaktives Tool zum Filtern und Verfolgen aller EU-Compliance-Fristen. Compliance-Briefing f\u00fcr kritische regulatorische Updates.",
    url: `${BASE_URL}/${locale}/fristen-radar`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
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
        name: isEn ? "Deadline Radar" : "Fristen-Radar",
        item: `${BASE_URL}/${locale}/fristen-radar`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function Page({
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
