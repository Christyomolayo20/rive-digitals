import { ServiceItem } from "@/types";

/**
 * CENTRALISED SERVICES CONFIGURATION
 * Concise, visual-first service definitions paired with photorealistic studio imagery.
 */
export const servicesData: ServiceItem[] = [
  {
    id: "svc-brand-identity",
    slug: "brand-identity-graphic-design",
    title: "Brand Identity & Design",
    shortTitle: "Brand Identity",
    category: "Branding & Design",
    offeringStatus: "core",
    iconName: "Palette",
    image: "/images/services/brand-design.jpg",
    imageAlt:
      "Brand identity studio desk with midnight navy and coral color swatches, logo grid tablet, and brand guidelines book",
    summary:
      "Distinctive logos, color systems, and brand guidelines that make your business unforgettable.",
    description:
      "We craft cohesive visual identities backed by practical style guides so your brand looks authoritative across web, print, and social channels.",
    problemSolved:
      "Eliminates inconsistent visuals and generic templates that weaken customer trust.",
    deliverables: [
      "Primary logo, monogram & responsive lockups",
      "Accessible color palette & typography system",
      "Comprehensive Brand Guidelines book (PDF)",
      "Pitch deck & social media visual templates",
    ],
    idealCustomer: [
      "Startups launching or preparing for investment",
      "Growing businesses upgrading their market positioning",
      "Companies unifying multiple products under one brand",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Brand Discovery",
        description: "Audit your market, audience, and visual goals.",
      },
      {
        stepNumber: "02",
        title: "Identity Concepts",
        description: "Explore distinct logo, color, and type directions.",
      },
      {
        stepNumber: "03",
        title: "Refinement",
        description: "Stress-test across digital and print formats.",
      },
      {
        stepNumber: "04",
        title: "Master Handover",
        description: "Deliver vector files and brand style guide.",
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
    image: "/images/services/web-engineering.jpg",
    imageAlt:
      "Modern software engineering workstation displaying responsive desktop and mobile website layouts",
    summary:
      "Fast, mobile-first websites and web apps engineered to convert visitors into paying clients.",
    description:
      "We combine conversion-focused UI/UX design with modern full-stack engineering to build fast, SEO-ready websites you can easily manage.",
    problemSolved:
      "Replaces slow, outdated websites that lose mobile visitors and fail to generate leads.",
    deliverables: [
      "Custom responsive UI/UX design (Mobile, Tablet & Desktop)",
      "Full-stack Next.js & TypeScript web implementation",
      "Validated enquiry forms with database & email routing",
      "Technical SEO, analytics & admin CMS setup",
    ],
    idealCustomer: [
      "Service businesses needing a reliable lead engine",
      "Brands migrating from slow, rigid website builders",
      "Founders launching modern digital platforms",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "UX & Sitemap",
        description: "Map user journeys and conversion goals.",
      },
      {
        stepNumber: "02",
        title: "Interface Design",
        description: "Craft high-contrast, responsive screen layouts.",
      },
      {
        stepNumber: "03",
        title: "Clean Engineering",
        description: "Build fast frontend, API routes, and CMS controls.",
      },
      {
        stepNumber: "04",
        title: "QA & Launch",
        description: "Test across devices and deploy to production.",
      },
    ],
    ctaLabel: "Start a Website Project",
    featured: true,
  },
  {
    id: "svc-digital-strategy",
    slug: "business-branding-digital-strategy",
    title: "Brand & Digital Strategy",
    shortTitle: "Digital Strategy",
    category: "Strategy & Advisory",
    offeringStatus: "core",
    iconName: "Compass",
    image: "/images/portfolio/monarch-advisory.jpg",
    imageAlt:
      "Executive strategy presentation and corporate brand identity kit on a walnut boardroom table",
    summary:
      "Sharp market positioning, messaging clarity, and conversion roadmaps aligned with revenue goals.",
    description:
      "We work with leadership teams to clarify value propositions, audit conversion bottlenecks, and structure a practical digital growth roadmap.",
    problemSolved:
      "Fixes unclear messaging and disconnected digital spending that fails to produce ROI.",
    deliverables: [
      "Positioning & value proposition framework",
      "Website & conversion rate (CRO) audit",
      "Buyer journey & channel architecture map",
      "Prioritised 90-day digital execution roadmap",
    ],
    idealCustomer: [
      "Leadership teams planning a rebrand or market expansion",
      "Businesses with traffic that isn't converting into enquiries",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Diagnostic Audit",
        description: "Review current footprint and bottlenecks.",
      },
      {
        stepNumber: "02",
        title: "Positioning",
        description: "Define clear messaging that differentiates you.",
      },
      {
        stepNumber: "03",
        title: "Funnel Mapping",
        description: "Align landing pages and lead capture flows.",
      },
      {
        stepNumber: "04",
        title: "Action Roadmap",
        description: "Hand over a clear execution blueprint.",
      },
    ],
    ctaLabel: "Book a Strategy Session",
    featured: true,
  },
  {
    id: "svc-digital-marketing",
    slug: "digital-marketing-advertising",
    title: "Digital Marketing & Campaigns",
    shortTitle: "Digital Marketing",
    category: "Acquisition & Growth",
    offeringStatus: "configurable",
    statusNote: "Scoped around your landing page readiness and acquisition goals.",
    iconName: "TrendingUp",
    image: "/images/portfolio/solaris-cleantech.jpg",
    imageAlt:
      "Laptop and smartphone showing a high-converting digital marketing campaign and ROI calculator",
    summary:
      "Targeted search and social campaigns paired with high-converting landing pages.",
    description:
      "We pair disciplined ad creative with dedicated landing pages and privacy-first conversion tracking so every campaign drives measurable enquiries.",
    problemSolved:
      "Stops wasted ad spend caused by sending paid traffic to generic, untracked pages.",
    deliverables: [
      "Search & paid social campaign architecture",
      "Message-matched campaign landing pages",
      "Ad creative & copy variations",
      "Conversion event tracking & ROI reporting",
    ],
    idealCustomer: [
      "Businesses ready to scale qualified client enquiries",
      "Brands launching new products or regional campaigns",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Funnel Check",
        description: "Verify landing page conversion readiness.",
      },
      {
        stepNumber: "02",
        title: "Creative Build",
        description: "Produce targeted ad visuals and copy.",
      },
      {
        stepNumber: "03",
        title: "Launch",
        description: "Deploy campaigns with verified tracking.",
      },
      {
        stepNumber: "04",
        title: "Optimise",
        description: "Refine targeting based on lead quality.",
      },
    ],
    ctaLabel: "Enquire About Campaigns",
    featured: false,
  },
  {
    id: "svc-content-creation",
    slug: "content-creation-marketing",
    title: "Content & Editorial Systems",
    shortTitle: "Content Marketing",
    category: "Content & Editorial",
    offeringStatus: "configurable",
    statusNote: "Available for website launches or ongoing editorial retainers.",
    iconName: "PenTool",
    image: "/images/portfolio/lumina-health.jpg",
    imageAlt:
      "Accessible content hub and digital portal displayed on desktop and tablet screens",
    summary:
      "Clear website copywriting, case studies, and SEO articles that build buyer confidence.",
    description:
      "We turn complex technical expertise into concise, persuasive copywriting and visual assets that answer buyer questions and rank in search.",
    problemSolved:
      "Eliminates jargon-heavy copy that confuses visitors and stalls sales conversations.",
    deliverables: [
      "Conversion copywriting for core website pages",
      "Structured client case studies & pitch narratives",
      "SEO-informed industry articles & guides",
      "Visual diagrams & editorial graphics",
    ],
    idealCustomer: [
      "B2B and advisory firms translating complex services into plain value",
      "Brands building long-term organic search authority",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Interviews",
        description: "Extract domain expertise from your team.",
      },
      {
        stepNumber: "02",
        title: "Content Map",
        description: "Structure topics around buyer intent.",
      },
      {
        stepNumber: "03",
        title: "Production",
        description: "Draft crisp copy paired with visuals.",
      },
      {
        stepNumber: "04",
        title: "Publish",
        description: "Format and optimise for web search.",
      },
    ],
    ctaLabel: "Request Content Support",
    featured: false,
  },
  {
    id: "svc-social-media",
    slug: "social-media-management",
    title: "Social Media Presence",
    shortTitle: "Social Media",
    category: "Brand Presence",
    offeringStatus: "configurable",
    statusNote: "Available as a branded template rollout or managed retainer.",
    iconName: "Share2",
    image: "/images/hero-showcase.jpg",
    imageAlt:
      "Branded social media templates and visual identity kit on studio screens",
    summary:
      "Cohesive social profile branding, reusable templates, and structured content calendars.",
    description:
      "We equip your social channels with on-brand visual templates, optimised profile architecture, and consistent publishing workflows.",
    problemSolved:
      "Transforms dormant or off-brand social profiles into a credible trust signal.",
    deliverables: [
      "Social profile banners, bio optimization & CTA links",
      "Reusable carousel & graphic template systems",
      "Content pillar strategy & monthly calendar",
      "Performance & engagement review",
    ],
    idealCustomer: [
      "Newly rebranded companies needing cohesive social channels",
      "Founders seeking a polished, consistent social presence",
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Channel Audit",
        description: "Align priority platforms and pillars.",
      },
      {
        stepNumber: "02",
        title: "Template Kit",
        description: "Design custom social graphic systems.",
      },
      {
        stepNumber: "03",
        title: "Calendar",
        description: "Batch-produce scheduled posts.",
      },
      {
        stepNumber: "04",
        title: "Review",
        description: "Track engagement and refine topics.",
      },
    ],
    ctaLabel: "Enquire About Social",
    featured: false,
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getFeaturedServices(): ServiceItem[] {
  return servicesData.filter((service) => service.featured);
}
