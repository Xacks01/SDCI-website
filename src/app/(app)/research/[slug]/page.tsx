import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

  const pub = result.docs[0] as any;
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
            {pub.authors && pub.authors.length > 0 && (
              <div className="flex items-center space-x-1">
                <span>By:</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {pub.authors.map((auth: any) => auth.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Excerpt Summary */}
        {pub.excerpt && (
          <div className="p-6 bg-petrol-50/40 dark:bg-petrol-900/20 border-l-4 border-petrol-950 dark:border-petrol-500 rounded-none text-neutral-700 dark:text-neutral-300 text-sm md:text-base italic leading-relaxed">
            {pub.excerpt}
          </div>
        )}

        {/* Gated Body Content */}
        {isUnlocked ? (
          <div className="space-y-6 text-neutral-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base prose dark:prose-invert max-w-none">
            {pub.body ? (
              // In production we render block-based richText, here we display readable text
              <div className="space-y-4">
                <p>This research paper examines the policy frameworks, MDA directory statistics, and governance alignments in Bauchi State, Nigeria. Our empirical analysis indicates significant scope for internally generated revenue optimization and budgetary reforms.</p>
                <p>We advocate for open dialogue tables connecting local communities, public administrators, and private sector reformers. Actionable directives include administrative audit, capacity mentoring workshops, and transparent accounting lines for federal allocations.</p>
              </div>
            ) : (
              <p>No document body text is currently defined. Please refer to the attached PDF brief.</p>
            )}

            {/* Document Download Link */}
            {pub.attachment && (
              <div className="mt-12 p-6 border border-green-500/30 dark:border-green-500/20 rounded-none bg-green-50/50 dark:bg-green-950/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-bold text-petrol-950 dark:text-white text-sm font-serif">Full Publication Briefing (PDF)</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Includes complete methodology data, frameworks, and footnotes.</p>
                </div>
                <a href="/uploads/placeholder.pdf" download className="shrink-0">
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

        {/* Related Section */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-neutral-200 dark:border-petrol-800 space-y-6">
            <h3 className="text-xl font-bold font-serif dark:text-white">Related publications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r: any) => (
                <Card key={r.id} variant="default" className="p-4 flex flex-col justify-between h-full space-y-3 rounded-none">
                  <div className="space-y-2">
                    <Tag variant="outline" className="text-[10px]">{r.format}</Tag>
                    <h4 className="font-bold font-serif text-sm text-petrol-950 dark:text-white line-clamp-2 hover:text-green-700 dark:hover:text-green-400 transition-colors">
                      <Link href={`/research/${r.slug}`}>{r.title}</Link>
                    </h4>
                  </div>
                  <Link href={`/research/${r.slug}`} className="text-xs font-semibold text-green-700 dark:text-green-400 hover:underline">
                    Read brief &rarr;
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
