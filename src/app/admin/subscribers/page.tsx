import type { Metadata } from "next";
import SubscriberDashboard from "./SubscriberDashboard";

export const metadata: Metadata = {
  title: "Subscriber-Dashboard — Admin",
  robots: { index: false, follow: false },
};

export default function AdminSubscribersPage() {
  return <SubscriberDashboard />;
}
