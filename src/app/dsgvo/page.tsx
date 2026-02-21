import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "DSGVO & KI 2026 – Datenschutz und Künstliche Intelligenz",
  description:
    "DSGVO & KI 2026: Datenschutz-Grundverordnung im KI-Zeitalter. ChatGPT & Kundendaten, AI Act × DSGVO, DSFA für KI-Systeme, Bußgelder bis 20 Mio. € und Compliance-Fahrplan für österreichische Unternehmen.",
  keywords:
    "DSGVO, KI, Künstliche Intelligenz, ChatGPT, AI Act DSGVO, Datenschutz-Grundverordnung, GDPR, Datenschutz, Datenschutzbeauftragter, Betroffenenrechte, Verarbeitungsverzeichnis, DSB, DSFA, Datenschutzbehörde Österreich, Bußgeld, Datenverarbeitung, Datenschutz KI",
  openGraph: {
    title: "DSGVO & KI 2026 – Datenschutz und Künstliche Intelligenz",
    description:
      "DSGVO im KI-Zeitalter: ChatGPT & Kundendaten, AI Act × DSGVO, Betroffenenrechte, Bußgelder & Compliance-Fahrplan.",
    url: `${BASE_URL}/dsgvo`,
  },
  alternates: {
    canonical: `${BASE_URL}/dsgvo`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DSGVO & KI 2026 – Datenschutz und Künstliche Intelligenz",
  description:
    "DSGVO im KI-Zeitalter: ChatGPT & Kundendaten, AI Act × DSGVO, DSFA für KI-Systeme, Betroffenenrechte, Bußgelder und Compliance-Fahrplan.",
  url: `${BASE_URL}/dsgvo`,
  datePublished: "2026-02-19",
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
    "@id": `${BASE_URL}/dsgvo`,
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2016/679 – Datenschutz-Grundverordnung (DSGVO)",
    legislationIdentifier: "(EU) 2016/679",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Darf ich ChatGPT mit Kundendaten nutzen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nur unter strengen Voraussetzungen: Sie benötigen eine gültige Rechtsgrundlage (Art. 6 DSGVO), müssen einen Auftragsverarbeitungsvertrag mit OpenAI abschließen, eine Datenschutz-Folgenabschätzung durchführen und die Betroffenen informieren. Personenbezogene Daten sollten nach Möglichkeit pseudonymisiert werden.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei DSGVO-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bis zu 20 Mio. € oder 4% des weltweiten Jahresumsatzes — je nachdem, welcher Betrag höher ist. In Österreich ist die Datenschutzbehörde (DSB) für die Verhängung zuständig.",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich einen Datenschutzbeauftragten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wenn die Kerntätigkeit in der umfangreichen regelmäßigen Überwachung von Personen oder der Verarbeitung besonderer Datenkategorien besteht. In Österreich ist ein DSB auch ab 50 Mitarbeitern empfehlenswert.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wirkt sich der AI Act auf die DSGVO aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beide Verordnungen gelten parallel. Hochrisiko-KI nach dem AI Act erfordert zusätzlich zur DSGVO-DSFA ein Risikomanagement-System, menschliche Aufsicht und ein Qualitätsmanagementsystem. Die DSGVO-Grundsätze (Datenminimierung, Transparenz, Zweckbindung) gelten weiterhin für alle KI-Systeme.",
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
      name: "DSGVO",
      item: `${BASE_URL}/dsgvo`,
    },
  ],
};

export default function DSGVOPage() {
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
