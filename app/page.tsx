import HomeClient from '@/components/HomeClient';
import { MOCK_POSTS } from '@/lib/data';

export default function Home() {
  return <HomeClient recentPosts={MOCK_POSTS} />;
}
