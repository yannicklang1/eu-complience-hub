/* ══════════════════════════════════════════════════════════════
   Portal Layout — Authenticated user shell
   Auth guard is handled by middleware.ts (redirects to /auth/login)
   ══════════════════════════════════════════════════════════════ */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mein Portal – EU Compliance Hub",
  description: "Verwalten Sie Ihre Compliance-Reports und Ihr Konto.",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
