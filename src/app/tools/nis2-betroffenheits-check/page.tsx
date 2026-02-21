import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/tools/nis2-betroffenheits-check`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/nis2-betroffenheits-check`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "NIS2 Betroffenheits-Check",
  url: `${BASE_URL}/tools/nis2-betroffenheits-check`,
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
    url: BASE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "NIS2 Betroffenheits-Check", item: `${BASE_URL}/tools/nis2-betroffenheits-check` },
  ],
};

export default function NIS2CheckPage() {
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
      <NIS2CheckTool />
    </>
  );
}
