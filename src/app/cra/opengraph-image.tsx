import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Cyber Resilience Act";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Cyber Resilience Act",
    subtitle: "EU-Verordnung für Cybersicherheit digitaler Produkte",
    accentColor: "#EF4444",
    tags: ["IoT-Sicherheit", "CE-Kennzeichnung", "Software-Updates", "Ab Sep 2026"],
  });
}
