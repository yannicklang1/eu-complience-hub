import type { Metadata } from "next";
import AdminAuthProvider from "./AdminAuthProvider";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin-Portal — EU Compliance Hub",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-[#060c1a]">
        <AdminNav />
        {children}
      </div>
    </AdminAuthProvider>
  );
}
