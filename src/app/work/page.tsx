import React from "react";
import type { Metadata } from "next";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio & Selected Work — Brand Systems, Websites & Growth",
  description:
    "Explore selected projects and case studies by Rive Digitals across Brand Identity, Website Design & Development, Digital Strategy, and Content Campaigns.",
  alternates: {
    canonical: "/work",
  },
};

export default function PortfolioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-coral/15 blur-[110px]"
        />
        <div className="mx-auto max-w-7xl relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Selected Work
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Brand Systems, Web Platforms &amp; Growth Campaigns.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Filter by discipline or open any project below to inspect the brief, visual execution, and key deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Filterable Portfolio Grid */}
      <section
        aria-label="Portfolio Projects"
        className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid
            projects={portfolioProjects}
            categories={portfolioCategories}
          />
        </div>
      </section>

      <CtaBanner
        title="Planning a Similar Brand or Website Launch?"
        subtitle="Share your objectives and timeline—we'll prepare a structured project scope."
      />
    </div>
  );
}
