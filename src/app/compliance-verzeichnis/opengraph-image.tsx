import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Compliance-Verzeichnis – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Compliance-Verzeichnis",
    subtitle: "Kuratierte Liste von Compliance-Beratern, Auditoren und Software-Anbietern.",
    accentColor: "#7c3aed",
    tags: ["Berater", "Auditoren", "Software", "DACH-Region"],
  });
}
