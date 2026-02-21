import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Data Act";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Data Act",
    subtitle: "EU-Datenverordnung – Faire Datennutzung und Datenzugang",
    accentColor: "#2563EB",
    tags: ["Datenzugang", "IoT-Daten", "Cloud-Wechsel", "Ab Sep 2025"],
  });
}
