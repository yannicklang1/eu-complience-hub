import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import RegulierungFinderTool from "./RegulierungFinderTool";

export const metadata: Metadata = {
  title: "Regulierung-Finder — Welche EU-Gesetze betreffen Sie?",
  description:
    "Finden Sie in 3 Minuten heraus, welche EU-Regulierungen für Ihr Unternehmen relevant sind. Kostenloser Selbst-Check für NIS2, DSGVO, AI Act, DORA, CRA, CSRD und mehr.",
  keywords:
    "EU Regulierung Check, Compliance Check, NIS2, DSGVO, AI Act, DORA, CRA, CSRD, Regulierung finden, Compliance-Pflichten, EU-Gesetze Unternehmen",
  openGraph: {
    title: "Regulierung-Finder — Welche EU-Gesetze betreffen Sie?",
    description:
      "In 3 Minuten herausfinden welche EU-Regulierungen für Ihr Unternehmen relevant sind. Kostenlos.",
    url: `${BASE_URL}/tools/regulierung-finder`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/regulierung-finder`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EU Regulierung-Finder",
  url: `${BASE_URL}/tools/regulierung-finder`,
  description:
    "Kostenloser Selbst-Check: Finden Sie heraus, welche EU-Regulierungen für Ihr Unternehmen relevant sind.",
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
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Regulierung-Finder",
      item: `${BASE_URL}/tools/regulierung-finder`,
    },
  ],
};

export default function RegulierungFinderPage() {
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
      <RegulierungFinderTool />
    </>
  );
}
