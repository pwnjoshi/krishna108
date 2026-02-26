-- Krishna108 Devotional Platform - Posts Table Schema
-- This migration creates the posts table with all required fields, indexes, and triggers
-- Requirements: 4.1, 4.2, 4.3, 4.4, 4.5

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  scripture_source VARCHAR(50) NOT NULL,
  verse_reference VARCHAR(20) NOT NULL,
  verse_excerpt TEXT NOT NULL,
  explanation TEXT NOT NULL,
  reflection TEXT NOT NULL,
  practical_application TEXT NOT NULL,
  closing_line TEXT NOT NULL,
  seo_description VARCHAR(160) NOT NULL,
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
-- Index on created_at for chronological queries (Requirement 4.3)
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Index on slug for fast lookups (Requirement 4.4)
CREATE INDEX idx_posts_slug ON posts(slug);

-- Index on verse_reference for verse-based queries
CREATE INDEX idx_posts_verse_reference ON posts(verse_reference);

-- Create trigger function for automatic updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE posts IS 'Stores devotional posts with scripture references and reflections';
COMMENT ON COLUMN posts.id IS 'Unique identifier for each post';
COMMENT ON COLUMN posts.title IS 'Post title (max 200 characters)';
COMMENT ON COLUMN posts.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN posts.scripture_source IS 'Either "Bhagavad Gita" or "Srimad Bhagavatam"';
COMMENT ON COLUMN posts.verse_reference IS 'Scripture verse reference (e.g., "2.13" or "1.2.3")';
COMMENT ON COLUMN posts.verse_excerpt IS 'Brief quote from the verse (max 40 words)';
COMMENT ON COLUMN posts.explanation IS 'Simple explanation of the verse';
COMMENT ON COLUMN posts.reflection IS 'Philosophical insights and reflections';
COMMENT ON COLUMN posts.practical_application IS 'How to apply this wisdom in daily life';
COMMENT ON COLUMN posts.closing_line IS 'Uplifting conclusion';
COMMENT ON COLUMN posts.seo_description IS 'Meta description for SEO (max 160 characters)';
COMMENT ON COLUMN posts.featured_image_url IS 'Optional URL to featured image';
COMMENT ON COLUMN posts.created_at IS 'Timestamp when post was created (auto-populated)';
COMMENT ON COLUMN posts.updated_at IS 'Timestamp when post was last updated (auto-updated)';
