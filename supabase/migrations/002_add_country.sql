-- ══════════════════════════════════════════════════════════════
-- EU Compliance Hub — Add country column to leads
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- Add country column (ISO 3166-1 alpha-2: AT, DE, CH, etc.)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS country TEXT;

-- Index for filtering by country
CREATE INDEX IF NOT EXISTS idx_leads_country ON public.leads (country);

-- Update stats view to include country breakdown
CREATE OR REPLACE VIEW public.lead_stats AS
SELECT
  COUNT(*) AS total_leads,
  COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') AS leads_last_7d,
  COUNT(*) FILTER (WHERE created_at > now() - interval '30 days') AS leads_last_30d,
  COUNT(*) FILTER (WHERE marketing_consent = true) AS marketing_opted_in,
  COUNT(*) FILTER (WHERE opt_in_confirmed = true) AS double_opt_in_confirmed,
  COUNT(DISTINCT source_tool) AS unique_tools,
  COUNT(DISTINCT branche) AS unique_branchen,
  COUNT(DISTINCT country) AS unique_countries
FROM public.leads;
