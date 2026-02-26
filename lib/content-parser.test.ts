/**
 * Unit Tests for Content Parser Component
 * 
 * Tests parsing and validation of AI-generated content including field extraction,
 * required field validation, length constraints, word count calculation, and error handling.
 * 
 * Requirements: 17.2
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { parse, validate } from './content-parser';
import { GeneratedContent } from './types';

describe('Content Parser', () => {
  describe('parse() - Field extraction from valid AI responses', () => {
    it('should successfully parse valid JSON content with all fields', () => {
      // Arrange
      const rawContent = JSON.stringify({
        title: 'The Eternal Soul',
        verseExcerpt: 'For the soul there is neither birth nor death',
        explanation: 'This verse explains the eternal nature of the soul. '.repeat(50), // ~350 words
        reflection: 'We can reflect on how understanding the soul brings peace. '.repeat(30), // ~210 words
        practicalApplication: 'Apply this wisdom by meditating daily on your eternal nature. '.repeat(30), // ~210 words
        closingLine: 'May you realize your eternal spiritual nature',
        seoDescription: 'Discover the eternal nature of the soul through Bhagavad Gita wisdom'
      });

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(true);
      expect(result.content).toBeDefined();
      expect(result.content?.title).toBe('The Eternal Soul');
      expect(result.content?.verseExcerpt).toBe('For the soul there is neither birth nor death');
      expect(result.content?.explanation).toContain('eternal nature of the soul');
      expect(result.content?.reflection).toContain('understanding the soul');
      expect(result.content?.practicalApplication).toContain('meditating daily');
      expect(result.content?.closingLine).toBe('May you realize your eternal spiritual nature');
      expect(result.content?.seoDescription).toBe('Discover the eternal nature of the soul through Bhagavad Gita wisdom');
      expect(result.error).toBeUndefined();
    });

    it('should calculate word count correctly from explanation, reflection, and practicalApplication', () => {
      // Arrange - Create content with known word counts
      const explanation = 'word '.repeat(300); // 300 words
      const reflection = 'word '.repeat(250); // 250 words
      const practicalApplication = 'word '.repeat(200); // 200 words
      
      const rawContent = JSON.stringify({
        title: 'Test Title',
        verseExcerpt: 'Test verse',
        explanation,
        reflection,
        practicalApplication,
        closingLine: 'Test closing',
        seoDescription: 'Test description'
      });

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(true);
      expect(result.content?.wordCount).toBe(750); // 300 + 250 + 200
    });

    it('should handle empty strings in fields and set them to empty', () => {
      // Arrange
      const rawContent = JSON.stringify({
        title: '',
        verseExcerpt: '',
        explanation: '',
        reflection: '',
        practicalApplication: '',
        closingLine: '',
        seoDescription: ''
      });

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(true);
      expect(result.content?.title).toBe('');
      expect(result.content?.verseExcerpt).toBe('');
      expect(result.content?.wordCount).toBe(0);
    });

    it('should handle missing fields by setting them to empty strings', () => {
      // Arrange - JSON with some missing fields
      const rawContent = JSON.stringify({
        title: 'Test Title',
        explanation: 'Test explanation'
        // Missing other fields
      });

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(true);
      expect(result.content?.title).toBe('Test Title');
      expect(result.content?.verseExcerpt).toBe('');
      expect(result.content?.reflection).toBe('');
      expect(result.content?.practicalApplication).toBe('');
      expect(result.content?.closingLine).toBe('');
      expect(result.content?.seoDescription).toBe('');
    });

    it('should filter out empty words when calculating word count', () => {
      // Arrange - Content with multiple spaces
      const rawContent = JSON.stringify({
        title: 'Test',
        verseExcerpt: 'Test',
        explanation: 'word1   word2    word3', // Multiple spaces
        reflection: 'word4  word5',
        practicalApplication: 'word6',
        closingLine: 'Test',
        seoDescription: 'Test'
      });

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(true);
      expect(result.content?.wordCount).toBe(6); // Should count only actual words
    });
  });

  describe('parse() - Error handling for malformed content', () => {
    it('should return descriptive error for invalid JSON', () => {
      // Arrange
      const rawContent = 'This is not valid JSON {';

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Failed to parse content');
      expect(result.content).toBeUndefined();
    });

    it('should return descriptive error for empty string', () => {
      // Arrange
      const rawContent = '';

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Failed to parse content');
    });

    it('should handle null JSON value gracefully', () => {
      // Arrange
      const rawContent = 'null';

      // Act
      const result = parse(rawContent);

      // Assert
      // JSON.parse('null') returns null, which causes errors when accessing properties
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Failed to parse content');
    });

    it('should return descriptive error for malformed JSON with syntax error', () => {
      // Arrange
      const rawContent = '{"title": "Test", "explanation": }'; // Missing value

      // Act
      const result = parse(rawContent);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to parse content');
    });
  });

  describe('validate() - Required field validation', () => {
    const createValidContent = (): GeneratedContent => ({
      title: 'Valid Title',
      verseExcerpt: 'Valid verse excerpt with some words',
      explanation: 'word '.repeat(300), // 300 words
      reflection: 'word '.repeat(250), // 250 words
      practicalApplication: 'word '.repeat(200), // 200 words
      closingLine: 'Valid closing line',
      seoDescription: 'Valid SEO description',
      wordCount: 750
    });

    it('should validate content with all required fields present', () => {
      // Arrange
      const content = createValidContent();

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return error when title is missing', () => {
      // Arrange
      const content = createValidContent();
      content.title = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should return error when title is only whitespace', () => {
      // Arrange
      const content = createValidContent();
      content.title = '   ';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should return error when verseExcerpt is missing', () => {
      // Arrange
      const content = createValidContent();
      content.verseExcerpt = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Verse excerpt is required');
    });

    it('should return error when explanation is missing', () => {
      // Arrange
      const content = createValidContent();
      content.explanation = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Explanation is required');
    });

    it('should return error when reflection is missing', () => {
      // Arrange
      const content = createValidContent();
      content.reflection = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Reflection is required');
    });

    it('should return error when practicalApplication is missing', () => {
      // Arrange
      const content = createValidContent();
      content.practicalApplication = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Practical application is required');
    });

    it('should return error when closingLine is missing', () => {
      // Arrange
      const content = createValidContent();
      content.closingLine = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Closing line is required');
    });

    it('should return error when seoDescription is missing', () => {
      // Arrange
      const content = createValidContent();
      content.seoDescription = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('SEO description is required');
    });

    it('should return multiple errors when multiple fields are missing', () => {
      // Arrange
      const content = createValidContent();
      content.title = '';
      content.verseExcerpt = '';
      content.explanation = '';

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors).toContain('Title is required');
      expect(result.errors).toContain('Verse excerpt is required');
      expect(result.errors).toContain('Explanation is required');
    });
  });

  describe('validate() - Length constraints', () => {
    const createValidContent = (): GeneratedContent => ({
      title: 'Valid Title',
      verseExcerpt: 'Valid verse excerpt with some words',
      explanation: 'word '.repeat(300),
      reflection: 'word '.repeat(250),
      practicalApplication: 'word '.repeat(200),
      closingLine: 'Valid closing line',
      seoDescription: 'Valid SEO description',
      wordCount: 750
    });

    it('should validate title within length constraints (1-100 characters)', () => {
      // Arrange
      const content = createValidContent();
      content.title = 'A'.repeat(50); // 50 characters

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return error when title exceeds 100 characters', () => {
      // Arrange
      const content = createValidContent();
      content.title = 'A'.repeat(101);

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Title must be between 1 and 100 characters');
    });

    it('should validate verse excerpt within word limit (1-40 words)', () => {
      // Arrange
      const content = createValidContent();
      content.verseExcerpt = 'word '.repeat(30).trim(); // 30 words

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should return error when verse excerpt exceeds 40 words', () => {
      // Arrange
      const content = createValidContent();
      content.verseExcerpt = 'word '.repeat(41).trim(); // 41 words

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Verse excerpt must be between 1 and 40 words');
    });

    it('should validate verse excerpt at exactly 40 words', () => {
      // Arrange
      const content = createValidContent();
      content.verseExcerpt = 'word '.repeat(40).trim(); // Exactly 40 words

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should validate SEO description within length constraints (1-160 characters)', () => {
      // Arrange
      const content = createValidContent();
      content.seoDescription = 'A'.repeat(160); // Exactly 160 characters

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should return error when SEO description exceeds 160 characters', () => {
      // Arrange
      const content = createValidContent();
      content.seoDescription = 'A'.repeat(161);

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('SEO description must be between 1 and 160 characters');
    });
  });

  describe('validate() - Word count validation', () => {
    const createValidContent = (): GeneratedContent => ({
      title: 'Valid Title',
      verseExcerpt: 'Valid verse excerpt',
      explanation: 'word '.repeat(300),
      reflection: 'word '.repeat(250),
      practicalApplication: 'word '.repeat(200),
      closingLine: 'Valid closing line',
      seoDescription: 'Valid SEO description',
      wordCount: 750
    });

    it('should validate content with word count at minimum (700 words)', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 700;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should validate content with word count at maximum (900 words)', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 900;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should validate content with word count in middle of range (800 words)', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 800;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(true);
    });

    it('should return error when word count is below minimum (699 words)', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 699;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Total word count must be between 700 and 900 words (current: 699)');
    });

    it('should return error when word count exceeds maximum (901 words)', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 901;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Total word count must be between 700 and 900 words (current: 901)');
    });

    it('should include current word count in error message', () => {
      // Arrange
      const content = createValidContent();
      content.wordCount = 500;

      // Act
      const result = validate(content);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('current: 500'))).toBe(true);
    });
  });

  describe('Integration - parse() and validate() together', () => {
    it('should successfully parse and validate complete valid content', () => {
      // Arrange
      const rawContent = JSON.stringify({
        title: 'The Eternal Soul',
        verseExcerpt: 'For the soul there is neither birth nor death',
        explanation: 'word '.repeat(300),
        reflection: 'word '.repeat(250),
        practicalApplication: 'word '.repeat(200),
        closingLine: 'May you realize your eternal nature',
        seoDescription: 'Discover the eternal nature of the soul'
      });

      // Act
      const parseResult = parse(rawContent);
      const validationResult = parseResult.success && parseResult.content 
        ? validate(parseResult.content)
        : { valid: false, errors: ['Parse failed'] };

      // Assert
      expect(parseResult.success).toBe(true);
      expect(validationResult.valid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    });

    it('should parse successfully but fail validation for invalid content', () => {
      // Arrange - Content with too few words
      const rawContent = JSON.stringify({
        title: 'Short Title',
        verseExcerpt: 'Short verse',
        explanation: 'Too short',
        reflection: 'Also short',
        practicalApplication: 'Very short',
        closingLine: 'Short',
        seoDescription: 'Short description'
      });

      // Act
      const parseResult = parse(rawContent);
      const validationResult = parseResult.success && parseResult.content 
        ? validate(parseResult.content)
        : { valid: false, errors: ['Parse failed'] };

      // Assert
      expect(parseResult.success).toBe(true);
      expect(validationResult.valid).toBe(false);
      expect(validationResult.errors.length).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// Property-Based Tests
// ============================================================================

describe('Property-Based Tests', () => {
  describe('Property 26: Content Parser Field Extraction', () => {
    /**
     * **Validates: Requirements 17.1**
     * 
     * For any valid AI-generated content string, parsing should extract all 
     * required fields into a structured object.
     */
    it('should extract all required fields from any valid JSON content', () => {
      fc.assert(
        fc.property(
          // Generate arbitrary valid content
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            verseExcerpt: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 40 }).map(words => words.join(' ')),
            explanation: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')),
            reflection: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')),
            practicalApplication: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')),
            closingLine: fc.string({ minLength: 1, maxLength: 200 }),
            seoDescription: fc.string({ minLength: 1, maxLength: 160 })
          }),
          (content) => {
            // Arrange
            const rawContent = JSON.stringify(content);
            
            // Act
            const result = parse(rawContent);
            
            // Assert
            expect(result.success).toBe(true);
            expect(result.content).toBeDefined();
            expect(result.content?.title).toBe(content.title);
            expect(result.content?.verseExcerpt).toBe(content.verseExcerpt);
            expect(result.content?.explanation).toBe(content.explanation);
            expect(result.content?.reflection).toBe(content.reflection);
            expect(result.content?.practicalApplication).toBe(content.practicalApplication);
            expect(result.content?.closingLine).toBe(content.closingLine);
            expect(result.content?.seoDescription).toBe(content.seoDescription);
            expect(result.content?.wordCount).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 27: Content Parser Validation', () => {
    /**
     * **Validates: Requirements 17.2**
     * 
     * For any content object missing required fields, validation should fail 
     * and return a list of missing fields.
     */
    it('should fail validation and list missing fields for incomplete content', () => {
      fc.assert(
        fc.property(
          // Generate content with at least one missing field
          fc.record({
            title: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: '' }),
            verseExcerpt: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 40 }).map(words => words.join(' ')), { nil: '' }),
            explanation: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')), { nil: '' }),
            reflection: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')), { nil: '' }),
            practicalApplication: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 100, maxLength: 400 }).map(words => words.join(' ')), { nil: '' }),
            closingLine: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: '' }),
            seoDescription: fc.option(fc.string({ minLength: 1, maxLength: 160 }), { nil: '' }),
            wordCount: fc.integer({ min: 700, max: 900 })
          }).filter(content => {
            // Ensure at least one field is empty
            return content.title === '' || 
                   content.verseExcerpt === '' || 
                   content.explanation === '' || 
                   content.reflection === '' || 
                   content.practicalApplication === '' || 
                   content.closingLine === '' || 
                   content.seoDescription === '';
          }),
          (content) => {
            // Act
            const result = validate(content as GeneratedContent);
            
            // Assert
            expect(result.valid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
            
            // Verify that error messages correspond to missing fields
            if (content.title === '') {
              expect(result.errors.some(err => err.includes('Title'))).toBe(true);
            }
            if (content.verseExcerpt === '') {
              expect(result.errors.some(err => err.includes('Verse excerpt'))).toBe(true);
            }
            if (content.explanation === '') {
              expect(result.errors.some(err => err.includes('Explanation'))).toBe(true);
            }
            if (content.reflection === '') {
              expect(result.errors.some(err => err.includes('Reflection'))).toBe(true);
            }
            if (content.practicalApplication === '') {
              expect(result.errors.some(err => err.includes('Practical application'))).toBe(true);
            }
            if (content.closingLine === '') {
              expect(result.errors.some(err => err.includes('Closing line'))).toBe(true);
            }
            if (content.seoDescription === '') {
              expect(result.errors.some(err => err.includes('SEO description'))).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 29: Content Round-Trip Preservation', () => {
    /**
     * **Validates: Requirements 17.5**
     * 
     * For any valid Post object, serializing to HTML then parsing back should 
     * produce an equivalent Post object with all fields preserved.
     * 
     * Note: Since we don't have a formatter yet, we test the simpler round-trip:
     * GeneratedContent -> JSON string -> parse -> GeneratedContent
     */
    it('should preserve all fields through JSON serialization round-trip', () => {
      fc.assert(
        fc.property(
          // Generate valid content that passes validation
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            verseExcerpt: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 40 }).map(words => words.join(' ')),
            explanation: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 300, maxLength: 400 }).map(words => words.join(' ')),
            reflection: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 200, maxLength: 300 }).map(words => words.join(' ')),
            practicalApplication: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 200, maxLength: 300 }).map(words => words.join(' ')),
            closingLine: fc.string({ minLength: 1, maxLength: 200 }),
            seoDescription: fc.string({ minLength: 1, maxLength: 160 })
          }),
          (originalContent) => {
            // Arrange - Serialize to JSON
            const serialized = JSON.stringify(originalContent);
            
            // Act - Parse back
            const parseResult = parse(serialized);
            
            // Assert - All fields should be preserved
            expect(parseResult.success).toBe(true);
            expect(parseResult.content).toBeDefined();
            
            if (parseResult.content) {
              expect(parseResult.content.title).toBe(originalContent.title);
              expect(parseResult.content.verseExcerpt).toBe(originalContent.verseExcerpt);
              expect(parseResult.content.explanation).toBe(originalContent.explanation);
              expect(parseResult.content.reflection).toBe(originalContent.reflection);
              expect(parseResult.content.practicalApplication).toBe(originalContent.practicalApplication);
              expect(parseResult.content.closingLine).toBe(originalContent.closingLine);
              expect(parseResult.content.seoDescription).toBe(originalContent.seoDescription);
              
              // Word count should be calculated correctly
              const expectedWordCount = [
                originalContent.explanation,
                originalContent.reflection,
                originalContent.practicalApplication
              ].join(' ').split(/\s+/).filter(word => word.length > 0).length;
              
              expect(parseResult.content.wordCount).toBe(expectedWordCount);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
