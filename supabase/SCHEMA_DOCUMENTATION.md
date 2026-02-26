# Krishna108 Database Schema Documentation

## Overview

This document describes the database schema for the Krishna108 devotional platform. The schema is designed to store devotional posts with scripture references, optimized for fast retrieval and SEO.

## Tables

### posts

The main table storing all devotional posts.

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for each post |
| `title` | VARCHAR(200) | NOT NULL | Post title (max 200 characters) |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly unique identifier |
| `scripture_source` | VARCHAR(50) | NOT NULL | Either "Bhagavad Gita" or "Srimad Bhagavatam" |
| `verse_reference` | VARCHAR(20) | NOT NULL | Scripture verse reference (e.g., "2.13" or "1.2.3") |
| `verse_excerpt` | TEXT | NOT NULL | Brief quote from the verse (max 40 words) |
| `explanation` | TEXT | NOT NULL | Simple explanation of the verse |
| `reflection` | TEXT | NOT NULL | Philosophical insights and reflections |
| `practical_application` | TEXT | NOT NULL | How to apply this wisdom in daily life |
| `closing_line` | TEXT | NOT NULL | Uplifting conclusion |
| `seo_description` | VARCHAR(160) | NOT NULL | Meta description for SEO (max 160 characters) |
| `featured_image_url` | TEXT | NULL | Optional URL to featured image |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp when post was created (auto-populated) |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp when post was last updated (auto-updated) |

#### Indexes

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `posts_pkey` | `id` | PRIMARY KEY | Unique identification |
| `posts_slug_key` | `slug` | UNIQUE | Enforce slug uniqueness (Req 4.2) |
| `idx_posts_created_at` | `created_at DESC` | B-tree | Optimize chronological queries (Req 4.3) |
| `idx_posts_slug` | `slug` | B-tree | Optimize slug lookups (Req 4.4) |
| `idx_posts_verse_reference` | `verse_reference` | B-tree | Optimize verse-based queries |

#### Triggers

| Trigger Name | Event | Function | Purpose |
|--------------|-------|----------|---------|
| `update_posts_updated_at` | BEFORE UPDATE | `update_updated_at_column()` | Automatically update `updated_at` timestamp |

#### Functions

##### update_updated_at_column()

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Automatically sets the `updated_at` column to the current timestamp whenever a row is updated.

## Requirements Mapping

This schema satisfies the following requirements from the design document:

- **Requirement 4.1**: Stores posts with all required fields (id, title, slug, scripture_source, verse_reference, verse_excerpt, explanation, reflection, practical_application, closing_line, seo_description, featured_image_url, created_at)
- **Requirement 4.2**: Enforces unique constraint on slug field
- **Requirement 4.3**: Indexes the created_at field for chronological queries
- **Requirement 4.4**: Indexes the slug field for fast lookups
- **Requirement 4.5**: Automatically sets created_at to current timestamp when a post is saved

## Usage Examples

### Insert a New Post

```sql
INSERT INTO posts (
  title,
  slug,
  scripture_source,
  verse_reference,
  verse_excerpt,
  explanation,
  reflection,
  practical_application,
  closing_line,
  seo_description,
  featured_image_url
) VALUES (
  'Finding Peace in Krishna''s Wisdom',
  'finding-peace-in-krishnas-wisdom',
  'Bhagavad Gita',
  '2.13',
  'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death.',
  'This verse teaches us about the eternal nature of the soul and the temporary nature of the body.',
  'Understanding that we are not this body but the eternal soul within brings profound peace and freedom from material anxieties.',
  'When facing life changes, remember that your true self is unchanging. Meditate on your eternal spiritual identity.',
  'May Krishna''s wisdom guide us to see beyond the temporary and embrace our eternal nature.',
  'Discover Krishna''s profound teachings on the eternal soul from Bhagavad Gita 2.13 and find peace in spiritual wisdom.',
  'https://example.com/images/bg-2-13.jpg'
);
```

### Query Recent Posts

```sql
-- Get the 10 most recent posts
SELECT 
  id,
  title,
  slug,
  scripture_source,
  verse_reference,
  created_at
FROM posts
ORDER BY created_at DESC
LIMIT 10;
```

### Query Post by Slug

```sql
-- Get a specific post by slug
SELECT *
FROM posts
WHERE slug = 'finding-peace-in-krishnas-wisdom';
```

### Query Posts by Scripture Source

```sql
-- Get all posts from Bhagavad Gita
SELECT 
  id,
  title,
  slug,
  verse_reference,
  created_at
FROM posts
WHERE scripture_source = 'Bhagavad Gita'
ORDER BY created_at DESC;
```

### Query Last Published Verse

```sql
-- Get the most recently published verse reference
SELECT 
  scripture_source,
  verse_reference,
  created_at
FROM posts
ORDER BY created_at DESC
LIMIT 1;
```

### Update a Post

