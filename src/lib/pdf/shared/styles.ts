/* ══════════════════════════════════════════════════════════════
   PDF Shared Styles — Brand Design System for @react-pdf/renderer
   ══════════════════════════════════════════════════════════════ */

import { StyleSheet, Font } from "@react-pdf/renderer";

/* ── Brand Colors ── */
export const COLORS = {
  navy: "#0A2540",
  navyDark: "#060c1a",
  gold: "#FACC15",
  goldDark: "#EAB308",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
} as const;

/* ── Register Fonts ── */
Font.register({
  family: "DMSans",
  fonts: [
    { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHTWEBlw.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2Cp2ywxg089UriASitCBimfzom.ttf", fontWeight: 700 },
  ],
});

Font.register({
  family: "Syne",
  fonts: [
    { src: "https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxp1eXCjOSyFZ8.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxp1ejDTOSyFZ8.ttf", fontWeight: 800 },
  ],
});

/* ── Common Styles ── */
export const styles = StyleSheet.create({
  /* Layout */
  page: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 45,
  },
  pageDark: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.white,
    backgroundColor: COLORS.navy,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 45,
  },

  /* Typography */
  h1: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  h2: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 6,
  },
  h3: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.6,
    color: COLORS.textPrimary,
  },
  bodySmall: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: 7.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.textLight,
    marginBottom: 4,
  },

  /* Components */
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 700,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginVertical: 12,
  },
  goldBar: {
    width: "100%",
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    marginBottom: 16,
  },

  /* Flex utilities */
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexGrow: {
    flexGrow: 1,
  },
  gap4: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },

  /* Spacing */
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
});
