import { generateOgImage, ogSize } from "@/lib/og-image";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Regulierungsvergleich",
    subtitle: "EU-Regulierungen Seite an Seite vergleichen",
    accentColor: "#FACC15",
    tags: ["NIS2", "AI Act", "DORA", "DSGVO", "CRA", "CSRD"],
  });
}
