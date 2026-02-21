import { generateOgImage, ogSize } from "@/lib/og-image";

export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Aktuelles",
    subtitle: "EU-Compliance News & Regulierungsupdates",
    accentColor: "#FACC15",
    tags: ["NIS2", "AI Act", "DORA", "CRA", "CSRD"],
  });
}
