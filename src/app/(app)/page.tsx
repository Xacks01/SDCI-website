import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { HeroSlider } from "@/components/shared/HeroSlider";
import { Accordion } from "@/components/ui/Accordion";
import { getMediaUrl } from "@/lib/utils";
import { FeaturedPodcastPlayer } from "@/components/shared/FeaturedPodcastPlayer";
import { Users, Shield, Share2, FileText, Mail, Heart, Info, Scale, Coins, HeartHandshake, GraduationCap, Leaf } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

const FORMAT_LABELS: Record<string, string> = {
  brief: "Featured Policy Brief",
  report: "Featured Thematic Report",
  "working-paper": "Featured Working Paper",
  "white-paper": "Featured White Paper (Gated)",
};

const getLumaEventId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const isLuma = url.includes("lu.ma/") || url.includes("luma.com/");
  if (!isLuma) return null;
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  if (lastPart.startsWith("evt-")) {
    return lastPart;
  }
  const evtPart = parts.find(p => p.startsWith("evt-"));
  return evtPart || lastPart;
};

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Fetch data from CMS collections & globals in parallel
  const [publicationsResult, eventsResult, podcastResult, faqsResult, teamResult] = await Promise.all([
    payload.find({
      collection: "publications",
      sort: "-publishDate",
      limit: 1,
    }).catch(() => ({ docs: [] })),
    payload.find({
      collection: "events",
      sort: "date",
      limit: 3,
      where: {
        date: { greater_than: new Date().toISOString() },
      },
    }).catch(() => ({ docs: [] })),
    payload.find({
      collection: "podcast-episodes",
      sort: "-publishDate",
      limit: 1,
    }).catch(() => ({ docs: [] })),
    payload.find({
      collection: "faqs",
      sort: "order",
      limit: 100,
    }).catch(() => ({ docs: [] })),
    payload.find({
      collection: "team",
      limit: 100,
    }).catch(() => ({ docs: [] })),
  ]);

  const featuredPub = publicationsResult.docs[0];
  const featuredPodcast = podcastResult.docs[0];
  
  const mockEvents = [
    {
      id: "launch-event",
      title: "SDCI Launch Event",
      type: "Launch",
      format: "Conference",
      date: "2026-08-15",
      dateDisplay: "",
      location: "Bauchi State Government House",
      image: { url: "/assets/event-launch.jpg" },
      description: "Marking our official institutional launch. Join policy makers, civil society leaders, and development experts to chart a data-driven path for sub-national growth and transparency.",
      registrationURL: "https://luma.com/event/evt-N83vmSARXUOlJVE",
      isUpcoming: true,
    }
  ];

  const upcomingEvents: any[] = mockEvents;
  const faqs = faqsResult.docs;

  const faqItems = faqs.map((faq: any) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  const team = teamResult.docs;
  const ceoMember = team.find((t: any) => 
    (t.role && t.role.toLowerCase().includes("chief executive officer")) ||
    (t.role && t.role.toLowerCase().includes("ceo"))
  );
  const ceoName = ceoMember ? ceoMember.name : "Sulaiman Ahmad Fanty";
  const ceoRole = ceoMember ? ceoMember.role : "Chief Executive Officer";

  const guestsList =
    featuredPodcast && featuredPodcast.guests && Array.isArray(featuredPodcast.guests)
      ? featuredPodcast.guests
          .map((g) => {
            if (typeof g === "object" && g !== null && "name" in g) {
              const roleStr = (g as any).role ? `, ${(g as any).role}` : "";
              return `${(g as any).name}${roleStr}`;
            }
            return "";
          })
          .filter(Boolean)
          .join("; ")
      : "";

  const hasCover =
    featuredPodcast &&
    featuredPodcast.cover &&
    typeof featuredPodcast.cover === "object" &&
    (featuredPodcast.cover as any).url;
  const coverUrl = hasCover ? getMediaUrl((featuredPodcast.cover as any).url) : "/assets/hero-bg-sdci-4.jpeg";

  // Find the primary launch event
  const activeEvents = eventsResult.docs.length > 0 ? eventsResult.docs : mockEvents;
  const mainEvent = activeEvents[0];
  const mainEventLumaId = mainEvent ? getLumaEventId(mainEvent.registrationURL) : null;
  const mainEventImageUrl = mainEvent && mainEvent.image && typeof mainEvent.image === "object" && (mainEvent.image as any).url
    ? getMediaUrl((mainEvent.image as any).url)
    : "/assets/event-launch.jpg";

  const mainEventDescription = mainEvent 
    ? (typeof mainEvent.description === "string" 
        ? mainEvent.description 
        : "Marking our official institutional launch. Join policy makers, civil society leaders, and development experts to chart a data-driven path for sub-national growth and transparency.")
    : "";

  const mainEventDateObj = mainEvent && mainEvent.date ? new Date(mainEvent.date) : null;
  const mainEventDateFormatted = mainEventDateObj && !isNaN(mainEventDateObj.getTime())
    ? mainEventDateObj.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : "Saturday, August 15, 2026";
  const mainEventTimeFormatted = "9:00 AM - 10:30 AM (GMT+1)";
  
  const mainEventLocation = mainEvent ? mainEvent.location : "Bauchi State Government House";

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-petrol-50/10 dark:bg-transparent transition-colors duration-300">
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 1.5. SDCI Launch Event Spotlight Section */}
      {mainEvent && (
        <section className="max-w-7xl mx-auto pt-16 pb-6 px-6 md:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-petrol-950 via-petrol-900 to-green-950 border border-petrol-800 text-white rounded-none p-8 md:p-12 shadow-xl group">
            {/* Decorative background grid/gradients */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-lime-500/10 blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left: Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-none border border-lime-400/30 text-[10px] font-bold uppercase tracking-wider text-lime-300 bg-lime-400/10">
                    Inaugural Event
                  </span>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-petrol-200">
                    {mainEvent.format === "online" ? "Online / Virtual" : mainEvent.format === "in-person" ? "In-Person" : "Hybrid"} · {mainEventLocation}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white">
                  {mainEvent.title}
                </h2>
                
                <p className="text-petrol-100/90 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                  {mainEventDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-petrol-200 py-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-lime-300 font-bold uppercase tracking-wider block text-[11px] mt-0.5">When:</span>
                    <div>
                      <p className="font-semibold text-white">{mainEventDateFormatted}</p>
                      <p className="text-[12px] opacity-80">{mainEventTimeFormatted}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-lime-300 font-bold uppercase tracking-wider block text-[11px] mt-0.5">Where:</span>
                    <div>
                      <p className="font-semibold text-white">{mainEventLocation}</p>
                      <p className="text-[12px] opacity-80">Ahmadu Bello Way, Yelwa</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  {mainEvent.registrationURL ? (
                    mainEventLumaId ? (
                      <button
                        className="bg-lime-400 text-petrol-950 hover:bg-lime-300 font-sans font-bold text-xs uppercase px-8 py-3.5 transition-colors rounded-none cursor-pointer tracking-wider shadow-md hover:shadow-lg"
                        data-luma-action="checkout"
                        data-luma-event-id={mainEventLumaId}
                      >
                        Register to Attend
                      </button>
                    ) : (
                      <a href={mainEvent.registrationURL} target="_blank" rel="noreferrer">
                        <button className="bg-lime-400 text-petrol-950 hover:bg-lime-300 font-sans font-bold text-xs uppercase px-8 py-3.5 transition-colors rounded-none cursor-pointer tracking-wider shadow-md hover:shadow-lg">
                          Register to Attend
                        </button>
                      </a>
                    )
                  ) : (
                    <button className="border border-neutral-700 bg-transparent text-neutral-500 font-sans font-bold text-xs uppercase px-8 py-3.5 rounded-none cursor-not-allowed" disabled>
                      Registration Closed
                    </button>
                  )}
                  <Link href="/events">
                    <button className="border border-white/20 hover:border-white text-white hover:bg-white/10 font-sans font-bold text-xs uppercase px-6 py-3.5 transition-colors rounded-none cursor-pointer tracking-wider">
                      View Event Details
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Right: Cover Visual */}
              <div className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-square bg-petrol-950/80 border border-white/10 overflow-hidden group shadow-lg">
                <img
                  src={mainEventImageUrl}
                  alt={mainEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petrol-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-petrol-950/80 backdrop-blur-md border border-white/10 p-4 text-xs">
                  <p className="text-white font-bold mb-0.5">{mainEvent.title}</p>
                  <p className="text-lime-300">August 15, 2026 · Bauchi</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. The Four Ways Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Heading and Info */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-petrol-950 dark:text-white tracking-tight leading-[1.15]">
            We work in four ways, because good policy needs more than a report on a shelf.
          </h2>
          <p className="text-neutral-800 dark:text-neutral-350 text-sm md:text-base leading-relaxed max-w-md">
            Focused on creating lasting systemic change, SDCI works across dialogue, accountability, and connection to ensure policy research drives actual reform.
          </p>
          <div className="pt-2">
            <Link href="/about#three-roles">
              <Button variant="primary" className="rounded-none px-6 flex items-center gap-2 group shadow-sm hover:shadow transition-all">
                Our Method
                <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right column: Grid of Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Dialogue Partner */}
          <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200/60 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-green-800 hover:border-green-800 group">
            <div>
               <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 group-hover:bg-petrol-950/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Users className="w-5 h-5 text-petrol-950 dark:text-green-400 group-hover:text-petrol-950 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif mb-3 text-petrol-950 dark:text-white group-hover:text-petrol-950 transition-colors">
                Dialogue Partner
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-petrol-950 text-sm md:text-base leading-relaxed transition-colors">
                We give the private sector and civil society a credible, neutral table to debate reforms, weigh evidence, and build solutions together.
              </p>
            </div>
          </div>

          {/* Card 2: Watchdog */}
          <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200/60 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-green-800 hover:border-green-800 group">
            <div>
               <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 group-hover:bg-petrol-950/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-5 h-5 text-petrol-950 dark:text-green-400 group-hover:text-petrol-950 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif mb-3 text-petrol-950 dark:text-white group-hover:text-petrol-950 transition-colors">
                Watchdog
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-petrol-950 text-sm md:text-base leading-relaxed transition-colors">
                We use evidence, not noise, to show where systems fall short, push for transparency, and hold institutions accountable to the people they serve.
              </p>
            </div>
          </div>

          {/* Card 3: Connector */}
          <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200/60 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-green-800 hover:border-green-800 group">
            <div>
               <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 group-hover:bg-petrol-950/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Share2 className="w-5 h-5 text-petrol-950 dark:text-green-400 group-hover:text-petrol-950 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif mb-3 text-petrol-950 dark:text-white group-hover:text-petrol-950 transition-colors">
                Connector
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-petrol-950 text-sm md:text-base leading-relaxed transition-colors">
                We link policymakers with businesses, communities, and international partners so that reforms reflect the people they affect.
              </p>
            </div>
          </div>

          {/* Card 4: Advisory & Research */}
          <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200/60 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-green-800 hover:border-green-800 group">
            <div>
               <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 group-hover:bg-petrol-950/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-5 h-5 text-petrol-950 dark:text-green-400 group-hover:text-petrol-950 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif mb-3 text-petrol-950 dark:text-white group-hover:text-petrol-950 transition-colors">
                Advisory & Research
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-petrol-950 text-sm md:text-base leading-relaxed transition-colors">
                We undertake commissioned research, program evaluations, and bespoke training for organizations needing independent, rigorous analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Quote from the CEO Section */}
      <section className="bg-petrol-900 dark:bg-petrol-950/60 py-20 border-b border-neutral-200/50 dark:border-petrol-850/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with double borders & styling */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative group max-w-sm w-full aspect-square border border-neutral-300/35 dark:border-petrol-800 p-3 bg-white/5 dark:bg-petrol-900/40">
                <img
                  src="/assets/quote-from-ceo.jpeg"
                  alt={`${ceoName} - CEO of SDCI`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg"
                />
                {/* Accent line decoration */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-lime-400 pointer-events-none" />
                <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-lime-400 pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Quote content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-green-500/20 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-950/15 w-fit">
                CEO's Vision
              </span>
              <div className="relative">
                {/* Massive quote icon */}
                <span className="absolute -top-10 -left-6 text-[10rem] font-serif text-lime-400/10 select-none pointer-events-none">
                  “
                </span>
                <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-petrol-100 dark:text-neutral-100 leading-relaxed relative z-10">
                  "Every statistic tells a story. Every policy affects a life. Our responsibility is to ensure neither is ignored."
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-250/20 dark:border-petrol-850/60 max-w-xs">
                <h4 className="text-lg font-bold font-serif text-white leading-tight">
                  {ceoName}
                </h4>
                <p className="text-xs uppercase font-semibold text-lime-300 tracking-wider mt-1">
                  {ceoRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG-Aligned Areas of Focus */}
      <section className="bg-white dark:bg-transparent py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
              Our Alignment
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-petrol-950 dark:text-white tracking-tight leading-[1.15]">
              SDG-Aligned Areas of Focus
            </h2>
            <p className="text-neutral-800 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
              Every conversation we convene, every paper we publish, sits inside the framework of the UN Sustainable Development Goals &mdash; connecting our local research to global standards.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Governance & accountability */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Governance & accountability
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  The transparency and institutional strength that everything else depends on. This is where our Watchdog role lives.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/16.png" alt="SDG 16" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/17.png" alt="SDG 17" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Card 2: Public finance & the economy */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Public finance & the economy
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  How public money is raised, shared, and spent &mdash; and whether it reaches people.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/8.png" alt="SDG 8" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/1.png" alt="SDG 1" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/9.png" alt="SDG 9" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Card 3: Social development & inequality */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Social development & inequality
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Who gets left behind, and what closes the gap.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/10.png" alt="SDG 10" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/5.png" alt="SDG 5" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Card 4: Health systems */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Health systems
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  The services and infrastructure that determine life chances and well-being.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/3.png" alt="SDG 3" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Card 5: Education systems */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Education systems
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  The learning opportunities and capability building that determine life chances.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/4.png" alt="SDG 4" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Card 6: Climate & natural resources */}
            <div className="bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600/30 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-green-50 dark:bg-petrol-900/60 flex items-center justify-center text-green-750 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-petrol-950 dark:text-white">
                  Climate & natural resources
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Managing the resources today&apos;s decisions borrow from tomorrow.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900/60 mt-6 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-400 block">
                  Aligned SDGs
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <img src="/assets/SDGs/13.png" alt="SDG 13" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/7.png" alt="SDG 7" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/6.png" alt="SDG 6" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                  <img src="/assets/SDGs/12.png" alt="SDG 12" className="h-12 w-auto dark:brightness-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* 2.5. Video Showcase Section */}
      <section className="bg-petrol-50/50 dark:bg-petrol-900/10 border-t border-b border-neutral-200/40 dark:border-petrol-900/60 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mx-auto">
              Featured Video
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-petrol-950 dark:text-white tracking-tight">
              A Glimpse of SDCI
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full bg-neutral-100 dark:bg-petrol-900/20 border border-neutral-200/50 dark:border-petrol-800/60 shadow-lg rounded-none overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/ZJ36zfyhjOI"
                title="A Glimpse of SDCI"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Publication Section */}
      {featuredPub ? (
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-petrol-950 lg:h-[calc(100vh-4rem)]">
          {/* Left half: Text content & CTA */}
          <div className="w-full bg-petrol-950 text-white flex justify-end p-8 sm:p-12 md:p-16 lg:p-20 xl:py-24 xl:pr-16 lg:h-full lg:items-center">
            <div className="w-full max-w-[616px] space-y-6 flex flex-col justify-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 bg-transparent w-fit">
                {FORMAT_LABELS[featuredPub.format] || "Featured Publication"}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight leading-[1.15] text-white uppercase">
                {featuredPub.title.includes(":") ? (
                  <>
                    <span>{featuredPub.title.split(":")[0]}</span>
                    <span className="block text-lg md:text-xl lg:text-2xl font-normal normal-case mt-2 text-petrol-200">
                      {featuredPub.title.split(":")[1].trim()}
                    </span>
                  </>
                ) : (
                  featuredPub.title
                )}
              </h2>
              <p className="text-petrol-100 text-sm md:text-base leading-relaxed">
                {featuredPub.excerpt}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`/research/${featuredPub.slug}`}>
                  <Button variant="secondary" className="rounded-none font-bold tracking-wider px-6 py-2.5 uppercase">
                    Read More
                  </Button>
                </Link>
                <Link href="/research">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-petrol-950 rounded-none font-bold tracking-wider px-6 py-2.5 uppercase">
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right half: Publication Cover Image */}
          <div className="w-full min-h-[350px] lg:h-full overflow-hidden relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ 
                backgroundImage: `url('${(featuredPub.cover && typeof featuredPub.cover === "object" && featuredPub.cover.url) ? getMediaUrl(featuredPub.cover.url) : "/assets/thumbnail-trap.png"}')` 
              }}
              aria-label={featuredPub.title}
            />
          </div>
        </section>
      ) : (
        <section className="w-full py-20 px-6 bg-white dark:bg-petrol-950/20">
          <div className="max-w-7xl mx-auto p-8 border-2 border-dashed border-neutral-200 dark:border-petrol-900 rounded-none text-center text-neutral-500 dark:text-neutral-400 py-16 bg-white dark:bg-petrol-900/40">
            Our first publications are on the way. Join the newsletter to get them first.
          </div>
        </section>
      )}

      {/* 4. Podcast Highlight */}
      {featuredPodcast ? (
        <section 
          className="relative bg-cover bg-center py-24 px-6 md:px-8"
          style={{
            backgroundImage: `url('${coverUrl}')`
          }}
        >
          {/* Dark Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-black/80 z-0" />

          {/* Centered Content Container */}
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="space-y-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 bg-transparent w-fit mx-auto">
                Audio
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-white tracking-tight">
                From the podcast
              </h2>
            </div>

            {/* Featured Podcast Client Player */}
            <FeaturedPodcastPlayer
              featuredPodcast={featuredPodcast}
              coverUrl={coverUrl}
              guestsList={guestsList}
            />
          </div>
        </section>
      ) : (
        <section className="bg-petrol-50/50 dark:bg-petrol-950/20 py-20 text-center">
          <div className="max-w-4xl mx-auto p-8 border-2 border-dashed border-neutral-200 dark:border-petrol-900 rounded-none text-center text-neutral-500 dark:text-neutral-400 py-16 bg-white dark:bg-petrol-900/40">
            No podcast episodes uploaded yet. Check back soon!
          </div>
        </section>
      )}

      {/* 7. Advisory & Commission Hero Section */}
      <section 
        className="relative overflow-hidden bg-cover bg-center py-28 px-6 transition-colors duration-300 text-white"
        style={{
          backgroundImage: `url('/assets/bg-audit.png')`
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-petrol-950/85 z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Bold Text Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-green-500/30 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-950/20 w-fit">
                Advisory & Commissions
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold font-serif tracking-tight leading-[1.1] text-white">
                Powering decisions with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">unbiased evidence</span>.
              </h2>
              <p className="text-petrol-100 text-base md:text-lg leading-relaxed max-w-2xl">
                We partner with government agencies, international development institutions, and civil society to deliver bespoke policy briefings, system audits, and capacity-building workshops tailored to the local realities.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/programmes#commission">
                  <Button variant="secondary" className="px-8 h-12 text-sm font-bold rounded-none cursor-pointer border-none shadow-md shadow-green-950/40">
                    Request a Consultation
                  </Button>
                </Link>
                <Link href="/programmes">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-petrol-950 px-8 h-12 text-sm font-semibold rounded-none cursor-pointer transition-colors duration-200">
                    Explore Programmes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: High-Impact Visual Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <div className="bg-petrol-900/60 backdrop-blur-md border border-petrol-800 p-6 rounded-none hover:border-green-500/30 transition-all duration-300 group">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-green-950/50 border border-green-500/20 flex items-center justify-center text-green-400 font-serif font-bold text-lg">
                    01
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold font-serif text-base group-hover:text-green-400 transition-colors">Rigorous Local Audits</h3>
                    <p className="text-petrol-200 text-xs md:text-sm leading-relaxed">
                      Independent tracking and assessment of public finance, MDA spending guidelines, and service delivery metrics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-petrol-900/60 backdrop-blur-md border border-petrol-800 p-6 rounded-none hover:border-green-500/30 transition-all duration-300 group">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-green-950/50 border border-green-500/20 flex items-center justify-center text-green-400 font-serif font-bold text-lg">
                    02
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold font-serif text-base group-hover:text-green-400 transition-colors">Bespoke Policy Briefings</h3>
                    <p className="text-petrol-200 text-xs md:text-sm leading-relaxed">
                      Custom analyses of local legislative frameworks, state revenue opportunities, and structural reforms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-petrol-900/60 backdrop-blur-md border border-petrol-800 p-6 rounded-none hover:border-green-500/30 transition-all duration-300 group">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-green-950/50 border border-green-500/20 flex items-center justify-center text-green-400 font-serif font-bold text-lg">
                    03
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold font-serif text-base group-hover:text-green-400 transition-colors">LGA Alignment Workshops</h3>
                    <p className="text-petrol-200 text-xs md:text-sm leading-relaxed">
                      Direct training sessions to align local government activities with state priorities and UN Sustainable Development Goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-neutral-50/50 dark:bg-petrol-900/10 border-y border-neutral-200/40 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-4xl mx-auto py-24 px-6 space-y-12">
          {/* Section Header */}
          <div className="space-y-3 text-center flex flex-col items-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mx-auto">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-petrol-950 dark:text-white">
              Frequently asked questions
            </h2>
            <p className="text-neutral-700 dark:text-neutral-350 text-sm md:text-base max-w-md mx-auto">
              Quick answers to our research, advisory programmes, and operations.
            </p>
          </div>

          {/* Accordion */}
          {faqItems.length > 0 ? (
            <Accordion items={faqItems} className="max-w-3xl mx-auto" />
          ) : (
            <div className="py-12 border border-neutral-200 dark:border-petrol-900 rounded-none text-center bg-white dark:bg-petrol-950/40 text-neutral-400 dark:text-neutral-400 text-sm">
              No FAQs are listed in the database.
            </div>
          )}
        </div>
      </section>

      {/* 8. Get Involved Teaser & Independence Close (Combined) */}
      <section className="bg-white dark:bg-transparent border-b-8 border-green-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">
          {/* Section Header */}
          <div className="space-y-3 mb-12 flex flex-col items-start">
            <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit">
              Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-petrol-950 dark:text-white">
              Get involved
            </h2>
          </div>

          {/* Two Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Membership */}
            <div className="bg-neutral-50/60 dark:bg-petrol-900/30 p-8 border border-neutral-200/40 dark:border-petrol-900 rounded-none flex flex-col justify-between h-full min-h-[300px] transition-colors duration-300">
              <div>
                <div className="w-12 h-12 bg-neutral-200/40 dark:bg-petrol-800/40 flex items-center justify-center rounded-none text-neutral-500 dark:text-neutral-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-petrol-950 dark:text-white mt-6 font-sans">
                  Membership
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mt-3">
                  Join a community of citizens, practitioners, and scholars committed to evidence-led policy in Nigeria.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/get-involved#membership" className="w-full block">
                  <button className="bg-green-800 hover:bg-green-900 text-white font-bold text-xs py-3 px-6 rounded-none w-full text-center cursor-pointer transition-colors">
                    Become a member
                  </button>
                </Link>
              </div>
            </div>

            {/* Card 2: Donate */}
            <div className="bg-neutral-50/60 dark:bg-petrol-900/30 p-8 border border-neutral-200/40 dark:border-petrol-900 rounded-none flex flex-col justify-between h-full min-h-[300px] transition-colors duration-300">
              <div>
                <div className="w-12 h-12 bg-neutral-200/40 dark:bg-petrol-800/40 flex items-center justify-center rounded-none text-neutral-500 dark:text-neutral-400">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-petrol-950 dark:text-white mt-6 font-sans">
                  Donate
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mt-3">
                  Support independent research that serves the public interest, not private or political agendas.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/get-involved#partner" className="w-full block">
                  <button className="border border-neutral-800 dark:border-petrol-750 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-800 dark:hover:bg-petrol-800 hover:text-white font-bold text-xs py-3 px-6 rounded-none w-full text-center cursor-pointer transition-colors bg-transparent">
                    Make a donation
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Independence statement footer */}
          <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-petrol-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-neutral-700 dark:text-neutral-400 max-w-2xl leading-relaxed text-left">
              SDCI is an independent, non-partisan organisation. We accept no funding that compromises editorial independence, intellectual honesty, or research integrity.
            </p>
            <Link href="/about#independence" className="text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 underline shrink-0 transition-colors">
              Read our funding statement &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
