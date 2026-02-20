import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/eprivacy",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/eprivacy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ePrivacy – Cookie-Recht, Tracking & Einwilligung Guide 2026",
  description:
    "ePrivacy erklärt: Cookie-Consent, Tracking-Regeln, Direktmarketing und Consent-Management für DACH-Unternehmen.",
  url: "https://eu-compliance-hub.eu/eprivacy",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/eprivacy" },
  about: {
    "@type": "Legislation",
    name: "Richtlinie 2002/58/EG – ePrivacy-Richtlinie (geändert durch 2009/136/EG)",
    legislationIdentifier: "2002/58/EG",
  },
};

export default function EPrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
