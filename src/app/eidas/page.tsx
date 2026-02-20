import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/eidas",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/eidas",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "eIDAS 2.0 – EU Digital Identity Wallet Guide 2026",
  description:
    "eIDAS 2.0: EU Digital Identity Wallet, elektronische Signaturen, qualifizierte Vertrauensdienste und Akzeptanzpflichten.",
  url: "https://eu-compliance-hub.eu/eidas",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/eidas" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/1183 – eIDAS 2.0",
    legislationIdentifier: "(EU) 2024/1183",
  },
};

export default function EIDASPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
