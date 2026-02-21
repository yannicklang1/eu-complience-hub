-- ══════════════════════════════════════════════════════════════
-- Migration 004: Create reports table + storage bucket for Compliance-Reports
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- ── Reports Table ──
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),

  -- Contact & Company info
  email TEXT NOT NULL,
  contact_name TEXT,
  company_name TEXT,
  company_size TEXT,  -- 'micro' | 'small' | 'medium' | 'large'
  branche TEXT,

  -- Report results (JSON snapshots)
  evaluated_regulations JSONB,  -- Array of evaluated regulation objects
  cost_estimate JSONB,          -- { costs: [], totalMin: number, totalMax: number }
  maturity_grade TEXT,           -- Single letter grade (A-E)

  -- PDF storage
  pdf_storage_path TEXT,         -- Path in Supabase Storage: "reports/{token}.pdf"
  download_count INT DEFAULT 0,

  -- Consent
  gdpr_consent BOOLEAN NOT NULL,
  commercial_consent BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_reports_report_token ON public.reports (report_token);
CREATE INDEX IF NOT EXISTS idx_reports_email ON public.reports (email);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports (created_at DESC);

-- ── Row Level Security ──
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything (API routes use service_role key)
CREATE POLICY "Service role full access on reports" ON public.reports
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ── Stats view ──
CREATE OR REPLACE VIEW public.report_stats AS
SELECT
  COUNT(*) AS total_reports,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') AS reports_last_7d,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days') AS reports_last_30d,
  COUNT(*) FILTER (WHERE pdf_storage_path IS NOT NULL) AS with_pdf,
  SUM(download_count) AS total_downloads,
  COUNT(DISTINCT email) AS unique_emails
FROM public.reports;

-- ══════════════════════════════════════════════════════════════
-- IMPORTANT: You also need to create a Storage Bucket manually:
--
-- Go to: Supabase Dashboard → Storage → New Bucket
-- Name: "reports"
-- Public: NO (private — only accessible via service_role key)
-- File size limit: 10MB
-- Allowed MIME types: application/pdf
-- ══════════════════════════════════════════════════════════════
