/**
 * POST /api/generate-post
 * 
 * API endpoint for generating and publishing devotional posts.
 * This route orchestrates the entire content generation pipeline:
 * 1. Authentication validation
 * 2. Rate limiting
 * 3. Verse selection
 * 4. Content generation (OpenAI)
 * 5. Content parsing and validation
 * 6. Slug generation
 * 7. Database storage
 * 
 * Requirements: 1.2, 1.3, 1.4, 9.1, 9.2, 9.3, 9.5, 13.1, 13.2
 */

import { NextRequest, NextResponse } from 'next/server';
import { getNextVerse } from '@/lib/verse-selector';
import { generatePost } from '@/lib/content-generator';
import { parse, validate } from '@/lib/content-parser';
import { generateSlug, ensureUnique } from '@/lib/slug-generator';
import { savePost, getAllPosts } from '@/lib/supabase';
import { GeneratePostResponse, ErrorResponse, ErrorCode } from '@/lib/types';

// ============================================================================
// Rate Limiting
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limiting store (for serverless, consider Redis for production)
const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Check if request exceeds rate limit
 * Requirements: 9.5 (rate limit requests to prevent abuse)
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(identifier);
  }

  const currentEntry = rateLimitStore.get(identifier);

  if (!currentEntry) {
    // First request in window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  // Increment count
  currentEntry.count++;
  return true;
}

// ============================================================================
// Authentication
// ============================================================================

/**
 * Validate authentication token from request
 * Requirements: 9.1, 9.2 (require secret token, return 401 for invalid token)
 */
function validateAuth(request: NextRequest): boolean {
  const apiSecretToken = process.env.API_SECRET_TOKEN;

  if (!apiSecretToken) {
    console.error('[API] API_SECRET_TOKEN environment variable is not set');
    return false;
  }

  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    return token === apiSecretToken;
  }

  // Check query parameter (for cron jobs)
  const { searchParams } = new URL(request.url);
  const tokenParam = searchParams.get('token');
  if (tokenParam) {
    return tokenParam === apiSecretToken;
  }

  return false;
}

// ============================================================================
// Error Response Helper
// ============================================================================

/**
 * Create standardized error response
 * Requirements: 13.1 (log errors with timestamp and context)
 */
function createErrorResponse(
  code: ErrorCode,
  error: string,
  statusCode: number,
  details?: string
): NextResponse<ErrorResponse> {
  const errorResponse: ErrorResponse = {
    success: false,
    error,
    code,
    details: process.env.NODE_ENV === 'development' ? details : undefined,
    timestamp: new Date().toISOString(),
  };

  // Log error with context (Requirement 13.1)
  console.error('[API] Error:', {
    code,
    error,
    details,
    timestamp: errorResponse.timestamp,
  });

  return NextResponse.json(errorResponse, { status: statusCode });
}

// ============================================================================
// GET Handler (for browser testing)
// ============================================================================

export async function GET(request: NextRequest) {
  // Redirect GET requests to POST with same authentication
  return POST(request);
}

// ============================================================================
// Main POST Handler
// ============================================================================

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Step 1: Validate authentication (Requirements 9.1, 9.2)
    if (!validateAuth(request)) {
      return createErrorResponse(
        ErrorCode.AUTH_FAILED,
        'Unauthorized: Invalid or missing authentication token',
        401
      );
    }

    // Step 2: Check rate limit (Requirement 9.5)
    const clientId = request.headers.get('x-forwarded-for') || 'default';
    if (!checkRateLimit(clientId)) {
      return createErrorResponse(
        ErrorCode.RATE_LIMIT_EXCEEDED,
        'Rate limit exceeded: Maximum 5 requests per hour',
        429
      );
    }

    console.log('[API] Starting post generation pipeline');

    // Step 3: Select next verse (Requirement 1.2)
    let verse;
    try {
      verse = await getNextVerse();
      console.log(`[API] Selected verse: ${verse.source} ${verse.chapter}.${verse.verse}`);
    } catch (error) {
      return createErrorResponse(
        ErrorCode.VERSE_SELECTION_FAILED,
        'Failed to select next verse',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }

    // Step 4: Generate content with OpenAI (Requirement 1.2)
    let generatedContent;
    try {
      generatedContent = await generatePost(verse);
      console.log(`[API] Generated content: ${generatedContent.wordCount} words`);
    } catch (error) {
      return createErrorResponse(
        ErrorCode.CONTENT_GENERATION_FAILED,
        'Failed to generate content',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }

    // Step 5: Validate generated content (Requirement 9.3)
    const validationResult = validate(generatedContent);
    if (!validationResult.valid) {
      return createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Generated content failed validation',
        500,
        validationResult.errors.join(', ')
      );
    }

    // Step 6: Generate unique slug (Requirement 1.3)
    let slug;
    try {
      const allPosts = await getAllPosts();
      const existingSlugs = allPosts.map((post) => post.slug);
      const baseSlug = generateSlug(generatedContent.title);
      slug = ensureUnique(baseSlug, existingSlugs);
      console.log(`[API] Generated slug: ${slug}`);
    } catch (error) {
      return createErrorResponse(
        ErrorCode.DATABASE_ERROR,
        'Failed to generate unique slug',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }

    // Step 7: Save to database (Requirement 1.3)
    let savedPost;
    try {
      savedPost = await savePost({
        title: generatedContent.title,
        slug,
        scriptureSource: verse.source,
        verseReference: `${verse.chapter}.${verse.verse}`,
        verseExcerpt: generatedContent.verseExcerpt,
        explanation: generatedContent.explanation,
        reflection: generatedContent.reflection,
        practicalApplication: generatedContent.practicalApplication,
        closingLine: generatedContent.closingLine,
        seoDescription: generatedContent.seoDescription,
      });

      // Log success (Requirement 13.2)
      const duration = Date.now() - startTime;
      console.log('[API] Post published successfully:', {
        postId: savedPost.id,
        slug: savedPost.slug,
        verse: `${verse.source} ${verse.chapter}.${verse.verse}`,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return createErrorResponse(
        ErrorCode.DATABASE_ERROR,
        'Failed to save post to database',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }

    // Step 8: Return success response
    const response: GeneratePostResponse = {
      success: true,
      postId: savedPost.id,
      slug: savedPost.slug,
      message: 'Post generated and published successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Catch-all error handler
    return createErrorResponse(
      ErrorCode.DATABASE_ERROR,
      'Internal server error',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
