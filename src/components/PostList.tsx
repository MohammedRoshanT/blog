"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function PostList() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchBlogPosts,
  });
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 drop-shadow-sm tracking-tight sm:text-6xl">
          The Glass Blog
        </h1>
        <p className="max-w-2xl text-xl text-gray-700/80 font-medium mx-auto drop-shadow-sm">
          A crystal clear view into the future of web design.
        </p>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-2">
        {filteredPosts?.map((post) => (
          <article 
            key={post.id} 
            className="group flex flex-col relative overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.07)] hover:shadow-[0_16px_48px_rgba(31,38,135,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold tracking-wider text-indigo-700 uppercase drop-shadow-sm">
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </p>
                  <div className="flex items-center space-x-3 text-sm font-semibold text-gray-700 bg-white/50 px-3 py-1 rounded-full border border-white/50 backdrop-blur-md">
                    <span className="flex items-center drop-shadow-sm">
                      <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center drop-shadow-sm">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                      {post.views}
                    </span>
                  </div>
                </div>

                <Link href={`/post/${post.id}`} className="block mt-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-indigo-800 transition-colors duration-300 drop-shadow-sm line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-700/90 font-medium line-clamp-3 leading-relaxed drop-shadow-sm">
                    {post.content}
                  </p>
                </Link>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/50 backdrop-blur-md rounded-full text-xs font-bold text-indigo-800 border border-white/60 shadow-sm capitalize drop-shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex items-center pt-6 border-t border-white/40">
                <div className="flex-shrink-0">
                  <span className="sr-only">{post.author}</span>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-white/50">
                    {post.author.replace('User ', '')}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-bold text-gray-900 drop-shadow-sm">
                    {post.author}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 drop-shadow-sm">Contributing Writer</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {filteredPosts?.length === 0 && (
        <div className="text-center py-20 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/50 shadow-xl mt-12">
          <p className="text-gray-800 font-semibold text-xl drop-shadow-sm">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
