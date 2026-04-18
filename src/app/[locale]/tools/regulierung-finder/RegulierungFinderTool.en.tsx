"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * The standalone EN implementation lacked the urgency-bucket grouping
 * in results ("Jetzt dran" / "Dieses Jahr" / "Mittelfristig" / "In
 * Kraft"). Without it, EN users got a flat relevance list with no
 * priority signal.
 */

export { default } from "./RegulierungFinderTool";
