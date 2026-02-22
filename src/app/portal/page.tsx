import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { redirect } from "next/navigation";
import PortalDashboard from "./PortalDashboard";

export default async function PortalPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/portal");

  return <PortalDashboard userId={user.id} userEmail={user.email ?? ""} />;
}
