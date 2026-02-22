/* ══════════════════════════════════════════════════════════════
   DeadlineTimeline — Chronological list of relevant deadlines
   Past deadlines grayed out, upcoming highlighted
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { Deadline } from "@/data/deadlines";

interface DeadlineTimelineProps {
  deadlines: (Deadline & { daysLeft: number })[];
  generatedAt: string;
  t: PDFMessages;
}

const tlStyles = StyleSheet.create({
  entry: {
    flexDirection: "row",
    marginBottom: 2,
  },
  entryPast: {
    opacity: 0.5,
  },
  dateColumn: {
    width: 75,
    paddingRight: 10,
    alignItems: "flex-end",
  },
  dateText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  datePast: {
    color: COLORS.textLight,
  },
  timelineColumn: {
    width: 24,
    alignItems: "center",
    position: "relative",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 2,
    zIndex: 1,
  },
  dotUrgent: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.danger,
    marginTop: 1,
    zIndex: 1,
  },
  dotPast: {
    backgroundColor: COLORS.textLight,
  },
  line: {
    position: "absolute",
    top: 12,
    bottom: -2,
    width: 2,
    backgroundColor: COLORS.borderLight,
    left: 11,
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 14,
  },
  regLabel: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 7.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  title: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 11,
    color: COLORS.navy,
    marginBottom: 2,
  },
  titlePast: {
    color: COLORS.textLight,
  },
  description: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  daysLeft: {
    fontFamily: "DMSans",
    fontSize: 8,
    fontWeight: 700,
  },
  daysUrgent: {
    color: COLORS.danger,
  },
  daysSoon: {
    color: COLORS.warning,
  },
  daysOk: {
    color: COLORS.success,
  },
  daysPast: {
    color: COLORS.textLight,
  },
  todayMarker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
    paddingLeft: 75,
  },
  todayLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.danger,
  },
  todayLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    fontWeight: 700,
    color: COLORS.danger,
    marginHorizontal: 6,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "DMSans",
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});

function getDaysStyle(daysLeft: number) {
  if (daysLeft < 0) return tlStyles.daysPast;
  if (daysLeft < 90) return tlStyles.daysUrgent;
  if (daysLeft < 180) return tlStyles.daysSoon;
  return tlStyles.daysOk;
}

function getDaysLabel(daysLeft: number, t: PDFMessages): string {
  if (daysLeft < 0) return tReplace(t.deadlines.daysPassed, { days: Math.abs(daysLeft) });
  if (daysLeft === 0) return t.deadlines.todayLabel;
  return tReplace(t.deadlines.inDays, { days: daysLeft });
}

export default function DeadlineTimeline({
  deadlines,
  generatedAt,
  t,
}: DeadlineTimelineProps) {
  if (deadlines.length === 0) {
    return (
      <Page size="A4" style={styles.page}>
        <View style={styles.goldBar} />
        <Text style={[styles.h2, { color: COLORS.navy }]}>
          {t.deadlines.title}
        </Text>
        <View style={tlStyles.emptyState}>
          <Text style={tlStyles.emptyText}>
            {t.deadlines.noDeadlines}
          </Text>
        </View>
        <PageFooter generatedAt={generatedAt} t={t} />
      </Page>
    );
  }

  // Find where past transitions to future for "today" marker
  const todayIndex = deadlines.findIndex((d) => d.daysLeft >= 0);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.deadlines.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.deadlines.subtitle}
      </Text>

      {deadlines.map((deadline, i) => {
        const isPast = deadline.daysLeft < 0;
        const isUrgent = deadline.daysLeft >= 0 && deadline.daysLeft < 90;
        const isLast = i === deadlines.length - 1;

        return (
          <View key={`${deadline.iso}-${deadline.title}`}>
            {/* Today marker between past and future */}
            {todayIndex === i && todayIndex > 0 && (
              <View style={tlStyles.todayMarker}>
                <View style={tlStyles.todayLine} />
                <Text style={tlStyles.todayLabel}>{t.deadlines.today}</Text>
                <View style={tlStyles.todayLine} />
              </View>
            )}

            <View
              style={isPast ? [tlStyles.entry, tlStyles.entryPast] : tlStyles.entry}
              wrap={false}
            >
              {/* Date column */}
              <View style={tlStyles.dateColumn}>
                <Text
                  style={isPast ? [tlStyles.dateText, tlStyles.datePast] : tlStyles.dateText}
                >
                  {deadline.label}
                </Text>
              </View>

              {/* Timeline dot + line */}
              <View style={tlStyles.timelineColumn}>
                {isUrgent ? (
                  <View
                    style={[
                      tlStyles.dotUrgent,
                      { backgroundColor: deadline.color },
                    ]}
                  />
                ) : (
                  <View
                    style={[
                      tlStyles.dot,
                      isPast
                        ? tlStyles.dotPast
                        : { backgroundColor: deadline.color },
                    ]}
                  />
                )}
                {!isLast && <View style={tlStyles.line} />}
              </View>

              {/* Content column */}
              <View style={tlStyles.contentColumn}>
                <Text style={[tlStyles.regLabel, { color: deadline.color }]}>
                  {deadline.reg}
                </Text>
                <Text
                  style={isPast ? [tlStyles.title, tlStyles.titlePast] : tlStyles.title}
                >
                  {deadline.title}
                </Text>
                <Text style={tlStyles.description}>{deadline.desc}</Text>
                <Text style={[tlStyles.daysLeft, getDaysStyle(deadline.daysLeft)]}>
                  {getDaysLabel(deadline.daysLeft, t)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
