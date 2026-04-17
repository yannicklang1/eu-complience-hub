import type { Metadata } from "next";
import ReportSuccess from "./ReportSuccess";

export const metadata: Metadata = {
  title: "Zahlung erfolgreich | EU Compliance Hub",
  description: "Ihr Compliance-Report wird erstellt und per E-Mail zugestellt.",
  robots: { index: false, follow: false },
};

export default function ReportSuccessPage() {
  return <ReportSuccess />;
}
