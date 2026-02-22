import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import { BASE_URL } from "@/lib/constants";
import TimelineContent from "./TimelineContent";

/* ── Static params for all locales ── */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* ── Per-locale metadata ── */
interface MetaStrings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
}

const META: Record<string, MetaStrings> = {
  de: {
    title: "EU-Regulierungs-Timeline 2024--2030 -- Alle Fristen chronologisch",
    description:
      "Chronologische Timeline aller EU-Compliance-Fristen von 2024 bis 2030. NISG, AI Act, DORA, CRA, CSRD, BaFG, MiCA und mehr -- auf einen Blick.",
    ogTitle: "EU-Regulierungs-Timeline 2024--2030",
    ogDescription:
      "Alle EU-Compliance-Fristen chronologisch von 2024 bis 2030 -- von DORA ueber AI Act bis NISG 2026.",
    keywords:
      "EU Compliance Timeline, Regulierungs-Zeitplan, NIS2 Fristen, AI Act Deadlines, DORA Timeline, EU Regulierungen 2025 2026 2027",
  },
  en: {
    title: "EU Regulatory Timeline 2024--2030 -- All Deadlines Chronologically",
    description:
      "Chronological timeline of all EU compliance deadlines from 2024 to 2030. NIS2, AI Act, DORA, CRA, CSRD, BaFG, MiCA and more -- at a glance.",
    ogTitle: "EU Regulatory Timeline 2024--2030",
    ogDescription:
      "All EU compliance deadlines chronologically from 2024 to 2030 -- from DORA to AI Act to NIS2.",
    keywords:
      "EU Compliance Timeline, regulatory schedule, NIS2 deadlines, AI Act deadlines, DORA timeline, EU regulations 2025 2026 2027",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.de;
  const canonical = `${BASE_URL}/${locale}/timeline`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/timeline`;
  }
  languages["x-default"] = `${BASE_URL}/de/timeline`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[locale as Locale] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_OG[l],
      ),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* ── Page component ── */
export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TimelineContent locale={locale} />;
}
