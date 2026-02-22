import { generateOgImage, ogSize } from "@/lib/og-image";

export const alt = "Bußgeld-Rechner – EU Compliance Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return generateOgImage({
    title: "Bußgeld-Rechner",
    subtitle: "Berechnen Sie potenzielle Strafzahlungen bei Verstößen gegen EU-Regulierungen.",
    accentColor: "#f59e0b",
    tags: ["DSGVO", "NIS2", "AI Act", "DORA", "CRA"],
  });
}
