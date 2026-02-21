import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "eIDAS 2.0";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "eIDAS 2.0",
    subtitle: "EU-Verordnung für digitale Identität und Vertrauensdienste",
    accentColor: "#0284C7",
    tags: ["Digitale Identität", "EU-Wallet", "Vertrauensdienste", "Ab 2026"],
  });
}
