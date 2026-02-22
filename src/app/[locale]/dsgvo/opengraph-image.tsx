import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "DSGVO";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "DSGVO",
    subtitle: "Datenschutz-Grundverordnung – Der EU-Datenschutzstandard",
    accentColor: "#10B981",
    tags: ["Datenschutz", "Betroffenenrechte", "DPO-Pflicht", "Seit Mai 2018"],
  });
}
