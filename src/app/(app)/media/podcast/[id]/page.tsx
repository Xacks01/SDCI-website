import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PodcastPlayer } from "@/components/shared/PodcastPlayer";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 60;

interface PodcastDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

import { getSafePayload } from "@/lib/payload";

export default async function PodcastDetailPage({ params }: PodcastDetailPageProps) {
  const { id } = await params;
  const payload = await getSafePayload();

  // Fetch the episode by ID
  let ep = payload
    ? await payload.findByID({
        collection: "podcast-episodes",
        id: id,
      }).catch(() => null) as any
    : null;

  if (!ep) {
    if (id === "37" || id === "ep-37") {
      ep = {
        id: "37",
        number: "37",
        title: "Digital Infrastructure and the Last Mile Problem",
        summary: "Analysing digital connectivity, broadband expansion, and regulatory challenges to tech entrepreneurship outside Nigeria's main urban hubs.",
        duration: "44 min",
        publishDate: new Date("2026-05-15").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [{ id: "g1", name: "Fatima Yusuf", role: "Co-founder, TechPolicy Nigeria" }],
        keyTakeaways: [
          { point: "Last-mile fiber deployment is blocked by excessive state right-of-way fees." },
          { point: "Digital literacy training yields double the return of hardware-only donations." },
          { point: "Bauchi State can establish a tech sandbox to attract northern tech talent." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    } else if (id === "38" || id === "ep-38") {
      ep = {
        id: "38",
        number: "38",
        title: "Security, Community, and the Social Contract",
        summary: "Discussing the intersection of local security initiatives, community policing, and rebuilding trust in formal security structures in northeastern Nigeria.",
        duration: "61 min",
        publishDate: new Date("2026-05-22").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [{ id: "g2", name: "Brig. Gen. (rtd) Adebayo Lawal", role: "Centre for Security Studies" }],
        keyTakeaways: [
          { point: "Community vigilante groups require formal oversight and regular vetting." },
          { point: "Economic inequality is directly correlated with security vulnerabilities." },
          { point: "Restoring local council authority improves early warning signal sharing." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    } else if (id === "39" || id === "ep-39") {
      ep = {
        id: "39",
        number: "39",
        title: "Health Financing in a Resource-Constrained State",
        summary: "Exploring innovative funding mechanisms, public-private partnerships, and community insurance schemes to improve healthcare access in Bauchi State.",
        duration: "38 min",
        publishDate: new Date("2026-05-29").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [{ id: "g3", name: "Dr. Ngozi Mba", role: "WHO Nigeria Country Office" }],
        keyTakeaways: [
          { point: "Out-of-pocket health expenditure remains the primary barrier to basic care." },
          { point: "State-level health insurance trust funds need structural and legal protection." },
          { point: "Primary health center funding should be ring-fenced from political cycles." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    } else if (id === "40" || id === "ep-40") {
      ep = {
        id: "40",
        number: "40",
        title: "Rethinking Nigeria's Fiscal Federalism",
        summary: "An in-depth debate on revenue allocation formulas, state internally generated revenue autonomy, and decentralizing financial governance across Nigerian states.",
        duration: "55 min",
        publishDate: new Date("2026-06-05").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [{ id: "g4", name: "Prof. Emeka Nwosu", role: "Department of Economics, University of Lagos" }],
        keyTakeaways: [
          { point: "State reliance on federal FAAC allocations creates structural vulnerabilities." },
          { point: "Decentralized tax collection models can incentivize local economic growth." },
          { point: "Fiscal devolution must match capacity-building at local government levels." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    } else if (id === "41" || id === "ep-41") {
      ep = {
        id: "41",
        number: "41",
        title: "The Politics of Policy: Who Gets a Seat at the Table?",
        summary: "A wide-ranging conversation on how policy decisions are actually made in Nigeria — who shapes the agenda, whose evidence gets heard, and what it takes to shift a reform-resistant institution.",
        duration: "42 min",
        publishDate: new Date("2026-06-12").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [{ id: "g5", name: "Dr. Amaka Obi", role: "Senior Fellow, Institute for Democratic Governance" }],
        keyTakeaways: [
          { point: "Technocratic capacity alone does not guarantee good policy outcomes." },
          { point: "Civil society access to decision-makers has narrowed since 2020." },
          { point: "Evidence presented without coalition-building rarely converts to reform." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    } else {
      // Default CHAMPS podcast episode
      ep = {
        id: id || "ep-1",
        number: "01",
        title: "Why Mothers & Babies Are Dying in Bauchi",
        summary: "A deep dive into Child Health and Mortality Prevention Surveillance (CHAMPS) data in Bauchi State, highlighting system-level interventions, data infrastructure, and community engagement strategies to reduce maternal and infant mortality.",
        duration: "45 min",
        publishDate: new Date("2026-09-20").toISOString(),
        audioEmbed: "/assets/Why_mothers_and_babies_are_dying.m4a",
        guests: [
          { id: "g-awwal", name: "Awwal Dahiru", role: "IT Lead, CHAMPS Bauchi", photo: { url: "/assets/passports/awwal.jpeg" } },
          { id: "g-ibrahim", name: "Ibrahim Murtala Muhammad", role: "Stakeholder Engagement & Programs Lead", photo: { url: "/assets/passports/ibrahim-murtala-muhammad.jpeg" } }
        ],
        keyTakeaways: [
          { point: "CHAMPS data reveals critical gap in real-time maternal health monitoring at primary healthcare centers." },
          { point: "Digital health tracking and IT infrastructure significantly accelerate intervention timelines for high-risk pregnancies." },
          { point: "Cross-sector collaboration between local health workers, IT leads, and community leaders is essential for sustained reduction in under-five mortality." }
        ],
        platformLinks: { spotify: "https://spotify.com", audiomack: "https://audiomack.com", youtube: "https://youtube.com" }
      };
    }
  }

  const guestsList = ep.guests && Array.isArray(ep.guests)
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

  const formattedDate = new Date(ep.publishDate).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).toUpperCase();

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-950/20 min-h-screen">
      <article className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
          <Link href="/media" className="hover:text-green-800 dark:hover:text-green-400 transition-colors">Media</Link>
          <span>&rsaquo;</span>
          <Link href="/media?tab=podcast" className="hover:text-green-800 dark:hover:text-green-400 transition-colors">Podcast</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-700 dark:text-neutral-300">Ep. {ep.number}</span>
        </div>

        {/* Title & Metadata */}
        <header className="space-y-4 text-left">
          <span className="text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider block">
            EP. {ep.number} &middot; {formattedDate}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-[1.15] text-petrol-950 dark:text-white">
            {ep.title}
          </h1>
          {guestsList && (
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium pt-1">
              {guestsList}
            </p>
          )}
        </header>

        {/* Horizontal Player Bar */}
        <PodcastPlayer 
          audioUrl={getMediaUrl(ep.audioEmbed) || "/assets/Why_mothers_and_babies_are_dying.m4a"} 
          episodeNumber={ep.number} 
          durationLabel={ep.duration || "45 min"} 
        />

        {/* Listen On Platforms bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 pt-1">
          <span className="uppercase tracking-wider text-[10px] font-bold text-neutral-400 dark:text-neutral-400 mr-2">Listen On</span>
          <a href={ep.platformLinks?.spotify || "https://spotify.com"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
            Spotify
          </a>
          <a href={ep.platformLinks?.apple || "https://apple.com"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
            Apple Podcasts
          </a>
          <a href={ep.platformLinks?.youtube || "https://youtube.com"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
            YouTube
          </a>
          <a href={ep.platformLinks?.audiomack || "https://audiomack.com"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
            Audiomack
          </a>
          <a href={ep.platformLinks?.rss || "https://rss.com"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-none bg-neutral-50 dark:bg-petrol-900/40 hover:bg-neutral-100 dark:hover:bg-petrol-800 border border-neutral-200 dark:border-petrol-800 text-neutral-700 dark:text-neutral-300 transition-colors">
            RSS
          </a>
        </div>

        {/* Bottom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-neutral-100 dark:border-petrol-800/60">
          {/* Left Column: Summary & Key Takeaways */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Summary & Description */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider block">Description</span>
              <div className="text-neutral-800 dark:text-neutral-350 text-sm md:text-base leading-relaxed font-sans space-y-4">
                <p>{ep.summary}</p>
                {/* Guest & Moderator backgrounds */}
                {ep.guests && ep.guests.length > 0 && (
                  <div className="mt-8 space-y-6 pt-6 border-t border-neutral-100 dark:border-petrol-800/60">
                    <h4 className="text-xs font-bold font-sans text-petrol-950 dark:text-white uppercase tracking-wider font-semibold">Guest & Host Biography</h4>
                    {ep.guests.map((g: any) => {
                      // Serialize bio if it's a lexical object, or fallback to role and description
                      const bioText = g.bio ? (typeof g.bio === "string" ? g.bio : JSON.stringify(g.bio)) : "";
                      let guestPhotoUrl = g.photo && typeof g.photo === "object" && g.photo.url ? g.photo.url : null;
                      if (!guestPhotoUrl) {
                        const name = (g.name || "").toLowerCase();
                        if (name.includes("ibrahim")) {
                          guestPhotoUrl = "/assets/passports/ibrahim-murtala-muhammad.jpeg";
                        } else if (name.includes("awwal")) {
                          guestPhotoUrl = "/assets/passports/awwal.jpeg";
                        }
                      }
                      return (
                        <div key={g.id} className="flex items-start gap-4">
                          {guestPhotoUrl && (
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-neutral-100 dark:bg-petrol-900/20 overflow-hidden border border-neutral-200 dark:border-petrol-800 rounded-none">
                              <img src={guestPhotoUrl} alt={g.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="space-y-1">
                            <p className="font-bold text-xs text-neutral-900 dark:text-white">{g.name} &mdash; <span className="text-green-700 dark:text-green-400 text-xs font-semibold">{g.role}</span></p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                              {g.name.toLowerCase().includes("awwal") 
                                ? "Awwal Dahiru is the IT Lead at CHAMPS (Child Health and Mortality Prevention Surveillance) Bauchi, where he leverages technology, data infrastructure, and digital health frameworks to track, analyze, and prevent under-five and maternal mortality."
                                : g.name.toLowerCase().includes("murtala") || g.name.toLowerCase().includes("ibrahim")
                                ? "Ibrahim Murtala Muhammad is a stakeholder engagement and programs professional with experience building strategic partnerships, leading multi-stakeholder initiatives, and driving programs that advance innovation, youth development, and sustainable development. He has successfully coordinated engagements across government institutions, development partners, the private sector, academia, and civil society to foster collaboration and deliver measurable impact."
                                : bioText || "SDCI Contributor and expert analyst."}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* YouTube Call To Action */}
              {ep.platformLinks?.youtube && (
                <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/40 p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold font-sans text-red-700 dark:text-red-400 uppercase tracking-wider">Watch this conversation</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                      Watch the complete video recording of this podcast episode on YouTube.
                    </p>
                  </div>
                  <a href={ep.platformLinks.youtube} target="_blank" rel="noreferrer" className="shrink-0 w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-semibold rounded-none bg-red-600 hover:bg-red-750 active:bg-red-800 text-white text-xs uppercase tracking-wider px-6 h-10 transition-colors cursor-pointer select-none whitespace-nowrap gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.002 3.002 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C9.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch on YouTube
                    </button>
                  </a>
                </div>
              )}
            </div>

            {/* Key Takeaways */}
            {ep.keyTakeaways && ep.keyTakeaways.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider block">Key Takeaways</span>
                <div className="space-y-4">
                  {ep.keyTakeaways.map((pt: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 text-left">
                      <span className="w-6 h-6 shrink-0 bg-neutral-100 dark:bg-petrol-950/60 flex items-center justify-center font-bold text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-petrol-800 rounded-none">
                        {idx + 1}
                      </span>
                      <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed pt-0.5">
                        {pt.point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Guest Photo Panel */}
          <div className="lg:col-span-4 space-y-6">
            {ep.guests && ep.guests.length > 0 && (
              <div className="space-y-6">
                {ep.guests.map((g: any) => {
                  let photoUrl = g.photo && typeof g.photo === "object" && g.photo.url ? g.photo.url : null;
                  if (!photoUrl) {
                    const name = (g.name || "").toLowerCase();
                    if (name.includes("ibrahim")) {
                      photoUrl = "/assets/passports/ibrahim-murtala-muhammad.jpeg";
                    } else if (name.includes("awwal")) {
                      photoUrl = "/assets/passports/awwal.jpeg";
                    }
                  }
                  return (
                    <div key={g.id} className="space-y-2 text-left">
                      {photoUrl ? (
                        <div className="aspect-square w-full bg-neutral-100 dark:bg-petrol-900/20 overflow-hidden border border-neutral-200/50 dark:border-petrol-800/50 rounded-none">
                          <img src={photoUrl} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-square w-full bg-neutral-100 dark:bg-petrol-900/20 flex flex-col items-center justify-center text-center p-6 border border-neutral-200/50 dark:border-petrol-800/50 rounded-none">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">No Photo</span>
                          <span className="text-xs mt-1 text-neutral-500 dark:text-neutral-400 font-semibold">{g.name}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>


      </article>
    </div>
  );
}
