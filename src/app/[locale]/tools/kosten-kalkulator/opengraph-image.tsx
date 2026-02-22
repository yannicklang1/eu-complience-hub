import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Compliance-Kosten-Kalkulator";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Kosten-Kalkulator",
    subtitle: "Schätzen Sie die Kosten für EU-Compliance-Umsetzung in Ihrem Unternehmen",
    accentColor: "#FACC15",
    tags: ["NIS2", "DSGVO", "AI Act", "DORA", "CRA", "CSRD"],
  });
}
