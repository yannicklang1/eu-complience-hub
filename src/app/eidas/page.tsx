import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "eIDAS 2.0 – EU Digital Identity Wallet Guide 2026",
  description:
    "eIDAS 2.0 komplett erklärt: EU Digital Identity Wallet, elektronische Signaturen, Qualified Trust Services, Akzeptanzpflicht für Plattformen. Verordnung (EU) 2024/1183.",
  keywords:
    "eIDAS 2.0, EU Digital Identity Wallet, Verordnung 2024/1183, EUDIW, elektronische Signatur, Qualified Trust Services, ID Austria, AusweisApp, KYC EU",
  openGraph: {
    title: "eIDAS 2.0 – EU Digital Identity Wallet Guide 2026",
    description:
      "eIDAS 2.0: EU-Wallet, elektronische Identität, Qualified Trust Services und Compliance-Pflichten.",
    url: `${BASE_URL}/eidas`,
  },
  alternates: {
    canonical: `${BASE_URL}/eidas`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "eIDAS 2.0 – EU Digital Identity Wallet Guide 2026",
  description:
    "eIDAS 2.0: EU Digital Identity Wallet, elektronische Signaturen, qualifizierte Vertrauensdienste und Akzeptanzpflichten.",
  url: `${BASE_URL}/eidas`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/eidas` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/1183 – eIDAS 2.0",
    legislationIdentifier: "(EU) 2024/1183",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist eIDAS 2.0 und das EU Digital Identity Wallet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "eIDAS 2.0 (Verordnung (EU) 2024/1183) ist die überarbeitete EU-Verordnung für elektronische Identifizierung und Vertrauensdienste. Kernstück ist die EU Digital Identity Wallet (EUDIW) — eine staatlich ausgegebene digitale Brieftasche, mit der EU-Bürger sich online und offline ausweisen können.",
      },
    },
    {
      "@type": "Question",
      name: "Wer muss die EU Digital Identity Wallet akzeptieren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Große Online-Plattformen (Very Large Online Platforms nach DSA), öffentliche Verwaltungen, Banken und Versicherungen (für KYC), Gesundheitsdienstleister und Telekommunikationsanbieter müssen die EUDIW als Identifizierungsmittel akzeptieren. Weitere Branchen können durch delegierte Rechtsakte folgen.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann ist die EU Digital Identity Wallet verfügbar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Verordnung (EU) 2024/1183 trat am 20. Mai 2024 in Kraft. EU-Mitgliedstaaten müssen die EUDIW bis spätestens 2026 bereitstellen. Pilotprojekte (EU Large Scale Pilots) laufen bereits in mehreren Ländern, darunter Österreich (ID Austria) und Deutschland (AusweisApp).",
      },
    },
    {
      "@type": "Question",
      name: "Was sind Qualified Trust Services unter eIDAS 2.0?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualified Trust Services sind zertifizierte Vertrauensdienste wie qualifizierte elektronische Signaturen (QES), Siegel, Zeitstempel und Zustelldienste. eIDAS 2.0 erweitert diese um Electronic Ledgers (Blockchain), Electronic Attestation of Attributes und die Wallet-Infrastruktur.",
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
      name: "eIDAS 2.0",
      item: `${BASE_URL}/eidas`,
    },
  ],
};

export default function EIDASPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
