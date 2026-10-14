import { describe, it, expect, beforeEach } from "vitest";
import { enquirySchema, ALLOWED_SERVICE_VALUES } from "@/lib/validation";
import { checkRateLimit, resetRateLimitStore } from "@/lib/rate-limit";
import { sanitizePlainText, buildWhatsAppUrl } from "@/lib/utils";
import { siteConfig, verifiedTestimonials, teamMembers } from "@/config/site";
import { servicesData, getServiceBySlug } from "@/data/services";
import { portfolioProjects, getProjectBySlug } from "@/data/portfolio";
import { blogArticles, getArticleBySlug, getRelatedArticles } from "@/data/blog";

describe("Rive Digitals — Form Validation & Security", () => {
  it("accepts a valid enquiry payload and sanitizes HTML tags", () => {
    const validPayload = {
      fullName: "  <b>Chidi Nwosu</b>  ",
      email: "CHIDI@EXAMPLE.COM ",
      phone: "+234 803 123 4567",
      company: "Apex Ventures <script>alert(1)</script>",
      service: "website-design-development",
      budget: "growth-scope",
      description:
        "We need a complete corporate website redesign and brand refresh for our upcoming product launch.",
      preferredContact: "email" as const,
      privacyConsent: true,
      website_hp: "",
    };

    const result = enquirySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Chidi Nwosu");
      expect(result.data.email).toBe("chidi@example.com");
      expect(result.data.company).toBe("Apex Ventures alert(1)");
    }
  });

  it("rejects unrecognised service selections", () => {
    const invalidServicePayload = {
      fullName: "Adaobi Okafor",
      email: "adaobi@example.com",
      phone: "",
      company: "Kora Studio",
      service: "unapproved-service-slug",
      budget: "",
      description:
        "Looking for assistance with a service that is not in the allowed list.",
      preferredContact: "email" as const,
      privacyConsent: true,
      website_hp: "",
    };

    const result = enquirySchema.safeParse(invalidServicePayload);
    expect(result.success).toBe(false);
  });

  it("requires a phone number when preferredContact is whatsapp or phone", () => {
    const missingPhonePayload = {
      fullName: "Adaobi Okafor",
      email: "adaobi@example.com",
      phone: "",
      company: "Kora Studio",
      service: ALLOWED_SERVICE_VALUES[0],
      budget: "",
      description:
        "We would like to discuss a brand identity project via WhatsApp.",
      preferredContact: "whatsapp" as const,
      privacyConsent: true,
      website_hp: "",
    };

    const result = enquirySchema.safeParse(missingPhonePayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneErrors = result.error.flatten().fieldErrors.phone;
      expect(phoneErrors?.length).toBeGreaterThan(0);
    }
  });

  it("rejects submissions without privacy consent", () => {
    const noConsentPayload = {
      fullName: "Adaobi Okafor",
      email: "adaobi@example.com",
      phone: "",
      company: "Kora Studio",
      service: ALLOWED_SERVICE_VALUES[0],
      budget: "",
      description:
        "We would like to discuss a brand identity project for our company.",
      preferredContact: "email" as const,
      privacyConsent: false,
      website_hp: "",
    };

    const result = enquirySchema.safeParse(noConsentPayload);
    expect(result.success).toBe(false);
  });

  it("rejects honeypot-filled bot submissions", () => {
    const botPayload = {
      fullName: "Spam Bot",
      email: "bot@example.com",
      phone: "",
      company: "Spam Co",
      service: ALLOWED_SERVICE_VALUES[0],
      budget: "",
      description:
        "Automated spam message that fills every hidden input field on the form.",
      preferredContact: "email" as const,
      privacyConsent: true,
      website_hp: "https://spambot.example",
    };

    const result = enquirySchema.safeParse(botPayload);
    expect(result.success).toBe(false);
  });
});

describe("Rive Digitals — Rate Limiter", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests within the threshold and blocks excess bursts", () => {
    const ip = "203.0.113.42";
    expect(checkRateLimit(ip, 3, 60000).allowed).toBe(true);
    expect(checkRateLimit(ip, 3, 60000).allowed).toBe(true);
    expect(checkRateLimit(ip, 3, 60000).allowed).toBe(true);

    const fourthAttempt = checkRateLimit(ip, 3, 60000);
    expect(fourthAttempt.allowed).toBe(false);
    expect(fourthAttempt.remaining).toBe(0);
    expect(fourthAttempt.retryAfterSeconds).toBeGreaterThan(0);
  });
});

describe("Rive Digitals — Content & Configuration Integrity", () => {
  it("enforces truthful defaults (no fake testimonials or fake team profiles)", () => {
    expect(siteConfig.name).toBe("Rive Digitals");
    expect(siteConfig.logo.src).toBe("/images/logo.jpg");
    expect(siteConfig.features.showTestimonials).toBe(false);
    expect(verifiedTestimonials).toHaveLength(0);
    expect(siteConfig.features.showTeamProfiles).toBe(false);
    expect(teamMembers).toHaveLength(0);
  });

  it("has unique slugs and complete deliverables for all services", () => {
    const slugs = new Set<string>();
    for (const service of servicesData) {
      expect(slugs.has(service.slug)).toBe(false);
      slugs.add(service.slug);
      expect(service.deliverables.length).toBeGreaterThan(0);
      expect(service.workflow?.length ?? 0).toBeGreaterThan(0);
      expect(getServiceBySlug(service.slug)?.id).toBe(service.id);
    }
  });

  it("has unique slugs and accessible alt text for all portfolio projects", () => {
    const slugs = new Set<string>();
    for (const project of portfolioProjects) {
      expect(slugs.has(project.slug)).toBe(false);
      slugs.add(project.slug);
      expect((project.thumbnailAlt || "").length).toBeGreaterThan(10);
      expect(getProjectBySlug(project.slug)?.id).toBe(project.id);
    }
  });

  it("resolves blog articles and related articles accurately", () => {
    for (const article of blogArticles) {
      expect(getArticleBySlug(article.slug)?.id).toBe(article.id);
      const related = getRelatedArticles(article.slug, 2);
      expect(related.every((r) => r.slug !== article.slug)).toBe(true);
    }
  });

  it("sanitizes plain text and handles WhatsApp link generation", () => {
    expect(sanitizePlainText("Hello <iframe>bad</iframe> World")).toBe(
      "Hello bad World"
    );
    // When NEXT_PUBLIC_WHATSAPP_NUMBER is empty by default, buildWhatsAppUrl returns null
    expect(buildWhatsAppUrl()).toBeNull();
  });
});
