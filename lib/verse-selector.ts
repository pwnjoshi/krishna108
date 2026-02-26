/**
 * Verse Selector Component for Krishna108 Devotional Platform
 * 
 * This module implements the logic for selecting the next scripture verse to be published.
 * It maintains sequential progression through scriptures, handles wraparound at boundaries,
 * and ensures no verse is repeated within 365 days.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { VerseReference } from './types';
import { getLastPublishedVerse, getAllPosts } from './supabase';

// ============================================================================
// Scripture Metadata
// ============================================================================

/**
 * Bhagavad Gita structure: 18 chapters with varying verse counts
 * Source: Bhagavad Gita As It Is by A.C. Bhaktivedanta Swami Prabhupada
 */
const BHAGAVAD_GITA_STRUCTURE: Record<number, number> = {
  1: 46,   // Chapter 1: 46 verses
  2: 72,   // Chapter 2: 72 verses
  3: 43,   // Chapter 3: 43 verses
  4: 42,   // Chapter 4: 42 verses
  5: 29,   // Chapter 5: 29 verses
  6: 47,   // Chapter 6: 47 verses
  7: 30,   // Chapter 7: 30 verses
  8: 28,   // Chapter 8: 28 verses
  9: 34,   // Chapter 9: 34 verses
  10: 42,  // Chapter 10: 42 verses
  11: 55,  // Chapter 11: 55 verses
  12: 20,  // Chapter 12: 20 verses
  13: 35,  // Chapter 13: 35 verses (some editions have 34)
  14: 27,  // Chapter 14: 27 verses
  15: 20,  // Chapter 15: 20 verses
  16: 24,  // Chapter 16: 24 verses
  17: 28,  // Chapter 17: 28 verses
  18: 78,  // Chapter 18: 78 verses
};

/**
 * Srimad Bhagavatam structure: 12 cantos with varying chapters
 * For simplicity, we'll start with Canto 1 which has 19 chapters
 * Note: Srimad Bhagavatam uses Canto.Chapter.Verse format (e.g., 1.2.3)
 * 
 * This is a simplified structure focusing on Canto 1 for initial implementation.
 * Can be expanded to include all 12 cantos as needed.
 */
const SRIMAD_BHAGAVATAM_STRUCTURE: Record<number, Record<number, number>> = {
  1: {  // Canto 1
    1: 23,   // Chapter 1: 23 verses
    2: 34,   // Chapter 2: 34 verses
    3: 44,   // Chapter 3: 44 verses
    4: 33,   // Chapter 4: 33 verses
    5: 40,   // Chapter 5: 40 verses
    6: 38,   // Chapter 6: 38 verses
    7: 58,   // Chapter 7: 58 verses
    8: 52,   // Chapter 8: 52 verses
    9: 49,   // Chapter 9: 49 verses
    10: 70,  // Chapter 10: 70 verses
    11: 39,  // Chapter 11: 39 verses
    12: 36,  // Chapter 12: 36 verses
    13: 60,  // Chapter 13: 60 verses
    14: 43,  // Chapter 14: 43 verses
    15: 51,  // Chapter 15: 51 verses
    16: 36,  // Chapter 16: 36 verses
    17: 46,  // Chapter 17: 46 verses
    18: 50,  // Chapter 18: 50 verses
    19: 43,  // Chapter 19: 43 verses
  },
};

// ============================================================================
// Verse Selector Interface
// ============================================================================

