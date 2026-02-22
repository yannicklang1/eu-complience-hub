import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "EU AI Act";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "EU AI Act",
    subtitle: "Die KI-Verordnung der EU – Risikobasierte Regulierung von KI-Systemen",
    accentColor: "#8B5CF6",
    tags: ["Künstliche Intelligenz", "Risikoklassen", "CE-Kennzeichnung", "Ab Feb 2025"],
  });
}
