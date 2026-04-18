"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * The standalone EN implementation pre-dated the severity selector,
 * precedent cases, and realistic-vs-theoretical-maximum dual-card
 * output. Routing all locales through the canonical component keeps
 * parity and avoids misleading fine sums for EN users.
 */

export { default } from "./BussgeldRechnerTool";
