"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * Consolidation reason: the standalone EN implementation was a separate
 * parallel codebase that would diverge from tool updates. Route all
 * locales through the canonical source of truth.
 */

export { default } from "./NIS2CheckTool";
