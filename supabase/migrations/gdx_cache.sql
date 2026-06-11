-- ============================================================
-- GDX Enriched Booking Cache
-- Run this ONCE in your Supabase project:
--   Supabase Dashboard → SQL Editor → paste and run
-- ============================================================

-- 1. Create the cache table
CREATE TABLE IF NOT EXISTS gdx_cache (
  gdx            TEXT        PRIMARY KEY,
  enriched_data  JSONB       NOT NULL,
  slug           TEXT,
  cached_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Index on cached_at so stale-entry queries are fast
CREATE INDEX IF NOT EXISTS gdx_cache_cached_at_idx
  ON gdx_cache (cached_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE gdx_cache ENABLE ROW LEVEL SECURITY;

-- 4. Allow the anon key (used by the landing page) to read all rows
CREATE POLICY "gdx_cache: public read"
  ON gdx_cache FOR SELECT
  USING (true);

-- 5. Allow the anon key to insert new cache entries
CREATE POLICY "gdx_cache: public insert"
  ON gdx_cache FOR INSERT
  WITH CHECK (true);

-- 6. Allow the anon key to update (upsert) existing cache entries
CREATE POLICY "gdx_cache: public update"
  ON gdx_cache FOR UPDATE
  USING (true);

-- ============================================================
-- Optional: auto-delete entries older than 7 days
-- (keeps the table lean without manual cleanup)
-- Requires pg_cron extension — enable it in:
--   Supabase Dashboard → Database → Extensions → pg_cron
-- ============================================================
-- SELECT cron.schedule(
--   'purge-gdx-cache',
--   '0 3 * * *',   -- every day at 3 AM UTC
--   $$
--     DELETE FROM gdx_cache
--     WHERE cached_at < NOW() - INTERVAL '7 days';
--   $$
-- );
