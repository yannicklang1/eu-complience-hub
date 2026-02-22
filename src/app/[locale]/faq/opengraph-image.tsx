import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "FAQ – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Häufige Fragen (FAQ)",
    subtitle: "Antworten auf die wichtigsten Fragen zu EU-Regulierungen",
    accentColor: "#6366f1",
    tags: ["DSGVO", "NIS2", "AI Act", "DORA", "CRA"],
  });
}
