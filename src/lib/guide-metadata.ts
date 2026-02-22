import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";

/* ─────────────────────────────────────────────────────────────
   Guide metadata helper
   Generates locale-aware Metadata + hreflang alternates for all
   guide pages (18 regulation guides).
   ───────────────────────────────────────────────────────────── */

export interface GuideMetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

export type GuideMetaMap = Record<Locale, GuideMetaStrings>;

/**
 * Generate a locale-aware Metadata object for a guide page.
 * @param slug   Route slug, e.g. "nisg-2026"
 * @param locale Current locale from params
 * @param meta   Map of locale → GuideMetaStrings
 */
export function buildGuideMetadata(
  slug: string,
  locale: string,
  meta: Partial<GuideMetaMap>,
): Metadata {
  const loc = locale as Locale;
  const m = meta[loc] ?? meta.de!;

  const canonical = `${BASE_URL}/${locale}/${slug}`;

  /* Hreflang alternates for all locales + x-default */
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
      alternateLocale: LOCALES.filter((l) => l !== loc).map(
        (l) => LOCALE_OG[l],
      ),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/**
 * Generate a locale-aware Article JSON-LD for a guide page.
 */
export function buildArticleJsonLd(
  slug: string,
  locale: string,
  meta: Partial<GuideMetaMap>,
  opts: {
    datePublished: string;
    dateModified: string;
    legislationName?: string;
    legislationId?: string;
  },
) {
  const loc = locale as Locale;
  const m = meta[loc] ?? meta.de!;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: m.title,
    description: m.description,
    url: `${BASE_URL}/${locale}/${slug}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/${slug}`,
    },
    ...(opts.legislationName && {
      about: {
        "@type": "Legislation",
        name: opts.legislationName,
        ...(opts.legislationId && {
          legislationIdentifier: opts.legislationId,
        }),
      },
    }),
  };
}

/**
 * Generate a locale-aware Breadcrumb JSON-LD for a guide page.
 */
export function buildBreadcrumbJsonLd(
  slug: string,
  locale: string,
  guideName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "EU Compliance Hub",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: guideName,
        item: `${BASE_URL}/${locale}/${slug}`,
      },
    ],
  };
}

/**
 * FAQ JSON-LD with locale-aware questions.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
