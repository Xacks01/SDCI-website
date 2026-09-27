import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 30;

interface PublicationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  // Fetch the publication matching the slug
  const result = await payload.find({
    collection: "publications",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  let pub = result.docs[0] as any;
  if (!pub) {
    if (slug === "bauchi-at-the-multipolar-crossroads") {
      pub = {
        id: "pub-multipolar-crossroads",
        title: "Bauchi at the Multipolar Crossroads: Absorptive Capacity, Fiscal Sovereignty, and the Choice Between Economic Ascension and Extraction",
        slug: "bauchi-at-the-multipolar-crossroads",
        format: "report",
        excerpt: "Bauchi at the Multipolar Crossroads is a research and policy publication examining the choices confronting Bauchi State as it navigates a changing global economic order. It explores the relationship between absorptive capacity, fiscal sovereignty, natural-resource extraction, institutional strength, and economic transformation.",
        publishDate: new Date("2026-09-20").toISOString(),
        gated: false,
        cover: { url: "/assets/report-cover.png" },
        attachment: { url: "/assets/bauchi-at-the-multipolar-crossroads.pdf" },
      };
    } else if (slug === "governing-the-ground-bmcc-case-and-land-framework") {
      pub = {
        id: "brief-1",
        title: "Governing the Ground: The BMCC Case and a Land Framework for Bauchi's Minerals",
        slug: "governing-the-ground-bmcc-case-and-land-framework",
        format: "brief",
        excerpt: "Examining subnational equity, community land access, and public title disclosures across Bauchi's emerging minerals sector.",
        publishDate: new Date("2026-09-22").toISOString(),
        gated: false,
        cover: { url: "/assets/policy-brief-1-cover.png" },
        attachment: { url: "/assets/sdci-policy-brief-1.pdf" },
      };
    } else if (slug === "building-in-not-bolting-on-minerals-security") {
      pub = {
        id: "brief-2",
        title: "Building In, Not Bolting On: A Minerals Security Function for Bauchi's Future State Police Service",
        slug: "building-in-not-bolting-on-minerals-security",
        format: "brief",
        excerpt: "Analyzing the Sixth Alteration Bill and outlining institutional requirements for a specialized minerals security function within Bauchi's future state policing architecture.",
        publishDate: new Date("2026-09-25").toISOString(),
        gated: false,
        cover: { url: "/assets/policy-brief-2-cover.png" },
        attachment: { url: "/assets/sdci-policy-brief-2.pdf" },
      };
    }
  }

  if (!pub) {
    notFound();
  }

  // Check Gating / Membership status
  let isUnlocked = !pub.gated;
  let userEmail = "";

  if (pub.gated) {
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;
    if (token) {
      // Authenticate token using Payload CMS API
      try {
        const authUser = await payload.auth({
          headers: new Headers({
            Authorization: `JWT ${token}`,
          }),
        } as any); // Type assertion for compatibility

        if (authUser?.user) {
          userEmail = authUser.user.email || "";
          const member = await payload.findByID({
            collection: "members",
            id: authUser.user.id,
          });

          // Check if user has a paid membership tier (Individual, Professional, or Institutional)
          if (member?.tier) {
            isUnlocked = true;
          }
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      }
    }
  }

  // Fetch related publications (same format or theme)
  const relatedResult = await payload.find({
    collection: "publications",
    where: {
      and: [
        { slug: { not_equals: slug } },
        { format: { equals: pub.format } },
      ],
    },
    limit: 3,
  }).catch(() => ({ docs: [] }));
  const related = relatedResult.docs;

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-950/20 min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Meta Header */}
        <header className="space-y-4 border-b border-neutral-200 dark:border-petrol-800 pb-8">
          <div className="flex items-center space-x-2">
            <Tag variant={pub.format === "white-paper" ? "lime" : "green"}>{pub.format}</Tag>
            {pub.gated && (
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-none border border-amber-200 dark:border-amber-900/60">
                Gated / Members Only
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            {pub.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-2">
            <div>
              <span>Published: {new Date(pub.publishDate).toLocaleDateString("en-NG", { dateStyle: "long" })}</span>
            </div>
          </div>
        </header>

        {/* Publication Cover Image Showcase */}
        <div className="w-full overflow-hidden rounded-none shadow-lg border border-neutral-200 dark:border-petrol-800">
          <img
            src={(pub.cover && typeof pub.cover === "object" && pub.cover.url) ? getMediaUrl(pub.cover.url) : "/assets/report-cover.png"}
            alt={pub.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Excerpt Summary */}
        {pub.excerpt && (
          <div className="p-6 bg-petrol-50/40 dark:bg-petrol-900/20 border-l-4 border-petrol-950 dark:border-petrol-500 rounded-none text-neutral-700 dark:text-neutral-300 text-sm md:text-base italic leading-relaxed">
            {pub.excerpt}
          </div>
        )}

        {/* Gated Body Content */}
        {isUnlocked ? (
          <div className="space-y-6 text-neutral-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base prose dark:prose-invert max-w-none">
            <div className="space-y-4">
              <p>Bauchi at the Multipolar Crossroads is a research and policy publication examining the choices confronting Bauchi State as it navigates a changing global economic order. It explores the relationship between absorptive capacity, fiscal sovereignty, natural-resource extraction, institutional strength, and economic transformation, asking a central question: can Bauchi convert its resources, strategic position, and emerging opportunities into sustained, broad-based prosperity rather than remain primarily a site of extraction?</p>
              <p>The report frames Bauchi’s challenge not simply as attracting capital or exploiting natural resources, but as developing the institutions, fiscal capacity, infrastructure, productive systems, and policy discipline required to retain and multiply the value generated within the state. Through this lens, it considers the choices that will shape Bauchi’s trajectory between economic ascension and extraction.</p>
            </div>

            {/* Document Download Link */}
            {pub.attachment && (
              <div className="mt-12 p-6 border border-green-500/30 dark:border-green-500/20 rounded-none bg-green-50/50 dark:bg-green-950/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-bold text-petrol-950 dark:text-white text-sm font-serif">Full Whitepaper (PDF)</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Includes complete methodology data, frameworks, and footnotes.</p>
                </div>
                <a 
                  href={typeof pub.attachment === "object" && pub.attachment && pub.attachment.url ? getMediaUrl(pub.attachment.url) : "/assets/bauchi-at-the-multipolar-crossroads.pdf"} 
                  download 
                  className="shrink-0"
                >
                  <Button variant="dark-green" size="sm">Download PDF</Button>
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Gating Paywall Box */
          <div className="p-8 border-2 border-amber-500/20 dark:border-amber-500/10 rounded-none bg-amber-50/20 dark:bg-amber-950/10 text-center space-y-6 max-w-xl mx-auto py-12 shadow-sm font-sans">
            <div className="w-12 h-12 rounded-none bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-500 font-bold mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">This publication is locked</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
                White papers and the flagship magazine issues are reserved for Individual, Professional, and Institutional members of SDCI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link href="/get-involved#membership">
                <Button variant="primary" size="sm">Join as a member</Button>
              </Link>
              <Link href="/get-involved#membership">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
