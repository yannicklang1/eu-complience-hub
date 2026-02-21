import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "CSRD & ESG";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "CSRD & ESG",
    subtitle: "Nachhaltigkeitsberichterstattung nach europäischen Standards",
    accentColor: "#22C55E",
    tags: ["Nachhaltigkeit", "ESG-Reporting", "ESRS-Standards", "Ab Jan 2025"],
  });
}
