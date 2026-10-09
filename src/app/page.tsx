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
    title: "Built Around Commercial Clarity",
    description:
      "We do not build decorative pages in isolation. Every brand system, page hierarchy, and call-to-action is structured to help prospective buyers understand your value and get in touch.",
  },
  {
    icon: Layers,
    title: "Cohesive Brand & Technical Execution",
    description:
      "Because we handle visual identity, UI/UX architecture, and full-stack implementation under one roof, nothing gets lost in translation between design mockups and production code.",
  },
  {
    icon: ShieldCheck,
    title: "Maintainable, Ownership-First Delivery",
    description:
      "Your website and brand assets are structured with clean configuration and documentation so your team can update services, case studies, and insights without rebuilding from scratch.",
  },
  {
    icon: Sparkles,
    title: "Performance, Accessibility & SEO by Default",
    description:
      "We engineer for fast mobile load times, semantic HTML, WCAG-conscious contrast, and structured search metadata from day one—not as an expensive post-launch add-on.",
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const homeFaqs = faqData.filter((item) => item.featuredOnHome);

  return (
    <div>
      {/* =====================================================================
       * 1. HERO SECTION — Immediate value proposition, target audience & CTAs
       * ===================================================================== */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 border-b border-brand-navy-border">
        {/* Subtle architectural grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18344a_1px,transparent_1px),linear-gradient(to_bottom,#18344a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_40%,transparent_100%)] opacity-35"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200">
                <span className="h-2 w-2 rounded-full bg-brand-coral" />
                <span>Digital Partner for Ambitious Businesses</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Strengthen Your Brand.{" "}
                <span className="text-brand-coral">Convert More Visitors</span>{" "}
                Into Clients.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-2xl">
                {siteConfig.name} helps startups, growing SMBs, and established
                organisations build distinctive brand identities, fast
                conversion-ready websites, and structured digital growth
                systems.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={siteConfig.cta.primaryHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-7 py-4 text-base font-semibold text-white shadow-glow transition-all hover:bg-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  <span>{siteConfig.cta.primaryLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={siteConfig.cta.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-7 py-4 text-base font-semibold text-white transition-colors hover:border-slate-500 hover:bg-brand-navy-surface"
                >
                  <span>{siteConfig.cta.secondaryLabel}</span>
                </Link>
              </div>

              {/* Audience & Capability Pillars */}
              <div className="pt-6 border-t border-brand-navy-border/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  <span>Brand Identity &amp; Design Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  <span>Full-Stack Web Design &amp; Dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  <span>Digital Strategy &amp; Acquisition</span>
                </div>
              </div>
            </div>

            {/* Hero Architectural Showcase Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-brand-navy-elevated border border-brand-navy-border p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-brand-navy-border pb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-brand-navy border border-brand-navy-border overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={siteConfig.logo.src}
                        alt={siteConfig.logo.alt}
                        className="h-full w-full object-cover scale-150"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Rive Growth Framework
                      </p>
                      <p className="text-xs text-slate-400">
                        End-to-End Digital Architecture
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-coral/15 border border-brand-coral/30 px-3 py-1 text-xs font-semibold text-brand-coral">
                    Tailored Scope
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-brand-navy p-4 border border-brand-navy-border">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>01. VISUAL AUTHORITY</span>
                      <span className="text-brand-coral">Identity &amp; Tokens</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Distinctive logo systems, colour architecture, and
                      consistent brand guidelines.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-brand-navy p-4 border border-brand-navy-border">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>02. CONVERSION PLATFORM</span>
                      <span className="text-emerald-400">Web &amp; UX</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Mobile-first, fast-loading websites engineered to capture
                      qualified client enquiries.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-brand-navy p-4 border border-brand-navy-border">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>03. MARKET REACH</span>
                      <span className="text-brand-coral">Strategy &amp; Content</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Search-friendly content hubs, targeted campaigns, and
                      transparent conversion tracking.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-brand-navy-border flex items-center justify-between text-xs text-slate-400">
                  <span>Need a custom project scope?</span>
                  <Link
                    href="/contact"
                    className="font-semibold text-brand-coral hover:underline inline-flex items-center gap-1"
                  >
                    Start your brief
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 2. SERVICES OVERVIEW SECTION
       * ===================================================================== */}
      <section
        aria-labelledby="services-heading"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Capabilities &amp; Solutions
              </span>
              <h2
                id="services-heading"
                className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Digital Services Structured Around Business Outcomes
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Whether you need a complete brand identity from the ground up, a
                high-converting website redesign, or ongoing digital growth
                support, our capabilities scale to fit your stage.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
            >
              <span>Explore All Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showDeliverablesCount={3}
              />
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-500 max-w-3xl mx-auto">
            {siteConfig.serviceConfirmationNotice}
          </p>
        </div>
      </section>

      {/* =====================================================================
       * 3. WHY WORK WITH RIVE DIGITALS
       * ===================================================================== */}
      <section
        aria-labelledby="why-rive-heading"
        className="bg-brand-navy text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-brand-navy-border"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
              Why Rive Digitals
            </span>
            <h2
              id="why-rive-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              A Practical Digital Partner Focused on Credibility and Growth
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We bridge the gap between strategic brand thinking and disciplined
              software engineering—giving growing businesses the digital
              authority of an enterprise team without unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyRivePillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy border border-brand-navy-border text-brand-coral">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 4. SELECTED PROJECTS / PORTFOLIO PREVIEW
       * ===================================================================== */}
      <section
        aria-labelledby="portfolio-preview-heading"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Selected Work &amp; Architecture
              </span>
              <h2
                id="portfolio-preview-heading"
                className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
              >
                Explore How We Structure Brands and Digital Platforms
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Inspect our case studies covering visual identity systems,
                high-converting B2B websites, and multi-channel campaign
                architecture.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 5. TRANSPARENT DELIVERY PROCESS SECTION
       * ===================================================================== */}
      <section
        aria-labelledby="process-heading"
        className="bg-white border-y border-slate-200 py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              How We Work
            </span>
            <h2
              id="process-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
            >
              A Transparent, Milestone-Driven Delivery Process
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every engagement follows four structured stages so your team
              always knows what is happening, what inputs are needed, and what
              deliverables come next.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((stage) => (
              <div
                key={stage.number}
                className="flex flex-col justify-between rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold text-brand-coral-strong">
                      {stage.number}
                    </span>
                    <span className="h-px flex-1 bg-slate-200 ml-4" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Key Outputs
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {stage.keyOutputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-coral-strong shrink-0 mt-0.5" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 6. CONDITIONAL CLIENT TESTIMONIALS SECTION
       * Rendered ONLY when genuine verified testimonials are configured
       * ===================================================================== */}
      {siteConfig.features.showTestimonials &&
        verifiedTestimonials.length > 0 && (
          <section
            aria-labelledby="testimonials-heading"
            className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-2xl mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  Client Feedback
                </span>
                <h2
                  id="testimonials-heading"
                  className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
                >
                  What Our Partners Say
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {verifiedTestimonials.map((item) => (
                  <blockquote
                    key={item.id}
                    className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card"
                  >
                    <Quote className="h-6 w-6 text-brand-coral mb-4" />
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-sm font-bold text-brand-navy">
                        {item.authorName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.authorRole}, {item.company}
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* =====================================================================
       * 7. FREQUENTLY ASKED QUESTIONS PREVIEW
       * ===================================================================== */}
      <section
        aria-labelledby="home-faq-heading"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Common Questions
            </span>
            <h2
              id="home-faq-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Clear answers about our services, onboarding workflow, project
              scoping, and working arrangements.
            </p>
          </div>

          <FaqAccordion items={homeFaqs} />

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-coral-strong transition-colors"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 8. FINAL ENQUIRY CTA
       * ===================================================================== */}
      <CtaBanner />
    </div>
  );
}
