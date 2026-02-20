import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import AdBlockOverlay from "@/components/AdBlockOverlay";
import "./globals.css";

const BASE_URL = "https://eu-compliance-hub.eu";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EU Compliance Hub – Europäische Regulierungen. Klar erklärt.",
    template: "%s | EU Compliance Hub",
  },
  description:
    "NISG 2026, EU AI Act, DORA, CRA, DSGVO, CSRD/ESG, BaFG, HSchG – alle EU-Compliance-Pflichten übersichtlich aufbereitet. Für KMUs und Konzerne. Fristen. Strafen. Lösungen.",
  keywords:
    "NIS2, NISG 2026, EU AI Act, DORA, CRA, DSGVO, CSRD, ESG, Nachhaltigkeit, BaFG, Barrierefreiheit, HSchG, Whistleblower, Compliance, Österreich, Europa, Cybersecurity, KI-Verordnung",
  authors: [{ name: "EU Compliance Hub", url: BASE_URL }],
  creator: "EU Compliance Hub",
  publisher: "EU Compliance Hub",
  openGraph: {
    title: "EU Compliance Hub – Europäische Regulierungen. Klar erklärt.",
    description:
      "Europäische Regulierungen. Klar erklärt. Für Unternehmen jeder Größe.",
    url: BASE_URL,
    siteName: "EU Compliance Hub",
    locale: "de_AT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EU Compliance Hub",
    description:
      "NIS2, AI Act, DORA, CRA, DSGVO, CSRD, BaFG, HSchG – alle EU-Compliance-Pflichten übersichtlich aufbereitet.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EU Compliance Hub",
  url: BASE_URL,
  description:
    "Europäische Regulierungen klar erklärt. NISG 2026, EU AI Act, DORA, CRA, DSGVO, CSRD, BaFG, HSchG – für KMUs und Konzerne.",
  inLanguage: "de",
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <div id="main-content">{children}</div>
        <CookieConsent />
        <AdBlockOverlay />
      </body>
    </html>
  );
}
