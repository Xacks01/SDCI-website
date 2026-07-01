"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Theme {
  id: string;
  name: string;
}

interface FilterBarProps {
  themes: Theme[];
  activeTheme: string;
  activeFormat: string;
  query: string;
}

export const ResearchFilterBar: React.FC<FilterBarProps> = ({
  themes,
  activeTheme,
  activeFormat,
  query: initialQuery,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  // Sync state if initialQuery changes from outside (e.g. navigation)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeId = e.target.value;
    const params = new URLSearchParams();
    if (activeFormat) params.set("format", activeFormat);
    if (themeId) params.set("theme", themeId);
    if (query) params.set("q", query);
    router.push(`/research?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeFormat) params.set("format", activeFormat);
    if (activeTheme) params.set("theme", activeTheme);
    if (query) params.set("q", query);
    router.push(`/research?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-6 border-b border-neutral-200 dark:border-petrol-800">
      {/* Filter by Theme */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider whitespace-nowrap">
          Filter by
        </span>
        <div className="relative">
          <select
            value={activeTheme}
            onChange={handleThemeChange}
            className="appearance-none bg-white dark:bg-petrol-900 border border-neutral-300 dark:border-petrol-800 rounded-none px-4 py-2 pr-10 text-sm text-petrol-950 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-green-700/50 dark:focus:ring-green-500/50 cursor-pointer"
          >
            <option value="">All themes</option>
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative flex-grow sm:max-w-xs">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search publications..."
          className="w-full text-sm pl-10 pr-4 py-2 border border-neutral-300 dark:border-petrol-800 bg-neutral-100/50 dark:bg-petrol-900/50 rounded-none focus:outline-none focus:ring-1 focus:ring-green-700/50 dark:focus:ring-green-500/50 focus:bg-white dark:focus:bg-petrol-900 text-petrol-950 dark:text-neutral-200 transition-colors"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-400 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </form>
    </div>
  );
};
