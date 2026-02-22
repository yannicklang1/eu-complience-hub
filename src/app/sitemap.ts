import type { MetadataRoute } from "next";
import { getAllBranchenGesetzParams } from "@/data/branchenData";
import { getAllComparisonSlugs } from "@/data/softwareData";
import { BASE_URL } from "@/lib/constants";
import { LOCALES } from "@/i18n/config";

/* ── Helper: build one sitemap entry with hreflang alternates ── */
function localeEntry(
  slug: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  now: Date
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const path = slug ? `/${locale}/${slug}` : `/${locale}`;
    languages[locale] = `${BASE_URL}${path}`;
  }
  // x-default points to the German (default) version
  languages["x-default"] = slug
    ? `${BASE_URL}/de/${slug}`
    : `${BASE_URL}/de`;

  return {
    url: slug ? `${BASE_URL}/de/${slug}` : `${BASE_URL}/de`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Branchen × Regulierung pages (dynamic, one per locale) ── */
  const branchenPages: MetadataRoute.Sitemap = getAllBranchenGesetzParams().flatMap(
    ({ branche, gesetz }) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/branchen/${branche}/${gesetz}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries([
            ...LOCALES.map((l) => [
              l,
              `${BASE_URL}/${l}/branchen/${branche}/${gesetz}`,
            ]),
            ["x-default", `${BASE_URL}/de/branchen/${branche}/${gesetz}`],
          ]),
        },
      }))
  );

  /* ── Software comparison pages (dynamic, DE only — not translated) ── */
  const comparisonPages: MetadataRoute.Sitemap = getAllComparisonSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/de/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          de: `${BASE_URL}/de/tools/${slug}`,
          "x-default": `${BASE_URL}/de/tools/${slug}`,
        },
      },
    })
  );

  return [
    /* ── Homepage ── */
    localeEntry("", 1.0, "weekly", now),

    /* ── Guide Pages ── */
    localeEntry("eu-ai-act", 0.9, "monthly", now),
    localeEntry("nisg-2026", 0.8, "monthly", now),
    localeEntry("dora", 0.8, "monthly", now),
    localeEntry("cra", 0.8, "monthly", now),
    localeEntry("dsgvo", 0.9, "monthly", now),
    localeEntry("csrd-esg", 0.8, "monthly", now),
    localeEntry("bafg", 0.8, "monthly", now),
    localeEntry("hschg", 0.8, "monthly", now),
    localeEntry("haftungs-check", 0.85, "monthly", now),
    localeEntry("green-claims", 0.85, "monthly", now),
    localeEntry("mica", 0.9, "monthly", now),
    localeEntry("produkthaftung", 0.85, "monthly", now),
    localeEntry("digitaler-produktpass", 0.85, "monthly", now),
    localeEntry("dsa", 0.85, "monthly", now),
    localeEntry("ehds", 0.8, "monthly", now),
    localeEntry("data-act", 0.85, "monthly", now),
    localeEntry("eprivacy", 0.85, "monthly", now),
    localeEntry("eidas", 0.8, "monthly", now),

    /* ── Tools Hub ── */
    localeEntry("tools", 0.9, "weekly", now),

    /* ── Interactive Tools ── */
    localeEntry("tools/nis2-betroffenheits-check", 0.9, "monthly", now),
    localeEntry("tools/haftungs-pruefer", 0.85, "monthly", now),
    localeEntry("tools/bussgeld-rechner", 0.85, "monthly", now),
    localeEntry("tools/compliance-checkliste", 0.9, "monthly", now),
    localeEntry("tools/regulierung-finder", 0.9, "monthly", now),
    localeEntry("tools/kosten-kalkulator", 0.85, "monthly", now),
    localeEntry("tools/reifegrad-check", 0.85, "monthly", now),

    /* ── Wissen Hub ── */
    localeEntry("wissen", 0.9, "weekly", now),

    /* ── Branchen Hub ── */
    localeEntry("branchen", 0.85, "weekly", now),

    /* ── Branchen × Regulierung Landingpages ── */
    ...branchenPages,

    /* ── Software Comparison Pages ── */
    ...comparisonPages,

    /* ── Glossar ── */
    localeEntry("glossar", 0.85, "monthly", now),

    /* ── Reference ── */
    localeEntry("quellen", 0.75, "monthly", now),
    localeEntry("compliance-verzeichnis", 0.7, "monthly", now),
    localeEntry("fristen-radar", 0.9, "weekly", now),
    localeEntry("timeline", 0.8, "monthly", now),

    /* ── Aktuelles ── */
    localeEntry("aktuelles", 0.85, "weekly", now),

    /* ── Vergleich ── */
    localeEntry("vergleich", 0.85, "monthly", now),

    /* ── FAQ ── */
    localeEntry("faq", 0.85, "monthly", now),

    /* ── Kontakt ── */
    localeEntry("kontakt", 0.8, "monthly", now),

    /* ── About ── */
    localeEntry("ueber-uns", 0.6, "monthly", now),

    /* ── Legal Pages ── */
    localeEntry("impressum", 0.3, "yearly", now),
    localeEntry("datenschutz", 0.3, "yearly", now),
    localeEntry("haftungsausschluss", 0.3, "yearly", now),
  ];
}
