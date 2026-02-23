-- Migration 009: Security Hardening
-- K1: Fix overly permissive RLS policies on subscribers and reports
-- K3: Add opt_in_expires_at column for token expiry

-- ══════════════════════════════════════════════════════════════
-- K1: Fix RLS on subscribers — restrict to service_role only
-- The old USING(true) policy allowed any anon-key client full access.
-- ══════════════════════════════════════════════════════════════

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow service role full access" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_service_role_all" ON public.subscribers;
DROP POLICY IF EXISTS "Allow all operations" ON public.subscribers;

-- Create restrictive policy: only service_role can access subscribers
CREATE POLICY "subscribers_service_role_only"
  ON public.subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ══════════════════════════════════════════════════════════════
-- K1: Fix RLS on reports — restrict general access to service_role,
-- but allow authenticated users to read their own reports
-- ══════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Allow service role full access" ON public.reports;
DROP POLICY IF EXISTS "reports_service_role_all" ON public.reports;
DROP POLICY IF EXISTS "Allow all operations" ON public.reports;
DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;

-- Service role: full access (for admin dashboard, report generation)
CREATE POLICY "reports_service_role_all"
  ON public.reports
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Authenticated users: read own reports only
CREATE POLICY "reports_user_select_own"
  ON public.reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════
-- K3: Add opt_in_expires_at for token expiry
-- The opt-in email says "48 hours valid" but never actually expired.
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS opt_in_expires_at TIMESTAMPTZ;

-- Set expiry for existing pending subscribers (48h from now as grace period)
UPDATE public.subscribers
  SET opt_in_expires_at = NOW() + INTERVAL '48 hours'
  WHERE status = 'pending' AND opt_in_expires_at IS NULL;
