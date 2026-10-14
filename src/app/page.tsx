import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Target,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  Compass,
  Code2,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPublishedServices, getPublishedProjects } from "@/lib/cms-store";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { EnquiryForm } from "@/components/EnquiryForm";

export const revalidate = 60; // Automatic ISR revalidation every 60s

const deliveryMethodology = [
  {
    step: "01",
    title: "Discovery & Moat Positioning",
    icon: Compass,
    description:
      "We unpack your business model, target audience psychology, and competitive landscape to establish a clear digital positioning strategy.",
    outcome: "Clear positioning narrative & wireframe roadmap",
  },
  {
    step: "02",
    title: "Brand Systems & Visual Craft",
    icon: Target,
    description:
      "We design bespoke design tokens, custom typography scales, color physics, and high-fidelity interfaces that immediately communicate authority.",
    outcome: "Production-ready Figma system & design tokens",
  },
  {
    step: "03",
    title: "Full-Stack Next.js Engineering",
    icon: Code2,
    description:
      "Engineered with clean Next.js App Router, Tailwind CSS, TypeScript, and Supabase CMS. Zero bloated site builders or third-party theme baggage.",
    outcome: "Sub-second loading & 95+ Core Web Vitals",
  },
  {
    step: "04",
    title: "Conversion Tuning & Handoff",
    icon: Zap,
    description:
      "We optimize forms, instrument privacy-first analytics, verify SEO schema, and hand over 100% intellectual property with full CMS control.",
    outcome: "Turnkey deployment & lead capture readiness",
  },
];

const studioDisciplines = [
  "Visual Identity Systems",
  "High-Conversion Next.js",
  "Brand Positioning",
  "Supabase Headless CMS",
  "Performance UI/UX",
  "Enterprise Technical SEO",
  "Digital Strategy Advisory",
  "Bespoke Interaction Design",
];

const studioBenchmarks = [
  { value: "100%", label: "Bespoke Design & Code", note: "Zero off-the-shelf templates" },
  { value: "< 1.2s", label: "Target Page Speed", note: "Sub-second Core Web Vitals" },
  { value: "0%", label: "Vendor Lock-in", note: "100% Client IP & code ownership" },
  { value: "2–4 Wks", label: "Average Sprint Delivery", note: "Rapid, agile execution" },
];

