import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/nisg-2026`,
  },
  alternates: {
    canonical: `${BASE_URL}/nisg-2026`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NISG 2026 – Österreichs NIS2-Umsetzung komplett erklärt",
  description:
    "NISG 2026 vollständig erklärt: Betroffene Sektoren, Meldepflichten, Strafen bis 10 Mio. €, Geschäftsführer-Haftung und Compliance-Fahrplan.",
  url: `${BASE_URL}/nisg-2026`,
  datePublished: "2026-02-18",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/nisg-2026`,
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2022/2555 – NIS-2-Richtlinie / NISG 2026",
    legislationIdentifier: "(EU) 2022/2555",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wer ist vom NISG 2026 betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unternehmen ab 50 Mitarbeitern oder 10 Mio. € Umsatz in 18 kritischen Sektoren — darunter Energie, Verkehr, Gesundheit, digitale Infrastruktur, IKT-Dienste, öffentliche Verwaltung und Lebensmittel. Unabhängig von der Größe sind auch DNS-Dienste, TLD-Registries, qualifizierte Vertrauensdiensteanbieter und KRITIS-Betreiber betroffen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei Verstößen gegen das NISG 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für wesentliche Einrichtungen bis zu 10 Mio. € oder 2% des weltweiten Jahresumsatzes. Für wichtige Einrichtungen bis zu 7 Mio. € oder 1,4% des Umsatzes. Zusätzlich droht persönliche Geschäftsführer-Haftung.",
      },
    },
    {
      "@type": "Question",
      name: "Wann tritt das NISG 2026 in Kraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das NISG 2026 wurde im April 2025 vom Nationalrat verabschiedet und tritt voraussichtlich im Q2/Q3 2025 in Kraft. Die Registrierungspflicht beim BMI beginnt 3 Monate nach Inkrafttreten.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss bei einem Sicherheitsvorfall gemeldet werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein dreistufiges Meldeverfahren: Frühwarnung innerhalb von 24 Stunden an CERT.at, erste Bewertung innerhalb von 72 Stunden, und ein Abschlussbericht innerhalb eines Monats.",
      },
    },
  ],
};

/* ── Breadcrumb Schema ── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "EU Compliance Hub",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "NISG 2026",
      item: `${BASE_URL}/nisg-2026`,
    },
  ],
};

export default function NISG2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GuideContent />
    </>
  );
}
