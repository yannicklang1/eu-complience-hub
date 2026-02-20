import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
  description:
    "HSchG vollständig erklärt: EU-Whistleblower-Richtlinie, interne Meldekanäle, Schutz für Hinweisgeber, Strafen bis 40.000 € und Compliance-Fahrplan. Praxisguide für österreichische Unternehmen ab 50 Mitarbeitern.",
  keywords:
    "HSchG, HinweisgeberInnenschutzgesetz, Whistleblower, Hinweisgeberschutz, Meldekanal, Whistleblower-Richtlinie, BAK, Korruptionsbekämpfung, Österreich, interne Meldestelle",
  openGraph: {
    title: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
    description:
      "EU-Whistleblower-Richtlinie in Österreich: Meldekanäle, Schutzrechte, Strafen & Compliance-Fahrplan.",
    url: "https://eu-compliance-hub.eu/hschg",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/hschg",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
  description:
    "HSchG / EU-Whistleblower-Richtlinie in Österreich: Interne Meldekanäle, Schutz für Hinweisgeber, Strafen und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/hschg",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://eu-compliance-hub.eu/hschg",
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2019/1937 – EU-Whistleblower-Richtlinie / HSchG",
    legislationIdentifier: "(EU) 2019/1937",
  },
};

export default function HSchGPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideContent />
    </>
  );
}
