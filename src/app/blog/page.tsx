import React from "react";
import type { Metadata } from "next";
import { blogArticles, blogCategories } from "@/data/blog";
import { BlogExplorer } from "@/components/BlogExplorer";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Insights & Articles — Brand Strategy, Web Architecture & Growth",
  description:
    "Practical guides and strategic insights from Rive Digitals on brand identity systems, high-converting B2B websites, web performance, and digital marketing.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Insights &amp; Perspectives
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Practical Guides on Brand Identity, Web Architecture &amp; Growth
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
              Actionable thinking for founders, marketing leaders, and growing
              businesses looking to build a stronger digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Searchable & Filterable Articles Section */}
      <section
        aria-label="Blog Articles"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <BlogExplorer
            articles={blogArticles}
            categories={blogCategories}
          />
        </div>
      </section>

      <CtaBanner
        title="Want to Apply These Principles to Your Own Website or Brand?"
        subtitle="Request a consultation with Rive Digitals and let us review your current brand and digital architecture."
      />
    </div>
  );
}
