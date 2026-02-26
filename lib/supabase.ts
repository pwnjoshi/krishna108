/**
 * Supabase Database Client for Krishna108 Devotional Platform
 * 
 * This module provides a type-safe interface for interacting with the Supabase database.
 * It handles connection management, type conversions between snake_case (database) and 
 * camelCase (TypeScript), and error handling.
 * 
 * Requirements: 4.1, 6.1
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Post, PostInput, VerseReference, PostRow } from './types';

// ============================================================================
// Client Initialization
// ============================================================================

let supabaseClient: SupabaseClient | null = null;

/**
 * Get or create Supabase client instance (singleton pattern)
 */
function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).'
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

// ============================================================================
// Type Conversion Utilities
// ============================================================================

/**
 * Convert database row (snake_case) to Post model (camelCase)
 */
function rowToPost(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    scriptureSource: row.scripture_source as 'Bhagavad Gita' | 'Srimad Bhagavatam',
    verseReference: row.verse_reference,
    verseExcerpt: row.verse_excerpt,
    explanation: row.explanation,
    reflection: row.reflection,
    practicalApplication: row.practical_application,
    closingLine: row.closing_line,
    seoDescription: row.seo_description,
    featuredImageUrl: row.featured_image_url,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

/**
 * Convert PostInput (camelCase) to database row format (snake_case)
 */
function postInputToRow(post: PostInput): Omit<PostRow, 'id' | 'created_at' | 'updated_at'> {
  return {
    title: post.title,
    slug: post.slug,
    scripture_source: post.scriptureSource,
    verse_reference: post.verseReference,
    verse_excerpt: post.verseExcerpt,
    explanation: post.explanation,
    reflection: post.reflection,
    practical_application: post.practicalApplication,
    closing_line: post.closingLine,
    seo_description: post.seoDescription,
    featured_image_url: post.featuredImageUrl || null,
  };
}

// ============================================================================
// Database Operations
// ============================================================================

/**
 * Save a new post to the database
 * 
 * @param post - Post data to save
 * @returns The saved post with generated ID and timestamps
 * @throws Error if save fails or slug already exists
 * 
 * Requirements: 4.1 (store posts with all required fields)
 */
export async function savePost(post: PostInput): Promise<Post> {
  const client = getSupabaseClient();
  const row = postInputToRow(post);

  const { data, error } = await client
    .from('posts')
    .insert(row)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to save post: No data returned');
  }

  return rowToPost(data as PostRow);
}

/**
 * Retrieve a post by its slug
 * 
 * @param slug - URL-friendly post identifier
 * @returns The post if found, null otherwise
 * @throws Error if database query fails
 * 
 * Requirements: 6.1 (fetch post by slug)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // Return null for not found, throw for other errors
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to get post by slug: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return rowToPost(data as PostRow);
}

/**
 * Retrieve the most recent posts
 * 
 * @param limit - Maximum number of posts to return
 * @returns Array of posts ordered by creation date (newest first)
 * @throws Error if database query fails
 */
export async function getRecentPosts(limit: number): Promise<Post[]> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to get recent posts: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  return data.map((row) => rowToPost(row as PostRow));
}

/**
 * Get the verse reference from the last published post
 * 
 * @returns The verse reference of the most recent post, or null if no posts exist
 * @throws Error if database query fails
 * 
 * Requirements: 3.1 (track last published verse)
 */
export async function getLastPublishedVerse(): Promise<VerseReference | null> {
  try {
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('posts')
      .select('scripture_source, verse_reference')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Return null if no posts exist
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to get last published verse: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    // Parse verse reference (e.g., "2.13" or "1.2.3")
    const parts = data.verse_reference.split('.').map(Number);
    
    return {
      source: data.scripture_source as 'Bhagavad Gita' | 'Srimad Bhagavatam',
      chapter: parts[0],
      verse: parts[parts.length - 1], // Last number is always the verse
    };
  } catch (error) {
    // If it's a network/connection error, return null to start from beginning
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      console.warn('[Supabase] Connection failed, starting from first verse');
      return null;
    }
    throw error;
  }
}

/**
 * Retrieve all posts from the database
 * 
 * @returns Array of all posts ordered by creation date (newest first)
 * @throws Error if database query fails
 */
export async function getAllPosts(): Promise<Post[]> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get all posts: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  return data.map((row) => rowToPost(row as PostRow));
}

// ============================================================================
// Export Default Client
// ============================================================================

export default {
  savePost,
  getPostBySlug,
  getRecentPosts,
  getLastPublishedVerse,
  getAllPosts,
};
