"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

interface FeaturedPodcastPlayerProps {
  featuredPodcast: any;
  coverUrl: string;
  guestsList: string;
}

export function FeaturedPodcastPlayer({
  featuredPodcast,
  coverUrl,
  guestsList,
}: FeaturedPodcastPlayerProps) {
  const duration = featuredPodcast.duration || "42 min";
  const targetUrl = `/media/podcast/${featuredPodcast.id}`;

  return (
    <div className="bg-white dark:bg-petrol-950 border border-neutral-200/85 dark:border-petrol-900 text-petrol-950 dark:text-neutral-200 flex flex-col md:flex-row items-stretch shadow-xl rounded-none w-full overflow-hidden transition-colors duration-300">
      {/* Left Edge: Thumbnail */}
      <Link 
        href={targetUrl} 
        className="w-full md:w-44 h-44 md:h-auto shrink-0 relative bg-neutral-100 dark:bg-petrol-900 block group overflow-hidden"
      >
        <img
          src={coverUrl}
          alt={featuredPodcast.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-left">
        {/* Play Button (Circle Outline) */}
        <Link
          href={targetUrl}
          className="w-16 h-16 border-2 border-petrol-950 dark:border-neutral-300 rounded-full flex items-center justify-center text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-white dark:hover:text-petrol-950 hover:text-white transition-colors cursor-pointer shrink-0 outline-none"
          aria-label="Play Podcast Episode"
        >
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </Link>

        {/* Text Container */}
        <div className="flex-grow space-y-3 w-full">
          {/* Top Row: Episode Metadata & Duration */}
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider">
            <span>Episode {featuredPodcast.number}</span>
            <span className="font-semibold text-neutral-500 dark:text-neutral-450 normal-case">
              {duration}
            </span>
          </div>

          {/* Middle Row: Title */}
          <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white hover:text-green-800 dark:hover:text-green-400 transition-colors leading-tight">
            <Link href={targetUrl}>{featuredPodcast.title}</Link>
          </h3>

          {/* Bottom Row: Guest Line & "See all episodes" Link */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-355 max-w-lg leading-relaxed">
              {guestsList ? `With ${guestsList}` : featuredPodcast.summary}
            </p>
            <Link
              href="/media?tab=podcast"
              className="text-sm font-bold text-petrol-950 dark:text-neutral-200 hover:text-green-800 dark:hover:text-green-400 transition-colors underline underline-offset-4 shrink-0 flex items-center gap-1"
            >
              See all episodes &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
