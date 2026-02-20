import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "NISG 2026 – Österreichs NIS2-Umsetzung komplett erklärt",
  description:
    "NISG 2026 vollständig erklärt: Betroffene Sektoren, Meldepflichten, Strafen bis 10 Mio. €, Geschäftsführer-Haftung, Registrierung beim BMI. Guide für österreichische Unternehmen.",
  keywords:
    "NISG 2026, NIS2, NIS-2-Richtlinie, Cybersecurity, Österreich, Meldepflicht, CERT.at, BMI, Netzwerk-Informationssystem-Sicherheitsgesetz, kritische Infrastruktur",
  openGraph: {
    title: "NISG 2026 – Österreichs NIS2-Umsetzung komplett erklärt",
    description:
      "Betroffene Sektoren, Meldepflichten, Strafen & Geschäftsführer-Haftung der österreichischen NIS2-Umsetzung.",
    url: "https://eu-compliance-hub.eu/nisg-2026",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/nisg-2026",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NISG 2026 – Österreichs NIS2-Umsetzung komplett erklärt",
  description:
    "NISG 2026 vollständig erklärt: Betroffene Sektoren, Meldepflichten, Strafen bis 10 Mio. €, Geschäftsführer-Haftung und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/nisg-2026",
  datePublished: "2026-02-18",
  dateModified: "2026-02-18",
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
    "@id": "https://eu-compliance-hub.eu/nisg-2026",
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2022/2555 – NIS-2-Richtlinie / NISG 2026",
    legislationIdentifier: "(EU) 2022/2555",
  },
};

export default function NISG2026Page() {
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
