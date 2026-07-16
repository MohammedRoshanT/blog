"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-8 relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="block w-full pl-12 pr-4 py-4 border border-white/60 rounded-3xl leading-5 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/60 sm:text-lg transition-all duration-300 ease-out shadow-[0_8px_32px_rgba(31,38,135,0.05)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.1)] font-medium"
      />
    </div>
  );
}
