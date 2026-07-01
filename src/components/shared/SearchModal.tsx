"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchAction } from "@/app/actions";

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  url: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        const res = await searchAction(query);
        setLoading(false);
        if (res.success && res.results) {
          setResults(res.results as SearchResult[]);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-petrol-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-petrol-900 rounded-none shadow-2xl overflow-hidden border border-neutral-200 dark:border-petrol-850 flex flex-col max-h-[60vh] font-sans">
        <header className="flex items-center justify-between border-b border-neutral-100 dark:border-petrol-850 p-4">
          <svg
            className="h-5 w-5 text-neutral-400 dark:text-neutral-400 mr-3 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search publications, podcast, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base text-petrol-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 bg-transparent focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-350 transition-colors text-sm font-semibold ml-4 p-1 focus:ring-2 focus:ring-green-700/50 rounded-none cursor-pointer"
          >
            ESC
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="py-12 flex justify-center items-center text-neutral-500 dark:text-neutral-400">
              <svg
                className="animate-spin h-6 w-6 text-green-700 dark:text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Searching database...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              No results found for &ldquo;<span className="font-semibold text-petrol-950 dark:text-white">{query}</span>&rdquo;.
            </div>
          )}

          {!loading && results.length > 0 && (
            results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                onClick={onClose}
                className="block p-4 rounded-none hover:bg-neutral-50 dark:hover:bg-petrol-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-petrol-700"
              >
                <div className="text-xs uppercase tracking-wider text-green-700 dark:text-green-400 font-bold mb-1">
                  {result.type}
                </div>
                <div className="text-lg font-bold text-petrol-950 dark:text-white mb-1">
                  {result.title}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  {result.excerpt}
                </div>
              </Link>
            ))
          )}

          {!loading && query.trim().length < 2 && (
            <div className="py-12 text-center text-neutral-400 dark:text-neutral-400 text-sm">
              Type at least 2 characters to start searching the repository.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
