"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * Google Analytics 4 — consent-gated.
 * Only loads GA4 script when analytics cookies are accepted.
 *
 * Setup:
 * 1. Create GA4 property at https://analytics.google.com
 * 2. Replace GA_MEASUREMENT_ID with your G-XXXXXXXXXX ID
 */

// TODO: Replace with actual GA4 measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics() {
  const { analyticsAllowed, loaded } = useCookieConsent();

  useEffect(() => {
    if (!loaded || !analyticsAllowed) return;
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return; // Not configured yet

    // Check if already loaded
    if (document.querySelector(`script[src*="gtag"]`)) return;

    // Load gtag.js
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true, // DSGVO-konform: IP-Anonymisierung
      cookie_flags: "SameSite=None;Secure",
    });
  }, [loaded, analyticsAllowed]);

  return null;
}
