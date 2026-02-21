import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import KostenKalkulatorTool from "./KostenKalkulatorTool";

export const metadata: Metadata = {
  title: "Compliance-Kosten-Kalkulator — Was kostet EU-Compliance?",
  description:
    "Schätzen Sie die Kosten für die Umsetzung von NIS2, DSGVO, AI Act, DORA und weiteren EU-Regulierungen. Kostenloser Kalkulator mit individueller Einschätzung.",
  keywords:
    "Compliance Kosten, NIS2 Kosten, DSGVO Kosten, AI Act Kosten, DORA Kosten, Compliance Budget, EU Regulierung Kosten, Implementierung Kosten",
  openGraph: {
    title: "Compliance-Kosten-Kalkulator — Was kostet EU-Compliance?",
    description:
      "Schätzen Sie die Kosten für EU-Compliance-Umsetzung. Kostenloser Kalkulator.",
    url: `${BASE_URL}/tools/kosten-kalkulator`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/kosten-kalkulator`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compliance-Kosten-Kalkulator",
  url: `${BASE_URL}/tools/kosten-kalkulator`,
  description:
    "Kostenloser Kalkulator: Schätzen Sie die Kosten für die Umsetzung von EU-Regulierungen für Ihr Unternehmen.",
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
      name: "Kosten-Kalkulator",
      item: `${BASE_URL}/tools/kosten-kalkulator`,
    },
  ],
};

export default function KostenKalkulatorPage() {
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
      <KostenKalkulatorTool />
    </>
  );
}
