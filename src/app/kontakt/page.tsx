import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import KontaktContent from "./KontaktContent";

export const metadata: Metadata = {
  title: "Kontakt – Compliance-Beratung anfragen",
  description:
    "Kontaktieren Sie uns für Fragen zu EU-Compliance, Regulierungen oder unser Beratungsangebot. Kostenlose Ersteinschätzung für Ihr Unternehmen.",
  keywords:
    "EU Compliance Beratung, NIS2 Beratung, DSGVO Berater, Compliance Experte, Kontakt, Anfrage",
  openGraph: {
    title: "Kontakt – Compliance-Beratung anfragen",
    description:
      "Kontaktieren Sie uns für Fragen zu EU-Compliance und unser Beratungsangebot.",
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
    { "@type": "ListItem", position: 2, name: "Kontakt", item: `${BASE_URL}/kontakt` },
  ],
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt – EU Compliance Hub",
  url: `${BASE_URL}/kontakt`,
  description: "Kontaktieren Sie uns für Fragen zu EU-Compliance und unser Beratungsangebot.",
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["German", "English"],
    },
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
