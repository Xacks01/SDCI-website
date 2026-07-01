import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 60;

interface AboutPageProps {
  searchParams: Promise<{
    profile?: string;
  }>;
}

// Utility to safely convert Payload Lexical RichText JSON structure to string paragraphs
function serializeLexical(richText: any): string {
  if (!richText) return "";
  if (typeof richText === "string") return richText;
  try {
    const children = richText.root?.children || [];
    return children
      .map((child: any) => {
        if (child.children) {
          return child.children.map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  } catch (e) {
    return "";
  }
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const activeProfileId = params.profile;

  const payload = await getPayload({ config });

  // Fetch team members sorted by order
  const teamResult = await payload.find({
    collection: "team",
    sort: "order",
    limit: 100,
  }).catch(() => ({ docs: [] }));

  const team = teamResult.docs;

  // Group team members by department / role targets
  const board = team.filter((t: any) => t.department === "board");
  
  // Board slots - at least 6 slots
  const totalBoardSlots = 6;
  const boardSlots = [...board];
  const seedBoardRoles = [
    "Chairman, Board of Directors",
    "Vice Chairman, Board of Directors",
    "Director (Governance & Policy Audit)",
    "Director (Financial Compliance)",
    "Director (Strategic Programs)",
    "Director (International Relations & Development)",
  ];

  while (boardSlots.length < totalBoardSlots) {
    const idx = boardSlots.length;
    boardSlots.push({
      id: `board-vacant-${idx}`,
      name: `Director Position ${idx + 1}`,
      role: seedBoardRoles[idx] || "Board Director",
      department: "board",
      isVacant: true,
    });
  }

  // CEO
  const ceoMember = team.find((t: any) => 
    t.department === "exec" || 
    t.role.toLowerCase().includes("ceo") || 
    t.role.toLowerCase().includes("chief executive officer")
  );

  // Executive Assistant
  const execAssistant = team.find((t: any) => 
    t.role.toLowerCase().includes("assistant") && 
    (t.role.toLowerCase().includes("exec") || t.role.toLowerCase().includes("executive"))
  ) || {
    id: "exec-assistant",
    name: "Executive Assistant",
    role: "Executive Assistant to the CEO",
    desc: "Providing administrative coordination, office liaison, and governance support for the Executive Leadership office.",
  };

  // Secretary
  const secretary = team.find((t: any) => 
    t.department === "secretary" || t.role.toLowerCase().includes("secretary")
  ) || {
    id: "secretary",
    name: "Executive Secretariat",
    role: "Executive Secretary",
    desc: "Managing administrative correspondence, secretariat schedules, and document compliance protocols.",
  };

  const execSupportGroup = [
    ...(ceoMember ? [ceoMember] : []),
    execAssistant,
    secretary,
  ];

  // Research Team - exactly three people: Department Lead, Research Analyst I, and Research Analyst II
  const researchLead = team.find((t: any) => 
    t.department === "research-policy" && t.role.toLowerCase().includes("lead")
  ) || {
    id: "research-lead",
    name: "Dr. [Lead Researcher]",
    role: "Department Lead, Research & Policy Advocacy",
    department: "research-policy",
  };

  const analyst1 = team.find((t: any) => 
    t.department === "research-policy" && 
    (t.role.toLowerCase().includes("analyst i") || t.role.toLowerCase().includes("analyst 1"))
  ) || {
    id: "research-analyst-1",
    name: "Mr. [Research Analyst I]",
    role: "Research Analyst I",
    department: "research-policy",
  };

  const analyst2 = team.find((t: any) => 
    t.department === "research-policy" && 
    (t.role.toLowerCase().includes("analyst ii") || t.role.toLowerCase().includes("analyst 2"))
  ) || {
    id: "research-analyst-2",
    name: "Ms. [Research Analyst II]",
    role: "Research Analyst II",
    department: "research-policy",
  };

  const researchTeam = [researchLead, analyst1, analyst2];

  // Core Operations & Program Team
  const stakeholderLead = team.find((t: any) => t.department === "stakeholder" || t.role.toLowerCase().includes("stakeholder")) || {
    id: "stakeholder-lead",
    name: "Mrs. [Stakeholder Engagement Lead]",
    role: "Lead, Stakeholder Engagement & Programs",
    desc: "Facilitating community dialogues, stakeholder roundtables, and coordinating external program engagement.",
  };
  const partnershipsLead = team.find((t: any) => t.department === "partnerships" || t.role.toLowerCase().includes("partnership")) || {
    id: "partnerships-lead",
    name: "Dr. [Partnerships Lead]",
    role: "Lead, Partnerships & Funding",
    desc: "Managing donor relations, funding requests, and institutional collaboration agreements.",
  };
  const hrFinanceLead = team.find((t: any) => t.department === "hr-finance" || t.role.toLowerCase().includes("hr") || t.role.toLowerCase().includes("finance") || t.department === "hr-ops") || {
    id: "hr-finance-lead",
    name: "HR & Finance Lead",
    role: "Lead, Human Resources & Finance",
    desc: "Overseeing organizational talent development, audit compliance, and financial administration.",
  };
  const legalAdvisor = team.find((t: any) => t.role.toLowerCase().includes("legal") || t.department === "legal") || {
    id: "legal-advisor",
    name: "Legal Advisor",
    role: "Legal Advisor & Compliance Counsel",
    desc: "Advising on institutional compliance, contract reviews, statutory regulations, and legal risk management.",
  };

  const coreTeam = [
    stakeholderLead,
    partnershipsLead,
    hrFinanceLead,
    legalAdvisor,
  ];

  // Find active profile details for modal overlay
  let activeProfile: any = null;
  if (activeProfileId) {
    activeProfile = 
      boardSlots.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      execSupportGroup.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      researchTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      coreTeam.find((t: any) => t.id && String(t.id) === activeProfileId);
  }

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-transparent relative min-h-screen transition-colors duration-300">
      {/* 1. Hero Banner */}
      <section className="relative bg-petrol-50 dark:bg-petrol-950/20 text-petrol-950 dark:text-white py-24 px-6 text-center overflow-hidden border-b border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
        <div className="relative max-w-4xl mx-auto space-y-4 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-transparent w-fit mx-auto font-sans">
            ABOUT SDCI
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-petrol-950 dark:text-white">About Us</h1>
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-petrol-950 dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-petrol-950 dark:text-white font-bold">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. Identity Section (Side-by-Side) */}
      <section className="bg-white dark:bg-transparent py-24 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Workspace Image */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-none shadow-xl border border-neutral-200 group">
            <img 
              src="/assets/about-workspace.jpeg" 
              alt="SDCI Research Workspace" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right: Copy & CTA */}
          <div className="space-y-6">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight text-petrol-950 dark:text-white">
              We Always Shape the Best Decisions with Evidence
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
              <p>
                Sustainable Development Conversations Initiative (SDCI) is an independent, non-partisan policy research organization. We believe that public decisions in Africa must be guided by clear evidence, structured conversation, and long-term thinking.
              </p>
              <p>
                By bringing public administrators, private enterprises, and community stakeholders to the same table, we transform complex data and research findings into actionable policies that improve institutional accountability and sustainable growth.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/contact">
                <button className="bg-petrol-950 dark:bg-white hover:bg-petrol-800 dark:hover:bg-neutral-200 text-white dark:text-petrol-950 font-bold px-8 py-3.5 rounded-none text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="bg-neutral-50 dark:bg-petrol-900/10 py-24 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
              OUR VISION
            </span>
            <p className="text-2xl md:text-3xl font-bold font-serif text-petrol-950 dark:text-white leading-relaxed italic">
              &ldquo;A Nigeria &mdash; and an Africa &mdash; where public decisions are shaped by evidence, open debate, and the long view.&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
              OUR MISSION
            </span>
            <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
              SDCI conducts rigorous, independent research and turns it into open conversations that influence policy, strengthen institutional accountability, and improve decision-making on sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Pillars & Stats Section */}
      <section className="bg-white dark:bg-transparent py-24 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
              OUR CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-petrol-950 dark:text-white">
              Our Core Pillars
            </h2>
            <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed max-w-xl">
              Our research methodologies, stakeholder engagements, and capacity building programs empower organizations and governments with the insights needed to scale sustainable solutions.
            </p>
          </div>

          {/* Right Column: Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 lg:pt-0">
            <div className="space-y-2 border-l border-neutral-200 dark:border-petrol-900 pl-6 py-2">
              <span className="text-4xl md:text-5xl font-bold font-serif text-green-700">12+</span>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">Focus Areas</p>
            </div>
            <div className="space-y-2 border-l border-neutral-200 dark:border-petrol-900 pl-6 py-2">
              <span className="text-4xl md:text-5xl font-bold font-serif text-green-700">150+</span>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">Publications</p>
            </div>
            <div className="space-y-2 border-l border-neutral-200 dark:border-petrol-900 pl-6 py-2">
              <span className="text-4xl md:text-5xl font-bold font-serif text-green-700">100%</span>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">Independent</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership Section */}
      <section id="leadership" className="bg-neutral-50 dark:bg-petrol-900/10 py-24 px-6 border-b border-neutral-200 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
              TEAM PROFILES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-petrol-950 dark:text-white">Our Leadership Bench</h2>
            <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
              SDCI is led by a Board of Directors, a Chief Executive Officer, and specialized departments. We publish the profile of each leader to guarantee absolute transparency.
            </p>
          </div>

          <div className="space-y-16">
            {/* Board of Directors */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white border-b border-neutral-200 dark:border-petrol-900 pb-2">
                Board of Directors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {boardSlots.map((t: any, index: number) => {
                  const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                  return (
                    <div key={t.id || index} className="flex flex-col border border-neutral-200 dark:border-petrol-900 bg-white dark:bg-petrol-950/40 overflow-hidden transition-all duration-300 hover:shadow-lg h-full rounded-none">
                      {/* Top: Card Thumbnail - Half Card Height */}
                      <div className="relative w-full h-64 bg-neutral-100 dark:bg-petrol-900 flex items-center justify-center shrink-0 border-b border-neutral-200 dark:border-petrol-900">
                        {hasPhoto ? (
                          <img src={getMediaUrl(t.photo.url)} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                          <h4 className={`text-lg font-bold font-serif leading-tight ${t.isVacant ? 'text-neutral-400 italic' : 'text-petrol-950 dark:text-white'}`}>
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1">
                            {t.isVacant 
                              ? "Position pending allocation for the next governance appointment cycle." 
                              : "Advising on strategic initiatives, compliance audits, and independence goals."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="w-full">
                          <button className="w-full border border-petrol-950 dark:border-petrol-800 text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-petrol-900 hover:text-white dark:hover:text-white font-bold text-xs uppercase py-2.5 transition-colors cursor-pointer rounded-none">
                            View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CEO & Executive Support */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white border-b border-neutral-200 dark:border-petrol-900 pb-2">
                Chief Executive Officer & Executive Support
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {execSupportGroup.map((t: any, index: number) => {
                  const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                  return (
                    <div key={t.id || index} className="flex flex-col border border-neutral-200 dark:border-petrol-900 bg-white dark:bg-petrol-950/40 overflow-hidden transition-all duration-300 hover:shadow-lg h-full rounded-none">
                      {/* Top: Card Thumbnail - Half Card Height */}
                      <div className="relative w-full h-64 bg-neutral-100 dark:bg-petrol-900 flex items-center justify-center shrink-0 border-b border-neutral-200 dark:border-petrol-900">
                        {hasPhoto ? (
                          <img src={getMediaUrl(t.photo.url)} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1">
                            {t.desc || "Shaping SDCI's organizational scale, program delivery, and executive coordination."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="w-full">
                            <button className="w-full border border-petrol-950 dark:border-petrol-800 text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-petrol-900 hover:text-white dark:hover:text-white font-bold text-xs uppercase py-2.5 transition-colors cursor-pointer rounded-none">
                              View Profile
                            </button>
                          </Link>
                        ) : (
                          <button className="w-full border border-neutral-300 text-neutral-400 rounded-none font-bold text-xs uppercase py-2.5 opacity-50 cursor-not-allowed" disabled>
                            View Profile
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Research Team */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white border-b border-neutral-200 dark:border-petrol-900 pb-2">
                Research Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {researchTeam.map((t: any, index: number) => {
                  const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                  return (
                    <div key={t.id || index} className="flex flex-col border border-neutral-200 dark:border-petrol-900 bg-white dark:bg-petrol-950/40 overflow-hidden transition-all duration-300 hover:shadow-lg h-full rounded-none">
                      {/* Top: Card Thumbnail - Half Card Height */}
                      <div className="relative w-full h-64 bg-neutral-100 dark:bg-petrol-900 flex items-center justify-center shrink-0 border-b border-neutral-200 dark:border-petrol-900">
                        {hasPhoto ? (
                          <img src={getMediaUrl(t.photo.url)} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1">
                            {t.role.toLowerCase().includes("lead")
                              ? "Conducting empirical analyses, budget evaluations, and coordinating departmental research outputs."
                              : "Conducting policy research, data verification, and sustainable development analytics."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="w-full">
                            <button className="w-full border border-petrol-950 dark:border-petrol-800 text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-petrol-900 hover:text-white dark:hover:text-white font-bold text-xs uppercase py-2.5 transition-colors cursor-pointer rounded-none">
                              View Profile
                            </button>
                          </Link>
                        ) : (
                          <button className="w-full border border-neutral-300 text-neutral-400 rounded-none font-bold text-xs uppercase py-2.5 opacity-50 cursor-not-allowed" disabled>
                            View Profile
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Core Team */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white border-b border-neutral-200 dark:border-petrol-900 pb-2">
                Core Operations & Program Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreTeam.map((t: any, index: number) => {
                  const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                  return (
                    <div key={t.id || index} className="flex flex-col border border-neutral-200 dark:border-petrol-900 bg-white dark:bg-petrol-950/40 overflow-hidden transition-all duration-300 hover:shadow-lg h-full rounded-none">
                      {/* Top: Card Thumbnail - Half Card Height */}
                      <div className="relative w-full h-64 bg-neutral-100 dark:bg-petrol-900 flex items-center justify-center shrink-0 border-b border-neutral-200 dark:border-petrol-900">
                        {hasPhoto ? (
                          <img src={getMediaUrl(t.photo.url)} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1">
                            {t.desc || "Overseeing operational delivery, programmatic scale, and administrative coordination."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="w-full">
                            <button className="w-full border border-petrol-950 dark:border-petrol-800 text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-petrol-900 hover:text-white dark:hover:text-white font-bold text-xs uppercase py-2.5 transition-colors cursor-pointer rounded-none">
                              View Profile
                            </button>
                          </Link>
                        ) : (
                          <button className="w-full border border-neutral-300 text-neutral-400 rounded-none font-bold text-xs uppercase py-2.5 opacity-50 cursor-not-allowed" disabled>
                            View Profile
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Independence Statement */}
      <section id="independence" className="max-w-4xl mx-auto py-24 px-6 border-b border-neutral-200 dark:border-petrol-900/60 space-y-6 flex flex-col items-center">
        <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
          GOVERNANCE
        </span>
        <h2 className="text-3xl font-bold font-serif text-center text-petrol-950 dark:text-white mt-3">Independence & Funding</h2>
        <div className="space-y-4 text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed w-full">
          <p>
            SDCI&apos;s independence is structural, not just a promise. We are funded through a deliberate mix of sources so that no single one can set our agenda:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Grants and donations from foundations and government bodies</li>
            <li>Commissioned and collaborative research</li>
            <li>Revenue from events, conferences, and seminars</li>
            <li>Sales of our premium publications</li>
            <li>Membership subscriptions</li>
            <li>Fees from training and capacity-building programmes</li>
          </ul>
          <p>
            We disclose our funders annually. Our researchers&apos; credentials are published in full. Where a piece of work is commissioned or supported by a specific funder, we say so on the work itself. Our findings are ours &mdash; if the evidence is inconvenient for a backer, we publish it anyway.
          </p>
        </div>
      </section>

      {/* 7. Annual Reports */}
      <section id="annual-reports" className="max-w-4xl mx-auto py-24 px-6 space-y-6 text-center flex flex-col items-center">
        <span className="text-green-700 text-xs font-extrabold uppercase tracking-widest font-sans">
          TRANSPARENCY
        </span>
        <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white mt-3">Annual Reports</h2>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Every year we publish what we did, what we found, and where our money came from and went. Transparency is something we ask of others; we hold ourselves to it first.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          {["2025", "2024", "2023"].map((year) => (
            <button key={year} className="border border-petrol-950 dark:border-petrol-750 text-petrol-950 dark:text-neutral-200 hover:bg-petrol-950 dark:hover:bg-petrol-900 hover:text-white dark:hover:text-white font-semibold px-6 py-3 transition-colors cursor-pointer rounded-none text-xs uppercase tracking-wider bg-transparent">
              Download {year} Annual Report (PDF)
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Modal Overlay for Active Profile */}
      {activeProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-petrol-950 border border-neutral-200 dark:border-petrol-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative shadow-2xl rounded-none text-petrol-950 dark:text-neutral-250">
            {/* Close Button */}
            <Link href="/about#leadership" scroll={false} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-350 transition-colors z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>

            <div className="p-8 space-y-6">
              {/* Profile Header: Photo and Basic Info */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pb-6 border-b border-neutral-100 dark:border-petrol-900">
                <div className="w-28 h-28 rounded-none bg-neutral-50 dark:bg-petrol-900 border border-neutral-200 dark:border-petrol-800 overflow-hidden shrink-0 flex items-center justify-center">
                  {activeProfile.photo && typeof activeProfile.photo === "object" && activeProfile.photo.url ? (
                    <img src={getMediaUrl(activeProfile.photo.url)} alt={activeProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center">
                      <svg className="w-10 h-10 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-2xl font-bold font-serif text-petrol-950 dark:text-white leading-tight">{activeProfile.name}</h3>
                  <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">{activeProfile.role}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wide">
                    {activeProfile.department === "board" 
                      ? "Board of Directors" 
                      : activeProfile.department === "exec" 
                      ? "Executive Leadership" 
                      : "Operations & Research"}
                  </p>
                </div>
              </div>

              {/* Profile Details / Bio */}
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base prose max-w-none">
                <h4 className="font-bold text-petrol-950 dark:text-white text-base font-serif">Biography & Focus</h4>
                {activeProfile.bio ? (
                  <p className="whitespace-pre-line">{serializeLexical(activeProfile.bio)}</p>
                ) : (
                  <p className="text-neutral-400 dark:text-neutral-400 italic">
                    {activeProfile.isVacant 
                      ? "This position is currently open for the next governance appointment cycle." 
                      : `${activeProfile.name} leads programmatic delivery, operational design, and strategic frameworks within their designated office at SDCI.`}
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-neutral-100 dark:border-petrol-900">
                <Link href="/about#leadership" scroll={false}>
                  <button className="border border-neutral-300 dark:border-petrol-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-petrol-900 font-bold px-6 py-2.5 transition-colors cursor-pointer rounded-none text-xs uppercase tracking-wider">
                    Close Profile
                  </button>
                </Link>

                {activeProfile.cvFile && typeof activeProfile.cvFile === "object" && activeProfile.cvFile.url ? (
                  <a href={getMediaUrl(activeProfile.cvFile.url)} download>
                    <Button variant="dark-green" className="font-bold rounded-none text-xs uppercase px-6">
                      Download CV (PDF)
                    </Button>
                  </a>
                ) : (
                  <Button variant="dark-green" className="font-bold rounded-none text-xs uppercase px-6 opacity-50 cursor-not-allowed" disabled>
                    Download CV (Unavailable)
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
