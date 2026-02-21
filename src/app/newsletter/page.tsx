import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Old /newsletter route — permanently redirects to /fristen-radar.
 * This preserves any existing bookmarks or links.
 */
export default function NewsletterRedirect() {
  redirect("/fristen-radar");
}
