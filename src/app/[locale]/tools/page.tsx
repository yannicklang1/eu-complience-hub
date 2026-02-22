import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ToolsHubContent from "./ToolsHubContent";

const ToolsHubContentEN = dynamic(() => import("./ToolsHubContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType> = {
  en: ToolsHubContentEN,
};

function getToolsContent(locale: string) {
  return CONTENT_MAP[locale] ?? ToolsHubContent;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

interface MetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

const META: Partial<Record<Locale, MetaStrings>> = {
  de: {
    title: "Compliance-Tools \u2013 Kostenlose interaktive Werkzeuge",
    description:
      "Kostenlose EU-Compliance-Tools: Regulierung-Finder, NIS2-Check, Compliance-Checkliste, Bu\u00dfgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check und mehr. Sofort nutzbar, keine Registrierung.",
    ogDescription:
      "Kostenlose EU-Compliance-Tools: Sofort nutzbar, keine Registrierung n\u00f6tig.",
    keywords:
      "Compliance Tools, NIS2 Check, Regulierung Finder, Compliance Checkliste, Bu\u00dfgeld Rechner, Kosten Kalkulator, Reifegrad Check, Haftungs Pr\u00fcfer, EU Compliance, kostenlos",
  },
  en: {
    title: "Compliance Tools \u2013 Free Interactive Tools",
    description:
      "Free EU compliance tools: Regulation Finder, NIS2 Check, Compliance Checklist, Fine Calculator, Cost Calculator, Maturity Check and more. Available instantly, no registration.",
    ogDescription:
      "Free EU compliance tools: Available instantly, no registration required.",
    keywords:
      "compliance tools, NIS2 check, regulation finder, compliance checklist, fine calculator, cost calculator, maturity check, liability checker, EU compliance, free",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "tools";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* -- Per-locale JSON-LD -- */

function buildJsonLd(locale: string) {
  const isEn = locale === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/${locale}/tools` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isEn
      ? [
          {
            "@type": "Question",
            name: "Are the EU compliance tools free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all tools on EU Compliance Hub are completely free and available instantly — without registration or sign-up. All calculations are performed locally in your browser.",
            },
          },
          {
            "@type": "Question",
            name: "How accurate are the results of the compliance tools?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our tools provide a qualified initial assessment based on current EU regulations. They do not replace individual legal advice, but offer a solid orientation for further compliance planning.",
            },
          },
          {
            "@type": "Question",
            name: "Which tool should I use first?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with the Regulation Finder to determine which EU regulations are relevant for your company. We then recommend the NIS2 Applicability Check and the Compliance Checklist for a detailed analysis.",
            },
          },
          {
            "@type": "Question",
            name: "Is my data stored or shared with third parties?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. All calculations and analyses of our interactive tools are performed exclusively locally in your browser. No personal data is transmitted to or stored on servers.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "Sind die EU-Compliance-Tools kostenlos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, alle Tools auf dem EU Compliance Hub sind vollst\u00e4ndig kostenlos und sofort nutzbar \u2014 ohne Registrierung oder Anmeldung. Die Berechnungen erfolgen lokal in Ihrem Browser.",
            },
          },
          {
            "@type": "Question",
            name: "Wie genau sind die Ergebnisse der Compliance-Tools?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unsere Tools liefern eine qualifizierte Ersteinsch\u00e4tzung auf Basis aktueller EU-Regulierungen. Sie ersetzen keine individuelle Rechtsberatung, bieten aber eine fundierte Orientierung f\u00fcr die weitere Compliance-Planung.",
            },
          },
          {
            "@type": "Question",
            name: "Welches Tool sollte ich zuerst verwenden?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Starten Sie mit dem Regulierung-Finder, um herauszufinden, welche EU-Regulierungen f\u00fcr Ihr Unternehmen relevant sind. Danach empfehlen wir den NIS2-Betroffenheits-Check und die Compliance-Checkliste f\u00fcr eine detaillierte Analyse.",
            },
          },
          {
            "@type": "Question",
            name: "Werden meine Daten gespeichert oder an Dritte weitergegeben?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Alle Berechnungen und Analysen unserer interaktiven Tools erfolgen ausschlie\u00dflich lokal in Ihrem Browser. Es werden keine personenbezogenen Daten an Server \u00fcbermittelt oder gespeichert.",
            },
          },
        ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEn ? "EU Compliance Tools" : "EU Compliance Tools",
    url: `${BASE_URL}/${locale}/tools`,
    description: isEn
      ? "Collection of free interactive EU compliance tools for companies. Regulation Finder, NIS2 Check, Fine Calculator and more."
      : "Sammlung kostenloser interaktiver EU-Compliance-Tools f\u00fcr Unternehmen. Regulierung-Finder, NIS2-Check, Bu\u00dfgeld-Rechner und mehr.",
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Regulation Finder" : "Regulierung-Finder",
          url: `${BASE_URL}/${locale}/tools/regulierung-finder`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEn ? "NIS2 Applicability Check" : "NIS2-Betroffenheits-Check",
          url: `${BASE_URL}/${locale}/tools/nis2-betroffenheits-check`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: isEn ? "Compliance Checklist" : "Compliance-Checkliste",
          url: `${BASE_URL}/${locale}/tools/compliance-checkliste`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: isEn ? "Director Liability Check" : "Haftungs-Pr\u00fcfer",
          url: `${BASE_URL}/${locale}/tools/haftungs-pruefer`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: isEn ? "Fine Calculator" : "Bu\u00dfgeld-Rechner",
          url: `${BASE_URL}/${locale}/tools/bussgeld-rechner`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: isEn ? "Cost Calculator" : "Kosten-Kalkulator",
          url: `${BASE_URL}/${locale}/tools/kosten-kalkulator`,
        },
        {
          "@type": "ListItem",
          position: 7,
          name: isEn ? "Maturity Check" : "Reifegrad-Check",
          url: `${BASE_URL}/${locale}/tools/reifegrad-check`,
        },
      ],
    },
  };

  return { breadcrumbJsonLd, faqJsonLd, collectionJsonLd };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getToolsContent(locale);
  const { breadcrumbJsonLd, faqJsonLd, collectionJsonLd } = buildJsonLd(locale);

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
      <Content />
    </>
  );
}
