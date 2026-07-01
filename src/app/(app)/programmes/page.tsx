import React from "react";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CommissionForm } from "@/components/shared/CommissionForm";
import Link from "next/link";

export default function ProgrammesPage() {
  const flagshipProgrammes = [
    {
      title: "SDCI Policy Fellowship",
      subtitle: "Empowering the next generation of policy leaders",
      tag: "Fellowship",
      tagColor: "lime" as const,
      description:
        "A selective 9-month program providing mid-career researchers, civil servants, and journalists with the analytical tools, writing skills, and mentorship needed to design and influence evidence-based policy in West Africa.",
      highlights: [
        "1-on-1 Mentorship with senior policy experts",
        "Policy Design Seminars & Quantitative Analysis workshops",
        "Access to research grant seed funding",
        "Publication opportunities in SDCI policy papers",
      ],
      ctaLabel: "Apply for Fellowship",
      ctaUrl: "/contact",
    },
    {
      title: "SDCI Membership Network",
      subtitle: "A vibrant community of practice",
      tag: "Membership",
      tagColor: "green" as const,
      description:
        "Join a growing network of policy analysts, scholars, development practitioners, and institutions committed to data-driven decision making. Membership supports our independence and places you at the center of the dialogue.",
      highlights: [
        "Full access to SDCI research data repositories",
        "Priority seating at national dialogues & roundtables",
        "Invitations to member-only briefings & dinners",
        "Opportunities for collaborative policy co-authorship",
      ],
      ctaLabel: "Join the Network",
      ctaUrl: "/get-involved#membership",
    },
    {
      title: "Youth Policy Incubator (YPI)",
      subtitle: "Nurturing young voices in public policy",
      tag: "Academic",
      tagColor: "petrol" as const,
      description:
        "An intensive 3-month training bootcamp and internship program designed for students and early-career analysts under 28 to build basic quantitative analysis skills, master policy writing, and participate in active projects.",
      highlights: [
        "Rigorous quantitative analysis training (Excel/R/Python)",
        "Paid internship placement opportunities",
        "Dedicated peer learning groups & research advisors",
        "Career guidance & professional network access",
      ],
      ctaLabel: "Express Interest",
      ctaUrl: "/contact",
    },
    {
      title: "Sub-national Governance Initiative (SGI)",
      subtitle: "Evidence-driven local administration",
      tag: "Governance",
      tagColor: "outline" as const,
      description:
        "Strengthening administration at state and local levels by helping local government councils and state agencies design economic plans, track municipal budget spending, and use localized data to deliver public services effectively.",
      highlights: [
        "Local economic planning assistance",
        "Municipal budget tracking & execution tools",
        "Technical audits and capacity building modules",
        "LGA policy alignment workshops",
      ],
      ctaLabel: "Partner with SGI",
      ctaUrl: "/programmes#commission",
    },
    {
      title: "Data for Development Initiative (D4D)",
      subtitle: "Open data, open opportunities",
      tag: "Open Data",
      tagColor: "gray" as const,
      description:
        "A collaborative effort to clean, digitize, and publish key socio-economic datasets for West Africa. Making public registries, census logs, and agricultural reports easily queryable for academic and commercial research.",
      highlights: [
        "Curated and clean open-access data portals",
        "Free API access for developers and research labs",
        "Annual development indicators digest",
        "Interactive policy dashboard tooling",
      ],
      ctaLabel: "Explore Datasets",
      ctaUrl: "/research",
    },
  ];

  const services = [
    {
      title: "Research & Analysis",
      icon: (
        <svg className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description:
        "We gather and analyse the evidence others act on &mdash; producing policy briefs, thematic reports, and working papers, and taking on commissioned studies for partners who need rigorous, independent analysis on a specific question.",
      revenue: "Commissioned and collaborative research projects.",
    },
    {
      title: "Capacity Building",
      icon: (
        <svg className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description:
        "We strengthen the skills and effectiveness of the people and institutions doing the work &mdash; through workshops, training, and mentorship designed around real needs, not generic curricula.",
      revenue: "Training modules and programme fees.",
    },
    {
      title: "Advisory & Consulting",
      icon: (
        <svg className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description:
        "Expert guidance, technical assistance, and consulting for public and private organisations navigating complex decisions &mdash; drawing on the same rigour that powers our research.",
      revenue: "Advisory, consulting, and evaluation fees.",
    },
    {
      title: "Dialogues & Seminars",
      icon: (
        <svg className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description:
        "Structured, dialogue-driven sessions that bring stakeholders together to think through a challenge with us in the room. Bridging evidence and decision makers.",
      revenue: "Event registration and sponsor packages.",
    },
  ];

  return (
    <div className="font-sans text-petrol-950 dark:text-neutral-200 bg-white dark:bg-transparent min-h-screen transition-colors duration-300">
      {/* 1. Page Header (Hero style) */}
      <section className="relative bg-petrol-50 dark:bg-petrol-950/20 text-petrol-950 dark:text-white py-24 px-6 text-center overflow-hidden border-b border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
        <div className="relative max-w-4xl mx-auto space-y-4 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-850 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-405 bg-transparent w-fit mx-auto font-sans">
            OUR PROGRAMMES
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-petrol-950 dark:text-white">
            Programmes & Services
          </h1>
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-petrol-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-petrol-950 dark:text-white font-bold">Programmes</span>
          </div>
        </div>
      </section>

      {/* 2. Flagship Initiatives Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-green-700 dark:text-green-400 text-xs font-extrabold uppercase tracking-widest font-sans">
            FLAGSHIP INITIATIVES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-petrol-950 dark:text-white">
            Driving Action through Knowledge
          </h2>
          <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
            From professional policy fellowships to open-data registries, SDCI runs programs that connect rigorous research with real-world public governance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {flagshipProgrammes.map((prog) => (
            <Card
              key={prog.title}
              variant="interactive"
              className="p-8 md:p-10 flex flex-col justify-between h-full bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 transition-all duration-300 hover:shadow-xl hover:border-green-600/30"
            >
              <div className="space-y-6">
                {/* Header elements: Tag + Title */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Tag variant={prog.tagColor} className="text-[10px] tracking-widest px-2.5 py-1">
                      {prog.tag}
                    </Tag>
                    <h3 className="text-2xl font-bold font-serif text-petrol-950 dark:text-white leading-tight">
                      {prog.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs font-semibold text-green-800 dark:text-green-450 uppercase tracking-wider">
                  {prog.subtitle}
                </p>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
                  {prog.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-petrol-900">
                  <h4 className="text-[11px] font-bold text-petrol-950 dark:text-white uppercase tracking-widest">
                    Program highlights & benefits:
                  </h4>
                  <ul className="space-y-2.5">
                    {prog.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300 text-sm">
                        <svg className="h-5 w-5 text-green-700 dark:text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link href={prog.ctaUrl}>
                  <Button variant="dark-green" className="w-full text-xs uppercase tracking-wider py-3.5">
                    {prog.ctaLabel}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Technical & Advisory Services Section */}
      <section className="bg-neutral-50/50 dark:bg-petrol-900/10 py-24 px-6 border-t border-b border-neutral-200/60 dark:border-petrol-900/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-green-700 dark:text-green-400 text-xs font-extrabold uppercase tracking-widest font-sans">
              CORE SERVICES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-petrol-950 dark:text-white">
              Technical & Advisory Services
            </h2>
            <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed">
              We collaborate with government departments, non-governmental organisations, and corporate foundations seeking rigorous, independent research and training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc) => (
              <Card key={svc.title} variant="default" className="p-8 md:p-10 space-y-6 bg-white dark:bg-petrol-950/40 border border-neutral-200 dark:border-petrol-900 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 dark:bg-petrol-900 rounded-none text-green-750 dark:text-green-400">
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">{svc.title}</h3>
                </div>
                <p
                  className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: svc.description }}
                />
                <div className="pt-4 border-t border-neutral-100 dark:border-petrol-900 flex items-center justify-between text-[11px] font-semibold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider">
                  <span>Funding Structure</span>
                  <span className="text-petrol-950 dark:text-neutral-200 font-bold">{svc.revenue}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Commission Us Form section */}
      <section id="commission" className="bg-white dark:bg-transparent py-24 px-6 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-none border border-neutral-300 dark:border-petrol-800 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-450 bg-transparent w-fit mx-auto">
            Commission us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-petrol-950 dark:text-white">Request a Consultation</h2>
          <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Organisations come to us when they need independent, rigorous evidence on a specific question &mdash; a study, a policy analysis, an evaluation, technical advice, or a training programme built for their team.
          </p>
        </div>

        <CommissionForm />

        <div className="max-w-xl mx-auto text-center pt-10 text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
          <p className="font-semibold text-petrol-950 dark:text-white text-base">Prefer direct email?</p>
          <p className="mt-1">
            Send your brief to <span className="font-bold text-green-800 dark:text-green-400">partnerships@sdci.org.ng</span> with your goal, the deliverables you want, and your timeline, and we will come back to you with a scope.
          </p>
        </div>
      </section>
    </div>
  );
}
