import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/produkthaftung`,
  },
  alternates: {
    canonical: `${BASE_URL}/produkthaftung`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Neue EU-Produkthaftung (PLD) – Software & KI Haftung Guide 2026",
  description:
    "Neue Produkthaftungsrichtlinie 2024/2853: Software als Produkt, Beweislastumkehr, KI-Haftung und Compliance-Fahrplan.",
  url: `${BASE_URL}/produkthaftung`,
  datePublished: "2026-02-19",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/produkthaftung` },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2024/2853 – Produkthaftung",
    legislationIdentifier: "(EU) 2024/2853",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Gilt die neue EU-Produkthaftung auch für Software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die neue Produkthaftungsrichtlinie (EU) 2024/2853 definiert Software erstmals explizit als Produkt — einschließlich SaaS, Apps, Firmware und KI-Systeme. Auch Open-Source-Software ist betroffen, wenn sie im Rahmen einer kommerziellen Tätigkeit bereitgestellt wird.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch ist die Haftung unter der neuen Produkthaftungsrichtlinie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Haftung ist grundsätzlich unbegrenzt. Die bisherige Haftungsobergrenze von 70 Mio. Euro wurde abgeschafft. Der Selbstbehalt von 500 Euro für Sachschäden bleibt bestehen. Hersteller haften verschuldensunabhängig (Gefährdungshaftung).",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt die neue Produkthaftungsrichtlinie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Richtlinie (EU) 2024/2853 ist am 9. Dezember 2024 in Kraft getreten. EU-Mitgliedstaaten müssen sie bis 9. Dezember 2026 in nationales Recht umsetzen. Sie gilt für Produkte, die ab diesem Datum in Verkehr gebracht werden.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist die Beweislastumkehr bei der neuen Produkthaftung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei komplexen Produkten wie Software und KI kann das Gericht vermuten, dass ein Produkt fehlerhaft war und der Fehler den Schaden verursacht hat — wenn der Geschädigte dies plausibel darlegt. Der Hersteller muss dann das Gegenteil beweisen.",
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
      name: "Produkthaftung",
      item: `${BASE_URL}/produkthaftung`,
    },
  ],
};

export default function ProduktHaftungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
