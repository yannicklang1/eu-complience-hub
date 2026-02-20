import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/tools/haftungs-pruefer",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/tools/haftungs-pruefer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GF-Haftungs-Prüfer",
  url: "https://eu-compliance-hub.eu/tools/haftungs-pruefer",
  description: "Kostenloser Selbst-Check: Wie hoch ist Ihr persönliches Haftungsrisiko als Geschäftsführer?",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
};

export default function HaftungsPrueferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HaftungsPrueferTool />
    </>
  );
}
