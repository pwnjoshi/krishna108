/**
 * TypeScript Type Definitions for Krishna108 Devotional Platform
 * 
 * This file contains all core data models and interfaces used throughout the application.
 * These types ensure type safety and consistency across the codebase.
 */

// ============================================================================
// Core Data Models
// ============================================================================

/**
 * Complete Post model representing a devotional article in the database
 */
export interface Post {
  id: string; // UUID
  title: string;
  slug: string; // Unique, URL-friendly
  scriptureSource: 'Bhagavad Gita' | 'Srimad Bhagavatam';
  verseReference: string; // e.g., "2.13" or "1.2.3"
  verseExcerpt: string; // Max 40 words
  explanation: string;
  reflection: string;
  practicalApplication: string;
  closingLine: string;
  seoDescription: string; // Max 160 characters
  featuredImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Input model for creating new posts (without auto-generated fields)
 */
export interface PostInput {
  title: string;
  slug: string;
  scriptureSource: string;
  verseReference: string;
  verseExcerpt: string;
  explanation: string;
  reflection: string;
  practicalApplication: string;
  closingLine: string;
  seoDescription: string;
  featuredImageUrl?: string;
}

/**
 * Scripture verse reference with source, chapter, and verse number
 */
export interface VerseReference {
  source: 'Bhagavad Gita' | 'Srimad Bhagavatam';
  chapter: number;
  verse: number;
  text?: string; // Optional verse text for reference
}

/**
 * AI-generated content structure returned by Content Generator
 */
export interface GeneratedContent {
  title: string;
  verseExcerpt: string; // Max 40 words
  explanation: string;
  reflection: string;
  practicalApplication: string;
  closingLine: string;
  seoDescription: string; // Max 160 characters
  wordCount: number;
}

// ============================================================================
// Configuration
// ============================================================================

/**
 * Application configuration from environment variables
 */
export interface AppConfig {
  openaiApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey?: string;
  apiSecretToken: string;
  cronSchedule: string; // e.g., "0 6 * * *" for 6 AM daily
  siteUrl: string; // e.g., "https://krishna108.com"
  siteName: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Success response from post generation API
 */
export interface GeneratePostResponse {
  success: true;
  postId: string;
  slug: string;
  message: string;
}

/**
 * Error response from API endpoints
 */
export interface ErrorResponse {
  success: false;
  error: string; // User-friendly message
  code: string; // Machine-readable error code
  details?: string; // Technical details (only in development)
  timestamp: string;
}

/**
 * Union type for API responses
 */
export type ApiResponse = GeneratePostResponse | ErrorResponse;

// ============================================================================
// Component Interfaces
// ============================================================================

/**
 * Content Parser interface for parsing AI-generated content
 */
export interface ParseResult {
  success: boolean;
  content?: GeneratedContent;
  error?: string;
}

/**
 * Validation result for content validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ============================================================================
// SEO Types
// ============================================================================

/**
 * Open Graph metadata for social media sharing
 */
export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  type: string;
  image?: string;
}

/**
 * Twitter Card metadata
 */
export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
}

/**
 * Complete metadata for a page
 */
export interface Metadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: OpenGraphData;
  twitter: TwitterCardData;
}

/**
 * Author data for structured data
 */
export interface AuthorData {
  '@type': 'Person' | 'Organization';
  name: string;
  url?: string;
}

/**
 * Publisher data for structured data
 */
export interface PublisherData {
  '@type': 'Organization';
  name: string;
  logo?: {
    '@type': 'ImageObject';
    url: string;
  };
}

/**
 * Article structured data (JSON-LD)
 */
export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  datePublished: string;
  dateModified?: string;
  author: AuthorData;
  publisher: PublisherData;
  description?: string;
  image?: string;
}

// ============================================================================
// Error Codes
// ============================================================================

/**
 * Standard error codes used throughout the application
 */
export enum ErrorCode {
  AUTH_FAILED = 'AUTH_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  VERSE_SELECTION_FAILED = 'VERSE_SELECTION_FAILED',
  CONTENT_GENERATION_FAILED = 'CONTENT_GENERATION_FAILED',
  PARSING_FAILED = 'PARSING_FAILED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  DUPLICATE_VERSE = 'DUPLICATE_VERSE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Database row type (snake_case fields as returned from Supabase)
 */
export interface PostRow {
  id: string;
  title: string;
  slug: string;
  scripture_source: string;
  verse_reference: string;
  verse_excerpt: string;
  explanation: string;
  reflection: string;
  practical_application: string;
  closing_line: string;
  seo_description: string;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Type guard to check if a response is an error
 */
export function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.success === false;
}

/**
 * Type guard to check if a response is successful
 */
export function isSuccessResponse(response: ApiResponse): response is GeneratePostResponse {
  return response.success === true;
}
