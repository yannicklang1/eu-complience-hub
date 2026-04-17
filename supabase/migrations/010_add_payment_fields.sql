-- ════════════════════════════════════════════════════════════
-- Migration 010: Add payment fields to reports table
-- Supports LemonSqueezy paywall for PDF compliance reports
-- ════════════════════════════════════════════════════════════

-- Payment status: 'pending' (not paid), 'paid' (purchased), 'free' (legacy/free)
ALTER TABLE public.reports
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'free'));

-- LemonSqueezy order reference for reconciliation
ALTER TABLE public.reports
  ADD COLUMN IF NOT EXISTS lemonsqueezy_order_id TEXT;

-- Store raw report input so we can re-generate PDF after payment
ALTER TABLE public.reports
  ADD COLUMN IF NOT EXISTS report_input JSONB;

-- Index for webhook lookups by order ID
CREATE INDEX IF NOT EXISTS idx_reports_lemonsqueezy_order
  ON public.reports(lemonsqueezy_order_id)
  WHERE lemonsqueezy_order_id IS NOT NULL;

-- Mark all existing reports as 'free' (they were created before paywall)
UPDATE public.reports
  SET payment_status = 'free'
  WHERE payment_status = 'pending'
    AND pdf_storage_path IS NOT NULL;
