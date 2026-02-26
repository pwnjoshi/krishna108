/**
 * Unit Tests for Verse Selector Component
 * 
 * Tests verse selection logic including sequential selection, wraparound at boundaries,
 * 365-day uniqueness constraint, and empty database scenarios.
 * 
 * Requirements: 3.2, 3.4
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getNextVerse } from './verse-selector';
import { VerseReference, Post } from './types';

// Mock the supabase module
let mockGetLastPublishedVerse: any;
let mockGetAllPosts: any;

vi.mock('./supabase', () => ({
  getLastPublishedVerse: () => mockGetLastPublishedVerse(),
  getAllPosts: () => mockGetAllPosts(),
}));

describe('Verse Selector', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockGetLastPublishedVerse = vi.fn();
    mockGetAllPosts = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty database scenario', () => {
    it('should return Bhagavad Gita 1.1 when no posts exist', async () => {
      // Arrange
      mockGetLastPublishedVerse.mockResolvedValue(null);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 1,
      });
    });
  });

  describe('Sequential verse selection within a chapter', () => {
    it('should select next verse in same chapter (BG 2.13 -> 2.14)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 14,
      });
    });

    it('should select next verse in same chapter (BG 1.1 -> 1.2)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 1,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 2,
      });
    });

    it('should select next verse in Srimad Bhagavatam (SB 1.2.3 -> 1.2.4)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 2,
        verse: 3,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Srimad Bhagavatam',
        chapter: 2,
        verse: 4,
      });
    });
  });

  describe('Chapter boundary transitions', () => {
    it('should wrap to next chapter at end of BG chapter (BG 1.46 -> 2.1)', async () => {
      // Arrange - Chapter 1 has 46 verses
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 46,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 1,
      });
    });

    it('should wrap to next chapter at end of BG chapter (BG 2.72 -> 3.1)', async () => {
      // Arrange - Chapter 2 has 72 verses
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 72,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 3,
        verse: 1,
      });
    });

    it('should wrap to next chapter in Srimad Bhagavatam (SB 1.1.23 -> 1.2.1)', async () => {
      // Arrange - Chapter 1 has 23 verses
      const lastVerse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 23,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Srimad Bhagavatam',
        chapter: 2,
        verse: 1,
      });
    });
  });

  describe('Scripture boundary wraparound', () => {
    it('should wrap from end of Bhagavad Gita to Srimad Bhagavatam (BG 18.78 -> SB 1.1.1)', async () => {
      // Arrange - Chapter 18 (last chapter) has 78 verses
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 18,
        verse: 78,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 1,
      });
    });

    it('should wrap from end of Srimad Bhagavatam to Bhagavad Gita (SB 1.19.43 -> BG 1.1)', async () => {
      // Arrange - Chapter 19 (last chapter in Canto 1) has 43 verses
      const lastVerse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 19,
        verse: 43,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 1,
      });
    });
  });

  describe('365-day uniqueness constraint', () => {
    it('should skip verse published within 365 days', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      // Mock a post for verse 2.14 published 100 days ago (within 365 days)
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 100);

      const mockPosts: Partial<Post>[] = [
        {
          id: '1',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.14',
          createdAt: recentDate,
        } as Post,
      ];

      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should skip 2.14 and return 2.15
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 15,
      });
    });

    it('should not skip verse published more than 365 days ago', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      // Mock a post for verse 2.14 published 400 days ago (outside 365 days)
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 400);

      const mockPosts: Partial<Post>[] = [
        {
          id: '1',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.14',
          createdAt: oldDate,
        } as Post,
      ];

      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should return 2.14 since it's been more than 365 days
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 14,
      });
    });

    it('should skip multiple verses published within 365 days', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 13,
      };

      // Mock posts for verses 2.14, 2.15, 2.16 published within 365 days
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 100);

      const mockPosts: Partial<Post>[] = [
        {
          id: '1',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.14',
          createdAt: recentDate,
        } as Post,
        {
          id: '2',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.15',
          createdAt: recentDate,
        } as Post,
        {
          id: '3',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.16',
          createdAt: recentDate,
        } as Post,
      ];

      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should skip 2.14, 2.15, 2.16 and return 2.17
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 17,
      });
    });

    it('should handle uniqueness check across chapter boundaries', async () => {
      // Arrange - At end of chapter 1
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 45,
      };

      // Mock posts for verses 1.46 and 2.1 published within 365 days
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 100);

      const mockPosts: Partial<Post>[] = [
        {
          id: '1',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '1.46',
          createdAt: recentDate,
        } as Post,
        {
          id: '2',
          scriptureSource: 'Bhagavad Gita',
          verseReference: '2.1',
          createdAt: recentDate,
        } as Post,
      ];

      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should skip 1.46 and 2.1, return 2.2
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 2,
      });
    });

    it('should handle uniqueness check for Srimad Bhagavatam verses', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 1,
      };

      // Mock a post for verse 1.2 published within 365 days
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 100);

      const mockPosts: Partial<Post>[] = [
        {
          id: '1',
          scriptureSource: 'Srimad Bhagavatam',
          verseReference: '1.2',
          createdAt: recentDate,
        } as Post,
      ];

      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should skip 1.2 and return 1.3
      expect(result).toEqual({
        source: 'Srimad Bhagavatam',
        chapter: 1,
        verse: 3,
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle verse at middle of long chapter (BG 2.36)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 36,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 2,
        verse: 37,
      });
    });

    it('should handle last verse of last chapter before scripture boundary (BG 18.77)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Bhagavad Gita',
        chapter: 18,
        verse: 77,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 18,
        verse: 78,
      });
    });

    it('should handle first verse of first chapter (BG 1.1)', async () => {
      // Arrange
      const lastVerse: VerseReference = {
        source: 'Srimad Bhagavatam',
        chapter: 19,
        verse: 43,
      };
      mockGetLastPublishedVerse.mockResolvedValue(lastVerse);
      mockGetAllPosts.mockResolvedValue([]);

      // Act
      const result = await getNextVerse();

      // Assert
      // Should wrap around to BG 1.1
      expect(result).toEqual({
        source: 'Bhagavad Gita',
        chapter: 1,
        verse: 1,
      });
    });
  });

  describe('Property-Based Tests', () => {
    /**
     * Property 9: Sequential Verse Selection
     * **Validates: Requirements 3.2**
     * 
     * For any sequence of verse selections, each subsequent verse should be the next 
     * sequential verse in the scripture (incrementing verse number, then chapter number).
     */
    it('Property 9: Sequential verse selection maintains correct ordering', async () => {
      const fc = await import('fast-check');

      await fc.assert(
        fc.asyncProperty(
          // Generate random starting verses from both scriptures
          fc.oneof(
            // Bhagavad Gita verses
            fc.record({
              source: fc.constant('Bhagavad Gita' as const),
              chapter: fc.integer({ min: 1, max: 18 }),
              verse: fc.integer({ min: 1, max: 78 }), // Max verse in any chapter
            }),
            // Srimad Bhagavatam verses (Canto 1 only)
            fc.record({
              source: fc.constant('Srimad Bhagavatam' as const),
              chapter: fc.integer({ min: 1, max: 19 }),
              verse: fc.integer({ min: 1, max: 70 }), // Max verse in any chapter
            })
          ).filter((verse) => {
            // Filter out invalid verse references based on actual scripture structure
            if (verse.source === 'Bhagavad Gita') {
              const maxVerses: Record<number, number> = {
                1: 46, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
                10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
              };
              return verse.verse <= maxVerses[verse.chapter];
            } else {
              const maxVerses: Record<number, number> = {
                1: 23, 2: 34, 3: 44, 4: 33, 5: 40, 6: 38, 7: 58, 8: 52, 9: 49,
                10: 70, 11: 39, 12: 36, 13: 60, 14: 43, 15: 51, 16: 36, 17: 46, 18: 50, 19: 43,
              };
              return verse.verse <= maxVerses[verse.chapter];
            }
          }),
          fc.integer({ min: 1, max: 10 }), // Number of sequential selections to test
          async (startVerse, sequenceLength) => {
            // Setup: Mock the database to return no recent posts
            mockGetAllPosts.mockResolvedValue([]);
            
            let currentVerse = startVerse;
            
            // Test a sequence of verse selections
            for (let i = 0; i < sequenceLength; i++) {
              mockGetLastPublishedVerse.mockResolvedValue(currentVerse);
              
              const nextVerse = await getNextVerse();
              
              // Verify sequential ordering
              const isSequential = verifySequentialOrder(currentVerse, nextVerse);
              
              if (!isSequential) {
                throw new Error(
                  `Sequential order violated: ${formatVerse(currentVerse)} -> ${formatVerse(nextVerse)}`
                );
              }
              
              currentVerse = nextVerse;
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

// ============================================================================
// Helper Functions for Property Tests
// ============================================================================

/**
 * Verify that nextVerse is the correct sequential verse after currentVerse
 */
function verifySequentialOrder(current: VerseReference, next: VerseReference): boolean {
  if (current.source === 'Bhagavad Gita') {
    const maxVerses: Record<number, number> = {
      1: 46, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
      10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
    };
    
    const maxVersesInChapter = maxVerses[current.chapter];
    
    // Case 1: Next verse in same chapter
    if (current.verse < maxVersesInChapter) {
      return next.source === 'Bhagavad Gita' &&
             next.chapter === current.chapter &&
             next.verse === current.verse + 1;
    }
    
    // Case 2: Next chapter in Bhagavad Gita
    if (current.chapter < 18) {
      return next.source === 'Bhagavad Gita' &&
             next.chapter === current.chapter + 1 &&
             next.verse === 1;
    }
    
    // Case 3: Wrap to Srimad Bhagavatam
    return next.source === 'Srimad Bhagavatam' &&
           next.chapter === 1 &&
           next.verse === 1;
  } else {
    // Srimad Bhagavatam
    const maxVerses: Record<number, number> = {
      1: 23, 2: 34, 3: 44, 4: 33, 5: 40, 6: 38, 7: 58, 8: 52, 9: 49,
      10: 70, 11: 39, 12: 36, 13: 60, 14: 43, 15: 51, 16: 36, 17: 46, 18: 50, 19: 43,
    };
    
    const maxVersesInChapter = maxVerses[current.chapter];
    
    // Case 1: Next verse in same chapter
    if (current.verse < maxVersesInChapter) {
      return next.source === 'Srimad Bhagavatam' &&
             next.chapter === current.chapter &&
             next.verse === current.verse + 1;
    }
    
    // Case 2: Next chapter in Srimad Bhagavatam
    if (current.chapter < 19) {
      return next.source === 'Srimad Bhagavatam' &&
             next.chapter === current.chapter + 1 &&
             next.verse === 1;
    }
    
    // Case 3: Wrap to Bhagavad Gita
    return next.source === 'Bhagavad Gita' &&
           next.chapter === 1 &&
           next.verse === 1;
  }
}

/**
 * Format verse reference for error messages
 */
function formatVerse(verse: VerseReference): string {
  return `${verse.source} ${verse.chapter}.${verse.verse}`;
}
