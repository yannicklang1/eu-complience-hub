"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Granular cookie consent hook compliant with:
 * - DSGVO Art. 6/7 (consent requirements)
 * - TDDDG §25 / TKG 2021 §165 (cookie storage access)
 * - ePrivacy Directive Art. 5(3)
 *
 * Categories:
 * - necessary: Always on, no consent required (§165 Abs. 3 TKG 2021)
 * - analytics: Website usage statistics (e.g. Google Analytics)
 * - marketing: Advertising & personalization (e.g. Google Ads)
 */

export interface CookieCategories {
  necessary: true; // Always true, cannot be toggled off
  analytics: boolean;
  marketing: boolean;
}

export type ConsentState = CookieCategories | null;

const STORAGE_KEY = "eu-compliance-hub-cookie-consent-v2";
const LEGACY_KEY = "eu-compliance-hub-cookie-consent";

const DEFAULT_CATEGORIES: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function migrateV1(): CookieCategories | null {
  try {
    const v1 = localStorage.getItem(LEGACY_KEY);
    if (!v1) return null;

    // Migrate old format
    const migrated: CookieCategories =
      v1 === "all"
        ? { necessary: true, analytics: true, marketing: true }
        : { necessary: true, analytics: false, marketing: false };

    // Store in new format and clean up
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    localStorage.removeItem(LEGACY_KEY);
    return migrated;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      // Try V2 format first
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieCategories;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent({ ...parsed, necessary: true });
        setLoaded(true);
        return;
      }

      // Try migrating V1
      const migrated = migrateV1();
      if (migrated) {
        setConsent(migrated);
        setLoaded(true);
        return;
      }
    } catch {
      // localStorage unavailable
    }
    setLoaded(true);
  }, []);

  const saveConsent = useCallback((categories: CookieCategories) => {
    const safe = { ...categories, necessary: true as const };
    setConsent(safe);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch {}
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const acceptNecessary = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }, [saveConsent]);

  const acceptCustom = useCallback(
    (categories: Partial<CookieCategories>) => {
      saveConsent({
        ...DEFAULT_CATEGORIES,
        ...categories,
        necessary: true,
      });
    },
    [saveConsent],
  );

  const reset = useCallback(() => {
    setConsent(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    /** Current consent categories or null (not yet decided) */
    consent,
    /** Whether consent state has been loaded from storage */
    loaded,
    /** Accept all cookie categories */
    acceptAll,
    /** Accept only necessary cookies */
    acceptNecessary,
    /** Accept custom selection of categories */
    acceptCustom,
    /** Reset consent — show banner again */
    reset,
    /** Convenience: true when analytics cookies may be set */
    analyticsAllowed: consent?.analytics === true,
    /** Convenience: true when marketing/ads cookies may be set */
    marketingAllowed: consent?.marketing === true,
    /** Whether any consent has been given (banner was interacted with) */
    hasDecided: consent !== null,
  };
}
