import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import KontaktContent from "./KontaktContent";

export const metadata: Metadata = {
  title: "Compliance-Report – Kostenlose Analyse für Ihr Unternehmen",
  description:
    "Erhalten Sie einen personalisierten Compliance-Report mit Regulierungsanalyse, Kostenschätzung, Reifegrad-Bewertung und Software-Empfehlungen — kostenlos per E-Mail.",
  keywords:
    "Compliance Report, EU Regulierung Analyse, NIS2 Check, DSGVO Compliance, Kostenschätzung, Reifegrad",
  openGraph: {
    title: "Compliance-Report – Kostenlose Analyse für Ihr Unternehmen",
    description:
      "Personalisierter Compliance-Report mit Regulierungsanalyse, Kostenschätzung und Handlungsempfehlungen.",
    url: `${BASE_URL}/kontakt`,
  },
  alternates: {
    canonical: `${BASE_URL}/kontakt`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Compliance-Report", item: `${BASE_URL}/kontakt` },
  ],
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compliance-Report Generator",
  url: `${BASE_URL}/kontakt`,
  description: "Personalisierter Compliance-Report mit Regulierungsanalyse, Kostenschätzung und Handlungsempfehlungen.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
  },
};

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <KontaktContent />
    </>
  );
}
