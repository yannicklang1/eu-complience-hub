import type { Metadata } from "next";
import LeadDashboard from "./LeadDashboard";

export const metadata: Metadata = {
  title: "Lead-Dashboard — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadDashboard />;
}
