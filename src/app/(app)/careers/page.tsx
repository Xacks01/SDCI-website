import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CareersForm } from "@/components/shared/CareersForm";
import Link from "next/link";

export const revalidate = 60;

export default async function CareersPage() {
  const payload = await getPayload({ config });

  // Fetch open roles
  const rolesResult = await payload.find({
    collection: "open-roles",
    where: {
      deadline: { greater_than: new Date().toISOString() },
    },
    limit: 20,
  }).catch(() => ({ docs: [] }));

  const roles = rolesResult.docs;

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-transparent min-h-screen transition-colors duration-300">
      {/* 1. Page Header */}
      <section className="relative bg-petrol-50 dark:bg-petrol-950/20 text-petrol-950 dark:text-white py-20 px-6 text-center overflow-hidden border-b border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
        <div className="relative max-w-4xl mx-auto space-y-4 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-450 bg-transparent w-fit mx-auto font-sans">
            JOIN OUR TEAM
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-petrol-950 dark:text-white">
            Careers at SDCI
          </h1>
          <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans">
            We are built by people who believe better decisions come from better evidence. If that is you &mdash; researcher, writer, designer, analyst, content maker, or convener &mdash; join us.
          </p>
        </div>
      </section>

      {/* 2. Culture & Values (Lean & Clean) */}
      <section className="max-w-7xl mx-auto py-20 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Block */}
          <div className="space-y-4">
            <span className="text-green-700 dark:text-green-400 text-xs font-extrabold uppercase tracking-widest font-sans">
              WHY SDCI?
            </span>
            <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">
              Work that matters, craft that shines.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-350 text-sm leading-relaxed">
              We operate as a flat, collaborative team. There are no heavy hierarchies or corporate red tape &mdash; just passionate people producing work that shapes public decisions.
            </p>
          </div>

          {/* Right Cards (3 Columns) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" className="p-6 space-y-3 bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
              <div className="p-2 bg-green-50 dark:bg-petrol-900 rounded-none w-fit text-green-700 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-base font-serif text-petrol-950 dark:text-white">Real Influence</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-350 leading-relaxed">
                Your output directly informs policy briefs, public debates, and transparent reforms, not just static academic journals.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
              <div className="p-2 bg-green-50 dark:bg-petrol-900 rounded-none w-fit text-green-700 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="font-bold text-base font-serif text-petrol-950 dark:text-white">Creative Ownership</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-350 leading-relaxed">
                Whether you design our reports, write copy, produce media, or write code, we give you the space to own your craft.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
              <div className="p-2 bg-green-50 dark:bg-petrol-900 rounded-none w-fit text-green-700 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-base font-serif text-petrol-950 dark:text-white">Growth & Range</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-350 leading-relaxed">
                We are a lean, agile team where you will work across different projects, helping you build a broad portfolio of impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Open Positions */}
      <section className="max-w-7xl mx-auto py-20 px-6 border-b border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
        <div className="space-y-3 mb-12">
          <span className="text-green-700 dark:text-green-400 text-xs font-extrabold uppercase tracking-widest font-sans">
            CURRENT OPENINGS
          </span>
          <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Open Positions</h2>
        </div>

        {roles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {roles.map((role: any) => (
              <Card
                key={role.id}
                variant="interactive"
                className="p-6 flex flex-col justify-between h-full bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 hover:border-green-600/30 hover:shadow-md transition-colors duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <Tag variant="outline" className="text-[10px] tracking-wider px-2 py-0.5">
                      {role.type}
                    </Tag>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-400 font-bold uppercase tracking-wider">
                      📍 {role.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Department: {role.department}</p>
                </div>

                <div className="pt-6 border-t border-neutral-100 dark:border-petrol-900 mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                    Deadline: <strong>{new Date(role.deadline).toLocaleDateString("en-NG", { dateStyle: "medium" })}</strong>
                  </span>
                  {role.applyURL ? (
                    <a href={role.applyURL} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                      <Button variant="dark-green" size="sm" className="w-full sm:w-auto text-xs py-1.5 uppercase tracking-wider">
                        Apply Now
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs py-1.5 uppercase tracking-wider">
                      Apply
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-8 md:p-12 border border-neutral-200 dark:border-petrol-900 rounded-none text-center bg-neutral-50/20 dark:bg-petrol-950/20 max-w-2xl mx-auto space-y-3">
            <h3 className="font-bold text-lg text-petrol-950 dark:text-white font-serif">No open roles right now</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-350 max-w-md mx-auto leading-relaxed">
              We are always looking for talented researchers, designers, copywriters, and content makers. Submit your details to our talent pool below and we will get in touch when opportunities open.
            </p>
          </div>
        )}
      </section>

      {/* 4. Internships (Lean & Inclusive) */}
      <section className="bg-neutral-50/50 dark:bg-petrol-900/10 py-16 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-455 bg-transparent w-fit mx-auto font-sans">
            EARLY CAREER
          </span>
          <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Paid Internships</h2>
          <p className="text-neutral-600 dark:text-neutral-350 text-sm leading-relaxed max-w-xl mx-auto font-sans">
            We offer 6-month, structured paid internships for early-career professionals across research, design, communications, and multimedia production. You will be paired with a mentor and work directly on active public campaigns.
          </p>
          <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-450 font-sans">
            To apply, select your primary area of interest in the talent pool form below.
          </div>
        </div>
      </section>

      {/* 5. Submit Your CV (Talent Pool) */}
      <section id="talent-pool" className="py-20 px-6 bg-white dark:bg-transparent transition-colors duration-300">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-455 bg-transparent w-fit mx-auto">
            TALENT POOL
          </span>
          <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Submit your CV</h2>
          <p className="text-neutral-600 dark:text-neutral-350 text-sm max-w-md mx-auto leading-relaxed">
            Think you belong at SDCI? Submit your CV and select your track. We monitor this list regularly when expanding our collaborator and core network.
          </p>
        </div>

        <CareersForm />
      </section>
    </div>
  );
}
