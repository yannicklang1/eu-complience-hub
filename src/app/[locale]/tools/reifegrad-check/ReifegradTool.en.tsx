"use client";

/**
 * EN locale variant — thin re-export of the canonical DE component.
 *
 * The standalone EN implementation lacked the Priority-Actions section
 * (concrete to-do list built from the lowest-rated answers with effort
 * estimates and guide links). Without it, EN users received only a
 * generic grade with no next-step guidance.
 */

export { default } from "./ReifegradTool";
