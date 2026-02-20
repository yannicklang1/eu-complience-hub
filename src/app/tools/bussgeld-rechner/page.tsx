import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/tools/bussgeld-rechner",
  },
  alternates: { canonical: "https://eu-compliance-hub.eu/tools/bussgeld-rechner" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EU Compliance Bußgeld-Rechner",
  url: "https://eu-compliance-hub.eu/tools/bussgeld-rechner",
  description: "Berechnen Sie Ihr maximales Bußgeldrisiko bei EU-Regulierungen.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
};

export default function BussgeldRechnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BussgeldRechnerTool />
    </>
  );
}
