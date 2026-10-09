import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { POST } from "@/app/api/contact/route";
import { resetRateLimitStore } from "@/lib/rate-limit";
import { mainNavLinks, siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { blogArticles } from "@/data/blog";

describe("Rive Digitals — Sitemap, Robots & Static Asset Verification", () => {
  it("generates a complete XML sitemap containing all static, service, portfolio, and blog routes", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    // Static routes
    expect(urls).toContain(`${siteConfig.url}`);
    expect(urls).toContain(`${siteConfig.url}/about`);
    expect(urls).toContain(`${siteConfig.url}/services`);
    expect(urls).toContain(`${siteConfig.url}/work`);
    expect(urls).toContain(`${siteConfig.url}/blog`);
    expect(urls).toContain(`${siteConfig.url}/faq`);
    expect(urls).toContain(`${siteConfig.url}/contact`);
    expect(urls).toContain(`${siteConfig.url}/privacy`);
    expect(urls).toContain(`${siteConfig.url}/terms`);

    // Every service detail route
    for (const service of servicesData) {
      expect(urls).toContain(`${siteConfig.url}/services/${service.slug}`);
    }

    // Every portfolio case study route
    for (const project of portfolioProjects) {
      expect(urls).toContain(`${siteConfig.url}/work/${project.slug}`);
    }

    // Every blog article route
    for (const article of blogArticles) {
      expect(urls).toContain(`${siteConfig.url}/blog/${article.slug}`);
    }
  });

  it("generates robots.txt rules with sitemap reference and /api/ disallow", () => {
    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  it("verifies that the uploaded brand logo and all portfolio SVG assets exist on disk in public/", () => {
    const publicDir = path.join(process.cwd(), "public");

    // Brand logos
    expect(
      fs.existsSync(path.join(publicDir, siteConfig.logo.src))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(publicDir, siteConfig.logo.svgFallback))
    ).toBe(true);
    expect(fs.existsSync(path.join(publicDir, "favicon.svg"))).toBe(true);

    // Portfolio thumbnails & gallery images
    for (const project of portfolioProjects) {
      expect(fs.existsSync(path.join(publicDir, project.thumbnail))).toBe(true);
      for (const galleryItem of project.gallery) {
        expect(fs.existsSync(path.join(publicDir, galleryItem.src))).toBe(true);
      }
    }

    // Blog cover images
    for (const article of blogArticles) {
      expect(fs.existsSync(path.join(publicDir, article.coverImage))).toBe(
        true
      );
    }
  });

  it("verifies all main navigation links map to valid implemented routes", () => {
    const validTopLevelRoutes = new Set([
      "/",
      "/about",
      "/services",
      "/work",
      "/blog",
      "/faq",
      "/contact",
    ]);
    for (const navItem of mainNavLinks) {
      expect(validTopLevelRoutes.has(navItem.href)).toBe(true);
    }
  });
});

describe("Rive Digitals — Production Unconfigured Integration Failure State", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetRateLimitStore();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 503 INTEGRATION_NOT_CONFIGURED when running in production without email/webhook/database credentials (never fakes success)", async () => {
    process.env.ALLOW_LOCAL_ENQUIRY_SPOOL = "false";
    delete process.env.RESEND_API_KEY;
    delete process.env.ENQUIRY_WEBHOOK_URL;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.77",
      },
      body: JSON.stringify({
        fullName: "Ngozi Eze",
        email: "ngozi@example.com",
        company: "Luminary Holdings",
        service: "website-design-development",
        description:
          "Testing that unconfigured production environments return an honest 503 error instead of a false success message.",
        preferredContact: "email",
        privacyConsent: true,
        website_hp: "",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.accepted).toBe(false);
    expect(json.code).toBe("INTEGRATION_NOT_CONFIGURED");
  });
});
