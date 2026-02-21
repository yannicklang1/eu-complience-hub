import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Geschäftsführer-Haftung – Persönliche Risiken bei EU-Compliance-Verstößen",
  description:
    "Geschäftsführer-Haftung bei NIS2, DORA, AI Act & CRA: Wann haften Sie persönlich? Organhaftung, Bußgelder, Sorgfaltspflichten und Enthaftungsstrategien im Überblick.",
  keywords:
    "Geschäftsführer-Haftung, Organhaftung, persönliche Haftung, NIS2, NISG 2026, DORA, AI Act, CRA, Compliance, Sorgfaltspflicht, Geschäftsleitung, Vorstand",
  openGraph: {
    title: "Geschäftsführer-Haftung – Persönliche Risiken bei EU-Compliance-Verstößen",
    description:
      "NIS2, DORA, AI Act, CRA: Wann haften Geschäftsführer persönlich? Organhaftung, Bußgelder & Enthaftungsstrategien.",
    url: `${BASE_URL}/haftungs-check`,
  },
  alternates: {
    canonical: `${BASE_URL}/haftungs-check`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Geschäftsführer-Haftung bei EU-Compliance-Verstößen",
  description:
    "Geschäftsführer-Haftung bei NIS2, DORA, AI Act & CRA: Organhaftung, Bußgelder, Sorgfaltspflichten und Enthaftungsstrategien.",
  url: `${BASE_URL}/haftungs-check`,
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
    "@id": `${BASE_URL}/haftungs-check`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wann haftet ein Geschäftsführer persönlich für Compliance-Verstöße?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geschäftsführer haften persönlich, wenn sie ihre Sorgfaltspflichten bei der Umsetzung von EU-Compliance-Anforderungen verletzen. Bei NIS2/NISG 2026 ist die persönliche Organhaftung sogar explizit im Gesetz verankert — Geschäftsführer können bei Pflichtverletzungen mit ihrem Privatvermögen haften.",
      },
    },
    {
      "@type": "Question",
      name: "Welche EU-Regulierungen sehen eine persönliche Geschäftsführer-Haftung vor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Explizite Organhaftung sehen vor: NISG 2026/NIS2 (persönliche Haftung bei Cybersecurity-Verstößen), DORA (Verantwortlichkeit der Geschäftsleitung für IKT-Risikomanagement), AI Act (Compliance-Pflichten für Hochrisiko-KI) und CRA (Produktsicherheitsverantwortung). Bei allen Regulierungen gilt zudem die allgemeine Sorgfaltspflicht nach nationalem Gesellschaftsrecht.",
      },
    },
    {
      "@type": "Question",
      name: "Wie können sich Geschäftsführer vor persönlicher Haftung schützen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enthaftungsstrategien umfassen: (1) Einrichtung eines dokumentierten Compliance-Management-Systems, (2) regelmäßige Schulungen und Fortbildungen nachweisen, (3) angemessene Budget-Allokation für Compliance, (4) Delegation an qualifizierte Compliance-Beauftragte, (5) D&O-Versicherung und (6) lückenlose Dokumentation aller Entscheidungen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch sind die Bußgelder bei Compliance-Verstößen für Geschäftsführer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Bußgelder variieren je nach Regulierung: NIS2/NISG sieht bis zu 10 Mio. Euro oder 2 % des Umsatzes vor, DORA wird durch die FMA durchgesetzt, der AI Act kann bis zu 35 Mio. Euro oder 7 % des Umsatzes kosten, und der CRA bis zu 15 Mio. Euro oder 2,5 % des Umsatzes. Zusätzlich drohen Tätigkeitsverbote für die Geschäftsleitung.",
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
      name: "Haftungs-Check",
      item: `${BASE_URL}/haftungs-check`,
    },
  ],
};

export default function HaftungsCheckPage() {
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
