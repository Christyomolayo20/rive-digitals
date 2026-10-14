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
  iconName?: string;
  image: string;
  imageAlt?: string;
  summary: string;
  description: string;
  problemSolved?: string;
  deliverables: string[];
  idealCustomer?: string[];
  workflow?: ServiceWorkflowStep[];
  ctaLabel?: string;
  featured: boolean;
  displayOrder?: number;
  isPublished?: boolean;
}

export type ProjectCategory =
  | "All"
  | "Brand Identity"
  | "Web Design & Development"
  | "Digital Strategy & Growth"
  | "Content & Campaigns"
  | "Enterprise Web & Systems"
  | "Healthcare UX & Engineering"
  | "Brand Identity & Collateral";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientOrIndustry: string;
  disclosureNote?: string;
  category: ProjectCategory | string;
  tags?: string[];
  thumbnail: string;
  thumbnailAlt?: string;
  gallery: {
    src: string;
    alt?: string;
    caption?: string;
  }[];
  summary: string;
  brief?: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcomes?: {
    label: string;
    detail: string;
    verified: boolean;
  }[];
  externalUrl?: string;
  featured: boolean;
  completedYear?: string;
  displayOrder?: number;
  isPublished?: boolean;
}

export interface AboutSectionItem {
  id: string;
  sectionKey: "intro" | "story" | "mission" | "vision" | "values" | "process" | string;
  title: string;
  subtitle?: string;
  content: string;
  items?: any[];
  isPublished: boolean;
  displayOrder: number;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    x?: string;
    github?: string;
  };
  displayOrder: number;
  isPublished: boolean;
}

export type ContactSubmissionStatus = "new" | "in_progress" | "responded" | "closed";

export interface ContactSubmission {
  id: string;
  referenceId?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string;
  subject?: string;
  message: string;
  budget?: string;
  preferredContact?: "email" | "phone" | "whatsapp";
  status: ContactSubmissionStatus;
  isRead: boolean;
  notes?: string;
  createdAt: string;
}

export type EnquiryRecord = ContactSubmission;
export type EnquiryStatus = "new" | "in_review" | "responded" | "archived";

export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor";
  isActive: boolean;
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
  authorRole: string;
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
  subtitle?: string;
  description: string;
  clientInputs?: string[];
  keyOutputs?: string[];
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
    showTestimonials: boolean;
    showTeamProfiles: boolean;
    enableAnalytics: boolean;
  };
  serviceConfirmationNotice: string;
  legalReviewNotice: string;
}
