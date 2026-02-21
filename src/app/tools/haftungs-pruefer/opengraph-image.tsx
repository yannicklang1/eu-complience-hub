import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Haftungs-Prüfer – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Haftungs-Prüfer",
    subtitle: "Prüfen Sie Ihr persönliches Haftungsrisiko als Geschäftsführer bei EU-Compliance-Verstößen.",
    accentColor: "#ef4444",
    tags: ["Geschäftsführerhaftung", "NIS2", "AI Act", "DORA"],
  });
}
