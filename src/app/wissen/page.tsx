import type { Metadata } from "next";
import { Suspense } from "react";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import WissenContent from "./WissenContent";

export const metadata: Metadata = {
  title: "Wissen – Alle EU-Regulierungen & Compliance-Ressourcen",
  description:
    "Ihr Compliance-Wissenszentrum: 18 EU-Regulierungen erklärt, interaktive Tools, Branchen-Guides, Glossar und mehr. Alles was Ihr Unternehmen für EU-Compliance braucht.",
  keywords:
    "EU Compliance Wissen, EU Regulierungen Übersicht, NIS2 Guide, AI Act Guide, DORA Guide, DSGVO Guide, Compliance Ressourcen, EU Gesetzgebung",
  openGraph: {
    title: "Wissen – Alle EU-Regulierungen & Compliance-Ressourcen",
    description:
      "18 EU-Regulierungen erklärt, interaktive Tools und Branchen-Guides. Alles für Ihre EU-Compliance.",
    url: `${BASE_URL}/wissen`,
  },
  alternates: {
    canonical: `${BASE_URL}/wissen`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "EU Compliance Wissenszentrum",
  description:
    "Umfassende Sammlung von Leitfäden, Tools und Ressourcen zu EU-Regulierungen und Compliance-Anforderungen.",
  url: `${BASE_URL}/wissen`,
  inLanguage: "de",
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
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Wissen", item: `${BASE_URL}/wissen` },
  ],
};

export default function WissenPage() {
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
        <WissenContent />
      </Suspense>
    </>
  );
}
