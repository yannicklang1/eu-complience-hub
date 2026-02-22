import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import VerzeichnisContent from "./VerzeichnisContent";

const VerzeichnisContentEN = dynamic(() => import("./VerzeichnisContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: VerzeichnisContentEN,
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
    title: "Compliance-Verzeichnis \u2013 Software, Auditoren, Kanzleien & Berater | EU Compliance Hub",
    description:
      "Kuratiertes Verzeichnis: Compliance-Software, zertifizierte Auditoren, IT-Recht-Kanzleien und Cybersecurity-Berater f\u00fcr NIS2, DORA, AI Act, CRA und DSGVO in \u00d6sterreich und der DACH-Region.",
    ogDescription:
      "Finden Sie den passenden Partner f\u00fcr Ihre EU-Compliance: Software, Auditoren, Kanzleien und Berater \u2014 kuratiert und filterbar.",
    keywords:
      "Compliance-Verzeichnis, NIS2 Berater, DORA Audit, AI Act Kanzlei, Compliance Software, Auditoren \u00d6sterreich, IT-Recht Kanzlei Wien, Cybersecurity Beratung DACH",
  },
  en: {
    title: "Compliance Directory \u2013 Software, Auditors, Law Firms & Consultants | EU Compliance Hub",
    description:
      "Curated directory: Compliance software, certified auditors, IT law firms and cybersecurity consultants for NIS2, DORA, AI Act, CRA and GDPR in Austria and the DACH region.",
    ogDescription:
      "Find the right partner for your EU compliance: software, auditors, law firms and consultants \u2014 curated and filterable.",
    keywords:
      "compliance directory, NIS2 consultant, DORA audit, AI Act law firm, compliance software, auditors Austria, IT law firm Vienna, cybersecurity consulting DACH",
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

  const slug = "compliance-verzeichnis";
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
    name: isEn ? "Compliance Directory" : "Compliance-Verzeichnis",
    description: isEn
      ? "Curated directory of compliance software, auditors, law firms and consultants for EU regulations."
      : "Kuratiertes Verzeichnis von Compliance-Software, Auditoren, Kanzleien und Beratern f\u00fcr EU-Regulierungen.",
    url: `${BASE_URL}/${locale}/compliance-verzeichnis`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Compliance Software" : "Compliance-Software",
          description: isEn
            ? "Digital platforms for automated compliance"
            : "Digitale Plattformen f\u00fcr automatisierte Compliance",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEn ? "Certified Auditors" : "Zertifizierte Auditoren",
          description: isEn
            ? "Accredited testing bodies for ISO 27001, NIS2 and DORA"
            : "Akkreditierte Pr\u00fcfstellen f\u00fcr ISO 27001, NIS2 und DORA",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: isEn ? "Law Firms & Legal Advice" : "Kanzleien & Rechtsberatung",
          description: isEn
            ? "Specialised firms for IT law and data protection"
            : "Spezialisierte Kanzleien f\u00fcr IT-Recht und Datenschutz",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: isEn ? "Compliance Consultants" : "Compliance-Berater",
          description: isEn
            ? "Cybersecurity and compliance consultants"
            : "Cybersecurity- und Compliance-Consultants",
        },
      ],
    },
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
        name: isEn ? "Compliance Directory" : "Compliance-Verzeichnis",
        item: `${BASE_URL}/${locale}/compliance-verzeichnis`,
      },
    ],
  };

  return { jsonLd, breadcrumbJsonLd };
}

export default async function ComplianceVerzeichnisPage({
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
      {createElement(CONTENT_MAP[locale] ?? VerzeichnisContent)}
    </>
  );
}
