-- ============================================================
-- GDX Enriched Booking Cache
-- Run this ONCE in your Supabase project:
--   Supabase Dashboard → SQL Editor → paste and run
-- ============================================================

-- 1. Create the cache table
CREATE TABLE IF NOT EXISTS gdx_cache (
  gdx              TEXT        PRIMARY KEY,
  enriched_data    JSONB,
  slug             TEXT,
  lead_name        TEXT,
  destination_name TEXT,
  package_name     TEXT,
  cached_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1b. Add columns if the table already exists (safe to run multiple times)
ALTER TABLE gdx_cache ADD COLUMN IF NOT EXISTS slug             TEXT;
ALTER TABLE gdx_cache ADD COLUMN IF NOT EXISTS lead_name        TEXT;
ALTER TABLE gdx_cache ADD COLUMN IF NOT EXISTS destination_name TEXT;
ALTER TABLE gdx_cache ADD COLUMN IF NOT EXISTS package_name     TEXT;

-- 2. Index on cached_at so stale-entry queries are fast
CREATE INDEX IF NOT EXISTS gdx_cache_cached_at_idx
  ON gdx_cache (cached_at DESC);

-- 3. Index on destination_slug for filtered queries
CREATE INDEX IF NOT EXISTS gdx_cache_slug_idx
  ON gdx_cache (slug);

-- 4. Enable Row Level Security
ALTER TABLE gdx_cache ENABLE ROW LEVEL SECURITY;

-- 5. Allow the anon key to read all rows
DO $$ BEGIN
  CREATE POLICY "gdx_cache: public read" ON gdx_cache FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "gdx_cache: public insert" ON gdx_cache FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "gdx_cache: public update" ON gdx_cache FOR UPDATE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
