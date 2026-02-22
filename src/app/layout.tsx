import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

/* ── Self-hosted Google Fonts via next/font (automatic subsetting + no CLS) ── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

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
      urlTemplate: `${BASE_URL}/wissen?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ── JSON-LD Organization (Knowledge Panel) ── */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EU Compliance Hub",
  url: BASE_URL,
  description:
    "Europäische Regulierungen klar erklärt — NISG 2026, EU AI Act, DORA, CRA, DSGVO, CSRD, BaFG, HSchG. Für KMUs und Konzerne in Österreich und der EU.",
  foundingDate: "2026",
  areaServed: [
    { "@type": "Country", name: "AT" },
    { "@type": "Country", name: "DE" },
    { "@type": "Country", name: "CH" },
  ],
  knowsAbout: [
    "EU Compliance",
    "NIS2",
    "DORA",
    "EU AI Act",
    "CRA",
    "DSGVO",
    "CSRD",
    "BaFG",
    "HSchG",
    "Cybersecurity Regulation",
  ],
};

/* ── JSON-LD SiteNavigationElement (Rich Sitelinks) ── */
const siteNavJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "NISG 2026", url: `${BASE_URL}/nisg-2026` },
    { "@type": "SiteNavigationElement", position: 2, name: "EU AI Act", url: `${BASE_URL}/eu-ai-act` },
    { "@type": "SiteNavigationElement", position: 3, name: "DORA", url: `${BASE_URL}/dora` },
    { "@type": "SiteNavigationElement", position: 4, name: "CRA", url: `${BASE_URL}/cra` },
    { "@type": "SiteNavigationElement", position: 5, name: "DSGVO", url: `${BASE_URL}/dsgvo` },
    { "@type": "SiteNavigationElement", position: 6, name: "Compliance-Tools", url: `${BASE_URL}/tools` },
    { "@type": "SiteNavigationElement", position: 7, name: "Aktuelles", url: `${BASE_URL}/aktuelles` },
    { "@type": "SiteNavigationElement", position: 8, name: "FAQ", url: `${BASE_URL}/faq` },
    { "@type": "SiteNavigationElement", position: 9, name: "Kontakt", url: `${BASE_URL}/kontakt` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`scroll-smooth ${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {/* DNS-prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
