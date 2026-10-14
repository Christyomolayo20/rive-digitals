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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPublishedServices, getPublishedProjects } from "@/lib/cms-store";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { EnquiryForm } from "@/components/EnquiryForm";

export const revalidate = 60; // Automatic ISR revalidation every 60s

const whyChooseUsPillars = [
  {
    icon: Target,
    title: "Conversion-First Architecture",
    description:
      "Every layout, typography scale, and call-to-action is structured around turning visitors into high-intent enquiries.",
  },
  {
    icon: Layers,
    title: "Unified Brand & Web Engineering",
    description:
      "Visual identity, bespoke UI/UX, and full-stack Next.js development delivered in lockstep without fragmented handoffs.",
  },
  {
    icon: Sparkles,
    title: "Sub-Second Speed & Modern UX",
    description:
      "Built for 95+ Core Web Vitals, mobile fluidity, WCAG AA accessibility, and enterprise technical SEO from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Full Code & Asset Ownership",
    description:
      "Zero vendor lock-in. You retain 100% intellectual property, clean Git repository code, and editable Supabase CMS control.",
  },
];

export default async function HomePage() {
  const [allServices, allProjects] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  const featuredServices = allServices.slice(0, 3);
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* =====================================================================
       * 1. HERO SECTION — Striking visual composition, clear headline & CTAs
       * ===================================================================== */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 border-b border-brand-navy-border">
        {/* Subtle geometric grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18344a_1px,transparent_1px),linear-gradient(to_bottom,#18344a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_40%,transparent_100%)] opacity-40"
        />
        {/* Coral atmospheric glow accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-coral/20 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1.5 text-xs font-semibold text-slate-200">
                <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
                <span>Strategic Digital Solutions &amp; Growth Studio</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]">
                Build a Digital Brand That{" "}
                <span className="text-brand-coral">Commands Trust</span> &amp;
                Wins Business.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
                Rive Digitals engineers distinctive brand identities,
                high-performance conversion websites, and strategic digital solutions
                for ambitious companies ready to scale.
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-7 py-4 text-base font-semibold text-white transition-colors hover:border-slate-500 hover:bg-brand-navy-surface"
                >
                  <span>View Portfolio</span>
                </Link>
              </div>

              {/* Trust Accents Bar */}
              <div className="pt-6 border-t border-brand-navy-border/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Custom Brand Systems
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Next.js Web Architecture
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0" />
                  Connected Supabase CMS
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
                        Brand Identity • Web Design • Growth Architecture
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#contact-section"
                    className="inline-flex items-center gap-1 rounded-xl bg-brand-coral-strong px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-coral shrink-0"
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
       * 2. BRIEF INTRODUCTION TO RIVE DIGITALS
       * ===================================================================== */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Who We Are
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
                Bridging Business Quality and Digital Perception
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                Too many businesses lose ideal clients not because their service is
                lacking, but because their digital presence fails to communicate the
                caliber of what they do.
              </p>
              <p>
                At <strong>{siteConfig.name}</strong>, we eliminate that gap. We unite
                senior visual design with modern full-stack web engineering,
                delivering digital assets that look world-class, load instantly, and
                consistently turn visitors into qualified client enquiries.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-coral-strong hover:text-brand-coral"
                >
                  <span>Learn more about our story and working principles</span>
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
                Capabilities
              </span>
              <h2
                id="featured-services-heading"
                className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-navy"
              >
                Core Digital Services
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors shadow-sm"
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
                Recent Digital Projects &amp; Case Studies
              </h2>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-brand-navy px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors shadow-sm"
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
       * 5. SHORT "WHY CHOOSE US" / KEY DIFFERENTIATORS
       * ===================================================================== */}
      <section
        aria-labelledby="why-choose-us-heading"
        className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-brand-navy-border"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-brand-navy-border shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-studio.jpg"
                  alt="Rive Digitals creative design and engineering team collaborating"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                  The Rive Advantage
                </span>
                <h2
                  id="why-choose-us-heading"
                  className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white"
                >
                  Strategic Thinking, Senior Craft &amp; Complete Reliability
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  We don&apos;t use off-the-shelf site builders or bloated themes. We
                  engineer custom digital systems tailored to your business model.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                {whyChooseUsPillars.map((pillar) => {
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
       * 6. CLEAR CTA BANNER FOR PROSPECTIVE CLIENTS
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
              Whether you need a full brand identity overhaul, a bespoke Next.js
              platform, or strategic growth advisory, we&apos;re here to help.
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
       * 7. CONTACT OR ENQUIRY SECTION (Embedded Interactive Form)
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
                  recommended next step within 1–2 business days.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
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

                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
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

                <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
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
