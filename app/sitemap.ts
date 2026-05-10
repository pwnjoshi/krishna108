import { MetadataRoute } from 'next';
import { MOCK_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://krishna108.com.np';

  const posts = MOCK_POSTS.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(),
  }));

  const routes = ['', '/about', '/teachings', '/contact', '/subscribe', '/privacy', '/terms'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...posts];
}
