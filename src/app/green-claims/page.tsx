import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Green Claims Directive – Anti-Greenwashing Guide 2026",
  description:
    "Green Claims Directive komplett erklärt: Welche Werbeaussagen ab 2026/2027 illegal sind, Nachweispflichten, Zertifizierungen, Strafen bis 4% des Jahresumsatzes. Guide für Marketing & E-Commerce.",
  keywords:
    "Green Claims Directive, Anti-Greenwashing, Richtlinie 2024/825, klimaneutral illegal, nachhaltig Werbung EU, Greenwashing Strafe, Umweltaussagen Nachweis, LCA-Zertifizierung",
  openGraph: {
    title: "Green Claims Directive – Anti-Greenwashing Guide 2026",
    description:
      "Welche Umweltaussagen ab 2026/2027 illegal sind, Nachweispflichten und Compliance-Fahrplan für Marketing & E-Commerce.",
    url: "https://eu-compliance-hub.eu/green-claims",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/green-claims",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Green Claims Directive – Anti-Greenwashing Guide 2026",
  description:
    "Green Claims Directive erklärt: Nachweispflichten für Umweltaussagen, verbotene Claims und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/green-claims",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/green-claims" },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2024/825 – Empowering Consumers for the Green Transition",
    legislationIdentifier: "(EU) 2024/825",
  },
};

export default function GreenClaimsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
