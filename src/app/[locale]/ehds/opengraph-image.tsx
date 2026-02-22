import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "EHDS";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "EHDS",
    subtitle: "European Health Data Space – EU-Gesundheitsdatenraum",
    accentColor: "#E11D48",
    tags: ["Gesundheitsdaten", "Interoperabilität", "Patientenrechte", "Ab 2026"],
  });
}
