import { ServiceItem } from "@/types";

/**
 * CENTRALISED SERVICES CONFIGURATION
 * Manage all service offerings, descriptions, deliverables, workflows, and availability status here.
 * Do not hardcode service details inside individual UI components.
 * Note: Pricing and exact timelines are intentionally omitted and scoped per project brief.
 */
export const servicesData: ServiceItem[] = [
  {
    id: "svc-brand-identity",
    slug: "brand-identity-graphic-design",
    title: "Brand Identity & Graphic Design",
    shortTitle: "Brand Identity",
    category: "Branding & Design",
    offeringStatus: "core",
    iconName: "Palette",
    summary:
      "Cohesive visual systems, logo architecture, and brand guidelines that make your business unmistakable across digital and print touchpoints.",
    description:
      "A strong brand is more than a decorative mark—it is a strategic asset that signals credibility before a single word is read. We design clear, adaptable visual identities backed by practical documentation so your team can maintain consistency everywhere your audience encounters you.",
    problemSolved:
      "Eliminates fragmented, inconsistent visuals and generic templates that undermine customer trust and make an established business appear unpolished.",
    deliverables: [
      "Primary logo mark, secondary lockups, and responsive monogram variants",
      "Defined color architecture (HEX, RGB, CMYK) with accessibility contrast pairings",
      "Typographic hierarchy and licensing recommendations for web and print",
      "Comprehensive Brand Style Guide PDF for internal teams and partners",
      "Core collateral templates (pitch deck master, social layouts, business stationery)",
      "Production-ready vector and raster asset library (SVG, PNG, PDF)",
    ],
    idealCustomer: [
      "Startups preparing for market launch or institutional fundraising",
      "Growing SMBs whose visual identity no longer reflects the quality of their service",
      "Organisations consolidating multiple offerings under a unified brand system",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Brand Audit & Market Discovery",
        description:
          "We review your existing assets, audience expectations, and competitive landscape to define a clear visual direction.",
      },
      {
        stepNumber: "02",
        title: "Concept Architecture & Exploration",
        description:
          "We develop distinct territories showing how the mark, typography, and color system perform in real-world contexts.",
      },
      {
        stepNumber: "03",
        title: "Refinement & Systematisation",
        description:
          "Based on structured feedback, we refine the selected direction and stress-test legibility across small and large viewports.",
      },
      {
        stepNumber: "04",
        title: "Asset Packaging & Guidelines Handover",
        description:
          "We deliver organized master files alongside a clear brand usage manual.",
      },
    ],
    ctaLabel: "Request a Branding Quote",
    featured: true,
  },
  {
    id: "svc-web-development",
    slug: "website-design-development",
    title: "Website Design & Development",
    shortTitle: "Web Design & Dev",
    category: "Engineering & UX",
    offeringStatus: "core",
    iconName: "Code2",
    summary:
      "Fast, accessible, conversion-focused business websites and web applications engineered for clarity, search visibility, and maintainability.",
    description:
      "Your website is your primary commercial hub. We combine conversion-focused information architecture, responsive interface design, and modern full-stack engineering to build websites that communicate value immediately and turn visitors into qualified enquiries.",
    problemSolved:
      "Replaces slow, confusing, or hard-to-update websites that leak prospective clients and fail to work reliably on mobile devices.",
    deliverables: [
      "Information architecture, sitemap, and conversion-focused wireframes",
      "Bespoke UI design system tailored to your brand identity across mobile, tablet, and desktop",
      "Clean, responsive frontend and backend implementation using modern web standards",
      "Validated enquiry and quote forms with spam protection and notification routing",
      "Technical SEO foundation (semantic HTML, structured metadata, XML sitemap, Open Graph)",
      "Documentation and handover training for ongoing content updates",
    ],
    idealCustomer: [
      "B2B and professional service firms needing a credible lead-generation platform",
      "Established brands migrating from outdated or slow website builders",
      "Founders launching new digital products or corporate flagships",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Requirements & Conversion Mapping",
        description:
          "We define user journeys, page hierarchy, technical integrations, and primary conversion goals.",
      },
      {
        stepNumber: "02",
        title: "UX Wireframing & Visual Design",
        description:
          "We design key layouts and interactive component states with mobile-first responsiveness.",
      },
      {
        stepNumber: "03",
        title: "Full-Stack Development & Content Integration",
        description:
          "We build reusable components, configure forms and CMS structures, and optimize performance.",
      },
      {
        stepNumber: "04",
        title: "Quality Assurance & Production Launch",
        description:
          "We test across devices, verify accessibility and SEO metadata, and assist with deployment.",
      },
    ],
    ctaLabel: "Discuss a Website Project",
    featured: true,
  },
  {
    id: "svc-digital-strategy",
    slug: "business-branding-digital-strategy",
    title: "Business Branding & Digital Strategy",
    shortTitle: "Digital Strategy",
    category: "Strategy & Advisory",
    offeringStatus: "core",
    iconName: "Compass",
    summary:
      "Structured positioning, value proposition clarity, and digital roadmaps that align your online channels with measurable commercial objectives.",
    description:
      "Tactics without strategy lead to wasted budget. We work with leadership teams to sharpen market positioning, clarify customer messaging, and map out a practical digital roadmap—ensuring your brand, website, and acquisition channels work together.",
    problemSolved:
      "Resolves unclear market positioning and disconnected digital initiatives where businesses invest in tools or ads without a coherent customer journey.",
    deliverables: [
      "Brand positioning framework and value proposition messaging matrix",
      "Target audience personas and buyer decision-stage mapping",
      "Audit of current website, brand touchpoints, and competitor positioning",
      "Prioritised digital growth roadmap with recommended channel architecture",
      "Conversion rate optimisation (CRO) recommendations for key landing pages",
    ],
    idealCustomer: [
      "Leadership teams preparing for a rebrand, product pivot, or new market entry",
      "Businesses experiencing high website traffic but low enquiry conversion",
      "Growing companies seeking an objective digital audit before committing capital",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Stakeholder Interviews & Diagnostic Audit",
        description:
          "We evaluate your business model, current digital footprint, and commercial bottlenecks.",
      },
      {
        stepNumber: "02",
        title: "Positioning & Messaging Synthesis",
        description:
          "We articulate what sets your business apart and how to communicate it concisely.",
      },
      {
        stepNumber: "03",
        title: "Channel & Conversion Architecture",
        description:
          "We map the customer journey from first impression to qualified consultation.",
      },
      {
        stepNumber: "04",
        title: "Roadmap Delivery & Implementation Briefing",
        description:
          "We present a clear execution blueprint that your internal team or Rive Digitals can implement.",
      },
    ],
    ctaLabel: "Book a Strategy Consultation",
    featured: true,
  },
  {
    id: "svc-digital-marketing",
    slug: "digital-marketing-advertising",
    title: "Digital Marketing & Advertising",
    shortTitle: "Digital Marketing",
    category: "Acquisition & Growth",
    offeringStatus: "configurable",
    statusNote:
      "Scoped following an initial assessment of your landing page readiness and unit economics.",
    iconName: "TrendingUp",
    summary:
      "Targeted search and social acquisition campaigns paired with dedicated landing experiences and transparent conversion tracking.",
    description:
      "Effective digital advertising requires both disciplined media targeting and high-converting landing pages. We structure acquisition campaigns around clear commercial intent, ensuring every campaign connects to an optimised destination and transparent analytics.",
    problemSolved:
      "Stops ad spend waste caused by sending paid traffic to generic homepages without conversion tracking or message alignment.",
    deliverables: [
      "Campaign architecture across search and paid social channels",
      "Ad creative direction and copy variations aligned with buyer intent",
      "Campaign-specific landing page recommendations or builds",
      "Privacy-conscious conversion event tracking and attribution setup",
      "Periodic performance reviews focused on qualified enquiries rather than vanity metrics",
    ],
    idealCustomer: [
      "Businesses with a validated offer and conversion-ready website looking to scale lead flow",
      "Service providers launching time-sensitive B2B or B2C campaigns",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Offer & Funnel Readiness Review",
        description:
          "We verify that your landing experience and enquiry flow are ready to convert paid traffic.",
      },
      {
        stepNumber: "02",
        title: "Audience & Creative Structuring",
        description:
          "We develop message-matched ad sets, targeting parameters, and tracking events.",
      },
      {
        stepNumber: "03",
        title: "Campaign Launch & Calibration",
        description:
          "We deploy campaigns and monitor initial search queries, placements, and lead quality.",
      },
      {
        stepNumber: "04",
        title: "Iterative Optimisation & Reporting",
        description:
          "We refine budget allocation and creative assets based on verified conversion data.",
      },
    ],
    ctaLabel: "Enquire About Marketing",
    featured: false,
  },
  {
    id: "svc-content-creation",
    slug: "content-creation-marketing",
    title: "Content Creation & Marketing",
    shortTitle: "Content Marketing",
    category: "Content & Editorial",
    offeringStatus: "configurable",
    statusNote:
      "Available as part of website launches, brand rollouts, or structured editorial retainers.",
    iconName: "PenTool",
    summary:
      "Authoritative website copywriting, case studies, and visual editorial assets that answer buyer questions and build organic search visibility.",
    description:
      "Clear writing and purposeful visuals are the foundation of digital persuasion. We help businesses articulate complex services in plain, compelling language—producing website copy, structured case studies, and educational insights that earn trust.",
    problemSolved:
      "Overcomes internal content bottlenecks and eliminates vague, jargon-heavy copy that fails to explain what a business actually does.",
    deliverables: [
      "Conversion-focused website copywriting for core pages and service verticals",
      "Client case study interviews and structured narrative drafting",
      "SEO-informed editorial articles and industry resource guides",
      "Visual graphics, diagrams, and presentation assets to support written content",
      "Editorial style and tone-of-voice guidelines",
    ],
    idealCustomer: [
      "Technical, B2B, and advisory firms that need to translate expertise into accessible client benefits",
      "Brands building an organic search footprint through helpful educational content",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Subject-Matter Extraction",
        description:
          "We interview your team to capture domain expertise, customer objections, and proof points.",
      },
      {
        stepNumber: "02",
        title: "Editorial Outline & Search Mapping",
        description:
          "We structure page hierarchies and article outlines around real buyer questions.",
      },
      {
        stepNumber: "03",
        title: "Drafting & Visual Pairing",
        description:
          "We write clear, structured copy paired with supporting diagrams or layout specs.",
      },
      {
        stepNumber: "04",
        title: "Review, Polish & Publication",
        description:
          "We incorporate stakeholder feedback and format content for web publication.",
      },
    ],
    ctaLabel: "Request Content Support",
    featured: false,
  },
  {
    id: "svc-social-media",
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Media",
    category: "Brand Presence",
    offeringStatus: "configurable",
    statusNote:
      "Available as a structured brand rollout system or ongoing retainer subject to channel alignment.",
    iconName: "Share2",
    summary:
      "Consistent social channel architecture, branded content templates, and structured publishing workflows that reinforce brand credibility.",
    description:
      "Prospective clients frequently inspect a company's social channels to verify legitimacy and activity before reaching out. We establish cohesive profile architecture, reusable visual systems, and disciplined content pillars so your social presence reflects the standard of your business.",
    problemSolved:
      "Replaces dormant or visually disjointed social profiles with a reliable, on-brand communications channel.",
    deliverables: [
      "Social profile optimization (banners, bios, highlight structures, and CTA routing)",
      "Defined content pillars aligned with business expertise and audience questions",
      "Reusable graphic and carousel template systems for consistent publishing",
      "Monthly editorial calendar planning and copy drafting",
      "Engagement and performance summaries",
    ],
    idealCustomer: [
      "Brands launching a new identity that need immediate cohesion across social platforms",
      "Founders and B2B teams seeking a professional, low-friction publishing cadence",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Channel Audit & Pillar Definition",
        description:
          "We identify which platforms matter to your buyers and define core topic themes.",
      },
      {
        stepNumber: "02",
        title: "Visual Kit & Profile Optimization",
        description:
          "We align your social profiles and template kit with your core brand identity.",
      },
      {
        stepNumber: "03",
        title: "Editorial Calendar Production",
        description:
          "We prepare batch content schedules for review ahead of publication.",
      },
      {
        stepNumber: "04",
        title: "Publishing & Iteration",
        description:
          "We maintain consistent delivery and refine formats based on audience response.",
      },
    ],
    ctaLabel: "Enquire About Social Systems",
    featured: false,
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getFeaturedServices(): ServiceItem[] {
  return servicesData.filter((service) => service.featured);
}
