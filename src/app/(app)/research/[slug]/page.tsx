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
            {slug === "the-rentier-trap-bauchis-fiscal-model-and-its-development-ceiling" ? (
              <div className="space-y-8 not-prose">
                {/* Core Argument Callout */}
                <div className="bg-petrol-50/50 dark:bg-petrol-900/10 border border-petrol-200/50 dark:border-petrol-800/40 p-6 rounded-none space-y-3">
                  <h3 className="text-xs font-bold font-sans text-petrol-950 dark:text-white uppercase tracking-wider">The Core Argument</h3>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    Bauchi&apos;s development failures aren&apos;t primarily about capacity, corruption, or effort &mdash; they&apos;re about <strong>how the state is financed</strong>. Roughly six naira in every seven of its revenue arrive as a federal FAAC transfer (~86%) rather than as tax raised from its own citizens (~14% IGR). That single fact reorganizes everything downstream: what the government spends on, who it answers to, and what it can invest in the human capital that will decide Bauchi&apos;s 2035 outcome.
                  </p>
                </div>

                {/* Four Claims Grid */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 dark:text-white border-b pb-2 border-neutral-100 dark:border-petrol-800/60">The Four Claims</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold font-sans uppercase text-green-700 dark:text-green-400">1. Rentier Classification</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        By the standard four-part test (rent &gt;40% of revenue, effort-independence, concentrated receipt, thin tax base), Bauchi is unambiguously rentier.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold font-sans uppercase text-green-700 dark:text-green-400">2. Resource Misallocation</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Bauchi is one of only six states spending &gt;60% of its budget on salaries and overheads; debt service (~₦37bn) is deducted at source; a ~₦59bn deficit is borrowed. This leaves little for schools, clinics, and irrigation.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold font-sans uppercase text-green-700 dark:text-green-400">3. Proven Agility</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        The rentier equilibrium is a <em>tendency, not a trap</em>: Bauchi grew IGR &gt;500% (2015&ndash;24), the fastest in the North-East.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold font-sans uppercase text-green-700 dark:text-green-400">4. The Strategic Window</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        A narrow reform window exists now: the 2025 national tax reform + temporary post-subsidy FAAC windfall + a second-term governor with a fixed horizon. It closes at the 2027 cycle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Why the Model Caps Development */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 dark:text-white border-b pb-2 border-neutral-100 dark:border-petrol-800/60">Why the Model Caps Development</h3>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-350">
                    Rentier financing runs accountability <em>upward</em> (to Abuja and the FAAC formula) instead of <em>downward</em> to a taxpaying citizenry &mdash; short-circuiting the &ldquo;tax bargain&rdquo; that built accountable states elsewhere. Its deepest bias: human-capital and climate investments deliver <em>diffuse, deferred, unattributable</em> benefits, which reliably lose the budget battle to concentrated, visible, creditable spending. So the 61% out-of-school rate, worst-in-zone maternal mortality, and ~10.9% of facilities with a doctor aren&apos;t anomalies &mdash; they&apos;re what the system, as financed, is structurally built to produce.
                  </p>
                </div>

                {/* The Prescription */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 dark:text-white border-b pb-2 border-neutral-100 dark:border-petrol-800/60">The Prescription: Different Financing, Not More Spending</h3>
                  <ul className="list-decimal pl-5 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <li>
                      <strong className="text-neutral-800 dark:text-neutral-350">Deepen IGR reform into a genuine tax bargain</strong>: broaden to property, presumptive, and informal-sector taxes, digitize collection, and publish collections &mdash; targeting FAAC dependence below 60%.
                    </li>
                    <li>
                      <strong className="text-neutral-800 dark:text-neutral-350">Use the FAAC windfall for balance-sheet repair</strong>: retire debt and ring-fence capex rather than expanding recurrent overheads.
                    </li>
                    <li>
                      <strong className="text-neutral-800 dark:text-neutral-350">Treat human capital as the return on fiscal reform</strong>: invest directly in girl-child schooling, the Primary Health Care (PHC) workforce, and climate-resilient agriculture.
                    </li>
                  </ul>
                </div>

                {/* The Bottom Line */}
                <div className="bg-neutral-50 dark:bg-petrol-900/20 border border-neutral-200 dark:border-petrol-800 p-6 rounded-none space-y-2">
                  <h3 className="text-xs font-bold uppercase text-neutral-800 dark:text-white tracking-wider">The Bottom Line</h3>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Two futures exist: drift (dependence stays &gt;80%, windfall absorbed into recurrent) or reform (IGR builds a taxpayer constituency, debt restructured, capex space deployed against the human-capital deficit leading to measurable convergence with Kaduna and pulling clear of Gombe and Jigawa by the early 2030s). The difference will be decided in the next 12&ndash;24 months. As the paper closes: <strong className="italic text-neutral-900 dark:text-white">&ldquo;The rent will not save Bauchi. The tax bargain might.&rdquo;</strong>
                  </p>
                </div>
              </div>
            ) : pub.body ? (
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
                <a 
                  href={typeof pub.attachment === "object" && pub.attachment && pub.attachment.url ? getMediaUrl(pub.attachment.url) : "/uploads/placeholder.pdf"} 
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
