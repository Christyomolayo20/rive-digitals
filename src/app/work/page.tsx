import React from "react";
import type { Metadata } from "next";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio & Selected Work — Brand Systems, Websites & Growth",
  description:
    "Explore selected projects and architectural case studies by Rive Digitals across Brand Identity, Website Design & Development, Digital Strategy, and Content Campaigns.",
  alternates: {
    canonical: "/work",
  },
};

export default function PortfolioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Portfolio &amp; Case Studies
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Selected Projects &amp; Digital Architecture
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
              Inspect how we approach brand identity systems, high-converting
              corporate websites, and multi-channel campaign platforms. Filter
              by discipline below or open any case study to review the brief,
              challenge, solution, and deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Filterable Portfolio Grid */}
      <section
        aria-label="Portfolio Projects"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid
            projects={portfolioProjects}
            categories={portfolioCategories}
          />
        </div>
      </section>

      <CtaBanner
        title="Planning a Similar Brand or Website Project?"
        subtitle="Tell us about your objectives and timeline. We will walk you through relevant deliverables and prepare a structured scope."
      />
    </div>
  );
}
