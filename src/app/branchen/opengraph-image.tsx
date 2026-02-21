import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Branchen-Compliance – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Branchen-Compliance",
    subtitle: "EU-Regulierungen nach Branche gefiltert — von IT über Gesundheit bis Finanzwesen.",
    accentColor: "#059669",
    tags: ["IT & Software", "Gesundheitswesen", "Finanzwesen", "Industrie"],
  });
}
