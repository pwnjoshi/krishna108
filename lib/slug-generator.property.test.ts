/**
 * Property-Based Tests for Slug Generator
 * 
 * These tests verify universal properties that should hold across all inputs
 * using fast-check for property-based testing.
 * 
 * Feature: krishna108-devotional-platform
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { generateSlug, ensureUnique } from './slug-generator';

describe('Slug Generator - Property-Based Tests', () => {
  // Feature: krishna108-devotional-platform, Property 30: Slug URL-Friendliness
  // **Validates: Requirements 18.1, 18.2, 18.3**
  describe('Property 30: Slug URL-Friendliness', () => {
    it('generated slugs contain only lowercase, numbers, and hyphens', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }), // Random titles
          (title) => {
            const slug = generateSlug(title);
            
            // If slug is empty (all special chars), that's valid
            if (slug === '') {
              return true;
            }
            
            // Otherwise, must match the valid pattern
            const validPattern = /^[a-z0-9-]+$/;
            expect(slug).toMatch(validPattern);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs never contain uppercase letters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            const hasUppercase = /[A-Z]/.test(slug);
            expect(hasUppercase).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs never contain spaces', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            expect(slug).not.toContain(' ');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs never contain special characters except hyphens', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            
            // Check each character is alphanumeric or hyphen
            for (const char of slug) {
              const isValid = /[a-z0-9-]/.test(char);
              expect(isValid).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs never start or end with hyphens', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            
            if (slug.length > 0) {
              expect(slug[0]).not.toBe('-');
              expect(slug[slug.length - 1]).not.toBe('-');
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs never contain consecutive hyphens', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            expect(slug).not.toContain('--');
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: krishna108-devotional-platform, Property 31: Slug Uniqueness Enforcement
  // **Validates: Requirements 18.4**
  describe('Property 31: Slug Uniqueness Enforcement', () => {
    it('ensureUnique always returns a slug not in the existing list', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          fc.array(fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)), { maxLength: 20 }),
          (slug, existingSlugs) => {
            const uniqueSlug = ensureUnique(slug, existingSlugs);
            expect(existingSlugs).not.toContain(uniqueSlug);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('ensureUnique returns original slug when not in existing list', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          fc.array(fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)), { maxLength: 20 }),
          (slug, existingSlugs) => {
            // Only test when slug is not in existing list
            if (!existingSlugs.includes(slug)) {
              const uniqueSlug = ensureUnique(slug, existingSlugs);
              expect(uniqueSlug).toBe(slug);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('ensureUnique appends numeric suffix when slug exists', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          (slug) => {
            const existingSlugs = [slug];
            const uniqueSlug = ensureUnique(slug, existingSlugs);
            
            // Should have a numeric suffix
            expect(uniqueSlug).toMatch(/-\d+$/);
            expect(uniqueSlug).not.toBe(slug);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('ensureUnique produces different results for repeated calls with same base', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          (slug) => {
            const existingSlugs = [slug];
            const unique1 = ensureUnique(slug, existingSlugs);
            
            existingSlugs.push(unique1);
            const unique2 = ensureUnique(slug, existingSlugs);
            
            // All three should be different
            expect(unique1).not.toBe(slug);
            expect(unique2).not.toBe(slug);
            expect(unique2).not.toBe(unique1);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: krishna108-devotional-platform, Property 32: Slug Length Limit
  // **Validates: Requirements 18.5**
  describe('Property 32: Slug Length Limit', () => {
    it('generated slugs never exceed 100 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 500 }), // Test with very long strings
          (title) => {
            const slug = generateSlug(title);
            expect(slug.length).toBeLessThanOrEqual(100);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('unique slugs with suffixes never exceed 100 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          fc.array(fc.string({ minLength: 1, maxLength: 200 }).map(s => generateSlug(s)), { minLength: 1, maxLength: 50 }),
          (slug, existingSlugs) => {
            // Add the slug to existing to force a suffix
            const allExisting = [...existingSlugs, slug];
            const uniqueSlug = ensureUnique(slug, allExisting);
            expect(uniqueSlug.length).toBeLessThanOrEqual(100);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('slugs at exactly 100 characters are valid', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 100, maxLength: 200 }),
          (title) => {
            const slug = generateSlug(title);
            
            if (slug.length === 100) {
              // Should still be valid URL-friendly format
              const validPattern = /^[a-z0-9-]+$/;
              expect(slug).toMatch(validPattern);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Combined property: Idempotence
  describe('Additional Properties', () => {
    it('generateSlug is idempotent (applying twice gives same result)', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 200 }),
          (title) => {
            const slug1 = generateSlug(title);
            const slug2 = generateSlug(slug1);
            expect(slug1).toBe(slug2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('ensureUnique maintains URL-friendliness', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)).filter(s => s.length > 0),
          fc.array(fc.string({ minLength: 1, maxLength: 50 }).map(s => generateSlug(s)), { maxLength: 20 }),
          (slug, existingSlugs) => {
            const uniqueSlug = ensureUnique(slug, existingSlugs);
            
            // Result should still be URL-friendly
            if (uniqueSlug.length > 0) {
              const validPattern = /^[a-z0-9-]+$/;
              expect(uniqueSlug).toMatch(validPattern);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('empty or whitespace-only titles produce empty slugs', () => {
      fc.assert(
        fc.property(
          fc.string().filter(s => s.trim().length === 0 || /^[^a-zA-Z0-9]+$/.test(s)),
          (title) => {
            const slug = generateSlug(title);
            expect(slug).toBe('');
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
