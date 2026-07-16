import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/mockApi';
import PostList from '@/components/PostList';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchBlogPosts,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
    </main>
  );
}
