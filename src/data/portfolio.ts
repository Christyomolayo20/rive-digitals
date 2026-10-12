import { ProjectCategory, ProjectItem } from "@/types";

/**
 * CENTRALISED PORTFOLIO / CASE STUDIES CONFIGURATION
 * Featuring photorealistic, watermark-free showcase imagery and concise narratives.
 */
export const portfolioCategories: ProjectCategory[] = [
  "Brand Identity",
  "Web Design & Development",
  "Digital Strategy & Growth",
  "Content & Campaigns",
];

export const portfolioProjects: ProjectItem[] = [
  {
    id: "proj-veridian-financial",
    slug: "veridian-financial-brand-system",
    title: "Veridian Commercial — Brand & UI System",
    clientOrIndustry: "Fintech & Corporate Treasury",
    disclosureNote:
      "Representative showcase illustrating our brand identity and design system standard.",
    category: "Brand Identity",
    tags: ["Visual Identity", "Design System", "Brand Book", "Fintech UI"],
    thumbnail: "/images/portfolio/veridian-fintech.jpg",
    thumbnailAlt:
      "Photorealistic MacBook displaying financial analytics dashboard alongside matte navy corporate card and open brand identity guidelines book",
    gallery: [
      {
        src: "/images/portfolio/veridian-fintech.jpg",
        alt: "Veridian Commercial dashboard, corporate card, and printed brand guidelines",
        caption: "Unified identity spanning product UI, physical cards, and brand manual.",
      },
      {
        src: "/images/services/brand-design.jpg",
        alt: "Brand color swatches and geometric logo construction",
        caption: "Midnight navy and coral-rose color architecture with strict contrast tokens.",
      },
    ],
    summary:
      "Cohesive visual identity, corporate card design, and product UI token system for a B2B treasury platform.",
    brief:
      "Create an authoritative brand identity and UI system for a commercial fintech scaling to enterprise clients.",
    challenge:
      "Fragmented visuals across product screens and investor decks made the platform feel early-stage.",
    solution:
      "We crafted a geometric monogram, matte navy-and-coral color tokens, corporate card artwork, and a 40-page brand book paired with Figma UI components.",
    deliverables: [
      "Logo system & geometric monogram",
      "WCAG AA color & typography tokens",
      "Corporate card & stationery design",
      "40-page Brand Guidelines & UI Kit",
    ],
    outcomes: [
      {
        label: "14 Touchpoints Unified",
        detail: "Aligned web, dashboard UI, and pitch decks under one design system.",
        verified: true,
      },
      {
        label: "WCAG AA Compliant",
        detail: "Verified high-contrast legibility across dark and light interfaces.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-atelier-kora",
    slug: "atelier-kora-digital-flagship",
    title: "Atelier Kora — Luxury Digital Flagship",
    clientOrIndustry: "Architectural Homeware & Design",
    disclosureNote:
      "Representative showcase demonstrating our high-converting web architecture.",
    category: "Web Design & Development",
    tags: ["Next.js", "Responsive UX", "E-Commerce", "Trade Portal"],
    thumbnail: "/images/portfolio/atelier-kora.jpg",
    thumbnailAlt:
      "Photorealistic desktop monitor and iPad Pro on an oak desk displaying a luxury architectural homeware e-commerce collection",
    gallery: [
      {
        src: "/images/portfolio/atelier-kora.jpg",
        alt: "Atelier Kora responsive desktop and iPad showroom interface",
        caption: "Tactile editorial layout with seamless desktop-to-tablet responsiveness.",
      },
      {
        src: "/images/services/web-engineering.jpg",
        alt: "Responsive engineering across desktop and mobile viewports",
        caption: "Sub-second page transitions and streamlined 3-step trade quote checkout.",
      },
    ],
    summary:
      "Fast, tactile digital flagship and trade specification platform for interior architects and retail buyers.",
    brief:
      "Design a fast digital showroom that highlights handcrafted objects and simplifies bulk trade quotes.",
    challenge:
      "Unoptimized images and complex menus caused slow mobile loads and high drop-off from trade buyers.",
    solution:
      "We built a lightweight Next.js flagship with instant collection filters, downloadable spec sheets, and a guided 3-step trade enquiry flow.",
    deliverables: [
      "Mobile-first editorial UI/UX design",
      "Next.js storefront & collection filters",
      "Guided Trade & Hospitality quote flow",
      "Technical SEO & structured product schema",
    ],
    outcomes: [
      {
        label: "99/100 Performance",
        detail: "Sub-second load times with zero layout shift on mobile and desktop.",
        verified: true,
      },
      {
        label: "3-Step Trade Quotes",
        detail: "Replaced unstructured emails with guided specification requests.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-nexus-freight",
    slug: "nexus-freight-b2b-platform",
    title: "Nexus Freight — Global Logistics Portal",
    clientOrIndustry: "Maritime Supply Chain & B2B Freight",
    disclosureNote:
      "Representative B2B platform case study demonstrating complex service structuring.",
    category: "Web Design & Development",
    tags: ["B2B Platform", "Lead Engine", "UX Architecture", "SEO"],
    thumbnail: "/images/portfolio/nexus-freight.jpg",
    thumbnailAlt:
      "Photorealistic ultrawide curved monitor in a harbor-view office displaying a dark-mode global maritime logistics platform",
    gallery: [
      {
        src: "/images/portfolio/nexus-freight.jpg",
        alt: "Nexus Freight global corridor tracking and B2B portal",
        caption: "Real-time corridor visibility paired with structured freight quote capture.",
      },
    ],
    summary:
      "Modern B2B logistics web platform consolidating 40+ legacy pages into 6 high-converting service verticals.",
    brief:
      "Modernise a regional freight forwarder's digital presence to capture enterprise shipping contracts.",
    challenge:
      "Over 40 cluttered pages confused buyers, while a generic contact form missed critical cargo details.",
    solution:
      "We restructured the site into 6 clear shipping verticals and built a validated quote intake engine that routes leads by corridor and container type.",
    deliverables: [
      "Information architecture & URL consolidation",
      "6 dedicated logistics vertical pages",
      "Validated B2B tariff & quote intake form",
      "Automated XML sitemap & search metadata",
    ],
    outcomes: [
      {
        label: "6 Clear Verticals",
        detail: "Consolidated 40+ legacy pages into an intuitive B2B buyer journey.",
        verified: true,
      },
      {
        label: "Qualified Freight Leads",
        detail: "Captures cargo specs, origin/destination, and volume on first contact.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2025",
  },
  {
    id: "proj-solaris-cleantech",
    slug: "solaris-cleantech-growth-architecture",
    title: "Solaris CleanTech — ROI Campaign System",
    clientOrIndustry: "Commercial Solar & Microgrids",
    disclosureNote:
      "Representative digital growth and campaign landing page showcase.",
    category: "Content & Campaigns",
    tags: ["Landing Pages", "Interactive ROI", "Ad Creative", "CRO"],
    thumbnail: "/images/portfolio/solaris-cleantech.jpg",
    thumbnailAlt:
      "Photorealistic laptop and smartphone on a concrete desk showing an interactive solar ROI calculator and campaign lander",
    gallery: [
      {
        src: "/images/portfolio/solaris-cleantech.jpg",
        alt: "Solaris CleanTech interactive ROI calculator and mobile campaign",
        caption: "Dedicated campaign landing page with interactive commercial savings estimator.",
      },
    ],
    summary:
      "Message-matched B2B campaign kit and interactive ROI calculator built to generate industrial site assessments.",
    brief:
      "Build a repeatable acquisition funnel targeting commercial facility managers.",
    challenge:
      "Sending paid search traffic to a generic homepage resulted in high bounce rates and few consultations.",
    solution:
      "We launched a dedicated campaign landing page featuring an interactive kWh savings preview, industry-specific ad creative, and clean CRM lead routing.",
    deliverables: [
      "Dedicated conversion landing page",
      "Interactive ROI preview component",
      "LinkedIn & Search ad creative suite",
      "Consent-gated conversion tracking",
    ],
    outcomes: [
      {
        label: "100% Message Match",
        detail: "Aligned ad headlines directly with landing page value propositions.",
        verified: true,
      },
      {
        label: "Clean Attribution",
        detail: "Tracked verified site-assessment requests without exposing PII.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-lumina-diagnostics",
    slug: "lumina-diagnostics-patient-portal",
    title: "Lumina Diagnostics — Patient Booking Hub",
    clientOrIndustry: "Healthcare & Preventive Screening",
    disclosureNote:
      "Representative accessible healthcare web experience showcase.",
    category: "Web Design & Development",
    tags: ["Healthcare UX", "WCAG Accessible", "Mobile-First", "Booking Flow"],
    thumbnail: "/images/portfolio/lumina-health.jpg",
    thumbnailAlt:
      "Photorealistic desktop monitor and tablet on a clinic reception desk displaying an accessible patient health portal",
    gallery: [
      {
        src: "/images/portfolio/lumina-health.jpg",
        alt: "Lumina Diagnostics desktop and tablet booking interface",
        caption: "Calm, high-contrast patient interface designed for effortless mobile booking.",
      },
    ],
    summary:
      "Accessible, patient-friendly diagnostic web portal and corporate wellness booking platform.",
    brief:
      "Redesign a clinic network's website so patients can easily understand screening packages and book online.",
    challenge:
      "Medical jargon and tiny text on mobile devices frustrated patients and overwhelmed phone reception.",
    solution:
      "We created a calm, WCAG AA accessible interface with plain-language checklists, instant FAQ search, and separate booking flows for patients and HR teams.",
    deliverables: [
      "WCAG 2.1 AA accessible interface design",
      "Preventive screening directory & checklists",
      "Corporate wellness HR enquiry desk",
      "Direct WhatsApp & web booking integration",
    ],
    outcomes: [
      {
        label: "Mobile-First Clarity",
        detail: "Zero horizontal overflow and accessible touch targets across all devices.",
        verified: true,
      },
      {
        label: "Reduced Support Calls",
        detail: "Surfaced preparation checklists directly on service pages.",
        verified: true,
      },
    ],
    featured: false,
    completedYear: "2025",
  },
  {
    id: "proj-monarch-advisory",
    slug: "monarch-advisory-strategic-rebrand",
    title: "Monarch Advisory — Executive Rebrand",
    clientOrIndustry: "Corporate Advisory & M&A Strategy",
    disclosureNote:
      "Representative strategic positioning and corporate identity case study.",
    category: "Digital Strategy & Growth",
    tags: ["Brand Positioning", "Executive Web", "Print & Digital", "Editorial"],
    thumbnail: "/images/portfolio/monarch-advisory.jpg",
    thumbnailAlt:
      "Photorealistic walnut boardroom table with embossed navy stationery, coral-edged business cards, and executive laptop website",
    gallery: [
      {
        src: "/images/portfolio/monarch-advisory.jpg",
        alt: "Monarch Advisory stationery kit and institutional website",
        caption: "Cohesive executive identity across print collateral and digital briefings.",
      },
    ],
    summary:
      "Strategic repositioning, executive stationery kit, and digital insights hub for a cross-border advisory firm.",
    brief:
      "Align the digital and print presence of an advisory partnership with its institutional clientele.",
    challenge:
      "The firm lacked a unified positioning narrative and needed a simple way to publish quarterly market briefings.",
    solution:
      "We codified their core value proposition, designed an embossed navy-and-coral identity system, and built a modular digital insights hub.",
    deliverables: [
      "Positioning narrative & messaging matrix",
      "Monogram & executive stationery system",
      "Digital insights & market briefing hub",
      "Confidential consultation request flow",
    ],
    outcomes: [
      {
        label: "Unified Positioning",
        detail: "Consistent narrative across partner profiles, pitch decks, and web.",
        verified: true,
      },
      {
        label: "In-House Publishing",
        detail: "Empowered partners to publish quarterly sector reports effortlessly.",
        verified: true,
      },
    ],
    featured: false,
    completedYear: "2025",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): ProjectItem[] {
  return portfolioProjects.filter((project) => project.featured);
}