```sql
-- Update a post (updated_at will be automatically set)
UPDATE posts
SET 
  title = 'Updated Title',
  explanation = 'Updated explanation text'
WHERE slug = 'finding-peace-in-krishnas-wisdom';
```

### Check for Duplicate Slugs

```sql
-- Check if a slug already exists
SELECT EXISTS(
  SELECT 1 FROM posts WHERE slug = 'my-new-slug'
) AS slug_exists;
```

### Check for Recent Verse Publications

```sql
-- Check if a verse was published in the last 365 days
SELECT EXISTS(
  SELECT 1 
  FROM posts 
  WHERE verse_reference = '2.13'
    AND created_at > NOW() - INTERVAL '365 days'
) AS verse_published_recently;
```

## Performance Considerations

### Index Usage

1. **Chronological Queries**: The `idx_posts_created_at` index (DESC order) optimizes queries that fetch recent posts, which is the most common query pattern for the homepage.

2. **Slug Lookups**: The `idx_posts_slug` index ensures O(log n) lookup time for individual post pages, which is critical for page load performance.

3. **Verse Reference Queries**: The `idx_posts_verse_reference` index optimizes queries that check if a verse has been published recently, used by the verse selector component.

### Query Optimization Tips

- Always use the indexed columns in WHERE clauses
- Limit result sets with LIMIT when fetching recent posts
- Use SELECT with specific columns instead of SELECT * when possible
- The unique constraint on slug provides automatic index for uniqueness checks

## Data Integrity

### Constraints

1. **NOT NULL Constraints**: All essential fields are required, preventing incomplete posts from being saved.

2. **Unique Slug**: The UNIQUE constraint on slug ensures no two posts can have the same URL, preventing routing conflicts.

3. **Automatic Timestamps**: The DEFAULT NOW() on created_at and the trigger on updated_at ensure accurate timestamp tracking without manual intervention.

### Validation

Application-level validation should enforce:
- Title length: 1-200 characters
- Slug length: 1-100 characters, URL-friendly format
- Scripture source: Must be "Bhagavad Gita" or "Srimad Bhagavatam"
- Verse excerpt: Maximum 40 words
- SEO description: Maximum 160 characters
- Total word count: 700-900 words (explanation + reflection + practical_application)

## Migration History

| Version | File | Description | Date |
|---------|------|-------------|------|
| 001 | `001_create_posts_table.sql` | Initial schema creation with posts table, indexes, and triggers | 2024 |

## Future Considerations

### Potential Schema Extensions

1. **Tags/Categories**: Add a tags table and junction table for post categorization
2. **User Interactions**: Add tables for likes, bookmarks, or comments
3. **Analytics**: Add a table to track post views and engagement metrics
4. **Translations**: Add support for multi-language content
5. **Revisions**: Add a post_revisions table for version history

### Scalability

The current schema is designed to handle:
- **10+ years of daily posts**: ~3,650 posts
- **High read traffic**: Optimized indexes for common queries
- **Fast writes**: Minimal indexes to keep insert performance high

For larger scale (100,000+ posts), consider:
- Partitioning by date (yearly or monthly)
- Materialized views for complex aggregations
- Read replicas for high traffic
- Caching layer (Redis) for frequently accessed posts

## Maintenance

### Regular Tasks

1. **Vacuum**: PostgreSQL automatically vacuums, but monitor for bloat
2. **Reindex**: Periodically reindex if query performance degrades
3. **Analyze**: Run ANALYZE to update query planner statistics
4. **Backup**: Supabase provides automatic backups, but verify regularly

### Monitoring Queries

```sql
-- Check table size
SELECT 
  pg_size_pretty(pg_total_relation_size('posts')) AS total_size,
  pg_size_pretty(pg_relation_size('posts')) AS table_size,
  pg_size_pretty(pg_indexes_size('posts')) AS indexes_size;

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan AS index_scans,
  idx_tup_read AS tuples_read,
  idx_tup_fetch AS tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'posts';

-- Check for slow queries (requires pg_stat_statements extension)
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
WHERE query LIKE '%posts%'
ORDER BY mean_time DESC
LIMIT 10;
```

## Security

### Row Level Security (RLS)

Consider enabling RLS for additional security:

```sql
-- Enable RLS on posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

-- Restrict write access to authenticated users with specific role
CREATE POLICY "Only service role can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update posts"
  ON posts FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete posts"
  ON posts FOR DELETE
  USING (auth.role() = 'service_role');
```

### Best Practices

1. Use the service role key only in server-side code (API routes)
2. Use the anon key for client-side read operations
3. Never expose the service role key in client-side code
4. Validate all inputs before inserting into the database
5. Use parameterized queries to prevent SQL injection (Supabase client handles this)

## Support

For questions or issues with the database schema:
1. Review this documentation
2. Check the migration files in `supabase/migrations/`
3. Consult the Supabase documentation: https://supabase.com/docs
4. Review the design document: `.kiro/specs/krishna108-devotional-platform/design.md`
