import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "ePrivacy – Cookie-Recht, Tracking & Einwilligung Guide 2026",
  description:
    "ePrivacy-Richtlinie & nationale Umsetzung erklärt: Cookie-Consent, Tracking-Regeln, Direktmarketing, Server-Side Tracking, TDDDG, TKG 2021. Alles für DACH-Compliance.",
  keywords:
    "ePrivacy, Cookie Consent, Tracking Recht EU, ePrivacy-Richtlinie, TDDDG, TKG 2021, Cookie Banner, Consent Management Platform, Server-Side Tracking, Cookieless",
  openGraph: {
    title: "ePrivacy – Cookie-Recht, Tracking & Einwilligung Guide 2026",
    description:
      "ePrivacy-Regeln: Cookie-Consent, Tracking, Direktmarketing und Consent-Management-Pflichten für DACH-Unternehmen.",
    url: `${BASE_URL}/eprivacy`,
  },
  alternates: {
    canonical: `${BASE_URL}/eprivacy`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ePrivacy – Cookie-Recht, Tracking & Einwilligung Guide 2026",
  description:
    "ePrivacy erklärt: Cookie-Consent, Tracking-Regeln, Direktmarketing und Consent-Management für DACH-Unternehmen.",
  url: `${BASE_URL}/eprivacy`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/eprivacy` },
  about: {
    "@type": "Legislation",
    name: "Richtlinie 2002/58/EG – ePrivacy-Richtlinie (geändert durch 2009/136/EG)",
    legislationIdentifier: "2002/58/EG",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was regelt die ePrivacy-Richtlinie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die ePrivacy-Richtlinie (2002/58/EG, geändert durch 2009/136/EG) regelt den Schutz der Privatsphäre in der elektronischen Kommunikation. Sie betrifft Cookies und Tracking-Technologien, Direktmarketing per E-Mail und Telefon, Vertraulichkeit der Kommunikation und Standortdaten.",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich einen Cookie-Banner auf meiner Website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, für nicht-essentielle Cookies (Marketing, Analytics, Tracking) ist eine vorherige informierte Einwilligung (Opt-in) erforderlich. Technisch notwendige Cookies (Session-Cookies, Warenkörbe) benötigen keine Einwilligung. Der Cookie-Banner muss alle Cookie-Kategorien transparent auflisten und eine gleichwertige Ablehnungsoption bieten.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen ePrivacy und DSGVO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die DSGVO regelt den allgemeinen Schutz personenbezogener Daten, während ePrivacy speziell die elektronische Kommunikation und den Zugriff auf Endgeräte betrifft. ePrivacy ist als 'lex specialis' vorrangig: Für Cookies und Tracking gilt zuerst ePrivacy (Zugriff auf Gerät), dann ergänzend die DSGVO (Verarbeitung der Daten).",
      },
    },
    {
      "@type": "Question",
      name: "Was ist mit Server-Side Tracking und Cookieless Tracking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Auch Server-Side Tracking und Cookieless-Technologien unterliegen der ePrivacy-Richtlinie, soweit sie auf Informationen im Endgerät des Nutzers zugreifen. Fingerprinting, Local Storage und ähnliche Technologien erfordern ebenfalls eine Einwilligung. Eine echte Consent-Freiheit besteht nur bei aggregierten, nicht-personenbezogenen Statistiken.",
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
      name: "ePrivacy",
      item: `${BASE_URL}/eprivacy`,
    },
  ],
};

export default function EPrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