export interface VerseSelector {
  getNextVerse(): Promise<VerseReference>;
  hasVerseBeenPublishedRecently(verse: VerseReference, days: number): Promise<boolean>;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the next sequential verse after the given verse reference
 * Handles chapter boundaries and scripture wraparound
 * 
 * @param current - Current verse reference
 * @returns Next verse reference in sequence
 */
function getNextSequentialVerse(current: VerseReference): VerseReference {
  if (current.source === 'Bhagavad Gita') {
    const maxVersesInChapter = BHAGAVAD_GITA_STRUCTURE[current.chapter];
    
    // If not at end of chapter, increment verse
    if (current.verse < maxVersesInChapter) {
      return {
        source: 'Bhagavad Gita',
        chapter: current.chapter,
        verse: current.verse + 1,
      };
    }
    
    // At end of chapter, move to next chapter
    if (current.chapter < 18) {
      return {
        source: 'Bhagavad Gita',
        chapter: current.chapter + 1,
        verse: 1,
      };
    }
    
    // At end of Bhagavad Gita, wrap to Srimad Bhagavatam
    return {
      source: 'Srimad Bhagavatam',
      chapter: 1,
      verse: 1,
    };
  } else {
    // Srimad Bhagavatam logic (currently only Canto 1)
    const canto = 1; // For now, we only handle Canto 1
    const maxVersesInChapter = SRIMAD_BHAGAVATAM_STRUCTURE[canto][current.chapter];
    
    // If not at end of chapter, increment verse
    if (current.verse < maxVersesInChapter) {
      return {
        source: 'Srimad Bhagavatam',
        chapter: current.chapter,
        verse: current.verse + 1,
      };
    }
    
    // At end of chapter, move to next chapter
    if (current.chapter < 19) {
      return {
        source: 'Srimad Bhagavatam',
        chapter: current.chapter + 1,
        verse: 1,
      };
    }
    
    // At end of Srimad Bhagavatam Canto 1, wrap back to Bhagavad Gita
    return {
      source: 'Bhagavad Gita',
      chapter: 1,
      verse: 1,
    };
  }
}

/**
 * Format verse reference as a string for comparison
 * 
 * @param verse - Verse reference to format
 * @returns Formatted string (e.g., "Bhagavad Gita 2.13" or "Srimad Bhagavatam 1.2.3")
 */
function formatVerseReference(verse: VerseReference): string {
  return `${verse.source} ${verse.chapter}.${verse.verse}`;
}

/**
 * Check if a verse has been published within the specified number of days
 * 
 * @param verse - Verse reference to check
 * @param days - Number of days to look back
 * @returns True if verse was published within the specified days, false otherwise
 */
async function hasVerseBeenPublishedRecently(
  verse: VerseReference,
  days: number
): Promise<boolean> {
  const allPosts = await getAllPosts();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const verseString = `${verse.chapter}.${verse.verse}`;
  
  return allPosts.some((post) => {
    const matchesVerse = post.verseReference === verseString;
    const matchesSource = post.scriptureSource === verse.source;
    const isRecent = post.createdAt >= cutoffDate;
    
    return matchesVerse && matchesSource && isRecent;
  });
}

/**
 * Get the next verse to be published
 * Implements sequential selection with 365-day uniqueness constraint
 * 
 * @returns The next verse reference to publish
 * @throws Error if unable to find a valid verse after checking all possibilities
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */
export async function getNextVerse(): Promise<VerseReference> {
  // Get the last published verse
  const lastVerse = await getLastPublishedVerse();
  
  // If no posts exist, start with Bhagavad Gita 1.1
  if (!lastVerse) {
    return {
      source: 'Bhagavad Gita',
      chapter: 1,
      verse: 1,
    };
  }
  
  // Get the next sequential verse
  let nextVerse = getNextSequentialVerse(lastVerse);
  let attempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops
  
  // Keep trying until we find a verse that hasn't been published in 365 days
  while (await hasVerseBeenPublishedRecently(nextVerse, 365)) {
    nextVerse = getNextSequentialVerse(nextVerse);
    attempts++;
    
    if (attempts >= maxAttempts) {
      throw new Error(
        'Unable to find a verse that has not been published in the last 365 days. ' +
        'This should not happen with proper scripture coverage.'
      );
    }
  }
  
  return nextVerse;
}

// ============================================================================
// Default Export
// ============================================================================

const verseSelector = {
  getNextVerse,
  hasVerseBeenPublishedRecently,
};

export default verseSelector;
