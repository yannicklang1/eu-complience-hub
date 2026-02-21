"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * Google AdSense integration — consent-gated.
 *
 * Only loads the AdSense script when marketing cookies are accepted.
 * Place this once in layout.tsx or on pages that show ads.
 *
 * Setup required:
 * 1. Sign up at https://www.google.com/adsense/
 * 2. Replace ADSENSE_PUB_ID with your publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 3. Verify site ownership via AdSense dashboard
 *
 * The ad script is loaded dynamically after consent to comply with:
 * - DSGVO Art. 6 Abs. 1 lit. a (consent for advertising cookies)
 * - TKG 2021 §165 (cookie consent required before setting ad cookies)
 */

// TODO: Replace with actual AdSense publisher ID once approved
const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseScript() {
  const { marketingAllowed, loaded } = useCookieConsent();

  useEffect(() => {
    if (!loaded || !marketingAllowed) return;
    if (ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX") return; // Not configured yet

    // Check if script already loaded
    if (document.querySelector(`script[src*="adsbygoogle"]`)) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [loaded, marketingAllowed]);

  return null;
}

/**
 * Individual ad unit component.
 * Place where you want ads to appear.
 *
 * @param slot - Your ad unit slot ID from AdSense dashboard
 * @param format - Ad format: "auto" (responsive), "fluid" (in-feed)
 * @param layout - Layout for fluid ads: "in-article", "in-feed"
 */
export default function AdUnit({
  slot,
  format = "auto",
  layout,
  className = "",
}: {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  layout?: "in-article" | "in-feed";
  className?: string;
}) {
  const { marketingAllowed, loaded } = useCookieConsent();

  useEffect(() => {
    if (!loaded || !marketingAllowed) return;
    if (ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not ready
    }
  }, [loaded, marketingAllowed]);

  // Don't show ads until consent given, or if AdSense not configured
  if (!loaded || !marketingAllowed) return null;
  if (ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX") return null;

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { "data-ad-layout": layout } : {})}
      />
    </div>
  );
}
