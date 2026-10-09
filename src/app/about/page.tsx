import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { siteConfig, teamMembers } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — Digital Partner for Brand & Business Growth",
  description:
    "Learn about Rive Digitals—our mission, values, strategic approach, and how we partner with ambitious businesses to build credible brands and high-converting websites.",
  alternates: {
    canonical: "/about",
  },
};

const coreValues = [
  {
    icon: Compass,
    title: "Clarity Before Decoration",
    description:
      "We believe design and technology exist to make your business easier to understand, trust, and buy from—never to obscure your message behind visual noise.",
  },
  {
    icon: ShieldCheck,
    title: "Honest, Disciplined Execution",
    description:
      "We scope work transparently, communicate milestones clearly, and deliver clean code and documented brand assets that your team can rely on long term.",
  },
  {
    icon: Sparkles,
    title: "Craftsmanship Across Every Viewport",
    description:
      "From the geometry of a brand monogram to keyboard focus states and mobile load times, we sweat the foundational details that signal professionalism.",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description:
      "We work alongside founders, marketing leads, and operations teams as an accountable digital partner invested in your commercial outcomes.",
  },
];

const differentiators = [
  {
    heading: "Unified Brand + Engineering Thinking",
    body: "Many agencies either design static brand guidelines without understanding web engineering, or write code without a cohesive visual identity. We bridge both disciplines seamlessly.",
  },
  {
    heading: "Conversion-Centered Architecture",
    body: "Every page we design has a clear hierarchy and next step—guiding prospective buyers from initial discovery to a structured consultation or quote enquiry.",
  },
  {
    heading: "Zero Vendor Lock-In",
    body: "We build with clean, industry-standard frameworks and centralized configuration so routine updates never require rebuilding your site.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              About {siteConfig.name}
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Helping Ambitious Businesses Build Credibility and Grow Online
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story & Mission / Vision */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Our Story &amp; Purpose
            </span>
            <h2 className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Bridging the Gap Between Business Quality and Digital Perception
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              Across industries, many capable businesses deliver exceptional
              products and services offline, yet lose opportunities online
              because their digital presence feels fragmented, slow, or unclear.
              Prospective clients judge credibility in seconds—and an outdated
              website or inconsistent brand identity quietly erodes trust before
              a conversation ever begins.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              <strong>{siteConfig.name}</strong> was established to solve that
              disconnect. By combining brand identity design, conversion-focused
              web engineering, and practical digital strategy, we help startups,
              SMBs, and established organisations present their true value
              clearly and generate qualified client enquiries.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
              >
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-brand-navy text-white p-7 sm:p-8 border border-brand-navy-border shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                Our Mission
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Equipping Businesses With High-Trust Digital Foundations
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                To partner with growth-minded businesses and deliver cohesive
                brand identities, fast and accessible websites, and structured
                digital strategies that turn audience attention into measurable
                commercial relationships.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 sm:p-8 border border-slate-200 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Our Vision
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-navy">
                Setting the Standard for Practical Digital Excellence
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To be the trusted digital growth partner for ambitious
                organisations—recognised for clarity of thought, architectural
                design quality, and dependable technical execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white border-y border-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Principles &amp; Approach
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              The Standards That Guide Every Engagement
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-brand-coral">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-navy">
                    {val.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Differentiates Us */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              What Differentiates Us
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Why Growing Brands Choose {siteConfig.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {differentiators.map((diff) => (
              <div
                key={diff.heading}
                className="rounded-2xl bg-white border border-slate-200 p-7 shadow-card"
              >
                <CheckCircle2 className="h-6 w-6 text-brand-coral-strong mb-4" />
                <h3 className="font-display text-xl font-bold text-brand-navy">
                  {diff.heading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {diff.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditional Team Profiles — Rendered ONLY when real team members are supplied */}
      {siteConfig.features.showTeamProfiles && teamMembers.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Leadership &amp; Team
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
                Meet the Team
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
                >
                  <h3 className="font-display text-lg font-bold text-brand-navy">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-coral-strong mt-1">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Looking for a Dedicated Digital Partner?"
        subtitle="Tell us about your business goals and we will recommend a tailored scope across brand identity, web development, or digital strategy."
      />
    </div>
  );
}
