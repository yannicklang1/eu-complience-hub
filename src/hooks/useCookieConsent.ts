"use client";

import { useState, useEffect, useCallback } from "react";

export type ConsentLevel = "all" | "necessary" | null;

const STORAGE_KEY = "eu-compliance-hub-cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "all" || stored === "necessary") {
        setConsent(stored);
      }
    } catch {
      // localStorage unavailable (private browsing etc.)
    }
    setLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent("all");
    try { localStorage.setItem(STORAGE_KEY, "all"); } catch {}
  }, []);

  const acceptNecessary = useCallback(() => {
    setConsent("necessary");
    try { localStorage.setItem(STORAGE_KEY, "necessary"); } catch {}
  }, []);

  const reset = useCallback(() => {
    setConsent(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return {
    /** Current consent level: "all", "necessary", or null (not yet decided) */
    consent,
    /** Whether the consent state has been loaded from storage */
    loaded,
    /** User accepts all cookies (including analytics/ads) */
    acceptAll,
    /** User accepts only technically necessary cookies */
    acceptNecessary,
    /** Reset consent (e.g. for settings page) */
    reset,
    /** Convenience: true when analytics/ads scripts may run */
    analyticsAllowed: consent === "all",
  };
}
