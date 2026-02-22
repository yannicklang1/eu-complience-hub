import { BASE_URL } from "@/lib/constants";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";

/* ── Per-locale metadata for layout JSON-LD ── */
const META = {
  de: {
    name: "EU-Regulierungs-Timeline 2024--2030",
    description: "Chronologische Timeline aller EU-Compliance-Fristen von 2024 bis 2030.",
    breadcrumbLabel: "Timeline",
  },
  en: {
    name: "EU Regulatory Timeline 2024--2030",
    description: "Chronological timeline of all EU compliance deadlines from 2024 to 2030.",
    breadcrumbLabel: "Timeline",
  },
} as const;

function getMeta(locale: string) {
  return META[locale as keyof typeof META] ?? META.de;
}

export default async function TimelineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = getMeta(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: m.name,
    description: m.description,
    url: `${BASE_URL}/${locale}/timeline`,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: m.breadcrumbLabel, item: `${BASE_URL}/${locale}/timeline` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
