import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Kontakt – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Kontakt",
    subtitle: "Compliance-Beratung anfragen – Kostenlose Ersteinschätzung für Ihr Unternehmen",
    accentColor: "#FACC15",
    tags: ["Beratung", "Ersteinschätzung", "EU-Compliance"],
  });
}
