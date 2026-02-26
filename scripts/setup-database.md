# Database Setup Instructions

This guide will help you set up the posts table in your Supabase database.

## Prerequisites

Before running this setup, make sure you have:
- ✅ Created a Supabase project (see `SUPABASE_SETUP.md`)
- ✅ Updated your `.env.local` file with Supabase credentials

## Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in and select your Krishna108 project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query** button

## Step 2: Run the Migration

1. Open the file `supabase/migrations/001_create_posts_table.sql` in your code editor
2. Copy the entire contents of the file
3. Paste it into the Supabase SQL Editor
4. Click the **Run** button (or press Ctrl+Enter / Cmd+Enter)
5. You should see a success message: "Success. No rows returned"

## Step 3: Verify the Table Was Created

### Using Table Editor (Visual)
1. Click on **Table Editor** in the left sidebar
2. You should see a new table called `posts`
3. Click on it to view the schema
4. Verify all columns are present:
   - id (uuid)
   - title (varchar)
   - slug (varchar)
   - scripture_source (varchar)
   - verse_reference (varchar)
   - verse_excerpt (text)
   - explanation (text)
   - reflection (text)
   - practical_application (text)
   - closing_line (text)
   - seo_description (varchar)
   - featured_image_url (text)
   - created_at (timestamptz)
   - updated_at (timestamptz)

### Using SQL (Advanced)
Run this query in the SQL Editor to verify:

```sql
-- Check table structure
SELECT 
  column_name, 
  data_type, 
  character_maximum_length,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'posts'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'posts';

-- Check triggers
SELECT trigger_name, event_manipulation 
FROM information_schema.triggers 
WHERE event_object_table = 'posts';
```

## Step 4: Test the Schema (Optional)

You can test the schema by inserting a sample post:

```sql
-- Insert a test post
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
  seo_description
) VALUES (
  'Test Post - Krishna''s Wisdom',
  'test-post-krishnas-wisdom',
  'Bhagavad Gita',
  '2.13',
  'As the embodied soul continuously passes, in this body, from boyhood to youth to old age...',
  'This verse explains the eternal nature of the soul.',
  'Understanding the soul''s eternal nature brings peace.',
  'Meditate on the temporary nature of the body and the eternal nature of the soul.',
  'May Krishna''s wisdom guide us to spiritual understanding.',
  'Discover Krishna''s teachings on the eternal soul from Bhagavad Gita 2.13'
);

-- Verify the post was created
SELECT id, title, slug, created_at, updated_at FROM posts;

-- Test the updated_at trigger
UPDATE posts SET title = 'Updated Test Post' WHERE slug = 'test-post-krishnas-wisdom';

-- Verify updated_at changed
SELECT id, title, created_at, updated_at FROM posts WHERE slug = 'test-post-krishnas-wisdom';

-- Clean up test data
DELETE FROM posts WHERE slug = 'test-post-krishnas-wisdom';
```

## What Was Created

### Table: `posts`
- Stores all devotional posts with scripture references
- Includes all required fields from Requirements 4.1

### Constraints
- ✅ Primary key on `id` (UUID)
- ✅ Unique constraint on `slug` (Requirement 4.2)

### Indexes
- ✅ `idx_posts_created_at` - Optimizes chronological queries (Requirement 4.3)
- ✅ `idx_posts_slug` - Optimizes slug lookups (Requirement 4.4)
- ✅ `idx_posts_verse_reference` - Optimizes verse-based queries

### Triggers
- ✅ `update_posts_updated_at` - Automatically updates `updated_at` timestamp

### Auto-population
- ✅ `created_at` defaults to NOW() (Requirement 4.5)
- ✅ `updated_at` defaults to NOW() and auto-updates

## Troubleshooting

### Error: "relation 'posts' already exists"
The table has already been created. You can either:
- Skip this step and proceed to the next task
- Drop the existing table first (⚠️ this will delete all data):
  ```sql
  DROP TABLE IF EXISTS posts CASCADE;
  ```
  Then run the migration again.

### Error: "permission denied"
Make sure you're using the correct Supabase credentials and have admin access to the project.

### Can't see the table in Table Editor
- Refresh the page
- Make sure you're looking in the "public" schema
- Check the SQL Editor for any error messages

## Next Steps

After completing this setup:
1. ✅ Verify the table exists in Table Editor
2. ✅ Proceed to **Task 3** to implement the database client
3. ✅ The database is now ready for the application to use

## Need Help?

- Check the migration file: `supabase/migrations/001_create_posts_table.sql`
- Review the migration README: `supabase/migrations/README.md`
- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
