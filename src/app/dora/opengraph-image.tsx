import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "DORA";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "DORA",
    subtitle: "Digital Operational Resilience Act – IKT-Resilienz im Finanzsektor",
    accentColor: "#06B6D4",
    tags: ["Finanzsektor", "IKT-Risiko", "Resilienz-Tests", "Seit Jan 2025"],
  });
}
