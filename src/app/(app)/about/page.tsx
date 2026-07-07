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

// Helper to enrich database team members with fallback photos, names, and roles if missing/placeholder
function enrichMember(member: any, fallback: any) {
  if (!member) return fallback;
  const enriched = { ...member };
  // If name has placeholder brackets or looks like placeholder, use fallback name
  if (!enriched.name || enriched.name.includes("[")) {
    enriched.name = fallback.name;
  }
  // If no photo in database, use fallback photo
  if (!enriched.photo || (typeof enriched.photo === "object" && !enriched.photo.url)) {
    enriched.photo = fallback.photo;
  }
  // If role is a placeholder, use fallback role
  if (!enriched.role || enriched.role.includes("[")) {
    enriched.role = fallback.role;
  }
  // Extract description from database bio if present
  if (enriched.bio) {
    const plainTextBio = serializeLexical(enriched.bio);
    if (plainTextBio) {
      enriched.desc = plainTextBio;
    }
  }
  // If no description, use fallback description
  if (!enriched.desc && fallback.desc) {
    enriched.desc = fallback.desc;
  }
  return enriched;
}

function getZoomClass(member: any) {
  if (!member || !member.photo || (typeof member.photo === "object" && !member.photo.url)) {
    return "object-cover scale-[1.15] origin-[50%_30%]";
  }
  const name = (member.name || "").toLowerCase();
  
  if (name.includes("fateh")) {
    return "object-cover scale-[1.1] origin-[50%_20%]";
  }
  if (name.includes("ummul")) {
    return "object-cover scale-[1.15] origin-[50%_20%]";
  }
  if (name.includes("naffaa")) {
    return "object-cover scale-[1.4] origin-[50%_25%]";
  }
  if (name.includes("murtala")) {
    return "object-cover scale-[1.4] origin-[50%_25%]";
  }
  if (name.includes("shahid") || name.includes("shaheed") || name.includes("jahun")) {
    return "object-cover scale-[1.05] origin-[50%_15%]";
  }
  if (name.includes("fatima")) {
    return "object-cover scale-[1.4] origin-[50%_25%]";
  }
  if (name.includes("zakariya")) {
    return "object-cover scale-100 origin-center";
  }
  
  return "object-cover scale-[1.15] origin-[50%_30%]";
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
  
  // Fallback board list
  const fallbackBoard = [
    {
      id: "board-1",
      name: "Mr. Olusegun Adeniyi",
      role: "Chairman, Board of Directors",
      department: "board",
      desc: "Mr. Olusegun Adeniyi is a veteran Nigerian journalist, born 6 November 1965 in Ile-Ife. He chairs the editorial board of ThisDay newspapers and was presidential spokesman (Special Adviser on Media and Publicity) to the late President Umaru Musa Yar’Adua from 2007 until Yar’Adua’s death in 2010. He writes ThisDay’s weekly column, “The Verdict,” and has authored several books on Nigerian politics.",
    },
    {
      id: "board-2",
      name: "Mrs. Halima AbdulRa’uf",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Mrs. Halima AbdulRa’uf is a broadcast journalist and media executive. She is a former staffer of the Voice of America (VOA) Hausa Service, where she presented news and reports. She now serves as Chief Executive Officer of S24 Television, a Nigerian broadcaster whose advisory board she helped unveil, describing it as a step toward professionalism, accountability and positioning the station as a trusted platform for national, development-focused conversations. She is a University of Leicester alumna based in Abuja.",
    },
    {
      id: "board-3",
      name: "Mr. Myani Bukar",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Mr. Myani Bukar is a lawyer, development economist and policy researcher. He earned his law degree from the University of Jos and holds a dual master’s in law and management of development from the University of Turin, jointly administered with the United Nations. He served as Special Assistant (Legal Matters) in the Presidency and has worked as a Research Associate at ODI and as a Governance Advisor for the Nigeria Governors’ Forum.",
    },
    {
      id: "board-4",
      name: "Mr. Sadiq Wanka",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Mr. Sadiq Wanka is an energy and power-sector policy specialist. Since 2023 he has been Special Adviser to the President on Power Infrastructure in the Office of the Vice President. He previously worked at McKinsey & Company, Amazon and in renewables, and holds an MBA from Stanford Graduate School of Business. His focus is attracting private capital across the power value chain.",
    },
    {
      id: "board-5",
      name: "Barrister Saadatu Hamu Aliyu",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Barrister Saadatu Hamu Aliyu is a corporate and technology lawyer. She is founder and Managing Partner of Hamu Legal, an Abuja multidisciplinary firm advising early-stage and high-growth companies, with specializations in banking and finance, energy, fintech and regulatory compliance. She holds a Master’s in National Security from Georgetown University Law Center, is a 2016 Associate Fellow of the Nigeria Leadership Initiative, and formerly curated the World Economic Forum’s Global Shapers Abuja Hub.",
    },
    {
      id: "board-6",
      name: "Shetima Sani Dambatta",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Shetima Sani Dambatta is an oil-and-gas professional at NNPC Limited. He has served in technical advisory and operations roles, to include Subsurface Operations Advisor and Technical Advisor within NNPC’s upstream and investment functions. His background spans civil engineering, academia (Nile University) and tax administration (FIRS), with recent executive training at MIT Sloan and the Aig-Imoukhuede Foundation Public Leaders Programme.",
    },
    {
      id: "board-7",
      name: "Dr. Aishatu Kabir",
      role: "Member, Board of Directors",
      department: "board",
      desc: "Dr. Aishatu Kabir is an economist and public policy strategist with years of experience in policy advocacy, government coordination, and strategy execution across Nigeria’s public and private sectors. She has a track record of working with senior government officials, multilateral institutions, and civil society to shape and implement reforms across trade, health, agriculture, and digital transformation, with strengths in political economy analysis, stakeholder engagement, and turning complex development priorities into actionable policy. She currently serves in the Presidency as Special Assistant on Delivery & Coordination, leading high-level initiatives aligned with national and international development goals. She holds a PhD, was educated at Nile University of Nigeria, and is based in Abuja.",
    },
  ];

  // Enrich fallback board slots with database board items if present
  const boardSlots = fallbackBoard.map((fallback, idx) => {
    const dbMember = board[idx];
    return enrichMember(dbMember, fallback);
  });

  // If there are more database board members than the 7 fallbacks, append them
  if (board.length > fallbackBoard.length) {
    for (let i = fallbackBoard.length; i < board.length; i++) {
      boardSlots.push(board[i]);
    }
  }

  // CEO
  const dbCeo = team.find((t: any) => 
    t.department === "exec" || 
    t.role.toLowerCase().includes("ceo") || 
    t.role.toLowerCase().includes("chief executive officer")
  );
  const ceoMember = enrichMember(dbCeo, {
    id: "ceo-sulaiman",
    name: "Sulaiman Ahmad Fanty",
    role: "Chief Executive Officer",
    photo: { url: "/assets/passports/sulaiman-ahmad-fanty.jpeg" },
    desc: "Sulaiman Ahmad Fanty is the Chief Executive Officer of the Sustainable Development Conversation Initiative (SDCI), bringing a strong background in research, policymaking, and public administration to his leadership. In this capacity, he provides strategic direction for SDCI’s work in evidence-based policy advocacy, civic education, stakeholder engagement, and development communication, with a commitment to strengthening public accountability and advancing sustainable development.",
  });

  // Executive Assistant
  const dbEa = team.find((t: any) => 
    t.role.toLowerCase().includes("assistant") && 
    (t.role.toLowerCase().includes("exec") || t.role.toLowerCase().includes("executive"))
  );
  const execAssistant = enrichMember(dbEa, {
    id: "exec-assistant",
    name: "Fateh Suleiman Abubakar",
    role: "Executive Assistant",
    photo: { url: "/assets/passports/sulaiman-abubakar-fateh.jpeg" },
    desc: "Fateh Suleiman Abubakar is a graduate of English Literature from Ahmadu Bello University, Zaria, with a background spanning communication, community mobilization, and project coordination. He serves as Executive Assistant at SDCI, providing administrative support, coordinating documentation, and helping manage day-to-day operations. His experience running his own photography venture, coordinating HR functions for a youth entrepreneurship hub, and volunteering with the Nigerian Red Cross Society brings strong organizational skills, attention to detail, and a community-oriented approach to his role.",
  });

  // Secretary
  const dbSecretary = team.find((t: any) => 
    t.department === "secretary" || t.role.toLowerCase().includes("secretary")
  );
  const secretary = enrichMember(dbSecretary, {
    id: "secretary",
    name: "Ummul-khairi Rufai",
    role: "Desk Secretary",
    photo: { url: "/assets/passports/ummulkhayr.jpeg" },
    desc: "Ummul-khairi Rufai holds a National Diploma in Nutrition and Dietetics from Federal Polytechnic Bauchi. She currently serves as Desk Secretary at SDCI, where she provides administrative support, manages office correspondence, and helps keep the organization's day-to-day operations running smoothly. She's committed to contributing positively to both her organization and her community.",
  });

  const execSupportGroup = [
    ...(ceoMember ? [ceoMember] : []),
    execAssistant,
    secretary,
  ];

  // Research Team - exactly three people: Department Lead, Research Analyst I, and Research Analyst II
  const dbResearchLead = team.find((t: any) => 
    t.department === "research-policy" && t.role.toLowerCase().includes("lead")
  );
  const researchLead = enrichMember(dbResearchLead, {
    id: "research-lead",
    name: "Muhammad Zakariya Ibrahim",
    role: "Research & Policy Advocacy Lead",
    department: "research-policy",
    photo: { url: "/assets/passports/muhammad-zakariya-ibrahim.jpeg" },
    desc: "Muhammad Zakariya Ibrahim leads research and policy advocacy at the Sustainable Development Conversations Initiative (SDCI), where he works on turning research and policy analysis into arguments that actually move institutional reform forward. He coordinates a team of research analysts — facilitating their work on data analysis, research, and publications, and making the judgment calls that shape direction and quality. With a technical background in computer science and data analytics, he's drawn to governance and geopolitics questions, often through a game-theory lens, and explores how AI and data visualization can make institutions more transparent and accountable.",
  });

  const dbAnalyst1 = team.find((t: any) => 
    t.department === "research-policy" && 
    (t.role.toLowerCase().includes("analyst i") || t.role.toLowerCase().includes("analyst 1"))
  );
  const analyst1 = enrichMember(dbAnalyst1, {
    id: "research-analyst-1",
    name: "Naffaa Musa Mamman",
    role: "Research Analyst I",
    department: "research-policy",
    photo: { url: "/assets/passports/naffaa-mamman-musa.jpeg" },
    desc: "Naffaa Musa Mamman is the Research Analyst I at the Sustainable Development Conversations Initiative (SDCI), where she conducts policy and development research, analyzes quantitative and qualitative data, and produces evidence-based insights to support informed decision-making. With a background in Chemical Engineering and currently pursuing a Master's degree in Sustainable Environmental Studies, she combines analytical thinking and systems-based problem solving with a growing interest in environmental sustainability, climate resilience, resource management, and evidence-informed policymaking. She is passionate about leveraging research to develop innovative, inclusive, and sustainable solutions that address complex development challenges and strengthen institutions.",
  });

  const dbAnalyst2 = team.find((t: any) => 
    t.department === "research-policy" && 
    (t.role.toLowerCase().includes("analyst ii") || t.role.toLowerCase().includes("analyst 2"))
  );
  const analyst2 = enrichMember(dbAnalyst2, {
    id: "research-analyst-2",
    name: "Zia'ulhaq Waziri",
    role: "Research Analyst II",
    department: "research-policy",
    photo: { url: "/assets/passports/ziau.jpeg" },
    desc: "Zia'ulhaq Waziri is a Research Analyst II at the Sustainable Development Conversations Initiative (SDCI), where he conducts policy-focused research on governance, public policy, social dynamics, and geopolitics. With a background in Political Science, he specializes in producing evidence-based analysis that informs decision-making and contributes to sustainable development. His work is driven by a commitment to understanding complex societal challenges and translating research into practical insights that support effective policies and institutional development.",
  });

  const researchTeam = [researchLead, analyst1, analyst2];

  // 1. Stakeholder Engagement & Programs
  const stakeholderMembers = team.filter((t: any) => t.department === "stakeholder" || t.role.toLowerCase().includes("stakeholder"));
  const stakeholderTeam = stakeholderMembers.length > 0
    ? stakeholderMembers.map((m: any) => enrichMember(m, {
        name: "Ibrahim Murtala Muhammad",
        role: "Lead, Stakeholder Engagement & Programs",
        photo: { url: "/assets/passports/ibrahim-murtala-muhammad.jpeg" },
      }))
    : [{
        id: "stakeholder-lead",
        name: "Ibrahim Murtala Muhammad",
        role: "Lead, Stakeholder Engagement & Programs",
        photo: { url: "/assets/passports/ibrahim-murtala-muhammad.jpeg" },
        desc: "Facilitating community dialogues, stakeholder roundtables, and coordinating external program engagement.",
      }];

  // 2. Partnerships & Funding
  const partnershipsMembers = team.filter((t: any) => t.department === "partnerships" || t.role.toLowerCase().includes("partnership"));
  const partnershipsTeam = partnershipsMembers.length > 0
    ? partnershipsMembers.map((m: any) => enrichMember(m, {
        name: "Shaheed Sirajo Jahun",
        role: "Partnership and Funding Lead",
        photo: { url: "/assets/passports/shahid-sirajo-jahun.jpeg" },
      }))
    : [{
        id: "partnerships-lead",
        name: "Shaheed Sirajo Jahun",
        role: "Partnership and Funding Lead",
        photo: { url: "/assets/passports/shahid-sirajo-jahun.jpeg" },
        desc: "Shaheed Sirajo Jahun is the Partnership and Funding Lead at SDCI, where he drives strategic collaborations, resource mobilization, and institutional engagement to advance governance and sustainable development in Nigeria. With a background in petroleum engineering and a data-driven approach to his work, he builds and manages relationships and partnerships centered on funding and accountability, while leveraging technology and innovation to connect underserved communities with opportunities.",
      }];

  // 3. HR & Operations
  const hrFinanceMembers = team.filter((t: any) => t.department === "hr-ops" || t.department === "hr-finance" || t.role.toLowerCase().includes("hr") || t.role.toLowerCase().includes("finance"));
  const hrFinanceTeam = hrFinanceMembers.length > 0
    ? hrFinanceMembers.map((m: any) => enrichMember(m, {
        name: "Fatima Muhammad Abdullahi",
        role: "Human Resources, Administration and Finance Officer",
        photo: { url: "/assets/passports/fatima-muhammad-abdullahi.jpeg" },
      }))
    : [{
        id: "hr-finance-lead",
        name: "Fatima Muhammad Abdullahi",
        role: "Human Resources, Administration and Finance Officer",
        photo: { url: "/assets/passports/fatima-muhammad-abdullahi.jpeg" },
        desc: "Fatima Muhammad Abdullahi serves as the Human Resources, Administration and Finance Officer at the Sustainable Development Conversations Initiative (SDCI). In this role, she is responsible for strengthening the organization's internal systems through human resource management, administrative coordination, financial documentation, and the development of policies and operational procedures that promote accountability, transparency, and institutional effectiveness.\n\nFatima is passionate about organizational development and good governance, with a strong interest in building efficient systems that support sustainable growth and effective programme delivery. She has experience in data analysis, administrative management, and process improvement, and is committed to applying evidence-based approaches to enhance organizational performance.\n\nShe holds a degree in Human Anatomy and is dedicated to contributing to sustainable development through sound administration, strategic planning, and continuous learning.",
      }];

  // 4. Legal & Compliance
  const legalMembers = team.filter((t: any) => t.department === "legal" || t.role.toLowerCase().includes("legal"));
  const legalTeam = legalMembers.length > 0
    ? legalMembers.map((m: any) => enrichMember(m, {
        name: "Mahmood Adamu Imam",
        role: "Legal Advisor & Compliance Counsel",
        photo: { url: "/assets/passports/mahmood-adamu-imam.jpeg" },
      }))
    : [{
        id: "legal-advisor",
        name: "Mahmood Adamu Imam",
        role: "Legal Advisor & Compliance Counsel",
        photo: { url: "/assets/passports/mahmood-adamu-imam.jpeg" },
        desc: "Mahmood Adamu Imam is a trained lawyer with a background in Corporate Law, Data Protection, and Tech Law advocacy. At the Sustainable Development Conversations Initiative (SDCI), he serves as Legal Advisor and Compliance Counsel, advising on institutional compliance, reviewing contracts, and managing legal risk in line with statutory regulations. He brings a strong grounding in legal drafting and regulatory practice to help SDCI operate on solid legal footing as it pursues its policy and advocacy work.",
      }];

  // 5. Media Production
  const mediaMembers = team.filter((t: any) => t.department === "media-production" || t.role.toLowerCase().includes("media production"));
  const mediaTeam = mediaMembers.length > 0
    ? mediaMembers.map((m: any) => enrichMember(m, {
        name: "Abdulhakeem Ahmad",
        role: "Media Production Officer",
        photo: { url: "/assets/passports/abdulhakeem-ahmad.jpeg" },
      }))
    : [{
        id: "media-production-officer",
        name: "Abdulhakeem Ahmad",
        role: "Media Production Officer",
        photo: { url: "/assets/passports/abdulhakeem-ahmad.jpeg" },
        desc: "Abdulhakeem Ahmad is the Media Production Officer at SDCI, bringing years of experience in photography, cinematography, drone operations, and video editing. He holds a B.Tech in Industrial Design from Abubakar Tafawa Belewa University, Bauchi, and a Master Class Certificate in Drone Piloting and Video Editing from SK Media Enterprise, and is the founder of Keemos Visual, a creative media brand offering photography, cinematography, and post-production services.\nAt SDCI, he produces visual content that documents the organization's work and communicates its impact, using storytelling to inform, inspire, and drive positive change.",
      }];

  // Find active profile details for modal overlay
  let activeProfile: any = null;
  if (activeProfileId) {
    activeProfile = 
      boardSlots.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      execSupportGroup.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      researchTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      stakeholderTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      partnershipsTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      hrFinanceTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      legalTeam.find((t: any) => t.id && String(t.id) === activeProfileId) ||
      mediaTeam.find((t: any) => t.id && String(t.id) === activeProfileId);
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
                  return (
                    <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className={`text-base font-bold font-serif leading-tight ${t.isVacant ? 'text-neutral-400 italic' : 'text-petrol-950 dark:text-white'}`}>
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                            {t.isVacant 
                              ? "Position pending allocation for the next governance appointment cycle." 
                              : t.desc || "Advising on strategic initiatives, compliance audits, and independence goals."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id && !t.isVacant && !t.name.includes("[") ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                            <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                              View Profile →
                            </span>
                          </Link>
                        ) : null}
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
                    <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                      {/* Top: Portrait Image Frame */}
                      <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                        {hasPhoto ? (
                          <img 
                            src={getMediaUrl(t.photo.url)} 
                            alt={t.name} 
                            className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                            {t.desc || "Shaping SDCI's organizational scale, program delivery, and executive coordination."}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id && !t.name.includes("[") ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                            <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                              View Profile →
                            </span>
                          </Link>
                        ) : null}
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
                    <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                      {/* Top: Portrait Image Frame */}
                      <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                        {hasPhoto ? (
                          <img 
                            src={getMediaUrl(t.photo.url)} 
                            alt={t.name} 
                            className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                            <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Bottom: Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                            {t.role}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                            {t.desc || (t.role.toLowerCase().includes("lead")
                              ? "Conducting empirical analyses, budget evaluations, and coordinating departmental research outputs."
                              : "Conducting policy research, data verification, and sustainable development analytics.")}
                          </p>
                        </div>

                        {/* View Profile CTA */}
                        {t.id && !t.name.includes("[") ? (
                          <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                            <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                              View Profile →
                            </span>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Independent Pillars */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                
                {/* Pillar 1: Stakeholder Engagement & Programs */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 border-b border-neutral-200 dark:border-petrol-900 pb-2 font-sans">
                    Stakeholder Engagement
                  </h4>
                  <div className="space-y-4">
                    {stakeholderTeam.map((t: any, index: number) => {
                      const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                      return (
                        <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                          {/* Top: Portrait Image Frame */}
                          <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                            {hasPhoto ? (
                              <img 
                                src={getMediaUrl(t.photo.url)} 
                                alt={t.name} 
                                className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                                <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Bottom: Details */}
                          <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h5 className="text-base font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                                {t.name}
                              </h5>
                              <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                                {t.role}
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                                {t.desc || "Overseeing operational delivery, programmatic scale, and administrative coordination."}
                              </p>
                            </div>

                            {/* View Profile CTA */}
                            {t.id && !t.name.includes("[") ? (
                              <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                                <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                  View Profile →
                                </span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pillar 2: Partnerships & Funding */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 border-b border-neutral-200 dark:border-petrol-900 pb-2 font-sans">
                    Partnerships & Funding
                  </h4>
                  <div className="space-y-4">
                    {partnershipsTeam.map((t: any, index: number) => {
                      const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                      return (
                        <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                          {/* Top: Portrait Image Frame */}
                          <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                            {hasPhoto ? (
                              <img 
                                src={getMediaUrl(t.photo.url)} 
                                alt={t.name} 
                                className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                                <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Bottom: Details */}
                          <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h5 className="text-base font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                                {t.name}
                              </h5>
                              <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                                {t.role}
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                                {t.desc || "Overseeing operational delivery, programmatic scale, and administrative coordination."}
                              </p>
                            </div>

                            {/* View Profile CTA */}
                            {t.id && !t.name.includes("[") ? (
                              <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                                <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                  View Profile →
                                </span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pillar 3: HR & Operations */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 border-b border-neutral-200 dark:border-petrol-900 pb-2 font-sans">
                    HR & Operations
                  </h4>
                  <div className="space-y-4">
                    {hrFinanceTeam.map((t: any, index: number) => {
                      const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                      return (
                        <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                          {/* Top: Portrait Image Frame */}
                          <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                            {hasPhoto ? (
                              <img 
                                src={getMediaUrl(t.photo.url)} 
                                alt={t.name} 
                                className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                                <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Bottom: Details */}
                          <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h5 className="text-base font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                                {t.name}
                              </h5>
                              <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                                {t.role}
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                                {t.desc || "Overseeing operational delivery, programmatic scale, and administrative coordination."}
                              </p>
                            </div>

                            {/* View Profile CTA */}
                            {t.id && !t.name.includes("[") ? (
                              <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                                <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                  View Profile →
                                </span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pillar 4: Legal & Compliance */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 border-b border-neutral-200 dark:border-petrol-900 pb-2 font-sans">
                    Legal & Compliance
                  </h4>
                  <div className="space-y-4">
                    {legalTeam.map((t: any, index: number) => {
                      const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                      return (
                        <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                          {/* Top: Portrait Image Frame */}
                          <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                            {hasPhoto ? (
                              <img 
                                src={getMediaUrl(t.photo.url)} 
                                alt={t.name} 
                                className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                                <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Bottom: Details */}
                          <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h5 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                                {t.name}
                              </h5>
                              <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                                {t.role}
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                                {t.desc || "Advising on institutional compliance, contract reviews, statutory regulations, and legal risk management."}
                              </p>
                            </div>

                            {/* View Profile CTA */}
                            {t.id && !t.name.includes("[") ? (
                              <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                                <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                  View Profile →
                                </span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pillar 5: Media Production */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 border-b border-neutral-200 dark:border-petrol-900 pb-2 font-sans">
                    Media Production
                  </h4>
                  <div className="space-y-4">
                    {mediaTeam.map((t: any, index: number) => {
                      const hasPhoto = t.photo && typeof t.photo === "object" && t.photo.url;
                      return (
                        <div key={t.id || index} className="flex flex-col group space-y-4 h-full rounded-none bg-transparent">
                          {/* Top: Portrait Image Frame */}
                          <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-petrol-900/60 overflow-hidden shrink-0">
                            {hasPhoto ? (
                              <img 
                                src={getMediaUrl(t.photo.url)} 
                                alt={t.name} 
                                className={`w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out ${getZoomClass(t)}`} 
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-petrol-900 to-petrol-950 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out">
                                <svg className="w-20 h-20 text-petrol-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Bottom: Details */}
                          <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h5 className="text-lg font-bold font-serif leading-tight text-petrol-950 dark:text-white">
                                {t.name}
                              </h5>
                              <p className="text-xs uppercase font-semibold text-green-700 dark:text-green-400 tracking-wider">
                                {t.role}
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-1 line-clamp-3">
                                {t.desc || "Managing audio-visual production, podcast recordings, documentaries, and digital media assets."}
                              </p>
                            </div>

                            {/* View Profile CTA */}
                            {t.id && !t.name.includes("[") ? (
                              <Link href={`/about?profile=${t.id}#leadership`} scroll={false} className="inline-block">
                                <span className="text-petrol-950 dark:text-neutral-200 hover:text-green-700 dark:hover:text-green-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                  View Profile →
                                </span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

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
                      : activeProfile.department === "research-policy"
                      ? "Research & Policy Advocacy"
                      : activeProfile.department === "stakeholder"
                      ? "Stakeholder Engagement & Programs"
                      : activeProfile.department === "partnerships"
                      ? "Partnerships & Funding"
                      : (activeProfile.department === "hr-ops" || activeProfile.department === "hr-finance")
                      ? "HR & Operations"
                      : activeProfile.department === "legal"
                      ? "Legal & Compliance"
                      : activeProfile.department === "media-production"
                      ? "Media Production"
                      : "Operations & Research"}
                  </p>
                </div>
              </div>

              {/* Profile Details / Bio */}
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base prose max-w-none">
                <h4 className="font-bold text-petrol-950 dark:text-white text-base font-serif">Biography & Focus</h4>
                {activeProfile.bio ? (
                  <p className="whitespace-pre-line">{serializeLexical(activeProfile.bio)}</p>
                ) : activeProfile.desc ? (
                  <p className="whitespace-pre-line">{activeProfile.desc}</p>
                ) : (
                  <p className="text-neutral-400 dark:text-neutral-400 italic">
                    {activeProfile.isVacant 
                      ? "This position is currently open for the next governance appointment cycle." 
                      : `${activeProfile.name} leads programmatic delivery, operational design, and strategic frameworks within their designated office at SDCI.`}
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end pt-6 border-t border-neutral-100 dark:border-petrol-900">
                <Link href="/about#leadership" scroll={false}>
                  <button className="border border-neutral-300 dark:border-petrol-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-petrol-900 font-bold px-6 py-2.5 transition-colors cursor-pointer rounded-none text-xs uppercase tracking-wider">
                    Close Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
