import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Compliance-Reifegrad-Check";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Reifegrad-Check",
    subtitle: "Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens in 5 Kategorien",
    accentColor: "#6366f1",
    tags: ["Governance", "Datenschutz", "Cybersicherheit", "KI", "Reporting"],
  });
}
