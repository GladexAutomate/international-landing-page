-- ============================================================
-- GDX Master List  —  Permanent reference of all confirmed bookings
-- Run this ONCE in Supabase → SQL Editor
-- ============================================================

-- 1. Create the master list table
CREATE TABLE IF NOT EXISTS gdx_master_list (
  gdx              TEXT        PRIMARY KEY,
  lead_name        TEXT,                        -- full name, e.g. "DELA CRUZ, MARIA"
  destination_name TEXT,                        -- human-readable, e.g. "Hong Kong"
  slug             TEXT,                        -- url slug, e.g. "hongkong"
  package_name     TEXT,                        -- e.g. "5D3N Hong Kong Package"
  is_ready         BOOLEAN     DEFAULT FALSE,   -- TRUE = has a live briefing page
  first_listed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for common query patterns
CREATE INDEX IF NOT EXISTS gdx_master_list_slug_idx
  ON gdx_master_list (slug);

CREATE INDEX IF NOT EXISTS gdx_master_list_listed_at_idx
  ON gdx_master_list (first_listed_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE gdx_master_list ENABLE ROW LEVEL SECURITY;

-- 4. Public read (anon key — landing page lookup)
CREATE POLICY "gdx_master_list: public read"
  ON gdx_master_list FOR SELECT
  USING (true);

-- 5. Public insert
CREATE POLICY "gdx_master_list: public insert"
  ON gdx_master_list FOR INSERT
  WITH CHECK (true);

-- 6. Public update (upsert)
CREATE POLICY "gdx_master_list: public update"
  ON gdx_master_list FOR UPDATE
  USING (true);
