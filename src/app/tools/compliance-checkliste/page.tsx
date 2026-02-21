import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ChecklistTool from "./ChecklistTool";

export const metadata: Metadata = {
  title: "Compliance-Checkliste – EU-Regulierungen im Überblick",
  description:
    "Interaktive Checkliste für EU-Compliance: Prüfen Sie in wenigen Minuten, welche Regulierungen (NIS2, AI Act, DORA, DSGVO, CRA, CSRD) Ihr Unternehmen betreffen und wo Handlungsbedarf besteht.",
  keywords:
    "Compliance Checkliste, EU Regulierung, NIS2, AI Act, DORA, DSGVO, CRA, CSRD, Compliance Check, Selbsttest, Unternehmen",
  openGraph: {
    title: "Compliance-Checkliste – EU-Regulierungen im Überblick",
    description:
      "Prüfen Sie in wenigen Minuten, welche EU-Regulierungen Ihr Unternehmen betreffen und wo Handlungsbedarf besteht.",
    url: `${BASE_URL}/tools/compliance-checkliste`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/compliance-checkliste`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EU Compliance-Checkliste",
  url: `${BASE_URL}/tools/compliance-checkliste`,
  description:
    "Interaktive Checkliste: Welche EU-Regulierungen betreffen Ihr Unternehmen? NIS2, AI Act, DORA, DSGVO, CRA, CSRD – alle Pflichten prüfen.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
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
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${BASE_URL}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Compliance-Checkliste",
      item: `${BASE_URL}/tools/compliance-checkliste`,
    },
  ],
};

export default function ComplianceChecklistePage() {
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
      <ChecklistTool />
    </>
  );
}
