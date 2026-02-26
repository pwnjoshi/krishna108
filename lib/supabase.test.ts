/**
 * Unit Tests for Supabase Database Client
 * 
 * Tests database operations including post saving, retrieval, and error handling.
 * Uses mocked Supabase client to avoid requiring real database connection.
 * 
 * Requirements: 4.2 (unique slug constraint)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the Supabase client module before importing
let mockSupabaseClient: any;
let mockFrom: any;
let mockSelect: any;
let mockInsert: any;
let mockEq: any;
let mockOrder: any;
let mockLimit: any;
let mockSingle: any;

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

// Import after mocking
import { savePost, getPostBySlug, getRecentPosts, getLastPublishedVerse, getAllPosts } from './supabase';
import { PostInput, Post } from './types';

describe('Database Client', () => {
  beforeEach(() => {
    // Reset environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

    // Create mock chain
    mockSingle = vi.fn();
    mockLimit = vi.fn(() => ({ single: mockSingle }));
    mockOrder = vi.fn(() => ({ limit: mockLimit }));
    mockEq = vi.fn(() => ({ single: mockSingle }));
    mockSelect = vi.fn(() => ({ 
      eq: mockEq,
      order: mockOrder,
      limit: mockLimit,
      single: mockSingle,
    }));
    mockInsert = vi.fn(() => ({ select: mockSelect }));
    mockFrom = vi.fn(() => ({
      insert: mockInsert,
      select: mockSelect,
    }));

    mockSupabaseClient = {
      from: mockFrom,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset the singleton by clearing the module cache
    vi.resetModules();
  });

  describe('savePost', () => {
    it('should save a post with valid data', async () => {
      // Arrange
      const postInput: PostInput = {
        title: 'Finding Peace in Krishna\'s Wisdom',
        slug: 'finding-peace-in-krishnas-wisdom',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'As the embodied soul continuously passes...',
        explanation: 'This verse explains the eternal nature of the soul.',
        reflection: 'Deep philosophical reflection on the soul.',
        practicalApplication: 'Apply this wisdom in daily life.',
        closingLine: 'May Krishna guide us all.',
        seoDescription: 'Discover peace through Krishna\'s wisdom in Bhagavad Gita 2.13',
        featuredImageUrl: 'https://example.com/image.jpg',
      };

      const mockDbRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: postInput.title,
        slug: postInput.slug,
        scripture_source: postInput.scriptureSource,
        verse_reference: postInput.verseReference,
        verse_excerpt: postInput.verseExcerpt,
        explanation: postInput.explanation,
        reflection: postInput.reflection,
        practical_application: postInput.practicalApplication,
        closing_line: postInput.closingLine,
        seo_description: postInput.seoDescription,
        featured_image_url: postInput.featuredImageUrl,
        created_at: '2024-01-15T06:00:00Z',
        updated_at: '2024-01-15T06:00:00Z',
      };

      mockSingle.mockResolvedValue({ data: mockDbRow, error: null });

      // Act
      const result = await savePost(postInput);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(mockDbRow.id);
      expect(result.title).toBe(postInput.title);
      expect(result.slug).toBe(postInput.slug);
      expect(result.scriptureSource).toBe(postInput.scriptureSource);
      expect(result.verseReference).toBe(postInput.verseReference);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should handle duplicate slug errors', async () => {
      // Arrange
      const postInput: PostInput = {
        title: 'Duplicate Post',
        slug: 'duplicate-slug',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.14',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test description',
      };

      // Mock duplicate key error from Supabase
      mockSingle.mockResolvedValue({
        data: null,
        error: {
          message: 'duplicate key value violates unique constraint "posts_slug_key"',
          code: '23505',
        },
      });

      // Act & Assert
      await expect(savePost(postInput)).rejects.toThrow('Failed to save post');
    });

    it('should throw error when no data is returned', async () => {
      // Arrange
      const postInput: PostInput = {
        title: 'Test Post',
        slug: 'test-post',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.15',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test description',
      };

      mockSingle.mockResolvedValue({ data: null, error: null });

      // Act & Assert
      await expect(savePost(postInput)).rejects.toThrow('Failed to save post: No data returned');
    });
  });

  describe('getPostBySlug', () => {
    it('should retrieve a post by valid slug', async () => {
      // Arrange
      const slug = 'finding-peace-in-krishnas-wisdom';
      const mockDbRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Finding Peace in Krishna\'s Wisdom',
        slug: slug,
        scripture_source: 'Bhagavad Gita',
        verse_reference: '2.13',
        verse_excerpt: 'As the embodied soul continuously passes...',
        explanation: 'This verse explains the eternal nature of the soul.',
        reflection: 'Deep philosophical reflection on the soul.',
        practical_application: 'Apply this wisdom in daily life.',
        closing_line: 'May Krishna guide us all.',
        seo_description: 'Discover peace through Krishna\'s wisdom',
        featured_image_url: 'https://example.com/image.jpg',
        created_at: '2024-01-15T06:00:00Z',
        updated_at: '2024-01-15T06:00:00Z',
      };

      mockSingle.mockResolvedValue({ data: mockDbRow, error: null });

      // Act
      const result = await getPostBySlug(slug);

      // Assert
      expect(result).not.toBeNull();
      expect(result?.slug).toBe(slug);
      expect(result?.title).toBe(mockDbRow.title);
      expect(result?.scriptureSource).toBe('Bhagavad Gita');
      expect(result?.createdAt).toBeInstanceOf(Date);
    });

    it('should return null for non-existent slug', async () => {
      // Arrange
      const slug = 'non-existent-slug';
      
      // Mock Supabase "not found" error (PGRST116)
      mockSingle.mockResolvedValue({
        data: null,
        error: {
          code: 'PGRST116',
          message: 'The result contains 0 rows',
        },
      });

      // Act
      const result = await getPostBySlug(slug);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw error for database failures', async () => {
      // Arrange
      const slug = 'test-slug';
      
      mockSingle.mockResolvedValue({
        data: null,
        error: {
          code: 'PGRST000',
          message: 'Database connection failed',
        },
      });

      // Act & Assert
      await expect(getPostBySlug(slug)).rejects.toThrow('Failed to get post by slug');
    });
  });

  describe('getRecentPosts', () => {
    it('should retrieve recent posts with specified limit', async () => {
      // Arrange
      const limit = 3;
      const mockDbRows = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          scripture_source: 'Bhagavad Gita',
          verse_reference: '2.13',
          verse_excerpt: 'Excerpt 1',
          explanation: 'Explanation 1',
          reflection: 'Reflection 1',
          practical_application: 'Application 1',
          closing_line: 'Closing 1',
          seo_description: 'Description 1',
          featured_image_url: null,
          created_at: '2024-01-15T06:00:00Z',
          updated_at: '2024-01-15T06:00:00Z',
        },
        {
          id: '2',
          title: 'Post 2',
          slug: 'post-2',
          scripture_source: 'Srimad Bhagavatam',
          verse_reference: '1.2.3',
          verse_excerpt: 'Excerpt 2',
          explanation: 'Explanation 2',
          reflection: 'Reflection 2',
          practical_application: 'Application 2',
          closing_line: 'Closing 2',
          seo_description: 'Description 2',
          featured_image_url: null,
          created_at: '2024-01-14T06:00:00Z',
          updated_at: '2024-01-14T06:00:00Z',
        },
      ];

      mockLimit.mockResolvedValue({ data: mockDbRows, error: null });

      // Act
      const result = await getRecentPosts(limit);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Post 1');
      expect(result[1].title).toBe('Post 2');
    });

    it('should return empty array when no posts exist', async () => {
      // Arrange
      mockLimit.mockResolvedValue({ data: null, error: null });

      // Act
      const result = await getRecentPosts(10);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getLastPublishedVerse', () => {
    it('should retrieve the last published verse reference', async () => {
      // Arrange
      const mockData = {
        scripture_source: 'Bhagavad Gita',
        verse_reference: '2.13',
      };

      mockSingle.mockResolvedValue({ data: mockData, error: null });

      // Act
      const result = await getLastPublishedVerse();

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe('Bhagavad Gita');
      expect(result?.chapter).toBe(2);
      expect(result?.verse).toBe(13);
    });

    it('should return null when no posts exist', async () => {
      // Arrange
      mockSingle.mockResolvedValue({
        data: null,
        error: {
          code: 'PGRST116',
          message: 'The result contains 0 rows',
        },
      });

      // Act
      const result = await getLastPublishedVerse();

      // Assert
      expect(result).toBeNull();
    });

    it('should parse Srimad Bhagavatam verse reference correctly', async () => {
      // Arrange
      const mockData = {
        scripture_source: 'Srimad Bhagavatam',
        verse_reference: '1.2.3',
      };

      mockSingle.mockResolvedValue({ data: mockData, error: null });

      // Act
      const result = await getLastPublishedVerse();

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe('Srimad Bhagavatam');
      expect(result?.chapter).toBe(1);
      expect(result?.verse).toBe(3); // Last number is the verse
    });
  });

  describe('getAllPosts', () => {
    it('should retrieve all posts from database', async () => {
      // Arrange
      const mockDbRows = [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          scripture_source: 'Bhagavad Gita',
          verse_reference: '2.13',
          verse_excerpt: 'Excerpt 1',
          explanation: 'Explanation 1',
          reflection: 'Reflection 1',
          practical_application: 'Application 1',
          closing_line: 'Closing 1',
          seo_description: 'Description 1',
          featured_image_url: null,
          created_at: '2024-01-15T06:00:00Z',
          updated_at: '2024-01-15T06:00:00Z',
        },
      ];

      mockOrder.mockResolvedValue({ data: mockDbRows, error: null });

      // Act
      const result = await getAllPosts();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Post 1');
    });

    it('should return empty array when no posts exist', async () => {
      // Arrange
      mockOrder.mockResolvedValue({ data: null, error: null });

      // Act
      const result = await getAllPosts();

      // Assert
      expect(result).toEqual([]);
    });
  });
});
