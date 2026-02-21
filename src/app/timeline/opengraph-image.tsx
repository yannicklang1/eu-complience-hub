import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Compliance-Timeline – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Compliance-Timeline 2025–2027",
    subtitle: "Chronologische Übersicht aller EU-Compliance-Fristen und Gesetzesänderungen.",
    accentColor: "#3b82f6",
    tags: ["2025", "2026", "2027", "Deadlines"],
  });
}
