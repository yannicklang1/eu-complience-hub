"use client";

/**
 * English locale variant of the Compliance-Report wizard.
 *
 * For feature parity, security, and maintenance simplicity, this is a thin
 * re-export of the canonical `KontaktContent` component. The previous
 * standalone EN implementation diverged significantly: it used the old
 * 5-step flow, called /api/report directly (bypassing LemonSqueezy
 * checkout = payment bypass), and was missing 7 personalization fields.
 *
 * All user-visible strings in KontaktContent.tsx can be localized via
 * useTranslations if true EN UI is required later. The generated PDF
 * report is already fully i18n-aware via /api/report route.
 */

export { default } from "./KontaktContent";
