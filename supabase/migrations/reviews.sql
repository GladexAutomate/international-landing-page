-- ============================================================
-- Reviews Table — stores client reviews with agent recognition
-- Run ONCE in Supabase → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS reviews (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  gdx           TEXT,                      -- linked booking GDX (optional)
  lead_name     TEXT,                      -- client full name
  destination   TEXT,                      -- destination slug or human name
  agent_name    TEXT        NOT NULL,      -- agent who guided the client
  review_text   TEXT        NOT NULL,      -- client's written review
  rating        SMALLINT    CHECK (rating BETWEEN 1 AND 5),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reviews_agent_idx     ON reviews (agent_name);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews (created_at DESC);
CREATE INDEX IF NOT EXISTS reviews_gdx_idx       ON reviews (gdx);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews: public read"   ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews: public insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews: public update" ON reviews FOR UPDATE USING (true);
CREATE POLICY "reviews: public delete" ON reviews FOR DELETE USING (true);