export default async function HomePage() {
  const [allServices, allProjects] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  const featuredServices = allServices.slice(0, 3);
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="selection:bg-brand-coral selection:text-white">
      {/* =====================================================================
       * 1. HERO SECTION — Striking visual composition, clear headline & CTAs
       * ===================================================================== */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 border-b border-brand-navy-border">
        {/* Subtle geometric grid backdrop & atmospheric showcase image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity filter blur-xs"
          style={{ backgroundImage: "url('/images/hero-showcase.jpg')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18344a_1px,transparent_1px),linear-gradient(to_bottom,#18344a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_40%,transparent_100%)] opacity-35"
        />
        {/* Coral atmospheric glow accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-coral/20 blur-[130px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated/90 border border-brand-coral/30 px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
                <span>Strategic Digital Agency · Lagos &amp; Global Remote</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.85rem] lg:leading-[1.08]">
                Build a Digital Brand That{" "}
                <span className="text-brand-coral italic font-normal">Commands Trust</span> &amp;
                Wins Business.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
                Rive Digitals bridges the gap between senior creative art direction and
                high-performance web engineering. We build distinctive brand systems,
                custom Next.js platforms, and strategic growth engines for companies ready to scale.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="#contact-section"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-7 py-4 text-base font-semibold text-white shadow-glow transition-all hover:bg-brand-coral hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-7 py-4 text-base font-semibold text-white transition-colors hover:border-slate-500 hover:bg-brand-navy-surface shadow-xs"
                >
                  <span>View Selected Work</span>
                </Link>
              </div>

              {/* Trust Accents Bar */}
              <div className="pt-6 border-t border-brand-navy-border/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Bespoke Brand Architecture
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Next.js App Router Engineering
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Dynamic Supabase CMS
                </span>
              </div>
            </div>

            {/* Right Visual Showcase Composition */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                <div className="overflow-hidden rounded-3xl border border-brand-navy-border bg-brand-navy-elevated shadow-2xl transition-transform hover:scale-[1.01] duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero-showcase.jpg"
                    alt="Rive Digitals brand guidelines and modern responsive web development showcase"
                    className="w-full aspect-[16/11] object-cover"
                  />
                </div>

                {/* Floating Glass Metric Card */}
                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-4 sm:right-4 flex items-center justify-between gap-3 rounded-2xl bg-brand-navy/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl">
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
                        Full-Stack Digital Execution
                      </p>
                      <p className="text-xs text-slate-300">
                        Brand Identity • Web Systems • Growth Architecture
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#contact-section"
                    className="inline-flex items-center gap-1 rounded-xl bg-brand-coral-strong px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-coral shrink-0 transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 1B. STUDIO DISCIPLINES STRIP — Flowing capability tags
       * ===================================================================== */}
      <section className="bg-brand-navy-elevated border-b border-brand-navy-border py-4 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-brand-coral bg-brand-navy border border-brand-navy-border px-3 py-1 rounded-full">
              Disciplines
            </span>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 whitespace-nowrap">
              {studioDisciplines.map((item, idx) => (
                <React.Fragment key={item}>
                  <span className="rounded-lg bg-brand-navy/60 border border-brand-navy-border px-3 py-1 text-slate-200 hover:text-white transition-colors">
                    {item}
                  </span>
                  {idx < studioDisciplines.length - 1 && (
                    <span className="text-slate-600">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 2. HUMAN AGENCY MANIFESTO & INTRODUCTION
       * ===================================================================== */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Studio Manifesto
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy leading-tight">
                Bridging Business Quality &amp; Digital Perception
              </h2>
              <div className="pt-2">
                <blockquote className="rounded-2xl border-l-4 border-brand-coral-strong bg-slate-50 p-5 text-sm sm:text-base italic text-brand-navy font-medium leading-relaxed">
                  &ldquo;We don&apos;t build commodity websites. We engineer digital assets with brand gravity — turning quiet competence into unmistakable commercial authority.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base text-slate-600 leading-relaxed">
              <p>
                Too many businesses lose ideal clients not because their service is
                lacking, but because their digital presence fails to communicate the
                caliber of what they do.
              </p>
              <p>
                At <strong>{siteConfig.name}</strong>, we eliminate that gap. We unite
                senior visual art direction with modern full-stack web engineering,
                delivering digital assets that look world-class, load in milliseconds, and
                consistently turn visitors into qualified commercial opportunities.
              </p>
              <p>
                No outsourced developer handoffs. No cookie-cutter WordPress themes. Every project is built from scratch with clean code, scalable architecture, and full client intellectual property ownership.
              </p>
              <div className="pt-3 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-coral-strong hover:text-brand-coral"
                >
                  <span>Read our story &amp; studio principles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 3. FEATURED SERVICES (Dynamic from Supabase/CMS)
       * ===================================================================== */}
      <section
        aria-labelledby="featured-services-heading"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-canvas"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Core Capabilities
              </span>
              <h2
                id="featured-services-heading"
                className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
              >
                Engineered for Measurable Impact
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Every service scope is designed to solve specific commercial friction points — from market perception to conversion friction.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors shadow-xs"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredServices.map((service) => (
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
       * 4. SELECTED PORTFOLIO PROJECTS (Dynamic from Supabase/CMS)
       * ===================================================================== */}
      <section
        aria-labelledby="portfolio-heading"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Featured Work
              </span>
              <h2
                id="portfolio-heading"
                className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
              >
                Recent Client Work &amp; Case Studies
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Real brands, authentic production systems, and measurable commercial results.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-brand-navy px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors shadow-xs"
            >
              <span>View All Portfolio</span>
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
       * 5. THE RIVE PRODUCTION METHODOLOGY — 4 Structured Agency Sprints
       * ===================================================================== */}
      <section
        aria-labelledby="methodology-heading"
        className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-brand-navy-border"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
              How We Work
            </span>
            <h2
              id="methodology-heading"
              className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
              The Rive Production Framework
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              We replace endless feedback loops with clear 4-step agency sprints. Predictable timelines, transparent deliverables, and zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryMethodology.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.step}
                  className="rounded-3xl bg-brand-navy-elevated border border-brand-navy-border p-6 flex flex-col justify-between hover:border-brand-coral/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-brand-coral uppercase tracking-wider">
                        Sprint {m.step}
                      </span>
                      <div className="h-9 w-9 rounded-xl bg-brand-navy border border-brand-navy-border flex items-center justify-center text-brand-coral group-hover:scale-110 transition-transform">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-brand-navy-border/80">
                    <p className="text-[11px] font-semibold text-brand-coral">
                      Deliverable:
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {m.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 6. STUDIO BENCHMARKS & PROOF BAR
       * ===================================================================== */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {studioBenchmarks.map((b) => (
              <div key={b.label} className="text-center sm:text-left p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
                  {b.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-bold text-brand-navy">
                  {b.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {b.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 7. CLEAR CTA BANNER FOR PROSPECTIVE CLIENTS
       * ===================================================================== */}
      <section className="bg-brand-canvas py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-5xl rounded-3xl bg-brand-coral-strong text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              Ready to Upgrade Your Digital Presence?
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-white">
              Let&apos;s Build Something Memorable Together.
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-white/90 leading-relaxed">
              Whether you need a complete brand identity overhaul, a bespoke Next.js
              platform, or strategic growth advisory, we&apos;re here to partner with you.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#contact-section"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm sm:text-base font-bold text-brand-navy shadow-md hover:bg-slate-100 transition-colors"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4 text-brand-coral-strong" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 8. CONTACT OR ENQUIRY SECTION (Embedded Interactive Form)
       * ===================================================================== */}
      <section
        id="contact-section"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-canvas"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Contact Details & Reassurance */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  Get in Touch
                </span>
                <h2
                  id="contact-heading"
                  className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
                >
                  Tell Us About Your Project
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Fill out the project enquiry form and our team will review your
                  requirements. We respond with clarifying questions or a
                  recommended next step within 24–48 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors">
                  <Mail className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm font-semibold text-brand-navy hover:text-brand-coral-strong underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors">
                  <Phone className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-navy hover:text-brand-coral-strong underline"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors">
                  <Clock className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Studio Hours
                    </p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {siteConfig.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Container */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
