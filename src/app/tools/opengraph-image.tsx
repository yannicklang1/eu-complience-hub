import { generateOgImage, ogSize } from "@/lib/og-image";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Compliance-Tools",
    subtitle: "Kostenlose interaktive Werkzeuge für Ihre EU-Compliance",
    accentColor: "#FACC15",
    tags: ["Regulierung-Finder", "NIS2-Check", "Kosten-Kalkulator", "Reifegrad-Check"],
  });
}
