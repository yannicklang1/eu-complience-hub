import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Digital Services Act";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Digital Services Act",
    subtitle: "EU-Verordnung für sichere digitale Dienste und Plattformen",
    accentColor: "#7C3AED",
    tags: ["Plattformen", "Inhaltsmoderation", "Transparenz", "Seit Feb 2024"],
  });
}
