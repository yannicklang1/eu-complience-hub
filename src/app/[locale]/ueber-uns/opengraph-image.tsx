import { generateOgImage, ogSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Über uns – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return generateOgImage({
    title: "Über uns",
    subtitle: "Mission, Werte und das Team hinter dem EU Compliance Hub",
    accentColor: "#FACC15",
    tags: ["Mission", "Werte", "Team"],
  });
}
