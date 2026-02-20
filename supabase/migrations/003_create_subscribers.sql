-- ══════════════════════════════════════════════════════════════
-- Migration 003: Create subscribers table for Fristen-Radar
-- ══════════════════════════════════════════════════════════════

-- Subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),

  -- Double-Opt-In
  opt_in_token TEXT,
  opt_in_confirmed_at TIMESTAMPTZ,

  -- Preferences
  regulations TEXT[] DEFAULT '{}',  -- e.g. {'NIS2', 'DORA', 'AI Act'}
  branche TEXT,
  company_size TEXT,

  -- Source tracking
  source TEXT DEFAULT 'fristen-radar',
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Unsubscribe
  unsubscribe_token TEXT,
  unsubscribed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure unique emails
  CONSTRAINT subscribers_email_unique UNIQUE (email)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers (status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers (created_at DESC);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything (API routes use service_role key)
CREATE POLICY "Service role full access on subscribers" ON public.subscribers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Updated_at trigger (reuse function from leads migration)
CREATE TRIGGER set_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Subscriber stats view
CREATE OR REPLACE VIEW public.subscriber_stats AS
SELECT
  COUNT(*) AS total_subscribers,
  COUNT(*) FILTER (WHERE status = 'active') AS active_subscribers,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_subscribers,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') AS new_7d,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days') AS new_30d
FROM public.subscribers;
