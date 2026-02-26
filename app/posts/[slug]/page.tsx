import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/supabase';
import PostContent from '@/components/PostContent';

/**
 * Dynamic Post Page
 * 
 * Displays individual post pages at /posts/[slug]
 * - Fetches post by slug from database
 * - Renders using PostContent component
 * - Returns 404 for non-existent slugs
 * - Mobile responsive
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */

// Force dynamic rendering since we need to fetch from database
export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  // Fetch post by slug
  const post = await getPostBySlug(slug);

  // Return 404 if post doesn't exist
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <PostContent post={post} />
    </main>
  );
}
