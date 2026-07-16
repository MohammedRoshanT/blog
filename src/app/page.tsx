import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/api';
import PostList from '@/components/PostList';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchBlogPosts,
  });

  return (
    <main className="min-h-screen relative">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
    </main>
  );
}
