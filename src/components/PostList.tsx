"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "@/lib/mockApi";
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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          The Next.js Blog
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Insights, updates, and tutorials from the bleeding edge of web development.
        </p>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {filteredPosts?.map((post) => (
          <article 
            key={post.id} 
            className="flex flex-col rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
          >
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600 mb-2">
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </p>
                <Link href={`/post/${post.id}`} className="block mt-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 line-clamp-3">
                    {post.content}
                  </p>
                </Link>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">{post.author}</span>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.author}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {filteredPosts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found matching your search.</p>
        </div>
      )}
    </div>
  );
}
