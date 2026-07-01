import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { ResearchFilterBar } from "@/components/shared/ResearchFilterBar";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 30; // Fast revalidation for new uploads

interface ResearchPageProps {
  searchParams: Promise<{
    format?: string;
    theme?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function ResearchPage({ searchParams }: ResearchPageProps) {
  const params = await searchParams;
  const activeFormat = params.format || "";
  const activeTheme = params.theme || "";
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);

  const payload = await getPayload({ config });

  // 1. Fetch Focus Areas for filter menu
  const themesResult = await payload.find({
    collection: "focus-areas",
    sort: "order",
    limit: 100,
  }).catch(() => ({ docs: [] }));
  const themes = themesResult.docs;

  // 2. Fetch data based on activeFormat parameter
  let publications: any[] = [];
  let infocus: any[] = [];
  let magazineIssues: any[] = [];

  const isAllFormat = activeFormat === "";
  const isPubFormat = ["brief", "report", "working-paper", "white-paper"].includes(activeFormat);

  if (isAllFormat || isPubFormat) {
    const finalWhere: any = {
      and: [
        ...(isPubFormat ? [{ format: { equals: activeFormat } }] : []),
        ...(activeTheme ? [{ themes: { contains: activeTheme } }] : []),
        ...(query ? [{
          or: [
            { title: { like: query } },
            { excerpt: { like: query } },
          ]
        }] : []),
      ]
    };
    const pubsResult = await payload.find({
      collection: "publications",
      where: finalWhere.and.length > 0 ? finalWhere : undefined,
      limit: 100,
      sort: "-publishDate",
    }).catch(() => ({ docs: [] }));
    publications = pubsResult.docs;
  }

  if (isAllFormat || activeFormat === "infocus") {
    const finalWhere: any = {
      and: [
        ...(activeTheme ? [{ themes: { contains: activeTheme } }] : []),
        ...(query ? [{
          or: [
            { title: { like: query } },
            { caption: { like: query } },
          ]
        }] : []),
      ]
    };
    const infocusResult = await payload.find({
      collection: "in-focus",
      where: finalWhere.and.length > 0 ? finalWhere : undefined,
      limit: 100,
    }).catch(() => ({ docs: [] }));
    infocus = infocusResult.docs;
  }

  if (isAllFormat || activeFormat === "digest") {
    const finalWhere: any = {
      and: [
        ...(activeTheme ? [{ theme: { equals: activeTheme } }] : []),
        ...(query ? [{
          or: [
            { title: { like: query } },
            { issueNo: { like: query } },
          ]
        }] : []),
      ]
    };
    const digestResult = await payload.find({
      collection: "magazine-issues",
      where: finalWhere.and.length > 0 ? finalWhere : undefined,
      limit: 100,
      sort: "-publishDate",
    }).catch(() => ({ docs: [] }));
    magazineIssues = digestResult.docs;
  }

  // 3. Map to UnifiedItem interface
  interface UnifiedItem {
    id: string;
    type: "publication" | "infocus" | "digest";
    title: string;
    excerpt: string;
    format: string;
    formatLabel: string;
    themeName: string;
    date: Date;
    dateString: string;
    linkUrl: string;
    gated?: boolean;
    imageUrl?: string;
  }

  const unifiedPubs: UnifiedItem[] = publications.map((pub: any) => {
    const themeObj = pub.themes && pub.themes[0];
    const themeId = typeof themeObj === "object" ? themeObj.id : themeObj;
    const themeDoc = themes.find((t: any) => t.id === themeId);
    const themeName = themeDoc ? themeDoc.name : "";
    
    let formatLabel = "";
    if (pub.format === "brief") formatLabel = "POLICY BRIEF";
    else if (pub.format === "report") formatLabel = "REPORT";
    else if (pub.format === "working-paper") formatLabel = "WORKING PAPER";
    else if (pub.format === "white-paper") formatLabel = "WHITE PAPER";
    else formatLabel = (pub.format || "").toUpperCase();

    let imageUrl = "";
    if (pub.cover && typeof pub.cover === "object") {
      imageUrl = getMediaUrl(pub.cover.sizes?.card?.url || pub.cover.sizes?.thumbnail?.url || pub.cover.url || "");
    }

    return {
      id: pub.id,
      type: "publication",
      title: pub.title,
      excerpt: pub.excerpt || "",
      format: pub.format,
      formatLabel,
      themeName: themeName || "GENERAL",
      date: pub.publishDate ? new Date(pub.publishDate) : new Date(pub.createdAt),
      dateString: pub.publishDate
        ? new Date(pub.publishDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
        : new Date(pub.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase(),
      linkUrl: `/research/${pub.slug}`,
      gated: pub.gated,
      imageUrl,
    };
  });

  const unifiedInFocus: UnifiedItem[] = infocus.map((item: any) => {
    const themeObj = item.themes && item.themes[0];
    const themeId = typeof themeObj === "object" ? themeObj.id : themeObj;
    const themeDoc = themes.find((t: any) => t.id === themeId);
    const themeName = themeDoc ? themeDoc.name : "";

    const linkUrl = item.relatedPublication
      ? `/research/${typeof item.relatedPublication === "object" ? item.relatedPublication.slug : item.relatedPublication}`
      : (item.image && typeof item.image === "object" ? getMediaUrl(item.image.url) : "#");

    let imageUrl = "";
    if (item.image && typeof item.image === "object") {
      imageUrl = getMediaUrl(item.image.sizes?.card?.url || item.image.sizes?.thumbnail?.url || item.image.url || "");
    }

    return {
      id: item.id,
      type: "infocus",
      title: item.title,
      excerpt: item.caption || "",
      format: "infocus",
      formatLabel: "INFOCUS",
      themeName: themeName || "GENERAL",
      date: new Date(item.createdAt),
      dateString: new Date(item.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase(),
      linkUrl,
      gated: false,
      imageUrl,
    };
  });

  const unifiedDigest: UnifiedItem[] = magazineIssues.map((issue: any) => {
    const themeId = typeof issue.theme === "object" ? issue.theme.id : issue.theme;
    const themeDoc = themes.find((t: any) => t.id === themeId);
    const themeName = themeDoc ? themeDoc.name : "";

    let imageUrl = "";
    if (issue.cover && typeof issue.cover === "object") {
      imageUrl = getMediaUrl(issue.cover.sizes?.card?.url || issue.cover.sizes?.thumbnail?.url || issue.cover.url || "");
    }

    return {
      id: issue.id,
      type: "digest",
      title: issue.title,
      excerpt: `Issue #${issue.issueNo} of our flagship publication gathering original analysis, interviews, and long-form features.`,
      format: "digest",
      formatLabel: "THE SUSTAINABLE DIGEST",
      themeName: themeName || "GENERAL",
      date: issue.publishDate ? new Date(issue.publishDate) : new Date(issue.createdAt),
      dateString: issue.publishDate
        ? new Date(issue.publishDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
        : new Date(issue.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase(),
      linkUrl: "/get-involved#membership",
      gated: true,
      imageUrl,
    };
  });

  // Combine and sort
  const allUnifiedItems: UnifiedItem[] = [...unifiedPubs, ...unifiedInFocus, ...unifiedDigest];
  allUnifiedItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Paginate
  const limit = 6;
  const totalItems = allUnifiedItems.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const paginatedItems = allUnifiedItems.slice(startIndex, startIndex + limit);

  const formats = [
    { label: "All", value: "" },
    { label: "Briefs", value: "brief" },
    { label: "Reports", value: "report" },
    { label: "Working Papers", value: "working-paper" },
    { label: "White Papers", value: "white-paper" },
    { label: "InFocus", value: "infocus" },
    { label: "The Sustainable Digest", value: "digest" },
  ];

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-950/20 min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-white dark:bg-petrol-950/40 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-petrol-950 dark:hover:text-white transition-colors gap-1">
            &larr; Back to home
          </Link>
          
          <div className="space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
              RESEARCH & INSIGHTS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-petrol-950 dark:text-white">Publications</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Evidence-based research, analysis, and commentary on Nigeria&apos;s most pressing policy challenges.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Format Tabs */}
      <section className="bg-white dark:bg-petrol-950/40 border-b border-neutral-200 dark:border-petrol-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-none text-sm font-medium">
            {formats.map((f) => {
              const isActive = activeFormat === f.value;
              return (
                <Link
                  key={f.value}
                  href={`/research?${new URLSearchParams({
                    ...(activeTheme && { theme: activeTheme }),
                    ...(query && { q: query }),
                    ...(f.value && { format: f.value }),
                  }).toString()}`}
                  className={`pb-4 border-b-2 transition-colors relative whitespace-nowrap -mb-[2px] pt-4 ${
                    isActive
                      ? "border-green-700 text-green-700 dark:border-green-500 dark:text-green-500 font-bold"
                      : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-petrol-950 dark:hover:text-white"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Filter and Results Section */}
      <section className="bg-neutral-50/20 dark:bg-petrol-950/10 py-6 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {/* Filter component */}
          <ResearchFilterBar
            themes={themes as any}
            activeTheme={activeTheme}
            activeFormat={activeFormat}
            query={query}
          />

          {/* Results Count */}
          <div className="text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider pt-2">
            {totalItems} {totalItems === 1 ? "publication" : "publications"}
          </div>

          {/* Cards Grid */}
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedItems.map((item) => (
                <Card
                  key={item.id}
                  variant="default"
                  padding="none"
                  className="flex flex-col justify-between h-full bg-white dark:bg-petrol-900/40 border border-neutral-200/80 dark:border-petrol-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-none overflow-hidden group"
                >
                  {/* Thumbnail / Cover */}
                  <div className="relative w-full aspect-[16/10] bg-neutral-100 dark:bg-petrol-950/60 overflow-hidden border-b border-neutral-100 dark:border-petrol-800">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback premium stylized cover */
                      <div className="w-full h-full bg-gradient-to-br from-petrol-900 via-petrol-950 to-green-950 flex flex-col justify-between p-5 text-white relative select-none">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="flex justify-between items-start z-10">
                          <span className="text-[8px] font-extrabold uppercase tracking-widest border border-white/30 px-1.5 py-0.5 rounded-none text-white/70">
                            SDCI INSIGHTS
                          </span>
                          <span className="text-[10px] font-bold text-white/40 tracking-wider">SDCI</span>
                        </div>
                        <div className="z-10 mt-auto">
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-green-400 mb-1">{item.formatLabel}</p>
                          <h4 className="text-sm font-serif font-bold text-white/95 line-clamp-2 leading-tight">{item.title}</h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow justify-between p-6">
                    <div className="space-y-4">
                      {/* Top Row: Format & Theme */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border border-neutral-300 dark:border-petrol-800 text-neutral-500 dark:text-neutral-400 rounded-none bg-transparent">
                            {item.formatLabel}
                          </span>
                          {item.gated && (
                            <span className="text-[9px] text-amber-700 dark:text-amber-300 font-bold uppercase bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-none border border-amber-200 dark:border-amber-900/60">
                              Gated
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider">
                          {item.themeName}
                        </span>
                      </div>

                      {/* Title & Excerpt */}
                      <div className="space-y-2.5">
                        <h3 className="text-base font-bold font-serif text-petrol-950 dark:text-white hover:text-green-700 dark:hover:text-green-400 transition-colors leading-snug">
                          <Link href={item.linkUrl}>{item.title}</Link>
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: Date & Link */}
                    <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-petrol-800/60 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-neutral-400 dark:text-neutral-400 uppercase tracking-wide font-sans">{item.dateString}</span>
                      <Link href={item.linkUrl} className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-1 group">
                        Read <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 border border-neutral-200 dark:border-petrol-800 rounded-none text-center bg-white dark:bg-petrol-900/40 text-neutral-500 dark:text-neutral-400 font-medium">
              No publications matching your filters are currently available.
            </div>
          )}

          {/* Pagination */}
          <div className="pt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              createPageUrl={(p) => `/research?${new URLSearchParams({
                ...(activeFormat && { format: activeFormat }),
                ...(activeTheme && { theme: activeTheme }),
                ...(query && { q: query }),
                page: p.toString(),
              }).toString()}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
