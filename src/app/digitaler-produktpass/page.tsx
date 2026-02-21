import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
  description:
    "Digitaler Produktpass komplett erklärt: Welche Produkte ab wann betroffen sind, Datenanforderungen, QR-Code-Pflicht, ESPR-Verordnung, Strafen. Guide für Hersteller, Importeure & Händler.",
  keywords:
    "Digitaler Produktpass, DPP, ESPR, Ecodesign Regulation, Verordnung 2024/1781, Produktpass EU, Supply Chain Transparenz, Circulor, PLM Software",
  openGraph: {
    title: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
    description:
      "Pflichtangaben, Produktkategorien, Fristen und Compliance-Fahrplan für den Digitalen Produktpass nach ESPR.",
    url: `${BASE_URL}/digitaler-produktpass`,
  },
  alternates: {
    canonical: `${BASE_URL}/digitaler-produktpass`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
  description:
    "Digitaler Produktpass: Produktkategorien, Datenanforderungen, QR-Code-Pflicht und Compliance-Fahrplan nach ESPR.",
  url: `${BASE_URL}/digitaler-produktpass`,
  datePublished: "2026-02-19",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/digitaler-produktpass` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/1781 – Ecodesign for Sustainable Products Regulation",
    legislationIdentifier: "(EU) 2024/1781",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der Digitale Produktpass (DPP)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Digitale Produktpass ist ein standardisierter Datensatz, der alle relevanten Nachhaltigkeits- und Compliance-Informationen eines Produkts über seinen gesamten Lebenszyklus enthält. Er wird per QR-Code oder NFC am Produkt zugänglich sein und basiert auf der ESPR-Verordnung (EU) 2024/1781.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Produkte brauchen ab wann einen Digitalen Produktpass?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der DPP wird schrittweise eingeführt: Batterien ab Februar 2027 (Verordnung 2023/1542), gefolgt von Textilien, Elektronik und Möbeln. Bis 2030 sollen die meisten regulierten Produktkategorien erfasst sein. Die genauen Zeitpläne werden durch delegierte Rechtsakte festgelegt.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist vom Digitalen Produktpass betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Betroffen sind Hersteller, Importeure und Händler von Produkten, die in der EU in Verkehr gebracht werden. Sie müssen die erforderlichen Daten bereitstellen, pflegen und über den DPP zugänglich machen. Auch Online-Marktplätze müssen DPP-Informationen anzeigen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Daten müssen im Digitalen Produktpass enthalten sein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der DPP muss Informationen zu Materialzusammensetzung, CO₂-Fußabdruck, Reparierbarkeit, Recyclingfähigkeit, Herkunft der Materialien und Lieferkette enthalten. Die genauen Datenanforderungen variieren je nach Produktkategorie und werden durch delegierte Rechtsakte definiert.",
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
      name: "Digitaler Produktpass",
      item: `${BASE_URL}/digitaler-produktpass`,
    },
  ],
};

export default function DigitalerProduktpassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
