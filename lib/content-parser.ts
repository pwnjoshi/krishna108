/**
 * Content Parser Component
 * 
 * This module parses and validates AI-generated content into structured fields.
 * It ensures all required fields are present and meet length constraints.
 * 
 * Requirements: 17.1, 17.2, 17.3, 2.4, 2.6, 8.6
 */

import { GeneratedContent, ParseResult, ValidationResult } from './types';

/**
 * ContentParser interface for parsing and validating AI-generated content
 */
export interface ContentParser {
  parse(rawContent: string): ParseResult;
  validate(content: GeneratedContent): ValidationResult;
}

/**
 * Parse raw AI-generated content string into structured GeneratedContent object
 * 
 * Requirement 17.1: Parse AI content into structured fields
 * Requirement 17.3: Return descriptive error if parsing fails
 */
export function parse(rawContent: string): ParseResult {
  try {
    // Parse JSON content
    const parsed = JSON.parse(rawContent);
    
    // Calculate word count for validation
    const wordCount = [
      parsed.explanation || '',
      parsed.reflection || '',
      parsed.practicalApplication || ''
    ].join(' ').split(/\s+/).filter(word => word.length > 0).length;
    
    const content: GeneratedContent = {
      title: parsed.title || '',
      verseExcerpt: parsed.verseExcerpt || '',
      explanation: parsed.explanation || '',
      reflection: parsed.reflection || '',
      practicalApplication: parsed.practicalApplication || '',
      closingLine: parsed.closingLine || '',
      seoDescription: parsed.seoDescription || '',
      wordCount
    };
    
    return {
      success: true,
      content
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
    
    return {
      success: false,
      error: `Failed to parse content: ${errorMessage}`
    };
  }
}

/**
 * Validate that GeneratedContent meets all requirements
 * 
 * Requirement 17.2: Validate that all required fields are present
 * Requirement 2.4: Validate verse excerpt length (max 40 words)
 * Requirement 2.6: Validate total word count (700-900 words)
 * Requirement 8.6: Validate SEO description length (max 160 characters)
 */
export function validate(content: GeneratedContent): ValidationResult {
  const errors: string[] = [];
  
  // Validate field presence (Requirement 17.2)
  if (!content.title || content.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!content.verseExcerpt || content.verseExcerpt.trim().length === 0) {
    errors.push('Verse excerpt is required');
  }
  
  if (!content.explanation || content.explanation.trim().length === 0) {
    errors.push('Explanation is required');
  }
  
  if (!content.reflection || content.reflection.trim().length === 0) {
    errors.push('Reflection is required');
  }
  
  if (!content.practicalApplication || content.practicalApplication.trim().length === 0) {
    errors.push('Practical application is required');
  }
  
  if (!content.closingLine || content.closingLine.trim().length === 0) {
    errors.push('Closing line is required');
  }
  
  if (!content.seoDescription || content.seoDescription.trim().length === 0) {
    errors.push('SEO description is required');
  }
  
  // Validate title length (1-100 characters)
  if (content.title && (content.title.length < 1 || content.title.length > 100)) {
    errors.push('Title must be between 1 and 100 characters');
  }
  
  // Validate verse excerpt length (1-40 words) - Requirement 2.4
  if (content.verseExcerpt) {
    const verseWordCount = content.verseExcerpt.split(/\s+/).filter(word => word.length > 0).length;
    if (verseWordCount < 1 || verseWordCount > 40) {
      errors.push('Verse excerpt must be between 1 and 40 words');
    }
  }
  
  // Validate SEO description length (1-160 characters) - Requirement 8.6
  if (content.seoDescription && (content.seoDescription.length < 1 || content.seoDescription.length > 160)) {
    errors.push('SEO description must be between 1 and 160 characters');
  }
  
  // Validate total word count (700-900 words) - Requirement 2.6
  if (content.wordCount < 700 || content.wordCount > 900) {
    errors.push(`Total word count must be between 700 and 900 words (current: ${content.wordCount})`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Default export implementing ContentParser interface
 */
export const contentParser: ContentParser = {
  parse,
  validate
};
