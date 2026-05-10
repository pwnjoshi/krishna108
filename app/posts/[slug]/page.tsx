import { notFound } from 'next/navigation';
import PostContent from '@/components/PostContent';
import { MOCK_POSTS } from '@/lib/data';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = MOCK_POSTS.find(p => p.slug === params.slug);
  
  if (!post) return {};

  return {
    title: `${post.title} | Krishna108`,
    description: post.explanation.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.explanation.substring(0, 160),
      images: [post.featuredImageUrl || '/hero.png'],
    },
  };
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  const post = MOCK_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-deepSpace-950">
      <PostContent post={post} />
    </main>
  );
}
