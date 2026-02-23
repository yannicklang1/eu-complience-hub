-- ══════════════════════════════════════════════════════════════
-- COMBINED Migration: 003 → 009
-- Run this ONCE in Supabase SQL Editor (Dashboard → SQL Editor)
-- Prerequisite: Migrations 001 + 002 (leads table) must already exist
-- ══════════════════════════════════════════════════════════════


-- ┌──────────────────────────────────────────────────────────┐
-- │  003: Create subscribers table for Fristen-Radar         │
-- └──────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),

  -- Double-Opt-In
  opt_in_token TEXT,
  opt_in_confirmed_at TIMESTAMPTZ,

  -- Preferences
  regulations TEXT[] DEFAULT '{}',
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

  CONSTRAINT subscribers_email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers (status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers (created_at DESC);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Trigger: auto-update updated_at (reuses function from 001)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_subscribers_updated_at'
  ) THEN
    CREATE TRIGGER set_subscribers_updated_at
      BEFORE UPDATE ON public.subscribers
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- Stats view
CREATE OR REPLACE VIEW public.subscriber_stats AS
SELECT
  COUNT(*) AS total_subscribers,
  COUNT(*) FILTER (WHERE status = 'active') AS active_subscribers,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_subscribers,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') AS new_7d,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days') AS new_30d
FROM public.subscribers;


-- ┌──────────────────────────────────────────────────────────┐
-- │  004: Create reports table                               │
-- └──────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),

  email TEXT NOT NULL,
  contact_name TEXT,
  company_name TEXT,
  company_size TEXT,
  branche TEXT,

  evaluated_regulations JSONB,
  cost_estimate JSONB,
  maturity_grade TEXT,

  pdf_storage_path TEXT,
  download_count INT DEFAULT 0,

  gdpr_consent BOOLEAN NOT NULL,
  commercial_consent BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reports_report_token ON public.reports (report_token);
CREATE INDEX IF NOT EXISTS idx_reports_email ON public.reports (email);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports (created_at DESC);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Stats view
CREATE OR REPLACE VIEW public.report_stats AS
SELECT
  COUNT(*) AS total_reports,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') AS reports_last_7d,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days') AS reports_last_30d,
  COUNT(*) FILTER (WHERE pdf_storage_path IS NOT NULL) AS with_pdf,
  SUM(download_count) AS total_downloads,
  COUNT(DISTINCT email) AS unique_emails
FROM public.reports;


-- ┌──────────────────────────────────────────────────────────┐
-- │  005: Add commercial_consent to subscribers              │
-- └──────────────────────────────────────────────────────────┘

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS commercial_consent BOOLEAN DEFAULT FALSE;

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS commercial_consent_at TIMESTAMPTZ;


-- ┌──────────────────────────────────────────────────────────┐
-- │  006: Create profiles table for user authentication      │
-- └──────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS for profiles
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access' AND tablename = 'profiles') THEN
    CREATE POLICY "Service role full access" ON public.profiles FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-link existing reports by email
CREATE OR REPLACE FUNCTION public.link_existing_reports()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.reports
  SET user_id = NEW.id
  WHERE email = NEW.email
    AND user_id IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_link_reports ON public.profiles;
CREATE TRIGGER on_profile_created_link_reports
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.link_existing_reports();


-- ┌──────────────────────────────────────────────────────────┐
-- │  007: Add user_id to reports table                       │
-- └──────────────────────────────────────────────────────────┘

ALTER TABLE public.reports
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);


-- ┌──────────────────────────────────────────────────────────┐
-- │  008: User evaluations table                             │
-- └──────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS public.user_evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  inputs JSONB NOT NULL DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '{}',
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_evaluations_user_id ON public.user_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_evaluations_tool_id ON public.user_evaluations(tool_id);
CREATE INDEX IF NOT EXISTS idx_user_evaluations_created_at ON public.user_evaluations(created_at DESC);

ALTER TABLE public.user_evaluations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own evaluations' AND tablename = 'user_evaluations') THEN
    CREATE POLICY "Users can read own evaluations" ON public.user_evaluations FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own evaluations' AND tablename = 'user_evaluations') THEN
    CREATE POLICY "Users can insert own evaluations" ON public.user_evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own evaluations' AND tablename = 'user_evaluations') THEN
    CREATE POLICY "Users can delete own evaluations" ON public.user_evaluations FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;


-- ┌──────────────────────────────────────────────────────────┐
-- │  009: Security Hardening — RLS + opt_in_expires_at       │
-- └──────────────────────────────────────────────────────────┘

-- Fix subscribers RLS: drop ALL possible names, then create
DROP POLICY IF EXISTS "Service role full access on subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Allow service role full access" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_service_role_all" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_service_role_only" ON public.subscribers;
DROP POLICY IF EXISTS "Allow all operations" ON public.subscribers;

CREATE POLICY "subscribers_service_role_only"
  ON public.subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Fix reports RLS: drop ALL possible names, then create
DROP POLICY IF EXISTS "Service role full access on reports" ON public.reports;
DROP POLICY IF EXISTS "Allow service role full access" ON public.reports;
DROP POLICY IF EXISTS "reports_service_role_all" ON public.reports;
DROP POLICY IF EXISTS "Allow all operations" ON public.reports;
DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;
DROP POLICY IF EXISTS "reports_user_select_own" ON public.reports;

CREATE POLICY "reports_service_role_all"
  ON public.reports
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "reports_user_select_own"
  ON public.reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- Add opt_in_expires_at column for token expiry (48h)
ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS opt_in_expires_at TIMESTAMPTZ;

-- Set expiry for existing pending subscribers (48h grace period)
UPDATE public.subscribers
  SET opt_in_expires_at = NOW() + INTERVAL '48 hours'
  WHERE status = 'pending' AND opt_in_expires_at IS NULL;


-- ══════════════════════════════════════════════════════════════
-- DONE! All tables created + security hardened.
--
-- NEXT: Create a Storage Bucket manually:
--   Supabase Dashboard → Storage → New Bucket
--   Name: "reports"
--   Public: NO (private)
--   File size limit: 10MB
--   Allowed MIME types: application/pdf
-- ══════════════════════════════════════════════════════════════
