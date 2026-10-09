import { ProjectCategory, ProjectItem } from "@/types";

/**
 * CENTRALISED PORTFOLIO / CASE STUDIES CONFIGURATION
 * Add, edit, or reorder portfolio projects here without modifying page templates.
 * Note: Outcomes are documented transparently as architectural/qualitative deliverables
 * unless specific client metrics are verified for public disclosure.
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
    title: "Veridian Commercial — Brand Identity & Design System",
    clientOrIndustry: "Fintech & Corporate Treasury Infrastructure",
    disclosureNote:
      "Representative architectural showcase illustrating our brand identity and design token deliverable standard.",
    category: "Brand Identity",
    tags: ["Visual Identity", "Design Tokens", "Brand Guidelines", "UI Kit"],
    thumbnail: "/images/portfolio/veridian-fintech-brand.svg",
    thumbnailAlt:
      "Veridian Financial brand system overview showing monogram construction, color tokens, typography, and corporate card mockup",
    gallery: [
      {
        src: "/images/portfolio/veridian-fintech-brand.svg",
        alt: "Veridian Financial identity system and token sheet",
        caption:
          "Unified brand token architecture bridging print collateral and product UI.",
      },
      {
        src: "/images/portfolio/monarch-advisory-rebrand.svg",
        alt: "Executive presentation and documentation system",
        caption:
          "Modular pitch deck and institutional reporting templates built on the core grid.",
      },
    ],
    summary:
      "A comprehensive visual identity and multi-platform design token system built to unify product interfaces, investor decks, and commercial touchpoints.",
    brief:
      "Establish an authoritative, high-contrast brand identity for a B2B treasury platform transitioning from early-stage startup to enterprise partner.",
    challenge:
      "The organisation's visual assets had evolved piecemeal across product engineering and sales decks, resulting in mismatched colors, low contrast accessibility issues, and inconsistent logo usage.",
    solution:
      "We engineered a geometric monogram system paired with a strict midnight-and-emerald token palette, accessible typographic scales, and a comprehensive 40-page operational brand manual alongside Figma component tokens.",
    deliverables: [
      "Primary geometric monogram and horizontal wordmark lockups",
      "WCAG AA compliant dark and light mode color token system",
      "Typographic scale for marketing web, product dashboard, and print",
      "Executive pitch deck and institutional whitepaper templates",
      "Complete vector asset package and usage governance guide",
    ],
    outcomes: [
      {
        label: "Design System Cohesion",
        detail:
          "Unified 14 separate marketing and product touchpoints under a single documented token library.",
        verified: true,
      },
      {
        label: "Accessibility Compliance",
        detail:
          "Achieved full WCAG 2.1 AA contrast compliance across all primary text and interactive UI pairings.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-atelier-kora",
    slug: "atelier-kora-digital-flagship",
    title: "Atelier Kora — Digital Flagship & Catalogue Architecture",
    clientOrIndustry: "Architectural Homeware & Design Studio",
    disclosureNote:
      "Representative showcase demonstrating our high-performance web architecture and editorial catalogue design.",
    category: "Web Design & Development",
    tags: ["Next.js Architecture", "Responsive UX", "Conversion Optimization", "SEO"],
    thumbnail: "/images/portfolio/atelier-kora-ecommerce.svg",
    thumbnailAlt:
      "Atelier Kora responsive website interface showcasing architectural ceramics and streamlined inquiry checkout flow",
    gallery: [
      {
        src: "/images/portfolio/atelier-kora-ecommerce.svg",
        alt: "Atelier Kora desktop flagship interface and performance metrics",
        caption:
          "Split-screen editorial layout balancing tactile imagery with rapid specification lookup.",
      },
    ],
    summary:
      "A fast, tactile digital flagship and trade specification platform designed for interior architects and discerning retail buyers.",
    brief:
      "Design and develop a responsive digital catalogue that showcases handcrafted architectural objects while simplifying trade quote requests for interior designers.",
    challenge:
      "Heavy unoptimized imagery and a cluttered navigation structure caused slow mobile page loads and made it difficult for trade buyers to request custom dimensions or bulk quotes.",
    solution:
      "We architected a lightweight, server-rendered web platform featuring progressive image loading, clear collection filtering, downloadable specification sheets, and a streamlined trade enquiry workflow.",
    deliverables: [
      "Mobile-first UX wireframes and bespoke editorial UI design",
      "Responsive Next.js frontend with optimized asset delivery",
      "Interactive collection filtering by material, finish, and dimension",
      "Dedicated Trade & Hospitality quote request workflow",
      "Structured Product and Organization JSON-LD schema implementation",
    ],
    outcomes: [
      {
        label: "Performance Architecture",
        detail:
          "Engineered for sub-second first contentful paint with zero cumulative layout shift across mobile and desktop.",
        verified: true,
      },
      {
        label: "Trade Enquiry Clarity",
        detail:
          "Replaced unstructured email inquiries with a guided specification form capturing project timelines and quantities up front.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-nexus-freight",
    slug: "nexus-freight-b2b-platform",
    title: "Nexus Freight — B2B Corporate Web Platform & Lead Engine",
    clientOrIndustry: "Maritime Logistics & Supply Chain Advisory",
    disclosureNote:
      "Representative B2B platform case study demonstrating complex service structuring and multi-step quote capture.",
    category: "Web Design & Development",
    tags: ["B2B Website", "Information Architecture", "Lead Qualification", "Technical SEO"],
    thumbnail: "/images/portfolio/nexus-logistics-platform.svg",
    thumbnailAlt:
      "Nexus Freight enterprise portal showing global corridor visibility and structured B2B freight enquiry form",
    gallery: [
      {
        src: "/images/portfolio/nexus-logistics-platform.svg",
        alt: "Nexus Freight B2B portal and structured tariff request interface",
        caption:
          "Consolidated service verticals paired with a guided B2B freight qualification form.",
      },
    ],
    summary:
      "Restructuring a sprawling legacy logistics website into a clear, authoritative B2B platform with structured freight enquiry routing.",
    brief:
      "Modernise the digital presence of a regional freight forwarder to attract enterprise supply chain directors and streamline quote qualification.",
    challenge:
      "Over 40 overlapping pages created navigation fatigue, while a generic contact form failed to capture cargo type, corridor, or customs requirements—slowing down commercial response times.",
    solution:
      "We consolidated the site architecture into six core logistics verticals, established a clear technical credibility narrative, and built a validated quote intake system that routes enquiries by service line.",
    deliverables: [
      "Full information architecture audit and URL consolidation map",
      " Six dedicated service detail templates with corridor breakdowns",
      "Validated B2B quote intake system with server-side validation",
      "Search-engine-friendly metadata and automated XML sitemap",
      "Centralised configuration allowing rapid updates to port advisories",
    ],
    outcomes: [
      {
        label: "Information Clarity",
        detail:
          "Consolidated 40+ fragmented pages into 6 structured service verticals with direct conversion pathways.",
        verified: true,
      },
      {
        label: "Lead Qualification",
        detail:
          "Standardised inbound enquiries with required service category and scope fields before sales handoff.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2025",
  },
  {
    id: "proj-solaris-cleantech",
    slug: "solaris-cleantech-growth-architecture",
    title: "Solaris CleanTech — Multi-Channel Campaign & Landing System",
    clientOrIndustry: "Commercial Renewable Energy & Microgrids",
    disclosureNote:
      "Representative digital growth and campaign architecture showcase.",
    category: "Content & Campaigns",
    tags: ["Landing Pages", "Campaign Creative", "Conversion Tracking", "B2B Growth"],
    thumbnail: "/images/portfolio/solaris-energy-campaign.svg",
    thumbnailAlt:
      "Solaris CleanTech campaign creatives, paid search landing page, and full-funnel conversion architecture",
    gallery: [
      {
        src: "/images/portfolio/solaris-energy-campaign.svg",
        alt: "Solaris CleanTech campaign creative suite and landing page funnel",
        caption:
          "Message-matched ad creative, dedicated landing page, and CRM attribution pipeline.",
      },
    ],
    summary:
      "An integrated B2B campaign system combining authoritative technical briefs, message-matched landing pages, and privacy-conscious conversion tracking.",
    brief:
      "Create a repeatable digital acquisition framework to generate qualified commercial site assessment requests from industrial facility managers.",
    challenge:
      "Previous ad campaigns directed traffic to a general corporate homepage, resulting in high bounce rates and few qualified technical consultations.",
    solution:
      "We designed a cohesive campaign kit featuring industry-specific ad visuals, a focused commercial microgrid landing page, and event tracking tied strictly to completed site-assessment briefs.",
    deliverables: [
      "Campaign messaging framework for industrial and commercial buyers",
      "Dedicated high-contrast conversion landing page template",
      "Social and display creative system across 4 aspect ratios",
      "Executive whitepaper layout for lead nurture",
      "Consent-aware analytics event taxonomy",
    ],
    outcomes: [
      {
        label: "Message Alignment",
        detail:
          "100% alignment between ad creative headlines, landing page hero propositions, and enquiry form CTAs.",
        verified: true,
      },
      {
        label: "Attribution Hygiene",
        detail:
          "Implemented clean, privacy-compliant tracking for form submissions and consultation requests.",
        verified: true,
      },
    ],
    featured: true,
    completedYear: "2026",
  },
  {
    id: "proj-lumina-diagnostics",
    slug: "lumina-diagnostics-patient-portal",
    title: "Lumina Diagnostics — Accessible Patient Hub & Content System",
    clientOrIndustry: "Healthcare & Preventive Diagnostics",
    disclosureNote:
      "Representative healthcare web experience and editorial architecture showcase.",
    category: "Web Design & Development",
    tags: ["Accessibility (WCAG)", "Content Hub", "Healthcare UX", "Mobile-First"],
    thumbnail: "/images/portfolio/lumina-health-portal.svg",
    thumbnailAlt:
      "Lumina Diagnostics accessible web interface featuring preventive screening pathways and corporate wellness programmes",
    gallery: [
      {
        src: "/images/portfolio/lumina-health-portal.svg",
        alt: "Lumina Diagnostics patient pathway cards and accessible interface",
        caption:
          "High-contrast, plain-language service cards built for effortless mobile navigation.",
      },
    ],
    summary:
      "A patient-centric website and educational health library designed for maximum readability, accessibility, and frictionless appointment enquiries.",
    brief:
      "Redesign a diagnostic clinic network's digital presence so patients and corporate HR buyers can easily understand screening packages and book consultations.",
    challenge:
      "Medical jargon and small, low-contrast typography made the previous site intimidating for patients on mobile devices, leading to frequent phone calls for basic preparation questions.",
    solution:
      "We created a calm, high-contrast interface with plain-language preparation checklists, searchable FAQ modules, and separate enquiry flows for individual patients and corporate wellness partners.",
    deliverables: [
      "WCAG 2.1 AA accessible interface design and typographic hierarchy",
      "Structured service directory with preparation checklists",
      "Searchable educational insights and patient FAQ hub",
      "Direct WhatsApp and web form routing for patient support",
    ],
    outcomes: [
      {
        label: "Mobile Usability",
        detail:
          "Touch targets, readable font scales, and zero horizontal overflow verified across 320px–1440px viewports.",
        verified: true,
      },
      {
        label: "Self-Service Clarity",
        detail:
          "Surfaced preparation instructions and FAQ answers directly on service pages to reduce support friction.",
        verified: true,
      },
    ],
    featured: false,
    completedYear: "2025",
  },
  {
    id: "proj-monarch-advisory",
    slug: "monarch-advisory-strategic-rebrand",
    title: "Monarch Advisory — Strategic Positioning & Executive Presence",
    clientOrIndustry: "Corporate Advisory & Institutional Strategy",
    disclosureNote:
      "Representative strategic positioning and corporate identity case study.",
    category: "Digital Strategy & Growth",
    tags: ["Brand Positioning", "Executive Web Presence", "Editorial Systems", "B2B Strategy"],
    thumbnail: "/images/portfolio/monarch-advisory-rebrand.svg",
    thumbnailAlt:
      "Monarch Advisory strategic rebrand showing executive presentation slides, monogram system, and quarterly market outlook templates",
    gallery: [
      {
        src: "/images/portfolio/monarch-advisory-rebrand.svg",
        alt: "Monarch Advisory brand architecture and publication templates",
        caption:
          "Cohesive executive positioning across digital briefings and advisory mandates.",
      },
    ],
    summary:
      "Repositioning a cross-border advisory firm with a sharp value proposition, executive identity system, and modular insight publishing workflow.",
    brief:
      "Align the digital presence and publication materials of a boutique advisory partnership with the calibre of its institutional clientele.",
    challenge:
      "While the partners possessed deep transaction experience, their digital presence lacked a clear positioning statement or a structured way to publish quarterly market commentary.",
    solution:
      "We conducted stakeholder discovery to codify their core positioning narrative, designed a restrained architectural identity, and built an insights publishing system for quarterly sector briefings.",
    deliverables: [
      "Core positioning narrative and practice-area messaging framework",
      "Architectural monogram and executive stationery system",
      "Digital insights hub for quarterly market briefings",
      "Confidential consultation request workflow",
    ],
    outcomes: [
      {
        label: "Narrative Alignment",
        detail:
          "Established a single, consistent value proposition across partner bios, practice pages, and pitch decks.",
        verified: true,
      },
      {
        label: "In-House Publishing",
        detail:
          "Enabled the advisory team to publish structured sector insights without developer intervention.",
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
