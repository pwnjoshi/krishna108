/**
 * Unit Tests for /api/generate-post Route
 * 
 * Tests authentication validation, rate limiting, successful post generation flow,
 * error handling for each component failure, and error response format.
 * 
 * Requirements: 9.2, 9.5
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorCode } from '@/lib/types';

// Mock all dependencies BEFORE importing the route
vi.mock('@/lib/openai', () => ({
  openai: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
  DEFAULT_MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 2000,
}));

vi.mock('@/lib/verse-selector');
vi.mock('@/lib/content-generator');
vi.mock('@/lib/content-parser');
vi.mock('@/lib/slug-generator');
vi.mock('@/lib/supabase');

// Import after mocks are set up
import { POST } from './route';
import { NextRequest } from 'next/server';
import * as verseSelector from '@/lib/verse-selector';
import * as contentGenerator from '@/lib/content-generator';
import * as contentParser from '@/lib/content-parser';
import * as slugGenerator from '@/lib/slug-generator';
import * as supabase from '@/lib/supabase';

describe('POST /api/generate-post', () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;
  const originalEnv = process.env;

  beforeEach(() => {
    // Set up environment variables
    process.env = {
      ...originalEnv,
      API_SECRET_TOKEN: 'test-secret-token',
      NODE_ENV: 'test',
    };

    // Spy on console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Reset all mocks
    vi.clearAllMocks();
    
    // Clear rate limit store by re-importing the module
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  // Helper function to create mock request
  function createMockRequest(options: {
    token?: string;
    useHeader?: boolean;
    headers?: Record<string, string>;
  } = {}): NextRequest {
    const { token, useHeader = false, headers = {} } = options;
    
    let url = 'http://localhost:3000/api/generate-post';
    if (token && !useHeader) {
      url += `?token=${token}`;
    }

    const requestHeaders = new Headers(headers);
    if (token && useHeader) {
      requestHeaders.set('authorization', `Bearer ${token}`);
    }

    return new NextRequest(url, {
      method: 'POST',
      headers: requestHeaders,
    });
  }

  describe('Authentication validation', () => {
    it('should return 401 when no token is provided', async () => {
      // Arrange
      const request = createMockRequest();

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(401);
      expect(data).toEqual({
        success: false,
        error: 'Unauthorized: Invalid or missing authentication token',
        code: ErrorCode.AUTH_FAILED,
        timestamp: expect.any(String),
      });
    });

    it('should return 401 when invalid token is provided in query parameter', async () => {
      // Arrange
      const request = createMockRequest({ token: 'invalid-token' });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(401);
      expect(data.code).toBe(ErrorCode.AUTH_FAILED);
    });

    it('should return 401 when invalid token is provided in header', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'invalid-token',
        useHeader: true 
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(401);
      expect(data.code).toBe(ErrorCode.AUTH_FAILED);
    });

    it('should accept valid token in query parameter', async () => {
      // Arrange
      const request = createMockRequest({ token: 'test-secret-token' });

      // Mock successful pipeline
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({
        valid: true,
        errors: [],
      });

      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');

      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'test-id',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const response = await POST(request);

      // Assert
      expect(response.status).toBe(200);
    });

    it('should accept valid token in Authorization header', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        useHeader: true 
      });

      // Mock successful pipeline
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({
        valid: true,
        errors: [],
      });

      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');

      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'test-id',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const response = await POST(request);

      // Assert
      expect(response.status).toBe(200);
    });

    it('should return 401 when API_SECRET_TOKEN environment variable is not set', async () => {
      // Arrange
      delete process.env.API_SECRET_TOKEN;
      const request = createMockRequest({ token: 'any-token' });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(401);
      expect(data.code).toBe(ErrorCode.AUTH_FAILED);
    });
  });

  describe('Rate limiting', () => {
    it('should allow first request within rate limit', async () => {
      // Arrange
      const request = createMockRequest({ token: 'test-secret-token' });

      // Mock successful pipeline
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({
        valid: true,
        errors: [],
      });

      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');

      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'test-id',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const response = await POST(request);

      // Assert
      expect(response.status).toBe(200);
    });

    it('should return 429 after exceeding rate limit (5 requests)', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'test-client-ip' }
      });

      // Mock successful pipeline for first 5 requests
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({
        valid: true,
        errors: [],
      });

      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');

      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'test-id',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act - Make 5 successful requests
      for (let i = 0; i < 5; i++) {
        const response = await POST(request);
        expect(response.status).toBe(200);
      }

      // Act - 6th request should be rate limited
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(429);
      expect(data).toEqual({
        success: false,
        error: 'Rate limit exceeded: Maximum 5 requests per hour',
        code: ErrorCode.RATE_LIMIT_EXCEEDED,
        timestamp: expect.any(String),
      });
    });
  });

  describe('Successful post generation flow', () => {
    it('should successfully generate and save a post', async () => {
      // Arrange
      const request = createMockRequest({ token: 'test-secret-token' });

      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'The Soul Transmigrates',
        verseExcerpt: 'As the embodied soul continuously passes',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO description',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({
        valid: true,
        errors: [],
      });

      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('the-soul-transmigrates');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('the-soul-transmigrates');

      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'post-123',
        slug: 'the-soul-transmigrates',
        title: 'The Soul Transmigrates',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'As the embodied soul continuously passes',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO description',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        postId: 'post-123',
        slug: 'the-soul-transmigrates',
        message: 'Post generated and published successfully',
      });
    });

    it('should call all pipeline components in correct order', async () => {
      // Arrange
      const request = createMockRequest({ token: 'test-secret-token' });

      const mockVerse = {
        source: 'Bhagavad Gita' as const,
        chapter: 2,
        verse: 13,
      };

      const mockContent = {
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      };

      vi.mocked(verseSelector.getNextVerse).mockResolvedValue(mockVerse);
      vi.mocked(contentGenerator.generatePost).mockResolvedValue(mockContent);
      vi.mocked(contentParser.validate).mockReturnValue({ valid: true, errors: [] });
      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');
      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'test-id',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      await POST(request);

      // Assert - Verify call order
      expect(verseSelector.getNextVerse).toHaveBeenCalled();
      expect(contentGenerator.generatePost).toHaveBeenCalledWith(mockVerse);
      expect(contentParser.validate).toHaveBeenCalledWith(mockContent);
      expect(slugGenerator.generateSlug).toHaveBeenCalledWith('Test Title');
      expect(supabase.savePost).toHaveBeenCalled();
    });

    it('should log success with post details', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'success-log-test' }
      });

      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });

      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });

      vi.mocked(contentParser.validate).mockReturnValue({ valid: true, errors: [] });
      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');
      vi.mocked(supabase.savePost).mockResolvedValue({
        id: 'post-123',
        slug: 'test-title',
        title: 'Test Title',
        scriptureSource: 'Bhagavad Gita',
        verseReference: '2.13',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        featuredImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      await POST(request);

      // Assert - Check that success was logged (may be called multiple times)
      const logCalls = consoleLogSpy.mock.calls;
      const successLog = logCalls.find((call: any[]) => 
        call[0] === '[API] Post published successfully:'
      );
      
      expect(successLog).toBeDefined();
      expect(successLog[1]).toMatchObject({
        postId: 'post-123',
        slug: 'test-title',
        verse: 'Bhagavad Gita 2.13',
      });
    });
  });

  describe('Error handling for component failures', () => {
    beforeEach(() => {
      // Use unique client IDs for error tests to avoid rate limiting
      vi.clearAllMocks();
    });

    it('should return 500 when verse selection fails', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-test-1' }
      });
      vi.mocked(verseSelector.getNextVerse).mockRejectedValue(new Error('Database connection failed'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Failed to select next verse',
        code: ErrorCode.VERSE_SELECTION_FAILED,
        timestamp: expect.any(String),
      });
    });

    it('should return 500 when content generation fails', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-test-2' }
      });
      
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });
      
      vi.mocked(contentGenerator.generatePost).mockRejectedValue(new Error('OpenAI API timeout'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Failed to generate content',
        code: ErrorCode.CONTENT_GENERATION_FAILED,
        timestamp: expect.any(String),
      });
    });

    it('should return 500 when content validation fails', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-test-3' }
      });
      
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });
      
      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: '',
        verseExcerpt: '',
        explanation: '',
        reflection: '',
        practicalApplication: '',
        closingLine: '',
        seoDescription: '',
        wordCount: 0,
      });
      
      vi.mocked(contentParser.validate).mockReturnValue({
        valid: false,
        errors: ['Title is required', 'Word count must be between 700 and 900 words'],
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Generated content failed validation',
        code: ErrorCode.VALIDATION_ERROR,
        timestamp: expect.any(String),
      });
    });

    it('should return 500 when slug generation fails', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-test-4' }
      });
      
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });
      
      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });
      
      vi.mocked(contentParser.validate).mockReturnValue({ valid: true, errors: [] });
      vi.mocked(supabase.getAllPosts).mockRejectedValue(new Error('Database error'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Failed to generate unique slug',
        code: ErrorCode.DATABASE_ERROR,
        timestamp: expect.any(String),
      });
    });

    it('should return 500 when database save fails', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-test-5' }
      });
      
      vi.mocked(verseSelector.getNextVerse).mockResolvedValue({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      });
      
      vi.mocked(contentGenerator.generatePost).mockResolvedValue({
        title: 'Test Title',
        verseExcerpt: 'Test excerpt',
        explanation: 'Test explanation',
        reflection: 'Test reflection',
        practicalApplication: 'Test application',
        closingLine: 'Test closing',
        seoDescription: 'Test SEO',
        wordCount: 750,
      });
      
      vi.mocked(contentParser.validate).mockReturnValue({ valid: true, errors: [] });
      vi.mocked(supabase.getAllPosts).mockResolvedValue([]);
      vi.mocked(slugGenerator.generateSlug).mockReturnValue('test-title');
      vi.mocked(slugGenerator.ensureUnique).mockReturnValue('test-title');
      vi.mocked(supabase.savePost).mockRejectedValue(new Error('Duplicate slug'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'Failed to save post to database',
        code: ErrorCode.DATABASE_ERROR,
        timestamp: expect.any(String),
      });
    });
  });

  describe('Error response format', () => {
    it('should include timestamp in error responses', async () => {
      // Arrange
      const request = createMockRequest();

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(data.timestamp).toBeDefined();
      expect(new Date(data.timestamp).getTime()).toBeGreaterThan(0);
    });

    it('should include error code in error responses', async () => {
      // Arrange
      const request = createMockRequest();

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(data.code).toBe(ErrorCode.AUTH_FAILED);
    });

    it('should not include details in production mode', async () => {
      // Arrange
      process.env.NODE_ENV = 'production';
      const request = createMockRequest({ token: 'test-secret-token' });
      vi.mocked(verseSelector.getNextVerse).mockRejectedValue(new Error('Sensitive error details'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(data.details).toBeUndefined();
    });

    it('should include details in development mode', async () => {
      // Arrange
      process.env.NODE_ENV = 'development';
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'dev-details-test' }
      });
      vi.mocked(verseSelector.getNextVerse).mockRejectedValue(new Error('Detailed error message'));

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(data.details).toBe('Detailed error message');
    });

    it('should log all errors with context', async () => {
      // Arrange
      const request = createMockRequest({ 
        token: 'test-secret-token',
        headers: { 'x-forwarded-for': 'error-log-test' }
      });
      vi.mocked(verseSelector.getNextVerse).mockRejectedValue(new Error('Test error'));

      // Act
      await POST(request);

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[API] Error:',
        expect.objectContaining({
          code: ErrorCode.VERSE_SELECTION_FAILED,
          error: 'Failed to select next verse',
          details: 'Test error',
          timestamp: expect.any(String),
        })
      );
    });
  });
});
