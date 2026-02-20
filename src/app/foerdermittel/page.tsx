import type { Metadata } from "next";
import ComingSoonLayout from "@/components/ComingSoonLayout";

export const metadata: Metadata = {
  title: "Fördermittel-Radar – Compliance-Förderungen finden | EU Compliance Hub",
  description:
    "Finden Sie passende Förderungen für Ihre Compliance-Investitionen: AWS, FFG, EU-Programme und Landesförderungen auf einen Blick.",
  keywords:
    "Fördermittel, Compliance-Förderung, AWS, FFG, Digitalisierungsförderung, KMU-Förderung, Cybersecurity-Förderung",
};

export default function FoerdermittelPage() {
  return (
    <ComingSoonLayout
      title="Fördermittel-Radar"
      subtitle="Passende Förderungen für Ihre Compliance-Investitionen finden"
      accent="#06b6d4"
      description="Unser Fördermittel-Radar hilft Ihnen bald dabei, passende Förderungen für Compliance-Investitionen zu finden — von AWS-Zuschüssen über FFG-Programme bis hin zu EU-Fördertöpfen und Landesförderungen."
      expectedDate="Q3 2026"
      heroIcon={
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      }
      teaseItems={[
        { icon: "🔍", label: "Förderungen nach Regulierung filtern" },
        { icon: "🇦🇹", label: "Bundes- und Landesförderungen" },
        { icon: "🇪🇺", label: "EU-Förderprogramme" },
        { icon: "📋", label: "Förder-Checklisten & Anleitungen" },
      ]}
    />
  );
}
