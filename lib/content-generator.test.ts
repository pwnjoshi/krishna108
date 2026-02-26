/**
 * Unit Tests for Content Generator Component
 * 
 * Tests AI-powered content generation including prompt template structure,
 * OpenAI API integration with mock responses, retry logic on failures,
 * and error handling with logging.
 * 
 * Requirements: 10.5, 13.3
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generatePost } from './content-generator';
import { VerseReference, GeneratedContent } from './types';
import * as openaiModule from './openai';

// Mock the OpenAI module
vi.mock('./openai', () => ({
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

describe('Content Generator', () => {
  let mockCreate: any;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Get reference to the mocked create function
    mockCreate = openaiModule.openai.chat.completions.create as any;
    
    // Spy on console methods to verify logging
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('Prompt template structure', () => {
    it('should include verse reference in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Scripture Reference: Bhagavad Gita 2.13'),
            }),
          ]),
        })
      );
    });

    it('should include tone specification in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 1,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Tone: Peaceful, respectful, ISKCON-aligned Vaishnava philosophy'),
            }),
          ]),
        })
      );
    });

    it('should include audience specification in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 1,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Audience: Youth and devotees in Nepal'),
            }),
          ]),
        })
      );
    });

    it('should include structural requirements in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 3,
        verse: 5,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: any) => m.role === 'user');
      
      expect(userMessage.content).toContain('1. Title:');
      expect(userMessage.content).toContain('2. Verse Excerpt:');
      expect(userMessage.content).toContain('3. Simple Meaning:');
      expect(userMessage.content).toContain('4. Deep Reflection:');
      expect(userMessage.content).toContain('5. Practical Application:');
      expect(userMessage.content).toContain('6. Closing Inspiration:');
      expect(userMessage.content).toContain('7. SEO Description:');
    });

    it('should include word count requirement in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 4,
        verse: 10,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Length: 700-900 words total'),
            }),
          ]),
        })
      );
    });

    it('should include copyright warning in the prompt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 5,
        verse: 15,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Do NOT copy copyrighted purports'),
            }),
          ]),
        })
      );
    });
  });

  describe('OpenAI API integration with mock responses', () => {
    it('should successfully generate content with valid API response', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'The Soul Transmigrates',
                verseExcerpt: 'As the embodied soul continuously passes...',
                explanation: 'This verse explains the eternal nature of the soul.',
                reflection: 'Deep philosophical insights about the soul.',
                practicalApplication: 'How to apply this wisdom in daily life.',
                closingLine: 'May we always remember our eternal nature.',
                seoDescription: 'Understanding the eternal soul through Bhagavad Gita 2.13',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(result).toEqual({
        title: 'The Soul Transmigrates',
        verseExcerpt: 'As the embodied soul continuously passes...',
        explanation: 'This verse explains the eternal nature of the soul.',
        reflection: 'Deep philosophical insights about the soul.',
        practicalApplication: 'How to apply this wisdom in daily life.',
        closingLine: 'May we always remember our eternal nature.',
        seoDescription: 'Understanding the eternal soul through Bhagavad Gita 2.13',
        wordCount: expect.any(Number),
      });
    });

    it('should call OpenAI API with correct model and parameters', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith({
        model: 'gpt-4o-mini',
        messages: expect.any(Array),
        max_tokens: 2000,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });
    });

    it('should include system message with role specification', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            {
              role: 'system',
              content: expect.stringContaining('devotional content writer'),
            },
          ]),
        })
      );
    });

    it('should calculate word count correctly', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'One two three four five',
                reflection: 'Six seven eight',
                practicalApplication: 'Nine ten',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      // Word count should be 10 (5 + 3 + 2 from explanation, reflection, practicalApplication)
      expect(result.wordCount).toBe(10);
    });

    it('should handle Srimad Bhagavatam verses', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 1,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(result).toBeDefined();
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Scripture Reference: Srimad Bhagavatam 1.1'),
            }),
          ]),
        })
      );
    });
  });

  describe('Retry logic on failures', () => {
    it('should retry once on API failure and succeed on second attempt', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      // First call fails, second call succeeds
      mockCreate
        .mockRejectedValueOnce(new Error('API timeout'))
        .mockResolvedValueOnce(mockResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
      expect(result.title).toBe('Test Title');
    });

    it('should wait 2 seconds between retry attempts', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate
        .mockRejectedValueOnce(new Error('API timeout'))
        .mockResolvedValueOnce(mockResponse);

      // Spy on setTimeout
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout');

      // Act
      await generatePost(verse);

      // Assert
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2000);
      
      setTimeoutSpy.mockRestore();
    });

    it('should throw error after 2 failed attempts', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      // Both calls fail
      mockCreate
        .mockRejectedValueOnce(new Error('API timeout'))
        .mockRejectedValueOnce(new Error('API timeout'));

      // Act & Assert
      await expect(generatePost(verse)).rejects.toThrow('Content generation failed after 2 attempts');
      expect(mockCreate).toHaveBeenCalledTimes(2);
    });

    it('should handle network errors with retry', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    it('should handle JSON parsing errors with retry', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const validResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      const invalidResponse = {
        choices: [
          {
            message: {
              content: 'Invalid JSON {{{',
            },
          },
        ],
      };

      mockCreate
        .mockResolvedValueOnce(invalidResponse)
        .mockResolvedValueOnce(validResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(mockCreate).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });
  });

  describe('Error handling and logging', () => {
    it('should log error with context on API failure (Requirement 10.5)', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      mockCreate.mockRejectedValue(new Error('API timeout'));

      // Act
      try {
        await generatePost(verse);
      } catch (error) {
        // Expected to throw
      }

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ContentGenerator] Error on attempt'),
        expect.objectContaining({
          error: 'API timeout',
          verse: 'Bhagavad Gita 2.13',
          timestamp: expect.any(String),
        })
      );
    });

    it('should log error on both retry attempts', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      mockCreate.mockRejectedValue(new Error('API timeout'));

      // Act
      try {
        await generatePost(verse);
      } catch (error) {
        // Expected to throw
      }

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('attempt 1/2'),
        expect.any(Object)
      );
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('attempt 2/2'),
        expect.any(Object)
      );
    });

    it('should log success with word count', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'One two three',
                reflection: 'Four five',
                practicalApplication: 'Six',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ContentGenerator] Successfully generated content (6 words)')
      );
    });

    it('should log generation attempt with verse reference', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 5,
      };

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                verseExcerpt: 'Test excerpt',
                explanation: 'Test explanation',
                reflection: 'Test reflection',
                practicalApplication: 'Test application',
                closingLine: 'Test closing',
                seoDescription: 'Test SEO',
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(mockResponse);

      // Act
      await generatePost(verse);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ContentGenerator] Generating content for Srimad Bhagavatam 1.5 (attempt 1/2)')
      );
    });

    it('should throw error with descriptive message on empty response', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const emptyResponse = {
        choices: [
          {
            message: {
              content: null,
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(emptyResponse);

      // Act & Assert
      await expect(generatePost(verse)).rejects.toThrow('Content generation failed after 2 attempts');
    });

    it('should throw error with descriptive message on missing choices', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const invalidResponse = {
        choices: [],
      };

      mockCreate.mockResolvedValue(invalidResponse);

      // Act & Assert
      await expect(generatePost(verse)).rejects.toThrow('Content generation failed after 2 attempts');
    });

    it('should include original error message in final error', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      mockCreate.mockRejectedValue(new Error('Rate limit exceeded'));

      // Act & Assert
      await expect(generatePost(verse)).rejects.toThrow('Content generation failed after 2 attempts: Rate limit exceeded');
    });

    it('should handle missing fields in API response gracefully', async () => {
      // Arrange
      const verse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      const incompleteResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Test Title',
                // Missing other fields
              }),
            },
          },
        ],
      };

      mockCreate.mockResolvedValue(incompleteResponse);

      // Act
      const result = await generatePost(verse);

      // Assert
      expect(result).toEqual({
        title: 'Test Title',
        verseExcerpt: '',
        explanation: '',
        reflection: '',
        practicalApplication: '',
        closingLine: '',
        seoDescription: '',
        wordCount: 0,
      });
    });
  });
});
