import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "ePrivacy-Verordnung";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "ePrivacy-Verordnung",
    subtitle: "EU-Verordnung zum Schutz der elektronischen Kommunikation",
    accentColor: "#059669",
    tags: ["E-Privacy", "Cookies", "Kommunikation", "Entwurf"],
  });
}
