import { redirect } from "next/navigation";

/**
 * Old /newsletter route — permanently redirects to /fristen-radar.
 * This preserves any existing bookmarks or links.
 */
export default function NewsletterRedirect() {
  redirect("/fristen-radar");
}
