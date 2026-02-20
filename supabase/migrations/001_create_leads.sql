-- ══════════════════════════════════════════════════════════════
-- EU Compliance Hub — Lead Capture Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Leads Table ──
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact info
  email TEXT NOT NULL,
  company_name TEXT,
  contact_name TEXT,
  phone TEXT,
  company_size TEXT, -- 'micro' | 'small' | 'medium' | 'large'

  -- Industry / Regulation context
  branche TEXT,
  regulations TEXT[], -- e.g. ['nis2', 'dora', 'ai-act']

  -- Lead source tracking
  source_tool TEXT, -- which tool generated the lead: 'nis2-check', 'haftungs-pruefer', 'bussgeld-rechner'
  source_page TEXT, -- the page URL where the form was submitted
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Tool results (JSON snapshot of what the tool calculated)
  tool_results JSONB,

  -- Consent & Status
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  opt_in_confirmed BOOLEAN NOT NULL DEFAULT false, -- double opt-in
  opt_in_token TEXT, -- token for double opt-in confirmation

  -- Metadata
  ip_country TEXT, -- from Cloudflare/Vercel headers (no full IP stored = GDPR)
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source_tool ON public.leads (source_tool);
CREATE INDEX IF NOT EXISTS idx_leads_branche ON public.leads (branche);

-- ── Row Level Security ──
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for lead form submissions via API route)
CREATE POLICY "Allow anonymous lead inserts" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update/delete (for admin dashboard)
CREATE POLICY "Service role can do everything" ON public.leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── Updated at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ── Stats view for dashboard ──
CREATE OR REPLACE VIEW public.lead_stats AS
SELECT
  COUNT(*) AS total_leads,
  COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') AS leads_last_7d,
  COUNT(*) FILTER (WHERE created_at > now() - interval '30 days') AS leads_last_30d,
  COUNT(*) FILTER (WHERE marketing_consent = true) AS marketing_opted_in,
  COUNT(*) FILTER (WHERE opt_in_confirmed = true) AS double_opt_in_confirmed,
  COUNT(DISTINCT source_tool) AS unique_tools,
  COUNT(DISTINCT branche) AS unique_branchen
FROM public.leads;
