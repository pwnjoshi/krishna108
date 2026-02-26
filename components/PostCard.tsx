import Link from 'next/link';
import { Post } from '@/lib/types';

/**
 * PostCard Component
 * 
 * Displays a post preview card with:
 * - Post title
 * - Excerpt from the post
 * - Publication date
 * - Link to full post page
 * - Design system styling
 * - Mobile responsive layout
 * 
 * Requirements: 5.4, 5.5, 6.5
 */

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Create excerpt from explanation (first 150 characters)
  const excerpt = post.explanation.length > 150 
    ? post.explanation.substring(0, 150) + '...'
    : post.explanation;

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`} className="group">
        {/* Scripture Source Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-saffron bg-saffron/10 rounded-full">
            {post.scriptureSource} {post.verseReference}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-saffron transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {excerpt}
        </p>

        {/* Publication Date */}
        <div className="flex items-center justify-between">
          <time 
            dateTime={new Date(post.createdAt).toISOString()} 
            className="text-sm text-gray-500"
          >
            {formattedDate}
          </time>
          
          {/* Read More Link */}
          <span className="text-saffron font-medium text-sm group-hover:underline">
            Read More →
          </span>
        </div>
      </Link>
    </article>
  );
}
