import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import BussgeldRechnerTool from "./BussgeldRechnerTool";

export const metadata: Metadata = {
  title: "Bußgeld-Rechner — Compliance-Risiko in Euro",
  description:
    "Berechnen Sie Ihr maximales Bußgeldrisiko bei NIS2, DORA, AI Act, CRA und DSGVO. Geben Sie Ihren Jahresumsatz ein und sehen Sie die Zahlen.",
  keywords:
    "Bußgeld Rechner, NIS2 Strafe, DORA Bußgeld, AI Act Strafe, CRA Bußgeld, DSGVO Strafe, Compliance Kosten, EU Regulierung Strafe",
  openGraph: {
    title: "Bußgeld-Rechner — Was kostet Nicht-Compliance?",
    description: "Maximales Bußgeldrisiko bei NIS2, DORA, AI Act, CRA & DSGVO berechnen.",
    url: `${BASE_URL}/tools/bussgeld-rechner`,
  },
  alternates: { canonical: `${BASE_URL}/tools/bussgeld-rechner` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EU Compliance Bußgeld-Rechner",
  url: `${BASE_URL}/tools/bussgeld-rechner`,
  description: "Berechnen Sie Ihr maximales Bußgeldrisiko bei EU-Regulierungen.",
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
    { "@type": "ListItem", position: 3, name: "Bußgeld-Rechner", item: `${BASE_URL}/tools/bussgeld-rechner` },
  ],
};

export default function BussgeldRechnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BussgeldRechnerTool />
    </>
  );
}
