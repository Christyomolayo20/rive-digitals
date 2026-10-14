import { SiteConfig, TestimonialItem, TeamMember } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Rive Digitals",
  legalName: "Rive Digitals",
  tagline: "Strategic Digital Architecture for Ambitious Brands",
  description:
    "Rive Digitals is a digital solutions, branding, marketing and technology partner helping startups, SMBs, and established organisations strengthen their brand identity, build high-converting websites, and scale their digital presence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rivedigitals.com",
  logo: {
    src: "/images/logo.jpg",
    svgFallback: "/images/rive-logo.svg",
    alt: "Rive Digitals Logo — Geometric white monogram with coral accent on deep midnight navy",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@rivedigitals.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    phoneDisplay:
      process.env.NEXT_PUBLIC_CONTACT_PHONE || "Available upon enquiry",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    whatsappDefaultMessage:
      "Hello Rive Digitals, I would like to discuss a project and request a consultation.",
    locationSummary: "Remote-First Digital Studio • Serving Clients Globally",
    workingHours: "Monday – Friday, 9:00 AM – 6:00 PM (WAT / GMT+1)",
    responseExpectation:
      "We review every project brief personally and respond within 1–2 business days with clarifying questions or a recommended next step.",
  },
  socials: [
    {
      platform: "Facebook",
      label: "Follow Rive Digitals on Facebook",
      url: "https://www.facebook.com/rivedigitals",
      handle: "@rivedigitals",
    },
    {
      platform: "Instagram",
      label: "Follow Rive Digitals on Instagram",
      url: "https://www.instagram.com/rivedigitals",
      handle: "@rivedigitals",
    },
    {
      platform: "TikTok",
      label: "Follow Rive Digitals on TikTok",
      url: "https://www.tiktok.com/@rivedigitals",
      handle: "@rivedigitals",
    },
  ],
  cta: {
    primaryLabel: "Let's Work Together",
    primaryHref: "/contact",
    secondaryLabel: "View Portfolio",
    secondaryHref: "/portfolio",
  },
  features: {
    showTestimonials: false,
    showTeamProfiles: false,
    enableAnalytics: true,
  },
  serviceConfirmationNotice:
    "Service scopes are tailored to each engagement. Capabilities marked as 'Configurable Scope' can be structured as standalone engagements or integrated into a broader digital growth retainer subject to project discovery.",
  legalReviewNotice:
    "IMPORTANT LEGAL REVIEW NOTICE: This document is a structured operational template prepared for Rive Digitals. It must be reviewed and approved by qualified legal counsel before relying on it for statutory compliance in your jurisdiction.",
};

export const verifiedTestimonials: TestimonialItem[] = [];

export const teamMembers: TeamMember[] = [];

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
