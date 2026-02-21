import type { MetadataRoute } from "next";
import { getAllBranchenGesetzParams } from "@/data/branchenData";
import { getAllComparisonSlugs } from "@/data/softwareData";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Branchen × Regulierung pages (dynamic) ── */
  const branchenPages: MetadataRoute.Sitemap = getAllBranchenGesetzParams().map(
    ({ branche, gesetz }) => ({
      url: `${BASE_URL}/branchen/${branche}/${gesetz}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  /* ── Software comparison pages (dynamic) ── */
  const comparisonPages: MetadataRoute.Sitemap = getAllComparisonSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    /* ── Guide Pages ── */
    {
      url: `${BASE_URL}/eu-ai-act`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/nisg-2026`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dora`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cra`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dsgvo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/csrd-esg`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bafg`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hschg`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/haftungs-check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/green-claims`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/mica`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/produkthaftung`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/digitaler-produktpass`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/dsa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/ehds`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/data-act`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/eprivacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/eidas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    /* ── Tools Hub ── */
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    /* ── Interactive Tools ── */
    {
      url: `${BASE_URL}/tools/nis2-betroffenheits-check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/haftungs-pruefer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tools/bussgeld-rechner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tools/compliance-checkliste`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/regulierung-finder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/kosten-kalkulator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tools/reifegrad-check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    /* ── Wissen Hub ── */
    {
      url: `${BASE_URL}/wissen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    /* ── Branchen Hub ── */
    {
      url: `${BASE_URL}/branchen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    /* ── Branchen × Regulierung Landingpages ── */
    ...branchenPages,
    /* ── Software Comparison Pages ── */
    ...comparisonPages,
    /* ── Glossar ── */
    {
      url: `${BASE_URL}/glossar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    /* ── Reference ── */
    {
      url: `${BASE_URL}/quellen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/compliance-verzeichnis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fristen-radar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/timeline`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    /* ── Aktuelles ── */
    {
      url: `${BASE_URL}/aktuelles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    /* ── Vergleich ── */
    {
      url: `${BASE_URL}/vergleich`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    /* ── FAQ ── */
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    /* ── Kontakt ── */
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    /* ── About ── */
    {
      url: `${BASE_URL}/ueber-uns`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    /* ── Legal Pages ── */
    {
      url: `${BASE_URL}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/haftungsausschluss`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
