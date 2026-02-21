import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Wissen – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Compliance-Wissenszentrum",
    subtitle: "18 EU-Regulierungen, interaktive Tools, Glossar und Branchen-Guides",
    accentColor: "#FACC15",
    tags: ["NIS2", "AI Act", "DORA", "DSGVO", "CRA", "CSRD"],
  });
}
