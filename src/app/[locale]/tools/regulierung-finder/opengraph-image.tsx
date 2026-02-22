import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "EU Regulierung-Finder";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Regulierung-Finder",
    subtitle: "Finden Sie heraus, welche EU-Regulierungen für Ihr Unternehmen relevant sind",
    accentColor: "#FACC15",
    tags: ["NIS2", "DSGVO", "AI Act", "DORA", "CRA", "CSRD"],
  });
}
