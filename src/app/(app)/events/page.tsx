import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 60;

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

export default async function EventsPage() {
  const payload = await getPayload({ config });

  // Fetch all events
  const eventsResult = await payload.find({
    collection: "events",
    sort: "date",
    limit: 100,
  }).catch(() => ({ docs: [] }));

  const cmsEvents = eventsResult.docs;

  const mockEvents = [
    {
      id: "launch-event",
      title: "SDCI Official Launch",
      type: "Launch",
      format: "in-person",
      date: "2026-08-15",
      dateDisplay: "",
      location: "Bauchi State Government House",
      image: { url: "/assets/event-launch.jpg" },
      description: `Join us as the Sustainable Development Conversations Initiative (SDCI) officially launches its mission to strengthen civic participation, promote evidence-based policymaking, and foster accountable governance through citizen engagement.

The event will feature an inaugural address, a panel discussion with distinguished speakers, and the official ribbon-cutting ceremony, bringing together policymakers, development partners, civil society organizations, academia, the private sector, youth leaders, and engaged citizens.

This launch marks the beginning of a platform dedicated to making public policy more accessible, encouraging meaningful dialogue, and building partnerships that drive sustainable development and democratic governance.

Whether you are a public servant, development practitioner, researcher, student, entrepreneur, or an active citizen, we invite you to be part of this milestone as we shape a future where informed citizens and responsive institutions work together for lasting impact.

Attendance is free, but registration is required.

We look forward to welcoming you.`,
      registrationURL: "https://luma.com/event/evt-N83vmSARXUOlJVE",
      isUpcoming: true,
    }
  ];

  const allEvents: any[] = mockEvents;
  const now = new Date();

  const upcomingEvents = allEvents.filter((e: any) => {
    if (e.isUpcoming !== undefined) return e.isUpcoming;
    return new Date(e.date) >= now;
  });
  const pastEvents = allEvents.filter((e: any) => {
    if (e.isUpcoming !== undefined) return !e.isUpcoming;
    return new Date(e.date) < now;
  });

  // Find featured event (e.g. conference or closest upcoming)
  const featuredEvent = upcomingEvents[0] || pastEvents[0];

  const featuredImgUrl = featuredEvent && featuredEvent.image && typeof featuredEvent.image === "object"
    ? getMediaUrl(featuredEvent.image.sizes?.card?.url || featuredEvent.image.sizes?.thumbnail?.url || featuredEvent.image.url)
    : null;

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-neutral-50/20 dark:bg-petrol-950/20 min-h-screen">
      {/* Header Hero */}
      <section className="bg-petrol-950 text-white py-16 px-6 border-b border-petrol-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 bg-transparent w-fit">
            Convening Dialogue
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Events & Forums</h1>
          <p className="text-petrol-100 text-sm md:text-base max-w-xl leading-relaxed">
            Convening is half of what we do. Across the year we host the spaces where evidence meets the people who can use it.
          </p>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto py-12 px-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mb-6">
            Featured Event
          </span>
          <Card variant="petrol" padding="none" className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 bg-petrol-950 border border-petrol-800 rounded-none">
            {/* Featured Image */}
            <div className="lg:col-span-4 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[250px] bg-neutral-900 border-r border-petrol-800/40">
              {featuredImgUrl ? (
                <img
                  src={featuredImgUrl}
                  alt={featuredEvent.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                /* Fallback gradient */
                <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-petrol-900 to-petrol-950 flex flex-col justify-between p-6">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest border border-white/30 px-2 py-0.5 rounded-none text-white/70 w-fit">
                    FEATURED FORUM
                  </span>
                  <div className="mt-auto">
                    <span className="text-3xl font-serif text-white/20 font-bold select-none">SDCI</span>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-5 p-8 md:p-10 space-y-6 flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <Tag variant="lime">{featuredEvent.type}</Tag>
                <span className="text-xs text-lime-300 font-semibold uppercase tracking-wider">{featuredEvent.format}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-white leading-snug">
                {featuredEvent.title}
              </h3>
              <div className="space-y-1.5 text-xs md:text-sm text-petrol-100 dark:text-petrol-200 font-medium font-sans">
                <p className="flex items-center gap-1.5">
                  <span className="text-lime-300">Date:</span> {featuredEvent.dateDisplay || (featuredEvent.date ? new Date(featuredEvent.date).toLocaleDateString("en-NG", { dateStyle: "full" }) : "")}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-lime-300">Location:</span> {featuredEvent.location}
                </p>
              </div>
              <p className="text-xs md:text-sm text-petrol-200 dark:text-petrol-300 leading-relaxed font-sans whitespace-pre-line">
                {featuredEvent.description}
              </p>
            </div>
            
            {/* CTA buttons */}
            <div className="lg:col-span-3 p-8 md:p-10 flex flex-col gap-4 justify-center bg-petrol-900/30 dark:bg-petrol-900/10 border-l border-petrol-900/40 dark:border-petrol-800/40">
              {featuredEvent.registrationURL ? (
                (() => {
                  const lumaId = getLumaEventId(featuredEvent.registrationURL);
                  return lumaId ? (
                    <Button
                      variant="primary"
                      className="w-full font-bold text-xs uppercase py-3 rounded-none"
                      data-luma-action="checkout"
                      data-luma-event-id={lumaId}
                    >
                      Register to Attend
                    </Button>
                  ) : (
                    <a href={featuredEvent.registrationURL} target="_blank" rel="noreferrer" className="w-full">
                      <Button variant="primary" className="w-full font-bold text-xs uppercase py-3 rounded-none">Register to Attend</Button>
                    </a>
                  );
                })()
              ) : (
                <Button variant="primary" className="w-full font-bold text-xs uppercase py-3 rounded-none" disabled>Free Access</Button>
              )}
              
              <Link href="/get-involved#partner" className="w-full">
                <Button variant="accent" className="w-full text-xs uppercase py-3 rounded-none">Become a Sponsor</Button>
              </Link>
            </div>
          </Card>
        </section>
      )}

      {/* Upcoming Events List */}
      <section className="max-w-7xl mx-auto py-12 px-6 border-b border-neutral-200 dark:border-petrol-800 flex flex-col items-start">
        <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mb-4 font-sans">
          Calendar
        </span>
        <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white mb-6">
          Upcoming Conversations
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {upcomingEvents.map((evt: any) => {
              const evtImgUrl = evt.image && typeof evt.image === "object"
                ? getMediaUrl(evt.image.sizes?.card?.url || evt.image.sizes?.thumbnail?.url || evt.image.url)
                : null;
              return (
                <Card key={evt.id} variant="default" padding="none" className="flex flex-col justify-between h-full bg-white dark:bg-petrol-900/40 border border-neutral-200 dark:border-petrol-800 overflow-hidden group shadow-sm hover:shadow-md transition-all rounded-none">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/9] bg-neutral-100 dark:bg-petrol-950/60 overflow-hidden border-b border-neutral-200 dark:border-petrol-800">
                    {evtImgUrl ? (
                      <img
                        src={evtImgUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback gradient */
                      <div className="w-full h-full bg-gradient-to-br from-petrol-900 via-petrol-950 to-green-950 flex flex-col justify-between p-5 text-white relative select-none">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="flex justify-between items-start z-10">
                          <span className="text-[8px] font-extrabold uppercase tracking-widest border border-white/30 px-1.5 py-0.5 rounded-none text-white/70">
                            SDCI FORUM
                          </span>
                          <span className="text-[10px] font-bold text-white/40 tracking-wider">SDCI</span>
                        </div>
                        <div className="z-10 mt-auto">
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-green-400 mb-1">{evt.type}</p>
                          <h4 className="text-sm font-serif font-bold text-white/95 line-clamp-2 leading-tight">{evt.title}</h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow justify-between p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Tag variant="outline" className="text-[10px] uppercase font-bold">{evt.type}</Tag>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">{evt.format}</span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-petrol-950 dark:text-white hover:text-green-700 dark:hover:text-green-400 transition-colors leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium font-sans">
                        {evt.dateDisplay || (evt.date ? new Date(evt.date).toLocaleDateString("en-NG", { dateStyle: "full" }) : "")} &middot; {evt.location}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-neutral-100 dark:border-petrol-800/60 flex items-center justify-between">
                      {evt.registrationURL ? (
                        (() => {
                          const lumaId = getLumaEventId(evt.registrationURL);
                          return lumaId ? (
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-xs"
                              data-luma-action="checkout"
                              data-luma-event-id={lumaId}
                            >
                              Register to Attend
                            </Button>
                          ) : (
                            <a href={evt.registrationURL} target="_blank" rel="noreferrer">
                              <Button variant="primary" size="sm" className="text-xs">Register to Attend</Button>
                            </a>
                          );
                        })()
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs" disabled>Register Free</Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="py-12 border border-neutral-200 dark:border-petrol-800 rounded-none text-center bg-white dark:bg-petrol-900/40 text-neutral-400 dark:text-neutral-400 text-sm w-full font-sans">
            No other upcoming events are scheduled. Subscribe to our newsletter to receive invitations to our webinars.
          </div>
        )}
      </section>

      {/* Past Events / Recordings List - Conditionally rendered only if there are past events */}
      {pastEvents.length > 0 && (
        <section className="max-w-7xl mx-auto py-12 px-6 space-y-6 flex flex-col items-start border-b border-neutral-200 dark:border-petrol-800">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit font-sans">
            Archive
          </span>
          <h2 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">
            Past Events & Recordings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {pastEvents.map((evt: any) => {
              const evtImgUrl = evt.image && typeof evt.image === "object"
                ? getMediaUrl(evt.image.sizes?.card?.url || evt.image.sizes?.thumbnail?.url || evt.image.url)
                : null;
              return (
                <Card key={evt.id} variant="default" padding="none" className="flex flex-col justify-between h-full bg-white dark:bg-petrol-900/40 border border-neutral-200 dark:border-petrol-800 overflow-hidden group shadow-sm hover:shadow-md transition-all rounded-none">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/9] bg-neutral-100 dark:bg-petrol-950/60 overflow-hidden border-b border-neutral-200 dark:border-petrol-800">
                    {evtImgUrl ? (
                      <img
                        src={evtImgUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback gradient */
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col justify-between p-4 text-white relative select-none">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="flex justify-between items-start z-10">
                          <span className="text-[8px] font-extrabold uppercase tracking-widest border border-white/20 px-1.5 py-0.5 rounded-none text-white/50">
                            ARCHIVE
                          </span>
                        </div>
                        <div className="z-10 mt-auto">
                          <h4 className="text-xs font-serif font-bold text-white/90 line-clamp-2 leading-tight">{evt.title}</h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-400 uppercase font-bold tracking-wide font-sans">{evt.type}</span>
                      <h3 className="font-bold font-serif text-sm text-petrol-950 dark:text-white leading-snug line-clamp-2">{evt.title}</h3>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium font-sans">
                        Held: {evt.dateDisplay || (evt.date ? new Date(evt.date).toLocaleDateString("en-NG", { dateStyle: "medium" }) : "")}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-100 dark:border-petrol-800/60 flex items-center justify-between text-xs font-sans">
                      <span className="text-neutral-500 dark:text-neutral-400 font-semibold">{evt.location}</span>
                      {evt.recording && (
                        <a
                          href={evt.recording}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-0.5"
                        >
                          Watch <span className="inline-block">&rarr;</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
