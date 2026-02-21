import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "NISG 2026";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "NISG 2026",
    subtitle: "NIS2-Umsetzung in Österreich – Cybersecurity-Pflichten für Unternehmen",
    accentColor: "#3B82F6",
    tags: ["Cybersecurity", "Meldepflicht", "Risikomanagement", "Ab Okt 2025"],
  });
}
