import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "HSchG";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "HSchG",
    subtitle: "Hinweisgeberschutzgesetz – Whistleblower-Schutz in Österreich",
    accentColor: "#F97316",
    tags: ["Whistleblower", "Meldekanäle", "Hinweisgeberschutz", "Seit Feb 2023"],
  });
}
