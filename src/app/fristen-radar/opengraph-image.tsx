import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Fristen-Radar – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Fristen-Radar",
    subtitle: "Alle EU-Compliance-Deadlines auf einen Blick — nie wieder eine Frist verpassen.",
    accentColor: "#FACC15",
    tags: ["NISG 2026", "AI Act", "DORA", "CRA", "CSRD"],
  });
}
