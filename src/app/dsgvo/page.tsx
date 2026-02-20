import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/dsgvo",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/dsgvo",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DSGVO & KI 2026 – Datenschutz und Künstliche Intelligenz",
  description:
    "DSGVO im KI-Zeitalter: ChatGPT & Kundendaten, AI Act × DSGVO, DSFA für KI-Systeme, Betroffenenrechte, Bußgelder und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/dsgvo",
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
    "@id": "https://eu-compliance-hub.eu/dsgvo",
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2016/679 – Datenschutz-Grundverordnung (DSGVO)",
    legislationIdentifier: "(EU) 2016/679",
  },
};

export default function DSGVOPage() {
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
