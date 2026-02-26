/**
 * Nebius AI Client Configuration (OpenAI-compatible API)
 * 
 * This module initializes and exports the AI client for content generation.
 * The client is configured to use Nebius AI with Gemma 2 model.
 * 
 * Requirements: 10.1
 */

import OpenAI from 'openai';

/**
 * Default model to use for content generation (Nebius AI - Gemma 2)
 */
export const DEFAULT_MODEL = 'google/gemma-2-2b-it';

/**
 * Maximum tokens for content generation
 */
export const MAX_TOKENS = 2000;

/**
 * Lazy-initialized Nebius AI client
 * Only creates the client when first accessed, allowing builds without env vars
 */
let _openaiClient: OpenAI | null = null;

/**
 * Get or create the OpenAI client instance
 * Throws an error if NEBIUS_API_KEY is not configured at runtime
 */
export function getOpenAIClient(): OpenAI {
  if (!_openaiClient) {
    if (!process.env.NEBIUS_API_KEY) {
      throw new Error('NEBIUS_API_KEY environment variable is not set');
    }
    
    _openaiClient = new OpenAI({
      baseURL: 'https://api.tokenfactory.nebius.com/v1/',
      apiKey: process.env.NEBIUS_API_KEY,
    });
  }
  
  return _openaiClient;
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use getOpenAIClient() instead
 */
export const openai = new Proxy({} as OpenAI, {
  get(_target, prop) {
    return getOpenAIClient()[prop as keyof OpenAI];
  }
});
