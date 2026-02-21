import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Cyber Resilience Act (CRA) – Vollständiger Guide",
  description:
    "Cyber Resilience Act komplett erklärt: Security by Design, SBOM-Pflicht, Produktkategorien, CE-Kennzeichnung, Schwachstellenmanagement, Strafen bis 15 Mio. €. Guide für Hersteller, Importeure & Händler.",
  keywords:
    "CRA, Cyber Resilience Act, Verordnung 2024/2847, Security by Design, SBOM, CE-Kennzeichnung, IoT-Sicherheit, Produktsicherheit, Schwachstellenmanagement, EU Cybersecurity",
  openGraph: {
    title: "Cyber Resilience Act (CRA) – Vollständiger Guide",
    description:
      "Security by Design, SBOM-Pflicht, Produktkategorien, Strafen & Compliance-Fahrplan des Cyber Resilience Act.",
    url: `${BASE_URL}/cra`,
  },
  alternates: {
    canonical: `${BASE_URL}/cra`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cyber Resilience Act (CRA) – Vollständiger Guide",
  description:
    "Cyber Resilience Act komplett erklärt: Security by Design, SBOM-Pflicht, Produktkategorien, CE-Kennzeichnung und Compliance-Fahrplan.",
  url: `${BASE_URL}/cra`,
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
    "@id": `${BASE_URL}/cra`,
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/2847 – Cyber Resilience Act",
    legislationIdentifier: "(EU) 2024/2847",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der Cyber Resilience Act (CRA)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der CRA (Verordnung (EU) 2024/2847) schreibt Security by Design für alle Produkte mit digitalen Elementen vor — von IoT-Geräten bis Enterprise-Software. Hersteller müssen Cybersecurity-Anforderungen über den gesamten Lebenszyklus erfüllen und eine CE-Kennzeichnung nachweisen.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist vom CRA betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alle Hersteller, Importeure und Händler von Produkten mit digitalen Elementen, die in der EU in Verkehr gebracht werden. Das umfasst Hardware mit Software, reine Softwareprodukte, IoT-Geräte, Netzwerkkomponenten und auch Open-Source-Software bei kommerzieller Nutzung.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt der CRA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der CRA ist am 10. Dezember 2024 in Kraft getreten. Die Meldepflicht für aktiv ausgenutzte Schwachstellen gilt ab September 2026. Alle Produktanforderungen greifen ab dem 11. Dezember 2027.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei CRA-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bis zu 15 Mio. € oder 2,5% des weltweiten Jahresumsatzes für wesentliche Cybersecurity-Verstöße. Bis zu 10 Mio. € oder 2% für sonstige Verstöße. Bis zu 5 Mio. € oder 1% für falsche Angaben gegenüber Behörden.",
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
      name: "Cyber Resilience Act",
      item: `${BASE_URL}/cra`,
    },
  ],
};

export default function CRAPage() {
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
