import { Post, PostInput, VerseReference } from './types';
import { MOCK_POSTS } from './data';

export async function savePost(post: PostInput): Promise<Post> {
  console.log('Mock savePost:', post);
  return {
    ...post,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
    scriptureSource: post.scriptureSource as 'Bhagavad Gita' | 'Srimad Bhagavatam',
  } as Post;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getRecentPosts(limit: number): Promise<Post[]> {
  return MOCK_POSTS.slice(0, limit);
}

export async function getLastPublishedVerse(): Promise<VerseReference | null> {
  const lastPost = MOCK_POSTS[0];
  if (!lastPost) return null;
  const parts = lastPost.verseReference.split('.').map(Number);
  return {
    source: lastPost.scriptureSource as 'Bhagavad Gita' | 'Srimad Bhagavatam',
    chapter: parts[0],
    verse: parts[parts.length - 1],
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return MOCK_POSTS;
}

const supabaseAPI = {
  savePost,
  getPostBySlug,
  getRecentPosts,
  getLastPublishedVerse,
  getAllPosts,
};

export default supabaseAPI;
