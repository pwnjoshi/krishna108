# Database Migrations

This directory contains SQL migration files for the Krishna108 devotional platform database.

## Running Migrations

### Option 1: Using Supabase SQL Editor (Recommended for initial setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `001_create_posts_table.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the migration
7. Verify the posts table was created by going to **Table Editor**

### Option 2: Using Supabase CLI (For advanced users)

If you have the Supabase CLI installed:

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Push migrations to your database
supabase db push
```

## Migration Files

### 001_create_posts_table.sql

Creates the main `posts` table with:

- **Fields**: id, title, slug, scripture_source, verse_reference, verse_excerpt, explanation, reflection, practical_application, closing_line, seo_description, featured_image_url, created_at, updated_at
- **Constraints**: 
  - Primary key on `id`
  - Unique constraint on `slug` (Requirement 4.2)
- **Indexes**:
  - `idx_posts_created_at` - For chronological queries (Requirement 4.3)
  - `idx_posts_slug` - For fast slug lookups (Requirement 4.4)
  - `idx_posts_verse_reference` - For verse-based queries
- **Triggers**:
  - `update_posts_updated_at` - Automatically updates `updated_at` timestamp on row updates
- **Auto-population**:
  - `created_at` defaults to current timestamp (Requirement 4.5)
  - `updated_at` defaults to current timestamp and auto-updates on changes

## Verification

After running the migration, verify it worked correctly:

```sql
-- Check if the table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'posts';

-- Check the table structure
\d posts

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'posts';

-- Check triggers
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE event_object_table = 'posts';
```

## Rollback

If you need to rollback this migration:

```sql
-- Drop the trigger first
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop the indexes
DROP INDEX IF EXISTS idx_posts_created_at;
DROP INDEX IF EXISTS idx_posts_slug;
DROP INDEX IF EXISTS idx_posts_verse_reference;

-- Drop the table
DROP TABLE IF EXISTS posts;
```

## Next Steps

After running this migration:
1. Verify the table was created successfully
2. Proceed to Task 3 to implement the database client
3. Test database operations with the new schema
