import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 60;

interface MediaPageProps {
  searchParams: Promise<{
    tab?: string;
    filter?: string;
  }>;
}

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const params = await searchParams;
  const activeTab = params.tab || "podcast";
  const activeFilter = params.filter || "all";

  const payload = await getPayload({ config });

  // 1. Fetch Podcast Episodes
  const episodesResult = await payload.find({
    collection: "podcast-episodes",
    sort: "-publishDate",
    limit: 20,
  }).catch(() => ({ docs: [] }));
  
  const mockEpisodes = [
    {
      id: "ep-1",
      number: "01",
      title: "Why Mothers & Babies Are Dying in Bauchi",
      summary: "A deep dive into Child Health and Mortality Prevention Surveillance (CHAMPS) data in Bauchi State, highlighting system-level interventions, data infrastructure, and community engagement strategies to reduce maternal and infant mortality.",
      duration: "45 min",
      publishDate: new Date("2026-09-20").toISOString(),
      audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
      cover: { url: "/assets/hero-bg-sdci-4.jpeg" },
      guests: [
        { name: "Awwal Dahiru", role: "IT Lead, CHAMPS Bauchi" },
        { name: "Ibrahim Murtala Muhammad", role: "Stakeholder Engagement & Programs Lead" }
      ],
    },
    {
      id: "41",
      number: "41",
      title: "The Politics of Policy: Who Gets a Seat at the Table?",
      summary: "A wide-ranging conversation on how policy decisions are actually made in Nigeria — who shapes the agenda, whose evidence gets heard, and what it takes to shift a reform-resistant institution.",
      duration: "42 min",
      publishDate: new Date("2026-06-12").toISOString(),
      cover: { url: "/assets/hero-bg-2.png" },
      guests: [{ name: "Dr. Amaka Obi", role: "Senior Fellow, Institute for Democratic Governance" }],
    },
    {
      id: "40",
      number: "40",
      title: "Rethinking Nigeria's Fiscal Federalism",
      summary: "An in-depth debate on revenue allocation formulas, state internally generated revenue autonomy, and decentralizing financial governance across Nigerian states.",
      duration: "55 min",
      publishDate: new Date("2026-06-05").toISOString(),
      cover: { url: "/assets/hero-bg-3.png" },
      guests: [{ name: "Prof. Emeka Nwosu", role: "Department of Economics, University of Lagos" }],
    },
    {
      id: "39",
      number: "39",
      title: "Health Financing in a Resource-Constrained State",
      summary: "Exploring innovative funding mechanisms, public-private partnerships, and community insurance schemes to improve healthcare access in Bauchi State.",
      duration: "38 min",
      publishDate: new Date("2026-05-29").toISOString(),
      cover: { url: "/assets/hero-bg-4.png" },
      guests: [{ name: "Dr. Ngozi Mba", role: "WHO Nigeria Country Office" }],
    },
  ];

  const episodes = episodesResult.docs.length > 0 ? episodesResult.docs : mockEpisodes;

  // 2. Fetch Documentaries
  const docsResult = await payload.find({
    collection: "documentaries",
    sort: "-year",
    limit: 20,
  }).catch(() => ({ docs: [] }));

  const mockDocs = [
    {
      id: "doc-1",
      title: "Bauchi Water Access & Municipal Reforms",
      year: "2026",
      length: "15 mins",
      about: "An investigative documentary by SDCI examining municipal water infrastructure, public spending efficiency, and community-led water management solutions across Bauchi State.",
    },
    {
      id: "doc-2",
      title: "Governing Minerals: Lessons from Sub-national Mining",
      year: "2026",
      length: "22 mins",
      about: "A visual policy investigation into land title disclosures, community rights, and sub-national equity frameworks in Nigeria's solid minerals sector.",
    },
  ];

  const docs = docsResult.docs.length > 0 ? docsResult.docs : mockDocs;

  // 3. Fetch Gallery Items
  const galleryResult = await payload.find({
    collection: "gallery",
    sort: "-publishDate",
    limit: 50,
  }).catch(() => ({ docs: [] }));

  const mockGalleryItems = [
    {
      id: "g-1",
      title: "SDCI Official Launch Ceremony",
      type: "picture",
      image: { url: "/assets/launch-thumbnail.png" },
      publishDate: "2026-08-15",
    },
    {
      id: "g-2",
      title: "Executive Roundtable on Fiscal Devolution",
      type: "picture",
      image: { url: "/assets/about-workspace.jpeg" },
      publishDate: "2026-06-05",
    },
    {
      id: "g-3",
      title: "Documentary: Bauchi Water Access Reforms",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: { url: "/assets/hero-bg-sdci-1.jpeg" },
      publishDate: "2026-05-20",
    },
  ];

  const galleryItems = galleryResult.docs.length > 0 ? galleryResult.docs : mockGalleryItems;

  const filteredGalleryItems = galleryItems.filter((item: any) => {
    if (activeFilter === "videos") return item.type === "video";
    if (activeFilter === "pictures") return item.type === "picture";
    return true; // "all"
  });

  const tabItems = [
    { id: "podcast", label: "Podcast" },
    { id: "docs", label: "Documentaries" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-950/20 min-h-screen">
      {/* Tabs Control */}
      <section className="max-w-7xl mx-auto pt-10 px-6 md:px-8 border-b border-neutral-200 dark:border-petrol-800">
        <div className="flex overflow-x-auto gap-2">
          {tabItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={`/media?tab=${tab.id}`}
                className={`whitespace-nowrap pb-4 px-6 border-b-2 font-semibold text-sm transition-all focus:outline-none ${
                  isActive
                    ? "border-green-800 text-green-800 dark:border-green-500 dark:text-green-500"
                    : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-petrol-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-petrol-800"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tab Panels */}
      <section className="max-w-7xl mx-auto py-10 px-6 md:px-8">
        {/* PODCAST TAB */}
        {activeTab === "podcast" && (
          <div className="space-y-10">
            {episodes.length > 0 ? (
              <div className="divide-y divide-neutral-200 dark:divide-petrol-800/60">
                {episodes.map((ep: any) => {
                  const epCover = getMediaUrl(ep.cover && typeof ep.cover === "object" && ep.cover.url ? ep.cover.url : "/assets/hero-bg-4.png");
                  const epGuests = ep.guests && Array.isArray(ep.guests)
                    ? ep.guests
                        .map((g: any) => {
                          if (typeof g === "object" && g !== null && "name" in g) {
                            const roleStr = g.role ? `, ${g.role}` : "";
                            return `${g.name}${roleStr}`;
                          }
                          return "";
                        })
                        .filter(Boolean)
                        .join(" — ")
                    : "";
                  return (
                    <div 
                      key={ep.id} 
                      className="flex flex-col md:flex-row items-stretch md:items-center justify-between py-6 gap-6 first:pt-0"
                    >
                      {/* Left: Thumbnail & Episode Details */}
                      <div className="flex items-start gap-5 flex-grow">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-neutral-100 dark:bg-petrol-900/40 shrink-0 overflow-hidden rounded-none border border-neutral-200/50 dark:border-petrol-800/40">
                          <img 
                            src={epCover} 
                            alt={ep.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Details */}
                        <div className="space-y-1 text-left">
                          <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider block">
                            Ep. {ep.number}
                          </span>
                          <h3 className="text-base md:text-lg font-bold font-serif text-petrol-950 dark:text-white hover:text-green-800 dark:hover:text-green-400 transition-colors leading-tight">
                            <Link href={`/media/podcast/${ep.id}`}>{ep.title}</Link>
                          </h3>
                          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                            {epGuests || ep.summary}
                          </p>
                        </div>
                      </div>

                      {/* Right: Duration, Play, Link */}
                      <div className="flex items-center gap-6 shrink-0 justify-between md:justify-end border-t md:border-t-0 border-neutral-100 dark:border-petrol-800/40 pt-4 md:pt-0">
                        <span className="text-xs md:text-sm font-semibold text-neutral-400 dark:text-neutral-400">
                          {ep.duration || "42 min"}
                        </span>
                        
                        {/* Circular Play Button */}
                        <Link 
                          href={`/media/podcast/${ep.id}`}
                          className="w-12 h-12 rounded-full border border-neutral-300 dark:border-petrol-800 flex items-center justify-center text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-white hover:text-white dark:hover:text-petrol-950 transition-colors cursor-pointer shrink-0"
                        >
                          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Link>
                        
                        {/* View Episode Link */}
                        <Link 
                          href={`/media/podcast/${ep.id}`} 
                          className="text-xs md:text-sm font-bold text-petrol-950 dark:text-neutral-200 hover:text-green-800 dark:hover:text-green-400 transition-colors underline underline-offset-4 flex items-center gap-1 shrink-0"
                        >
                          View episode &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 border border-neutral-200 dark:border-petrol-800 rounded-none text-center bg-white dark:bg-petrol-900/40 text-neutral-500 dark:text-neutral-400">
                No podcast episodes are available yet. Check back soon.
              </div>
            )}

            {/* Listen On Platforms Footer */}
            <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-neutral-200 dark:border-petrol-800 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 mr-2">Listen On</span>
              <a href="https://spotify.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
                Spotify
              </a>
              <a href="https://apple.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
                Apple Podcasts
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
                YouTube
              </a>
              <a href="https://audiomack.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
                Audiomack
              </a>
              <a href="https://rss.com" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
                RSS
              </a>
            </div>
          </div>
        )}

        {/* DOCUMENTARIES TAB */}
        {activeTab === "docs" && (
          <div className="space-y-8">
            {docs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {docs.map((d: any) => (
                  <Card key={d.id} variant="default" className="p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="aspect-video w-full bg-neutral-950 rounded-none flex items-center justify-center text-xs text-neutral-400 font-semibold border border-neutral-800">
                        [Video Embed Player Fallback]
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] font-semibold text-neutral-400">
                        <span>{d.length || "12 mins"}</span>
                        <span>&bull;</span>
                        <span>Year: {d.year}</span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-petrol-950 dark:text-white hover:text-green-800 dark:hover:text-green-400 transition-colors">
                        <Link href={`/media/doc/${d.id}`}>{d.title}</Link>
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                        {d.about}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-neutral-100 dark:border-petrol-800/60">
                      <Link href={`/media/doc/${d.id}`} className="text-xs font-semibold text-green-800 dark:text-green-400 hover:underline">
                        Watch Documentary &rarr;
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 border border-neutral-200 dark:border-petrol-800 rounded-none text-center bg-white dark:bg-petrol-900/40 text-neutral-500 dark:text-neutral-400">
                No documentaries are currently available. Check back soon.
              </div>
            )}
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Gallery Sub-filters */}
            <div className="flex gap-3 mb-6">
              {["all", "videos", "pictures"].map((f) => {
                const isActive = activeFilter === f;
                return (
                  <Link
                    key={f}
                    href={`/media?tab=gallery&filter=${f}`}
                    className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-none border transition-all ${
                      isActive
                        ? "bg-petrol-950 text-white border-petrol-950 dark:bg-white dark:text-petrol-950 dark:border-white"
                        : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50 dark:bg-petrol-900/40 dark:text-neutral-300 dark:border-petrol-800 dark:hover:bg-petrol-800"
                    }`}
                  >
                    {f}
                  </Link>
                );
              })}
            </div>

            {filteredGalleryItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredGalleryItems.map((item: any) => {
                  const coverImg = getMediaUrl(item.image && typeof item.image === "object" && item.image.url 
                    ? item.image.url 
                    : "/assets/hero-bg-4.png");
                  
                  return (
                    <div key={item.id} className="space-y-3 group text-left">
                      {/* Media Box */}
                      <div className="relative aspect-video w-full bg-neutral-100 dark:bg-petrol-950/60 overflow-hidden border border-neutral-200/50 dark:border-petrol-800/50 rounded-none shadow-xs">
                        <img 
                          src={coverImg} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <div className="w-12 h-12 rounded-full bg-white/90 text-petrol-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Text details */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider block">
                          {item.type}
                        </span>
                        <h4 className="text-sm font-bold font-serif text-petrol-950 dark:text-white leading-tight">
                          {item.videoUrl && item.type === "video" ? (
                            <a href={item.videoUrl} target="_blank" rel="noreferrer" className="hover:text-green-800 dark:hover:text-green-400 transition-colors">
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 border border-neutral-200 dark:border-petrol-800 rounded-none text-center bg-white dark:bg-petrol-900/40 text-neutral-500 dark:text-neutral-400">
                No items found for category "{activeFilter}". Check back soon!
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
