import { Post } from '@/lib/types';

/**
 * PostContent Component
 * 
 * Displays the complete post structure with:
 * - Title and scripture reference
 * - Verse excerpt in serif font
 * - Explanation, reflection, and practical application in sans-serif
 * - Closing inspiration
 * - Spacious layout with adequate whitespace
 * - Mobile responsive design
 * 
 * Requirements: 6.3, 6.4, 6.5, 7.3, 7.4, 7.5
 */

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <header className="mb-12 text-center">
        {/* Scripture Source Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-saffron bg-saffron/10 rounded-full">
            {post.scriptureSource} {post.verseReference}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Publication Date */}
        <time 
          dateTime={new Date(post.createdAt).toISOString()} 
          className="text-gray-500 text-sm"
        >
          {formattedDate}
        </time>
      </header>

      {/* Verse Excerpt Section - Serif Font */}
      <section className="mb-12 bg-saffron/5 border-l-4 border-saffron p-8 rounded-r-lg">
        <h2 className="text-sm uppercase tracking-wide text-gray-600 mb-3 font-sans">
          Verse
        </h2>
        <blockquote className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">
          {post.verseExcerpt}
        </blockquote>
      </section>

      {/* Main Content - Sans-serif Font */}
      <div className="prose prose-lg max-w-none">
        {/* Explanation Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Simple Meaning
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {post.explanation.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Reflection Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Deep Reflection
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {post.reflection.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Practical Application Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Practical Application
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {post.practicalApplication.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Closing Line Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-saffron/10 to-transparent p-6 rounded-lg">
            <p className="text-lg md:text-xl text-gray-800 font-medium italic leading-relaxed">
              {post.closingLine}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
