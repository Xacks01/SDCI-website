import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const revalidate = 60;

interface DocDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

import { getSafePayload } from "@/lib/payload";

export default async function DocDetailPage({ params }: DocDetailPageProps) {
  const { id } = await params;
  const payload = await getSafePayload();

  // Fetch the documentary by ID
  let doc = payload
    ? await payload.findByID({
        collection: "documentaries",
        id: id,
      }).catch(() => null) as any
    : null;

  if (!doc) {
    doc = {
      id: id || "doc-1",
      title: "Bauchi Water Access & Municipal Reforms",
      year: "2026",
      length: "15 mins",
      about: "An investigative documentary by SDCI examining municipal water infrastructure, public spending efficiency, and community-led water management solutions across Bauchi State.",
      videoEmbed: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Bauchi Water Access Reforms" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      relatedResearch: [
        {
          id: "pub-multipolar-crossroads",
          title: "Bauchi at the Multipolar Crossroads: Absorptive Capacity, Fiscal Sovereignty, and the Choice Between Economic Ascension and Extraction",
          slug: "bauchi-at-the-multipolar-crossroads",
          format: "report",
          excerpt: "Bauchi at the Multipolar Crossroads is a research and policy publication examining the choices confronting Bauchi State as it navigates a changing global economic order.",
        },
      ],
    };
  }

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-950/20 min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-4 border-b border-neutral-200 dark:border-petrol-800 pb-8">
          <Link href="/media?tab=docs" className="text-xs font-semibold text-green-800 dark:text-green-400 hover:underline">
            &larr; Back to Documentaries
          </Link>
          <div className="flex items-center space-x-2 pt-2">
            <Tag variant="petrol">Documentary</Tag>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase">Length: {doc.length || "15 mins"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-petrol-950 dark:text-white leading-tight">
            {doc.title}
          </h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-400">Year: {doc.year}</p>
        </header>

        {/* Video Embed Player */}
        {doc.videoEmbed && (
          <div className="w-full aspect-video bg-neutral-950 rounded-none overflow-hidden shadow-lg border border-neutral-800 flex items-center justify-center">
            {/* Displaying simple video player wrapper or iframe */}
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: doc.videoEmbed }}
            />
          </div>
        )}

        {/* About the Documentary */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">About this documentary</h3>
          <p className="text-neutral-700 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
            {doc.about}
          </p>
        </div>

        {/* Related Research Link */}
        {doc.relatedResearch && doc.relatedResearch.length > 0 && (
          <div className="pt-8 border-t border-neutral-200 dark:border-petrol-800">
            <h3 className="text-lg font-bold font-serif text-petrol-950 dark:text-white mb-4">Related Research Publications</h3>
            <div className="grid grid-cols-1 gap-4">
              {doc.relatedResearch.map((res: any) => (
                <Card key={res.id} variant="default" className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-petrol-900/40 border border-neutral-200 dark:border-petrol-800">
                  <div className="space-y-1">
                    <span className="text-[10px] text-green-800 dark:text-green-400 font-bold uppercase">{res.format}</span>
                    <h4 className="font-bold text-sm text-petrol-950 dark:text-white font-serif leading-tight">{res.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{res.excerpt}</p>
                  </div>
                  <Link href={`/research/${res.slug}`} className="shrink-0">
                    <Button variant="outline" size="sm">Read Whitepaper</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
