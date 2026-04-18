"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * The standalone EN implementation lacked the "Top 5 offene Baustellen"
 * panel that prioritises open items by regulation enforcement urgency
 * (NIS2 → DSGVO → AI Act → CRA → DORA → CSRD). Without it, EN users
 * had to scroll and self-identify which unchecked items matter most.
 */

export { default } from "./ChecklistTool";
