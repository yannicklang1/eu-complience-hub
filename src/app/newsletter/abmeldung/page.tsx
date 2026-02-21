import type { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import UnsubscribeClient from "./UnsubscribeClient";

export const metadata: Metadata = {
  title: `Abmeldung – ${SITE_NAME}`,
  description: "Abmeldung vom Compliance-Briefing des EU Compliance Hub.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${BASE_URL}/newsletter/abmeldung` },
};

export default function AbmeldungPage() {
  return (
    <main className="min-h-screen bg-[#060c1a] flex items-center justify-center px-4 py-20">
      <UnsubscribeClient />
    </main>
  );
}
