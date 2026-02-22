"use client";

/**
 * Sets the `<html lang>` attribute client-side based on the active locale.
 *
 * Why: The root layout (`app/layout.tsx`) cannot access `[locale]` params,
 * so `<html lang>` defaults to "de". This component — mounted in
 * `[locale]/layout.tsx` — updates the attribute after hydration so that:
 *   - CSS `hyphens: auto` uses the correct language dictionary
 *   - Screen readers pick the right pronunciation rules
 *   - Accessibility audits see the proper lang tag
 */

import { useEffect } from "react";

export default function HtmlLangSetter({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
