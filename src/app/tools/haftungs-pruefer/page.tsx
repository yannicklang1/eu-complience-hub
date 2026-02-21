import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import HaftungsPrueferTool from "./HaftungsPrueferTool";

export const metadata: Metadata = {
  title: "GF-Haftungs-Prüfer — Ihr persönliches Haftungsrisiko",
  description:
    "Wie hoch ist Ihr persönliches Haftungsrisiko als Geschäftsführer bei NIS2, DORA, AI Act & CRA? Kostenloser Selbst-Check mit Risiko-Score.",
  keywords:
    "Geschäftsführer Haftung, NIS2 Haftung, DORA Haftung, AI Act Haftung, CRA Haftung, GmbHG § 25, AktG § 84, D&O Versicherung, Compliance Haftung",
  openGraph: {
    title: "GF-Haftungs-Prüfer — Ihr persönliches Haftungsrisiko",
    description:
      "Wie hoch ist Ihr persönliches Haftungsrisiko als GF bei EU-Regulierungen? Kostenloser Check.",
    url: `${BASE_URL}/tools/haftungs-pruefer`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/haftungs-pruefer`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GF-Haftungs-Prüfer",
  url: `${BASE_URL}/tools/haftungs-pruefer`,
  description: "Kostenloser Selbst-Check: Wie hoch ist Ihr persönliches Haftungsrisiko als Geschäftsführer?",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "GF-Haftungs-Prüfer", item: `${BASE_URL}/tools/haftungs-pruefer` },
  ],
};

export default function HaftungsPrueferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HaftungsPrueferTool />
    </>
  );
}
