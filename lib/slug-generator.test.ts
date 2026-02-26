/**
 * Unit Tests for Slug Generator
 * 
 * Tests the slug generation logic for URL-friendly slug creation
 * and uniqueness enforcement.
 */

import { describe, it, expect } from 'vitest';
import { generateSlug, ensureUnique, slugGenerator } from './slug-generator';

describe('generateSlug', () => {
  describe('lowercase conversion', () => {
    it('should convert uppercase letters to lowercase', () => {
      expect(generateSlug('HELLO WORLD')).toBe('hello-world');
    });

    it('should convert mixed case to lowercase', () => {
      expect(generateSlug('Finding Peace in Krishna')).toBe('finding-peace-in-krishna');
    });
  });

  describe('space to hyphen replacement', () => {
    it('should replace single spaces with hyphens', () => {
      expect(generateSlug('hello world')).toBe('hello-world');
    });

    it('should replace multiple consecutive spaces with single hyphen', () => {
      expect(generateSlug('hello    world')).toBe('hello-world');
    });

    it('should handle tabs and other whitespace', () => {
      expect(generateSlug('hello\t\nworld')).toBe('hello-world');
    });
  });

  describe('special character removal', () => {
    it('should remove apostrophes', () => {
      expect(generateSlug("Krishna's Wisdom")).toBe('krishnas-wisdom');
    });

    it('should remove punctuation', () => {
      expect(generateSlug('Hello, World!')).toBe('hello-world');
    });

    it('should remove parentheses and brackets', () => {
      expect(generateSlug('Bhagavad Gita (Chapter 2)')).toBe('bhagavad-gita-chapter-2');
    });

    it('should remove special symbols', () => {
      expect(generateSlug('Path @ Peace & Love')).toBe('path-peace-love');
    });

    it('should keep alphanumeric characters', () => {
      expect(generateSlug('Verse 2.13 Explained')).toBe('verse-213-explained');
    });

    it('should keep hyphens', () => {
      expect(generateSlug('Self-Realization')).toBe('self-realization');
    });
  });

  describe('hyphen normalization', () => {
    it('should remove leading hyphens', () => {
      expect(generateSlug('---hello')).toBe('hello');
    });

    it('should remove trailing hyphens', () => {
      expect(generateSlug('hello---')).toBe('hello');
    });

    it('should remove both leading and trailing hyphens', () => {
      expect(generateSlug('---hello---')).toBe('hello');
    });

    it('should collapse consecutive hyphens', () => {
      expect(generateSlug('hello---world')).toBe('hello-world');
    });
  });

  describe('length truncation', () => {
    it('should limit slug to 100 characters', () => {
      const longTitle = 'a'.repeat(150);
      const slug = generateSlug(longTitle);
      expect(slug.length).toBe(100);
    });

    it('should not truncate slugs under 100 characters', () => {
      const title = 'a'.repeat(50);
      const slug = generateSlug(title);
      expect(slug.length).toBe(50);
    });

    it('should truncate at exactly 100 characters', () => {
      const longTitle = 'This is a very long title that will definitely exceed the one hundred character limit for slugs in our system';
      const slug = generateSlug(longTitle);
      expect(slug.length).toBe(100);
      expect(slug.startsWith('this-is-a-very-long-title-that-will-definitely-exceed')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(generateSlug('')).toBe('');
    });

    it('should handle string with only special characters', () => {
      expect(generateSlug('!@#$%^&*()')).toBe('');
    });

    it('should handle string with only spaces', () => {
      expect(generateSlug('     ')).toBe('');
    });

    it('should handle single word', () => {
      expect(generateSlug('Krishna')).toBe('krishna');
    });

    it('should handle numbers', () => {
      expect(generateSlug('Chapter 2 Verse 13')).toBe('chapter-2-verse-13');
    });
  });

  describe('realistic examples', () => {
    it('should handle typical post title', () => {
      expect(generateSlug("Finding Peace in Krishna's Wisdom")).toBe('finding-peace-in-krishnas-wisdom');
    });

    it('should handle scripture reference', () => {
      expect(generateSlug('Bhagavad Gita 2.13 - Understanding the Soul')).toBe('bhagavad-gita-213-understanding-the-soul');
    });

    it('should handle title with punctuation', () => {
      expect(generateSlug('The Path to Devotion: A Guide')).toBe('the-path-to-devotion-a-guide');
    });

    it('should handle title with quotes', () => {
      expect(generateSlug('"Surrender" - The Ultimate Wisdom')).toBe('surrender-the-ultimate-wisdom');
    });
  });
});

describe('ensureUnique', () => {
  describe('uniqueness enforcement', () => {
    it('should return original slug if not in existing slugs', () => {
      expect(ensureUnique('my-post', [])).toBe('my-post');
      expect(ensureUnique('my-post', ['other-post'])).toBe('my-post');
    });

    it('should append -2 if slug exists once', () => {
      expect(ensureUnique('my-post', ['my-post'])).toBe('my-post-2');
    });

    it('should append -3 if slug and slug-2 exist', () => {
      expect(ensureUnique('my-post', ['my-post', 'my-post-2'])).toBe('my-post-3');
    });

    it('should find next available number', () => {
      expect(ensureUnique('my-post', ['my-post', 'my-post-2', 'my-post-3', 'my-post-4'])).toBe('my-post-5');
    });

    it('should handle gaps in numbering', () => {
      expect(ensureUnique('my-post', ['my-post', 'my-post-3'])).toBe('my-post-2');
    });
  });

  describe('length handling with suffixes', () => {
    it('should handle slug that becomes too long with suffix', () => {
      const longSlug = 'a'.repeat(98); // 98 characters
      const result = ensureUnique(longSlug, [longSlug]);
      expect(result.length).toBeLessThanOrEqual(100);
      expect(result).toMatch(/-2$/);
    });

    it('should trim base slug if needed to fit suffix', () => {
      const longSlug = 'a'.repeat(99); // 99 characters
      const result = ensureUnique(longSlug, [longSlug]);
      expect(result.length).toBeLessThanOrEqual(100);
      expect(result.endsWith('-2')).toBe(true);
    });

    it('should handle very long counter numbers', () => {
      const slug = 'a'.repeat(95);
      const existing = Array.from({ length: 1000 }, (_, i) => 
        i === 0 ? slug : `${slug}-${i + 1}`
      );
      const result = ensureUnique(slug, existing);
      expect(result.length).toBeLessThanOrEqual(100);
      expect(result).toMatch(/-1001$/);
    });
  });

  describe('edge cases', () => {
    it('should handle empty existing slugs array', () => {
      expect(ensureUnique('my-post', [])).toBe('my-post');
    });

    it('should handle slug with existing number suffix', () => {
      expect(ensureUnique('my-post-1', ['my-post-1'])).toBe('my-post-1-2');
    });

    it('should handle very short slug', () => {
      expect(ensureUnique('a', ['a'])).toBe('a-2');
    });
  });
});

describe('slugGenerator interface', () => {
  it('should implement generateSlug method', () => {
    expect(slugGenerator.generateSlug('Hello World')).toBe('hello-world');
  });

  it('should implement ensureUnique method', () => {
    expect(slugGenerator.ensureUnique('my-post', ['my-post'])).toBe('my-post-2');
  });

  it('should be usable as an object', () => {
    const generator = slugGenerator;
    const slug = generator.generateSlug('Test Post');
    const uniqueSlug = generator.ensureUnique(slug, [slug]);
    expect(uniqueSlug).toBe('test-post-2');
  });
});
