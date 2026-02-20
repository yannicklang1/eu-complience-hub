import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Neue EU-Produkthaftung (PLD) – Software & KI Haftung Guide 2026",
  description:
    "Neue Produkthaftungsrichtlinie 2024/2853 komplett erklärt: Software als Produkt, KI-Haftung, Beweislastumkehr, unbegrenzte Haftung. Guide für Software-Entwickler, SaaS-Anbieter & KI-Unternehmen.",
  keywords:
    "Neue Produkthaftung, PLD, Richtlinie 2024/2853, Software Haftung EU, KI Haftung, Beweislastumkehr, Produkthaftungsrichtlinie, SaaS Haftung, IT-Haftpflicht",
  openGraph: {
    title: "Neue EU-Produkthaftung (PLD) – Software & KI Haftung Guide 2026",
    description:
      "Software als Produkt, Beweislastumkehr und unbegrenzte Haftung: Was Entwickler und SaaS-Anbieter jetzt wissen müssen.",
    url: "https://eu-compliance-hub.eu/produkthaftung",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/produkthaftung",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Neue EU-Produkthaftung (PLD) – Software & KI Haftung Guide 2026",
  description:
    "Neue Produkthaftungsrichtlinie 2024/2853: Software als Produkt, Beweislastumkehr, KI-Haftung und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/produkthaftung",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/produkthaftung" },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2024/2853 – Produkthaftung",
    legislationIdentifier: "(EU) 2024/2853",
  },
};

export default function ProduktHaftungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
