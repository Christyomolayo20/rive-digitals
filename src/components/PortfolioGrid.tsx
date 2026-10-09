"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FolderSearch } from "lucide-react";
import { ProjectCategory, ProjectItem } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

interface PortfolioGridProps {
  projects: ProjectItem[];
  categories: ProjectCategory[];
}

export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div>
      {/* Accessible Category Filter Controls */}
      <div
        role="toolbar"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2 pb-8"
      >
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          aria-pressed={selectedCategory === "All"}
          className={cn(
            "rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
            selectedCategory === "All"
              ? "bg-brand-navy text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-700 hover:border-brand-navy/40 hover:text-brand-navy"
          )}
        >
          All Work ({projects.length})
        </button>

        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={active}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
                active
                  ? "bg-brand-navy text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-brand-navy/40 hover:text-brand-navy"
              )}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center max-w-xl mx-auto my-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-coral-light text-brand-coral-strong">
            <FolderSearch className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
            No projects in this category yet
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            We are currently preparing case studies for{" "}
            <span className="font-semibold">{selectedCategory}</span>. You can
            view all published projects or request relevant work samples
            directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-elevated"
            >
              Show All Projects
            </button>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-slate-50"
            >
              Request Custom Samples
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
