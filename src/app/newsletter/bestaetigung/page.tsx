import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ConfirmationClient from "./ConfirmationClient";

export const metadata: Metadata = {
  title: `E-Mail bestätigen – ${SITE_NAME}`,
  description:
    "Bestätigen Sie Ihre E-Mail-Adresse für das Compliance-Briefing des EU Compliance Hub.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${BASE_URL}/newsletter/bestaetigung` },
};

/**
 * /newsletter/bestaetigung?token=xxx
 *
 * Server Component wrapper — metadata + layout.
 * Token verification happens client-side in ConfirmationClient
 * so the page works even with edge caching (no SSR token leakage).
 */
export default function BestaetigungPage() {
  return (
    <main className="min-h-screen bg-[#060c1a] flex items-center justify-center px-4 py-20">
      <ConfirmationClient />
    </main>
  );
}
