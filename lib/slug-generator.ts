/**
 * Slug Generator for Krishna108 Devotional Platform
 * 
 * Generates URL-friendly slugs from post titles with uniqueness enforcement.
 * 
 * Requirements:
 * - 18.1: Generate URL-friendly slugs from post titles
 * - 18.2: Convert to lowercase and replace spaces with hyphens
 * - 18.3: Remove special characters (keep alphanumeric and hyphens)
 * - 18.4: Ensure uniqueness by appending numbers if needed
 * - 18.5: Limit slug length to 100 characters
 */

/**
 * Interface for slug generation functionality
 */
export interface SlugGenerator {
  /**
   * Generates a URL-friendly slug from a title
   * @param title - The post title to convert
   * @returns A URL-friendly slug
   */
  generateSlug(title: string): string;

  /**
   * Ensures slug uniqueness by appending numbers if needed
   * @param slug - The base slug to check
   * @param existingSlugs - Array of existing slugs to check against
   * @returns A unique slug
   */
  ensureUnique(slug: string, existingSlugs: string[]): string;
}

/**
 * Generates a URL-friendly slug from a title
 * 
 * Algorithm:
 * 1. Convert to lowercase
 * 2. Replace spaces with hyphens
 * 3. Remove special characters (keep alphanumeric and hyphens)
 * 4. Remove consecutive hyphens
 * 5. Trim hyphens from start and end
 * 6. Limit to 100 characters
 * 
 * @param title - The post title to convert
 * @returns A URL-friendly slug
 * 
 * @example
 * generateSlug("Finding Peace in Krishna's Wisdom") // "finding-peace-in-krishnas-wisdom"
 * generateSlug("The Path to Devotion!") // "the-path-to-devotion"
 * generateSlug("Bhagavad Gita 2.13 - Understanding the Soul") // "bhagavad-gita-213-understanding-the-soul"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces (including multiple) with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters (keep alphanumeric and hyphens)
    .replace(/-+/g, '-') // Replace consecutive hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end
    .slice(0, 100); // Limit to 100 characters
}

/**
 * Ensures slug uniqueness by appending incrementing numbers if needed
 * 
 * If the slug already exists, appends "-2", "-3", etc. until a unique slug is found.
 * The numeric suffix is included in the 100-character limit.
 * 
 * @param slug - The base slug to check
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 * 
 * @example
 * ensureUnique("my-post", ["my-post"]) // "my-post-2"
 * ensureUnique("my-post", ["my-post", "my-post-2"]) // "my-post-3"
 * ensureUnique("my-post", []) // "my-post"
 */
export function ensureUnique(slug: string, existingSlugs: string[]): string {
  // If slug doesn't exist, return it as-is
  if (!existingSlugs.includes(slug)) {
    return slug;
  }

  // Find the next available number
  let counter = 2;
  let uniqueSlug = `${slug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }

  // Ensure the final slug doesn't exceed 100 characters
  if (uniqueSlug.length > 100) {
    // Trim the base slug to make room for the suffix
    const suffix = `-${counter}`;
    const maxBaseLength = 100 - suffix.length;
    const trimmedBase = slug.slice(0, maxBaseLength);
    uniqueSlug = `${trimmedBase}${suffix}`;
  }

  return uniqueSlug;
}

/**
 * Default implementation of SlugGenerator interface
 */
export const slugGenerator: SlugGenerator = {
  generateSlug,
  ensureUnique,
};
