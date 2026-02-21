import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
  description:
    "Data Act komplett erklärt: IoT-Datenzugang, B2B-Datenweitergabe, Cloud-Switching, faire Vertragsklauseln, Notfall-Datenzugang für Behörden. Gilt ab 12. September 2025.",
  keywords:
    "Data Act, Verordnung 2023/2854, IoT Daten EU, Cloud Switching, Datenzugang Recht, B2B Datenweitergabe, FRAND, Smart Products Daten, Data Act Compliance",
  openGraph: {
    title: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
    description:
      "Data-Act-Pflichten: IoT-Datenzugang, Cloud-Switching-Recht, faire Vertragsklauseln und Compliance-Fahrplan.",
    url: `${BASE_URL}/data-act`,
  },
  alternates: {
    canonical: `${BASE_URL}/data-act`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
  description:
    "Data Act erklärt: IoT-Datenzugang, B2B-Datenweitergabe, Cloud-Switching und Interoperabilität.",
  url: `${BASE_URL}/data-act`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/data-act` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2023/2854 – Data Act",
    legislationIdentifier: "(EU) 2023/2854",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der EU Data Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der EU Data Act (Verordnung (EU) 2023/2854) regelt den fairen Zugang zu und die Nutzung von Daten. Er gibt Nutzern von IoT-Geräten und verbundenen Diensten das Recht, auf ihre generierten Daten zuzugreifen und diese mit Dritten zu teilen. Außerdem erleichtert er den Wechsel zwischen Cloud-Anbietern.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt der Data Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Data Act gilt ab dem 12. September 2025. Die Cloud-Switching-Bestimmungen (Kapitel VI) treten ebenfalls am 12. September 2025 in Kraft, wobei die Abschaffung der Switching-Gebühren bereits seit dem 12. Januar 2024 schrittweise umgesetzt wird.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist vom Data Act betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Betroffen sind: (1) Hersteller von IoT-Produkten und vernetzten Geräten, (2) Anbieter verbundener Dienste, (3) Cloud- und Edge-Service-Provider, (4) Dateninhaber, die Daten mit Dritten teilen müssen, und (5) Empfänger von Daten (B2B und B2G). Auch KMU genießen Schutz vor missbräuchlichen Vertragsklauseln.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet das Cloud-Switching-Recht im Data Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Cloud-Switching-Recht gibt Kunden das Recht, ihren Cloud-Anbieter ohne technische oder vertragliche Hindernisse zu wechseln. Ab September 2025 müssen Cloud-Provider den Wechsel aktiv unterstützen, alle Switching-Gebühren abschaffen und funktionale Äquivalenz sicherstellen.",
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
      name: "Data Act",
      item: `${BASE_URL}/data-act`,
    },
  ],
};

export default function DataActPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
