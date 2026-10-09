export type ServiceOfferingStatus = "core" | "configurable";

export interface ServiceWorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  offeringStatus: ServiceOfferingStatus;
  statusNote?: string;
  iconName:
    | "Palette"
    | "Code2"
    | "Share2"
    | "TrendingUp"
    | "PenTool"
    | "Compass";
  summary: string;
  description: string;
  problemSolved: string;
  deliverables: string[];
  idealCustomer: string[];
  workflow: ServiceWorkflowStep[];
  ctaLabel: string;
  featured: boolean;
}

export type ProjectCategory =
  | "Brand Identity"
  | "Web Design & Development"
  | "Digital Strategy & Growth"
  | "Content & Campaigns";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientOrIndustry: string;
  disclosureNote: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  gallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcomes: {
    label: string;
    detail: string;
    verified: boolean;
  }[];
  externalUrl?: string;
  featured: boolean;
  completedYear: string;
}

export type BlogCategory =
  | "Brand Strategy"
  | "Web Architecture"
  | "Digital Growth"
  | "Content Systems";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  authorRole: string; // Avoids inventing fictional individual names; uses editorial team role
  coverImage: string;
  coverImageAlt: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    callout?: string;
  }[];
  featured: boolean;
}

export interface FaqItem {
  id: string;
  category:
    | "Services & Scope"
    | "Onboarding & Process"
    | "Pricing & Quotes"
    | "Revisions & Governance"
    | "Timelines & Working Arrangements";
  question: string;
  answer: string;
  featuredOnHome: boolean;
}

export interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  clientInputs: string[];
  keyOutputs: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  logo: {
    src: string;
    svgFallback: string;
    alt: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneDisplay: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    locationSummary: string;
    workingHours: string;
    responseExpectation: string;
  };
  socials: {
    platform: string;
    label: string;
    url: string;
    handle: string;
  }[];
  cta: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  features: {
    /** Only render testimonials section when genuine verified testimonials are supplied */
    showTestimonials: boolean;
    /** Only render individual team profiles when actual team member data is supplied */
    showTeamProfiles: boolean;
    /** Enable optional privacy-conscious analytics with user consent */
    enableAnalytics: boolean;
  };
  serviceConfirmationNotice: string;
  legalReviewNotice: string;
}
