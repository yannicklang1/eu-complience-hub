import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Compliance-Report – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Compliance-Report",
    subtitle: "Kostenlose Analyse für Ihr Unternehmen — Regulierungen, Kosten, Reifegrad",
    accentColor: "#FACC15",
    tags: ["PDF-Report", "Analyse", "EU-Compliance"],
  });
}
