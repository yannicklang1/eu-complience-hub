import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Digitaler Produktpass";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Digitaler Produktpass",
    subtitle: "EU-Verordnung für Produkttransparenz und Kreislaufwirtschaft",
    accentColor: "#0EA5E9",
    tags: ["Kreislaufwirtschaft", "Produktdaten", "QR-Code", "Ab 2027"],
  });
}
