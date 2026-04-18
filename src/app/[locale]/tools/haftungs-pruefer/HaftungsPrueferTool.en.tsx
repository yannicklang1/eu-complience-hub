"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * The standalone EN implementation diverged: old pseudo-score model,
 * missing legal-form question, missing 12 governance/BJR/D&O questions,
 * pre-rewrite output. Rather than maintain two parallel codebases and
 * leave EN users with a degraded tool, we route all locales through
 * the single source of truth.
 *
 * True EN i18n should be introduced via useTranslations keys in the
 * canonical component later.
 */

export { default } from "./HaftungsPrueferTool";
