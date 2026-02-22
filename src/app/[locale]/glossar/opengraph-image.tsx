import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Compliance-Glossar";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Compliance-Glossar",
    subtitle: "Über 45 Fachbegriffe aus EU-Compliance, Datenschutz und Cybersecurity erklärt",
    accentColor: "#8b5cf6",
    tags: ["Fachbegriffe", "Nachschlagewerk", "EU-Regulierung"],
  });
}
