import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Quellen – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Quellenverzeichnis",
    subtitle: "Alle Quellen, Rechtsgrundlagen und offiziellen Dokumente unserer Compliance-Inhalte.",
    accentColor: "#64748b",
    tags: ["EUR-Lex", "Amtsblatt", "RIS", "Bundesgesetzblatt"],
  });
}
