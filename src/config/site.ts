import { SiteConfig, TestimonialItem, TeamMember } from "@/types";

/**
 * CENTRALISED SITE CONFIGURATION — RIVE DIGITALS
 * Update business contact details, CTAs, social profiles, and feature toggles here.
 * Changes automatically propagate across the header, footer, contact page,
 * WhatsApp links, legal pages, and SEO structured data.
 */
export const siteConfig: SiteConfig = {
  name: "Rive Digitals",
  legalName: "Rive Digitals",
  tagline: "Strategic Digital Architecture for Ambitious Brands",
  description:
    "Rive Digitals is a digital services and business growth partner helping startups, SMBs, and established organisations strengthen their brand identity, build high-converting websites, and scale their digital presence.",
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
      platform: "LinkedIn",
      label: "Connect with Rive Digitals on LinkedIn",
      url: "https://www.linkedin.com/company/rivedigitals",
      handle: "@rivedigitals",
    },
    {
      platform: "Instagram",
      label: "Follow Rive Digitals on Instagram",
      url: "https://www.instagram.com/rivedigitals",
      handle: "@rivedigitals",
    },
    {
      platform: "X",
      label: "Follow Rive Digitals on X (Twitter)",
      url: "https://x.com/rivedigitals",
      handle: "@rivedigitals",
    },
  ],
  cta: {
    primaryLabel: "Request a Quote",
    primaryHref: "/contact?intent=quote",
    secondaryLabel: "Explore Our Work",
    secondaryHref: "/work",
  },
  features: {
    // Set to true only when verified client testimonials are added to `verifiedTestimonials` below.
    showTestimonials: false,
    // Set to true only when actual team member profiles are added to `teamMembers` below.
    showTeamProfiles: false,
    // Controls consent banner and event tracking dispatch.
    enableAnalytics: true,
  },
  serviceConfirmationNotice:
    "Service scopes are tailored to each engagement. Capabilities marked as 'Configurable Scope' can be structured as standalone engagements or integrated into a broader digital growth retainer subject to project discovery.",
  legalReviewNotice:
    "IMPORTANT LEGAL REVIEW NOTICE: This document is a structured operational template prepared for Rive Digitals. It must be reviewed and approved by qualified legal counsel before relying on it for statutory compliance in your jurisdiction.",
};

/**
 * VERIFIED TESTIMONIALS
 * Kept empty by default per strict policy: never display fabricated testimonials.
 * Add verified client quotes here and set `siteConfig.features.showTestimonials = true`.
 */
export const verifiedTestimonials: TestimonialItem[] = [];

/**
 * TEAM PROFILES
 * Kept empty by default per strict policy: only display team profiles when actual
 * biographical data is supplied. Add real team members here and set
 * `siteConfig.features.showTeamProfiles = true`.
 */
export const teamMembers: TeamMember[] = [];

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
