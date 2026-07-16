import { fetchBlogPostById, fetchBlogPosts } from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogPostById(id);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160) + '...',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await fetchBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-bold px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_16px_64px_rgba(31,38,135,0.1)] rounded-[3rem] p-10 sm:p-16">
          <header className="mb-12 border-b border-gray-300/40 pb-10">
            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags?.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-sm font-bold text-indigo-800 border border-white/80 shadow-sm capitalize drop-shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-indigo-900 tracking-tight mb-8 leading-tight drop-shadow-sm">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-700 text-sm font-semibold">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white/50 mr-4">
                  {post.author.replace('User ', '')}
                </div>
                <div>
                  <span className="block text-lg font-bold text-gray-900 drop-shadow-sm">{post.author}</span>
                  <span className="block text-gray-600">Contributing Writer</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <time dateTime={post.createdAt} className="bg-white/40 px-4 py-2 rounded-xl border border-white/50 backdrop-blur-md shadow-sm">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <div className="flex items-center space-x-4 bg-white/40 px-4 py-2 rounded-xl border border-white/50 backdrop-blur-md shadow-sm">
                  <span className="flex items-center drop-shadow-sm">
                    <svg className="w-5 h-5 mr-1.5 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center drop-shadow-sm">
                    <svg className="w-5 h-5 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-8 text-xl text-gray-800 leading-loose font-serif whitespace-pre-line drop-shadow-sm">
            <p>{post.content}</p>
          </div>
        </div>
      </article>
    </main>
  );
}
