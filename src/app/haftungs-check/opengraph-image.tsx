import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "GF-Haftungs-Check";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "GF-Haftungs-Check",
    subtitle: "Prüfen Sie Ihre persönliche Geschäftsführer-Haftung bei EU-Verstößen",
    accentColor: "#FACC15",
    tags: ["Haftung", "Geschäftsführer", "Compliance-Tool", "Kostenlos"],
  });
}
