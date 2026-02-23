-- ════════════════════════════════════════════════════════════
-- Migration 008: User Evaluations Table
-- Stores tool evaluation results linked to user accounts
-- ════════════════════════════════════════════════════════════

CREATE TABLE public.user_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,          -- e.g. 'regulierung-finder', 'reifegrad-check'
  tool_name TEXT NOT NULL,        -- German display name
  inputs JSONB NOT NULL DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '{}',
  summary TEXT,                   -- Short human-readable summary
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_evaluations_user_id ON public.user_evaluations(user_id);
CREATE INDEX idx_user_evaluations_tool_id ON public.user_evaluations(tool_id);
CREATE INDEX idx_user_evaluations_created_at ON public.user_evaluations(created_at DESC);

-- RLS
ALTER TABLE public.user_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own evaluations"
  ON public.user_evaluations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evaluations"
  ON public.user_evaluations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own evaluations"
  ON public.user_evaluations FOR DELETE
  USING (auth.uid() = user_id);

-- Admin access (service role bypasses RLS)
