import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import GlossarContent from "./GlossarContent";

export const metadata: Metadata = {
  title: "Compliance-Glossar – Fachbegriffe einfach erklärt",
  description:
    "Über 70 Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und ESG — verständlich erklärt. Von AI Act bis Zero-Trust, von DSGVO bis DORA.",
  keywords:
    "Compliance Glossar, EU Regulierung Begriffe, NIS2 Begriffe, DSGVO Glossar, AI Act Begriffe, DORA Glossar, Cybersecurity Fachbegriffe, ESG Glossar",
  openGraph: {
    title: "Compliance-Glossar – Fachbegriffe einfach erklärt",
    description:
      "Über 70 Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und ESG verständlich erklärt.",
    url: `${BASE_URL}/glossar`,
  },
  alternates: {
    canonical: `${BASE_URL}/glossar`,
  },
};

/* JSON-LD: DefinedTermSet */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "EU Compliance-Glossar",
  description:
    "Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und Nachhaltigkeitsberichterstattung verständlich erklärt.",
  url: `${BASE_URL}/glossar`,
  inLanguage: "de",
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
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glossar",
      item: `${BASE_URL}/glossar`,
    },
  ],
};

export default function GlossarPage() {
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
      <GlossarContent />
    </>
  );
}
