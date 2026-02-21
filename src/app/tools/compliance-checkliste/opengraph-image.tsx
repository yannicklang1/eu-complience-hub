import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Compliance-Checkliste";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "EU Compliance-Checkliste",
    subtitle: "Prüfen Sie Punkt für Punkt, welche EU-Regulierungen Ihr Unternehmen betreffen",
    accentColor: "#FACC15",
    tags: ["NIS2", "AI Act", "DORA", "DSGVO", "CRA", "CSRD"],
  });
}
