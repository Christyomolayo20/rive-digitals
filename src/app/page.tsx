import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Target,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { siteConfig, verifiedTestimonials } from "@/config/site";
import { servicesData } from "@/data/services";
import { getFeaturedProjects } from "@/data/portfolio";
import { deliveryProcess } from "@/data/process";
import { faqData } from "@/data/faq";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";

const whyRivePillars = [
  {
    icon: Target,
    title: "Conversion-First Design",
    description:
      "Every layout, headline, and button is structured to turn visitors into qualified client enquiries.",
  },
  {
    icon: Layers,
    title: "Unified Brand & Web",
    description:
      "Visual identity, UI/UX design, and full-stack code delivered seamlessly under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "Easy Admin & Ownership",
    description:
      "Built-in Admin Studio and Supabase integration so you can manage leads and portfolio items effortlessly.",
  },
  {
    icon: Sparkles,
    title: "Fast & Search-Ready",
    description:
      "Engineered for sub-second mobile load times, WCAG accessibility, and technical SEO from day one.",
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const homeFaqs = faqData.filter((item) => item.featuredOnHome).slice(0, 4);

  return (
    <div>
      {/* =====================================================================
       * 1. HERO SECTION — Visual-first split layout with photorealistic studio showcase
       * ===================================================================== */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-brand-navy-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18344a_1px,transparent_1px),linear-gradient(to_bottom,#18344a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_40%,transparent_100%)] opacity-35"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1.5 text-xs font-semibold text-slate-200">
                <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
                <span>Digital Branding, Web &amp; Growth Studio</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                Build a Brand That{" "}
                <span className="text-brand-coral">Commands Trust</span> &amp;
                Wins Clients.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
                {siteConfig.name} designs distinctive brand identities,
                fast conversion-ready websites, and digital growth systems for
                ambitious businesses.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href={siteConfig.cta.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-7 py-4 text-base font-semibold text-white shadow-glow transition-all hover:bg-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
                >
                  <span>{siteConfig.cta.primaryLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={siteConfig.cta.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-7 py-4 text-base font-semibold text-white transition-colors hover:border-slate-500 hover:bg-brand-navy-surface"
                >
                  <span>{siteConfig.cta.secondaryLabel}</span>
                </Link>
              </div>

              {/* Compact Trust Bar */}
              <div className="pt-5 border-t border-brand-navy-border/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Brand Identity Systems
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Full-Stack Web Design
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Digital Growth Strategy
                </span>
              </div>
            </div>

            {/* Right Photorealistic Studio Showcase */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl lg:max-w-none">
                <div className="overflow-hidden rounded-3xl border border-brand-navy-border bg-brand-navy-elevated shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-showcase.jpg"
                    alt="Rive Digitals studio workspace displaying brand identity guidelines and modern responsive web design"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>

                {/* Floating Glass Badge Bottom-Left */}
                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-brand-navy/90 backdrop-blur-xl border border-white/15 p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-navy border border-brand-navy-border overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={siteConfig.logo.src}
                        alt={siteConfig.logo.alt}
                        className="h-full w-full object-cover scale-150"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        End-to-End Digital Execution
                      </p>
                      <p className="text-xs text-slate-300">
                        Identity • Web Architecture • Lead Generation
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact?intent=quote"
                    className="inline-flex items-center gap-1 rounded-xl bg-brand-coral-strong px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-coral shrink-0"
                  >
                    <span>Start Brief</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 2. SELECTED WORK / PORTFOLIO PREVIEW (Visual-First)
       * ===================================================================== */}
      <section
        aria-labelledby="portfolio-preview-heading"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Selected Portfolio
              </span>
              <h2
                id="portfolio-preview-heading"
                className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
              >
                Recent Brand &amp; Web Showcases
              </h2>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-brand-navy px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
            >
              <span>Explore All Work</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 3. SERVICES OVERVIEW SECTION (With Photorealistic Visual Cards)
       * ===================================================================== */}
      <section
        aria-labelledby="services-heading"
        className="bg-white border-y border-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Our Capabilities
              </span>
              <h2
                id="services-heading"
                className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
              >
                Everything Needed to Elevate Your Brand Online
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
            >
              <span>Compare All Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showDeliverablesCount={3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 4. WHY WORK WITH RIVE DIGITALS (Visual Studio Split + 4 Pillars)
       * ===================================================================== */}
      <section
        aria-labelledby="why-rive-heading"
        className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-brand-navy-border shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-studio.jpg"
                  alt="Rive Digitals product designer, strategist, and software engineer collaborating around wireframes"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                  Why Partner With Us
                </span>
                <h2
                  id="why-rive-heading"
                  className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white"
                >
                  Strategy, Design &amp; Engineering Under One Roof
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  We combine senior brand design with full-stack web engineering
                  so your digital presence looks world-class and converts
                  reliably on every device.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                {whyRivePillars.map((pillar) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy border border-brand-navy-border text-brand-coral">
                          <IconComponent className="h-4 w-4" />
                        </span>
                        <h3 className="font-display text-base font-bold text-white">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 5. STREAMLINED 4-STEP DELIVERY PROCESS
       * ===================================================================== */}
      <section
        aria-labelledby="process-heading"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              How We Deliver
            </span>
            <h2
              id="process-heading"
              className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
            >
              Four Simple Steps From Brief to Launch
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((stage) => (
              <div
                key={stage.number}
                className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-navy font-display text-sm font-extrabold text-brand-coral">
                  {stage.number}
                </span>
                <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-brand-navy">
                  {stage.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 6. CONDITIONAL TESTIMONIALS
       * ===================================================================== */}
      {siteConfig.features.showTestimonials &&
        verifiedTestimonials.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-3">
              {verifiedTestimonials.map((item) => (
                <blockquote
                  key={item.id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card"
                >
                  <Quote className="h-6 w-6 text-brand-coral mb-3" />
                  <p className="text-sm text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-4 text-xs font-bold text-brand-navy">
                    {item.authorName} — {item.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

      {/* =====================================================================
       * 7. CONCISE FAQ PREVIEW
       * ===================================================================== */}
      <section
        aria-labelledby="home-faq-heading"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Quick Answers
            </span>
            <h2
              id="home-faq-heading"
              className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={homeFaqs} />

          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-coral-strong"
            >
              <span>View All FAQs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
