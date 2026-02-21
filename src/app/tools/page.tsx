import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ToolsHubContent from "./ToolsHubContent";

export const metadata: Metadata = {
  title: "Compliance-Tools – Kostenlose interaktive Werkzeuge",
  description:
    "Kostenlose EU-Compliance-Tools: Regulierung-Finder, NIS2-Check, Compliance-Checkliste, Bußgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check und mehr. Sofort nutzbar, keine Registrierung.",
  keywords:
    "Compliance Tools, NIS2 Check, Regulierung Finder, Compliance Checkliste, Bußgeld Rechner, Kosten Kalkulator, Reifegrad Check, Haftungs Prüfer, EU Compliance, kostenlos",
  openGraph: {
    title: "Compliance-Tools – Kostenlose interaktive Werkzeuge",
    description:
      "Kostenlose EU-Compliance-Tools: Sofort nutzbar, keine Registrierung nötig.",
    url: `${BASE_URL}/tools`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Sind die EU-Compliance-Tools kostenlos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, alle Tools auf dem EU Compliance Hub sind vollständig kostenlos und sofort nutzbar — ohne Registrierung oder Anmeldung. Die Berechnungen erfolgen lokal in Ihrem Browser.",
      },
    },
    {
      "@type": "Question",
      name: "Wie genau sind die Ergebnisse der Compliance-Tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere Tools liefern eine qualifizierte Ersteinschätzung auf Basis aktueller EU-Regulierungen. Sie ersetzen keine individuelle Rechtsberatung, bieten aber eine fundierte Orientierung für die weitere Compliance-Planung.",
      },
    },
    {
      "@type": "Question",
      name: "Welches Tool sollte ich zuerst verwenden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starten Sie mit dem Regulierung-Finder, um herauszufinden, welche EU-Regulierungen für Ihr Unternehmen relevant sind. Danach empfehlen wir den NIS2-Betroffenheits-Check und die Compliance-Checkliste für eine detaillierte Analyse.",
      },
    },
    {
      "@type": "Question",
      name: "Werden meine Daten gespeichert oder an Dritte weitergegeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Alle Berechnungen und Analysen unserer interaktiven Tools erfolgen ausschließlich lokal in Ihrem Browser. Es werden keine personenbezogenen Daten an Server übermittelt oder gespeichert.",
      },
    },
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "EU Compliance Tools",
  url: `${BASE_URL}/tools`,
  description:
    "Sammlung kostenloser interaktiver EU-Compliance-Tools für Unternehmen. Regulierung-Finder, NIS2-Check, Bußgeld-Rechner und mehr.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Regulierung-Finder",
        url: `${BASE_URL}/tools/regulierung-finder`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "NIS2-Betroffenheits-Check",
        url: `${BASE_URL}/tools/nis2-betroffenheits-check`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Compliance-Checkliste",
        url: `${BASE_URL}/tools/compliance-checkliste`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Haftungs-Prüfer",
        url: `${BASE_URL}/tools/haftungs-pruefer`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Bußgeld-Rechner",
        url: `${BASE_URL}/tools/bussgeld-rechner`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Kosten-Kalkulator",
        url: `${BASE_URL}/tools/kosten-kalkulator`,
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Reifegrad-Check",
        url: `${BASE_URL}/tools/reifegrad-check`,
      },
    ],
  },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolsHubContent />
    </>
  );
}
