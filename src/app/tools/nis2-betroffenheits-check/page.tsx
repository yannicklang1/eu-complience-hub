import type { Metadata } from "next";
import NIS2CheckTool from "./NIS2CheckTool";

export const metadata: Metadata = {
  title: "NIS2 Betroffenheits-Check — Sind Sie betroffen?",
  description:
    "Finden Sie in 2 Minuten heraus, ob Ihr Unternehmen unter die NIS2-Richtlinie (NISG 2026) fällt. Kostenloser Selbst-Check mit personalisierter Auswertung.",
  keywords:
    "NIS2 Check, NIS2 betroffen, NISG 2026, NIS2 Betroffenheit, NIS2 Selbsttest, NIS2 Quiz, wesentliche Einrichtung, wichtige Einrichtung",
  openGraph: {
    title: "NIS2 Betroffenheits-Check — Sind Sie betroffen?",
    description:
      "In 2 Minuten herausfinden ob Ihr Unternehmen unter NIS2/NISG 2026 fällt. Kostenloser Check.",
    url: "https://eu-compliance-hub.eu/tools/nis2-betroffenheits-check",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/tools/nis2-betroffenheits-check",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "NIS2 Betroffenheits-Check",
  url: "https://eu-compliance-hub.eu/tools/nis2-betroffenheits-check",
  description:
    "Kostenloser Selbst-Check: Finden Sie heraus, ob Ihr Unternehmen unter die NIS2-Richtlinie fällt.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
};

export default function NIS2CheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NIS2CheckTool />
    </>
  );
}
