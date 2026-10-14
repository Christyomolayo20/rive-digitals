import React from "react";
import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/cms-store";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBanner } from "@/components/CtaBanner";
import { FolderKanban } from "lucide-react";
import { ProjectCategory } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio — Selected Projects, Brand Systems & Web Platforms",
  description:
    "Explore selected digital projects, brand identity systems, and high-performance websites engineered by Rive Digitals.",
  alternates: {
    canonical: "/portfolio",
  },
};

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Brand Identity",
  "Web Design & Development",
  "Digital Strategy & Growth",
  "Content & Campaigns",
];

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();

  return (
    <div>
      {/* Page Hero */}
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
              Bespoke Brand Systems, Web Platforms &amp; Growth Campaigns.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Inspect our recent client engagements across brand identity, full-stack web
              development, and digital strategy. Filter by category below or open any case
              study to explore the brief, challenge, and deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid or Empty State */}
      <section
        aria-label="Portfolio Projects"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-canvas"
      >
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
              <FolderKanban className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                No Published Projects Yet
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Case studies are currently being curated. Check back soon or request our private
                portfolio credentials directly.
              </p>
            </div>
          ) : (
            <PortfolioGrid projects={projects} categories={CATEGORIES} />
          )}
        </div>
      </section>

      <CtaBanner
        title="Planning a Similar Project?"
        subtitle="Share your objectives and timeline—we'll prepare a structured project scope."
      />
    </div>
  );
}
