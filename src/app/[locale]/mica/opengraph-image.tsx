import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "MiCA";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "MiCA",
    subtitle: "Markets in Crypto-Assets – EU-Regulierung für Krypto-Märkte",
    accentColor: "#6366F1",
    tags: ["Krypto-Assets", "Stablecoins", "Lizenzpflicht", "Seit Jun 2024"],
  });
}
