import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Produkthaftungsrichtlinie";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Produkthaftungsrichtlinie",
    subtitle: "Neue EU-Produkthaftung – Erweitert auf Software und KI",
    accentColor: "#DC2626",
    tags: ["Produkthaftung", "Software", "KI-Systeme", "Ab Dez 2026"],
  });
}
