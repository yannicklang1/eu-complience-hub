-- ══════════════════════════════════════════════════════════════
-- Migration 005: Add commercial_consent columns to subscribers
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- These columns are already used by /api/subscribe but were missing
-- from the original 003 migration.

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS commercial_consent BOOLEAN DEFAULT FALSE;

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS commercial_consent_at TIMESTAMPTZ;
