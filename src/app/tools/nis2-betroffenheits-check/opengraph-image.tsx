import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "NIS2-Betroffenheits-Check – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "NIS2-Betroffenheits-Check",
    subtitle: "Prüfen Sie in wenigen Schritten, ob Ihr Unternehmen von NIS2 betroffen ist.",
    accentColor: "#3b82f6",
    tags: ["NIS2", "NISG 2026", "Cybersicherheit", "Kritische Infrastruktur"],
  });
}
