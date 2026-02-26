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
 * Initialize Nebius AI client with API key from environment
 * Throws an error if NEBIUS_API_KEY is not configured
 */
if (!process.env.NEBIUS_API_KEY) {
  throw new Error('NEBIUS_API_KEY environment variable is not set');
}

export const openai = new OpenAI({
  baseURL: 'https://api.tokenfactory.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

/**
 * Default model to use for content generation (Nebius AI - Gemma 2)
 */
export const DEFAULT_MODEL = 'google/gemma-2-2b-it';

/**
 * Maximum tokens for content generation
 */
export const MAX_TOKENS = 2000;
