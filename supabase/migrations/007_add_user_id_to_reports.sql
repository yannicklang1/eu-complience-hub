-- ══════════════════════════════════════════════════════════════
-- Migration 007: Add user_id to reports table
-- Links compliance reports to authenticated users
-- ══════════════════════════════════════════════════════════════

-- Add nullable user_id column (nullable because existing reports have no user)
ALTER TABLE public.reports
  ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Index for fast lookups by user
CREATE INDEX idx_reports_user_id ON public.reports(user_id);

-- RLS policy: Users can read their own reports
CREATE POLICY "Users can view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id);
