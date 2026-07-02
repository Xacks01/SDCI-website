import { Payload } from "payload";

export async function seed(payload: Payload) {
  payload.logger.info("Starting database seed...");

  // 1. Seed Focus Areas
  payload.logger.info("Seeding focus areas...");
  const governanceArea = await payload.create({
    collection: "focus-areas",
    data: {
      name: "Governance & accountability",
      description: "The transparency and institutional strength that everything else depends on. This is where our Watchdog role lives.",
      sdgTags: ["sdg16", "sdg17"],
      order: 1,
    },
  });

  const financeArea = await payload.create({
    collection: "focus-areas",
    data: {
      name: "Public finance & the economy",
      description: "How public money is raised, shared, and spent — and whether it reaches people.",
      sdgTags: ["sdg8", "sdg1", "sdg9"],
      order: 2,
    },
  });

  const socialArea = await payload.create({
    collection: "focus-areas",
    data: {
      name: "Social development & inequality",
      description: "Who gets left behind, and what closes the gap.",
      sdgTags: ["sdg10", "sdg5"],
      order: 3,
    },
  });

  const healthArea = await payload.create({
    collection: "focus-areas",
    data: {
      name: "Health & education systems",
      description: "The services that determine life chances.",
      sdgTags: ["sdg3", "sdg4"],
      order: 4,
    },
  });

  const climateArea = await payload.create({
    collection: "focus-areas",
    data: {
      name: "Climate & natural resources",
      description: "Managing the resources today's decisions borrow from tomorrow.",
      sdgTags: ["sdg13", "sdg7", "sdg6", "sdg12"],
      order: 5,
    },
  });

  // 2. Seed Membership Tiers
  payload.logger.info("Seeding membership tiers...");
  const communityTier = await payload.create({
    collection: "membership-tiers",
    data: {
      name: "Community",
      audience: "Students, early-career, civil society",
      priceNGN: 0,
      priceUSD: 0,
      features: [
        { feature: "Newsletter" },
        { feature: "All InFocus graphics" },
        { feature: "Public events" },
        { feature: "The podcast" },
        { feature: "A free Sustainable Digest excerpt each issue" },
      ],
      ctaLabel: "Join for Free",
    },
  });

  const individualTier = await payload.create({
    collection: "membership-tiers",
    data: {
      name: "Individual",
      audience: "Professionals and engaged citizens",
      priceNGN: 15000,
      priceUSD: 50,
      features: [
        { feature: "Everything in Community" },
        { feature: "The full Sustainable Digest" },
        { feature: "All white papers" },
        { feature: "Member-only events" },
        { feature: "Access to our publication archive" },
      ],
      ctaLabel: "Become an Individual Member",
    },
  });

  const professionalTier = await payload.create({
    collection: "membership-tiers",
    data: {
      name: "Professional",
      audience: "Practitioners who use our work",
      priceNGN: 45000,
      priceUSD: 150,
      features: [
        { feature: "Everything in Individual" },
        { feature: "Priority event registration" },
        { feature: "Discounted training" },
        { feature: "Invitations to private briefings" },
      ],
      ctaLabel: "Become a Professional Member",
    },
  });

  const institutionalTier = await payload.create({
    collection: "membership-tiers",
    data: {
      name: "Institutional / Corporate",
      audience: "Companies, NGOs, universities",
      priceNGN: 150000,
      priceUSD: 500,
      features: [
        { feature: "Multiple seats" },
        { feature: "Team access to all publications" },
        { feature: "Advisory discounts" },
        { feature: "Recognition as a supporter" },
        { feature: "Bespoke briefings" },
      ],
      ctaLabel: "Become an Institutional Supporter",
    },
  });

  // 3. Seed FAQs
  payload.logger.info("Seeding FAQs...");
  const faqsData = [
    {
      question: "What is SDCI?",
      answer: "The Sustainable Development Conversations Initiative is an independent think tank. We conduct rigorous research on social, economic, and political issues, and turn it into open conversations that improve decisions on sustainable development in Nigeria and across Africa.",
      order: 1,
    },
    {
      question: "Are you independent? Who funds you?",
      answer: "Yes — and structurally so. We're funded by a deliberate mix of grants, memberships, commissioned work, event revenue, and publication sales, so no single backer can set our agenda. We disclose our funders every year and publish our researchers' full credentials. If the evidence is inconvenient for a funder, we publish it anyway.",
      order: 2,
    },
    {
      question: "Where do you work?",
      answer: "We're based in Bauchi and focused on Bauchi State, with a remit that spans Nigeria and, over time, the wider region.",
      order: 3,
    },
    {
      question: "Is your research free?",
      answer: "Most of it, yes. Policy briefs, thematic reports, working papers, and our InFocus graphics are free to read. White papers and the full Sustainable Digest are reserved for members and subscribers — that revenue is part of what keeps the rest free and independent.",
      order: 4,
    },
    {
      question: "How do I become a member?",
      answer: "Pick the tier that fits — there's a free Community tier and paid tiers for individuals, professionals, and organisations — on our Membership page. It takes a few minutes.",
      order: 5,
    },
    {
      question: "Can I commission research or partner with you?",
      answer: "Yes. We take on commissioned studies, advisory work, and joint projects with foundations, government bodies, businesses, and international organisations. Start at Partner with us.",
      order: 6,
    },
    {
      question: "Can I suggest a podcast guest or topic?",
      answer: "Please do. We're always looking for sharp voices and important questions — reach us through Contact.",
      order: 7,
    },
    {
      question: "Can I republish or cite your work?",
      answer: "You're welcome to cite and share our published work with attribution. For republishing in full, or for media use, contact media enquiries.",
      order: 8,
    },
    {
      question: "How do I donate, and is it tax-deductible?",
      answer: "You can give in Naira through Paystack on our Donate page. SDCI is registered under CAC Bauchi/Nigeria as a policy advocacy non-profit organization.",
      order: 9,
    },
    {
      question: "Are you hiring? Do you offer internships?",
      answer: "Open roles and research internships are listed on Careers when available. Even when nothing is posted, strong researchers are welcome to introduce themselves.",
      order: 10,
    },
  ];

  for (const faq of faqsData) {
    await payload.create({
      collection: "faqs",
      data: faq,
    });
  }

  // 4. Seed Team Members (Leadership Bench)
  payload.logger.info("Seeding team members...");
  const boardChair = await payload.create({
    collection: "team",
    data: {
      name: "Dr. [Board Chair Name]",
      role: "Chairman, Board of Directors",
      department: "board",
      order: 1,
    },
  });

  const ceo = await payload.create({
    collection: "team",
    data: {
      name: "Sulaiman Ahmad Fanty",
      role: "Chief Executive Officer",
      department: "exec",
      order: 2,
    },
  });

  const leadResearch = await payload.create({
    collection: "team",
    data: {
      name: "Dr. [Lead Researcher]",
      role: "Department Lead, Research & Policy Advocacy",
      department: "research-policy",
      order: 3,
    },
  });

  const analyst1 = await payload.create({
    collection: "team",
    data: {
      name: "Mr. [Research Analyst I]",
      role: "Research Analyst I",
      department: "research-policy",
      order: 4,
    },
  });

  const analyst2 = await payload.create({
    collection: "team",
    data: {
      name: "Ms. [Research Analyst II]",
      role: "Research Analyst II",
      department: "research-policy",
      order: 5,
    },
  });

  const partnershipsLead = await payload.create({
    collection: "team",
    data: {
      name: "Dr. [Partnerships Lead]",
      role: "Lead, Partnerships & Funding",
      department: "partnerships",
      order: 6,
    },
  });

  const stakeholderLead = await payload.create({
    collection: "team",
    data: {
      name: "Mrs. [Stakeholder Engagement Lead]",
      role: "Lead, Stakeholder Engagement & Programs",
      department: "stakeholder",
      order: 7,
    },
  });

  const guestAmaka = await payload.create({
    collection: "team",
    data: {
      name: "Dr. Amaka Obi",
      role: "Senior Fellow — Institute for Democratic Governance",
      department: "research-policy",
      order: 10,
    },
  });

  const guestEmeka = await payload.create({
    collection: "team",
    data: {
      name: "Prof. Emeka Nwosu",
      role: "Department of Economics — University of Lagos",
      department: "research-policy",
      order: 11,
    },
  });

  const guestNgozi = await payload.create({
    collection: "team",
    data: {
      name: "Dr. Ngozi Mba",
      role: "WHO Nigeria Country Office",
      department: "research-policy",
      order: 12,
    },
  });

  const guestAdebayo = await payload.create({
    collection: "team",
    data: {
      name: "Brig. Gen. (rtd) Adebayo Lawal",
      role: "Centre for Security Studies",
      department: "research-policy",
      order: 13,
    },
  });

  const guestFatima = await payload.create({
    collection: "team",
    data: {
      name: "Fatima Yusuf",
      role: "Co-founder — TechPolicy Nigeria",
      department: "research-policy",
      order: 14,
    },
  });

  // 5. Seed Globals
  payload.logger.info("Seeding globals...");
  await payload.updateGlobal({
    slug: "impact-stats",
    data: {
      conversations: "24",
      publications: "12",
      partners: "18",
      reached: "15,000+",
    },
  });

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      links: [
        { label: "About", url: "/about" },
        { label: "Research & Insights", url: "/research" },
        { label: "Media", url: "/media" },
        { label: "Events", url: "/events" },
        { label: "Programmes", url: "/programmes" },
        { label: "Careers", url: "/careers" },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "footer",
    data: {
      columns: [
        {
          title: "About",
          links: [
            { label: "Mission & Vision", url: "/about#mission" },
            { label: "The Three Roles", url: "/about#three-roles" },
            { label: "Leadership Team", url: "/about#leadership" },
            { label: "Independence & Funding", url: "/about#independence" },
            { label: "Annual Reports", url: "/about#annual-reports" },
          ],
        },
        {
          title: "Insights",
          links: [
            { label: "Policy Briefs", url: "/research?format=brief" },
            { label: "Thematic Reports", url: "/research?format=report" },
            { label: "Working Papers", url: "/research?format=working-paper" },
            { label: "White Papers", url: "/research?format=white-paper" },
            { label: "InFocus Infographics", url: "/research#infocus" },
            { label: "The Sustainable Digest", url: "/research#digest" },
          ],
        },
        {
          title: "Media",
          links: [
            { label: "The Long View Podcast", url: "/media?tab=podcast" },
            { label: "Documentaries", url: "/media?tab=docs" },
            { label: "Recorded Conversations", url: "/media?tab=conversations" },
          ],
        },
        {
          title: "Engage",
          links: [
            { label: "Events", url: "/events" },
            { label: "Membership Options", url: "/get-involved#membership" },
            { label: "Partner with Us", url: "/get-involved#partner" },
            { label: "Donate", url: "/get-involved#donate" },
          ],
        },
      ],
      newsletterMicrocopy: "Get our briefings and new episodes in your inbox. No spam, unsubscribe anytime.",
      socials: {
        linkedin: "https://linkedin.com/company/sdci",
        twitter: "https://twitter.com/sdci",
        youtube: "https://youtube.com/sdci",
      },
    },
  });

  // 6. Create Seed Publications
  payload.logger.info("Seeding publications...");
  await payload.create({
    collection: "publications",
    data: {
      title: "Bauchi State Budget Performance & Resource Optimization Framework",
      slug: "bauchi-state-budget-performance-2026",
      format: "brief",
      themes: [financeArea.id],
      excerpt: "An independent analysis of public finance structures, resource leaks, and capacity recommendations for Bauchi State MDAs.",
      publishDate: new Date().toISOString(),
      authors: [leadResearch.id, analyst1.id],
      gated: false,
    },
  });

  await payload.create({
    collection: "publications",
    data: {
      title: "Watchdog Report: Transparency in Local Government Finance Allocations",
      slug: "watchdog-transparency-local-government-allocations",
      format: "report",
      themes: [governanceArea.id],
      excerpt: "Deep petrol data structures mapping how local government financial allocations match citizen development targets in northeastern Nigeria.",
      publishDate: new Date().toISOString(),
      authors: [ceo.id, leadResearch.id],
      gated: false,
    },
  });

  await payload.create({
    collection: "publications",
    data: {
      title: "Climate Mitigation and Agricultural Resilience Strategies in Northern Nigeria",
      slug: "climate-mitigation-resilience-northern-nigeria",
      format: "white-paper",
      themes: [climateArea.id],
      excerpt: "Our premium policy white paper detailing actionable water, soil, and energy reforms. Available to professional and institutional tiers.",
      publishDate: new Date().toISOString(),
      authors: [leadResearch.id, analyst2.id],
      gated: true, // Gated!
    },
  });

  // 7. Seed Podcast
  payload.logger.info("Seeding podcast...");
  // Seed S1E1 (as number "1")
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "1",
      title: "S1E1: Restructuring Public Finance for Bauchi State's Next Decade",
      guests: [ceo.id],
      summary: "We discuss budget prioritization, state internally generated revenue (IGR) capacity, and balancing the books without compromising social education spending.",
      audioEmbed: '<iframe width="100%" height="200" scrolling="no" frameborder="no" allow="autoplay" src="https://audiomack.com/embed/song/audiomack/audiomack-theme?background=1"></iframe>',
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "42 min",
      keyTakeaways: [
        { point: "Internally generated revenue must double to support baseline state obligations." },
        { point: "Social programs like maternal health cannot be secondary to infrastructure loan servicing." },
        { point: "Transparency in budgeting is the first pillar in building tax morale among businesses." },
      ],
      publishDate: new Date("2026-01-15").toISOString(),
    },
  });

  // Seed Ep. 37
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "37",
      title: "Digital Infrastructure and the Last Mile Problem",
      guests: [guestFatima.id],
      summary: "Analysing digital connectivity, broadband expansion, and regulatory challenges to tech entrepreneurship outside Nigeria's main urban hubs.",
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "44 min",
      keyTakeaways: [
        { point: "Last-mile fiber deployment is blocked by excessive state right-of-way fees." },
        { point: "Digital literacy training yields double the return of hardware-only donations." },
        { point: "Bauchi State can establish a tech sandbox to attract northern tech talent." },
      ],
      publishDate: new Date("2026-05-15").toISOString(),
    },
  });

  // Seed Ep. 38
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "38",
      title: "Security, Community, and the Social Contract",
      guests: [guestAdebayo.id],
      summary: "Discussing the intersection of local security initiatives, community policing, and rebuilding trust in formal security structures in northeastern Nigeria.",
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "61 min",
      keyTakeaways: [
        { point: "Community vigilante groups require formal oversight and regular vetting." },
        { point: "Economic inequality is directly correlated with security vulnerabilities." },
        { point: "Restoring local council authority improves early warning signal sharing." },
      ],
      publishDate: new Date("2026-05-22").toISOString(),
    },
  });

  // Seed Ep. 39
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "39",
      title: "Health Financing in a Resource-Constrained State",
      guests: [guestNgozi.id],
      summary: "Exploring innovative funding mechanisms, public-private partnerships, and community insurance schemes to improve healthcare access in Bauchi State.",
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "38 min",
      keyTakeaways: [
        { point: "Out-of-pocket health expenditure remains the primary barrier to basic care." },
        { point: "State-level health insurance trust funds need structural and legal protection." },
        { point: "Primary health center funding should be ring-fenced from political cycles." },
      ],
      publishDate: new Date("2026-05-29").toISOString(),
    },
  });

  // Seed Ep. 40
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "40",
      title: "Rethinking Nigeria's Fiscal Federalism",
      guests: [guestEmeka.id],
      summary: "An in-depth debate on revenue allocation formulas, state internally generated revenue autonomy, and decentralizing financial governance across Nigerian states.",
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "55 min",
      keyTakeaways: [
        { point: "State reliance on federal FAAC allocations creates structural vulnerabilities." },
        { point: "Decentralized tax collection models can incentivize local economic growth." },
        { point: "Fiscal devolution must match capacity-building at local government levels." },
      ],
      publishDate: new Date("2026-06-05").toISOString(),
    },
  });

  // Seed Ep. 41 (latest, will show on homepage)
  await payload.create({
    collection: "podcast-episodes",
    data: {
      number: "41",
      title: "The Politics of Policy: Who Gets a Seat at the Table?",
      guests: [guestAmaka.id],
      summary: "A wide-ranging conversation on how policy decisions are actually made in Nigeria — who shapes the agenda, whose evidence gets heard, and what it takes to shift a reform-resistant institution.",
      platformLinks: {
        spotify: "https://spotify.com",
        audiomack: "https://audiomack.com",
        youtube: "https://youtube.com",
      },
      duration: "42 min",
      keyTakeaways: [
        { point: "Technocratic capacity alone does not guarantee good policy outcomes." },
        { point: "Civil society access to decision-makers has narrowed since 2020." },
        { point: "Evidence presented without coalition-building rarely converts to reform." },
        { point: "The quality of a policy brief matters less than its political timing." },
      ],
      publishDate: new Date("2026-06-12").toISOString(),
    },
  });

  // 8. Seed Events
  payload.logger.info("Seeding events...");
  // Seed Event 1: Public Lecture
  await payload.create({
    collection: "events",
    data: {
      title: "Public Lecture: Security and the Social Contract",
      type: "lecture",
      date: new Date("2026-07-08T10:00:00Z").toISOString(),
      format: "in-person",
      location: "Abuja",
      registrationURL: "https://eventbrite.com",
    },
  });

  // Seed Event 2: Roundtable
  await payload.create({
    collection: "events",
    data: {
      title: "Roundtable: Reforming Land Use Policy in Urban Centres",
      type: "roundtable",
      date: new Date("2026-07-17T14:00:00Z").toISOString(),
      format: "hybrid",
      location: "Lagos + Zoom",
      registrationURL: "https://eventbrite.com",
    },
  });

  // Seed Event 3: Research Launch
  await payload.create({
    collection: "events",
    data: {
      title: "Research Launch: Nigeria Health Financing Index 2026",
      type: "launch",
      date: new Date("2026-08-02T11:00:00Z").toISOString(),
      format: "online",
      location: "Online",
      registrationURL: "https://eventbrite.com",
    },
  });

  // 9. Seed Gallery
  payload.logger.info("Seeding gallery...");
  await payload.create({
    collection: "gallery",
    data: {
      title: "SDCI Launch Seminar in Bauchi",
      type: "picture",
      publishDate: new Date("2026-06-10").toISOString(),
    },
  });

  await payload.create({
    collection: "gallery",
    data: {
      title: "Executive Roundtable on Fiscal Devolution",
      type: "picture",
      publishDate: new Date("2026-06-05").toISOString(),
    },
  });

  await payload.create({
    collection: "gallery",
    data: {
      title: "Documentary: Bauchi Water Access Reforms",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      publishDate: new Date("2026-05-20").toISOString(),
    },
  });

  await payload.create({
    collection: "gallery",
    data: {
      title: "Community Outreach and Survey Training",
      type: "picture",
      publishDate: new Date("2026-05-10").toISOString(),
    },
  });

  await payload.create({
    collection: "gallery",
    data: {
      title: "Panel Discussion: Future of Public Finance",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      publishDate: new Date("2026-04-18").toISOString(),
    },
  });

  payload.logger.info("Database seed completed successfully!");
}
