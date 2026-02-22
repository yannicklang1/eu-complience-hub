import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "BaFG";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "BaFG",
    subtitle: "Barrierefreiheitsgesetz – Digitale Zugänglichkeit für alle",
    accentColor: "#F59E0B",
    tags: ["Barrierefreiheit", "WCAG 2.1", "Digitale Dienste", "Ab Jun 2025"],
  });
}
