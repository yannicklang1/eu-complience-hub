import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EU Compliance Hub – Europäische Regulierungen. Klar erklärt.",
    short_name: "EU Compliance Hub",
    description:
      "NISG 2026, EU AI Act, DORA, CRA, DSGVO, CSRD, BaFG, HSchG – alle EU-Compliance-Pflichten übersichtlich aufbereitet.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#060c1a",
    theme_color: "#FACC15",
    categories: ["business", "productivity", "education"],
    lang: "de",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
