/**
 * Content Generator Component
 * 
 * This module orchestrates AI-powered devotional content creation using OpenAI.
 * It generates structured posts based on scripture verses with ISKCON-aligned philosophy.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 2.3, 2.5
 */

import { openai, DEFAULT_MODEL, MAX_TOKENS } from './openai';
import { VerseReference, GeneratedContent } from './types';

/**
 * ContentGenerator interface for creating devotional posts
 */
export interface ContentGenerator {
  generatePost(verse: VerseReference): Promise<GeneratedContent>;
}

/**
 * Build structured prompt template for content generation
 * 
 * Requirements: 10.2, 10.3, 10.4, 2.3, 2.5
 */
function buildPrompt(verse: VerseReference): string {
  return `You are a devotional content writer for Krishna108, creating daily posts for youth and devotees in Nepal.

Scripture Reference: ${verse.source} ${verse.chapter}.${verse.verse}

Create a devotional post with the following structure:

1. Title: Engaging and SEO-friendly (60 characters max)
2. Verse Excerpt: Brief quote from the verse (40 words max)
3. Simple Meaning: Clear explanation of the verse
4. Deep Reflection: Philosophical insights aligned with ISKCON teachings
5. Practical Application: How to apply this wisdom in daily life
6. Closing Inspiration: Uplifting conclusion
7. SEO Description: Meta description (160 characters max)

Tone: Peaceful, respectful, ISKCON-aligned Vaishnava philosophy
Audience: Youth and devotees in Nepal
Length: 700-900 words total (for sections 3-6 combined)
Important: Do NOT copy copyrighted purports. Create original reflections.

Return the content in the following JSON format:
{
  "title": "...",
  "verseExcerpt": "...",
  "explanation": "...",
  "reflection": "...",
  "practicalApplication": "...",
  "closingLine": "...",
  "seoDescription": "..."
}`;
}

/**
 * Generate devotional post content using OpenAI API
 * 
 * Implements retry logic: retries once on API failure
 * Logs errors for monitoring and debugging
 * 
 * Requirements: 10.1, 10.5
 */
export async function generatePost(verse: VerseReference): Promise<GeneratedContent> {
  const prompt = buildPrompt(verse);
  
  let lastError: Error | null = null;
  
  // Retry logic: attempt twice (initial + 1 retry)
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`[ContentGenerator] Generating content for ${verse.source} ${verse.chapter}.${verse.verse} (attempt ${attempt}/2)`);
      
      const response = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a devotional content writer specializing in ISKCON Vaishnava philosophy. You create engaging, authentic spiritual content for youth and devotees.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });
      
      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('OpenAI returned empty response');
      }
      
      // Parse JSON response
      const parsed = JSON.parse(content);
      
      // Calculate word count
      const wordCount = [
        parsed.explanation || '',
        parsed.reflection || '',
        parsed.practicalApplication || ''
      ].join(' ').split(/\s+/).filter(word => word.length > 0).length;
      
      const generatedContent: GeneratedContent = {
        title: parsed.title || '',
        verseExcerpt: parsed.verseExcerpt || '',
        explanation: parsed.explanation || '',
        reflection: parsed.reflection || '',
        practicalApplication: parsed.practicalApplication || '',
        closingLine: parsed.closingLine || '',
        seoDescription: parsed.seoDescription || '',
        wordCount
      };
      
      console.log(`[ContentGenerator] Successfully generated content (${wordCount} words)`);
      
      return generatedContent;
      
    } catch (error) {
      lastError = error as Error;
      
      // Log error with context (Requirement 10.5)
      console.error(`[ContentGenerator] Error on attempt ${attempt}/2:`, {
        error: lastError.message,
        verse: `${verse.source} ${verse.chapter}.${verse.verse}`,
        timestamp: new Date().toISOString()
      });
      
      // If this was the last attempt, throw the error
      if (attempt === 2) {
        break;
      }
      
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // If we get here, both attempts failed
  throw new Error(`Content generation failed after 2 attempts: ${lastError?.message}`);
}

/**
 * Default export implementing ContentGenerator interface
 */
export const contentGenerator: ContentGenerator = {
  generatePost
};
