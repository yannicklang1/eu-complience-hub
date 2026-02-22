import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Green Claims Directive";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Green Claims Directive",
    subtitle: "EU-Richtlinie gegen Greenwashing – Belegpflicht für Umweltaussagen",
    accentColor: "#16A34A",
    tags: ["Greenwashing", "Umweltaussagen", "Belegpflicht", "Entwurf"],
  });
}
