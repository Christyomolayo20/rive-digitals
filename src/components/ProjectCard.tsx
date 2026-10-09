"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { ProjectItem } from "@/types";
import { trackEvent } from "@/lib/analytics";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-brand-coral/40">
      <Link
        href={`/work/${project.slug}`}
        onClick={() =>
          trackEvent("portfolio_project_viewed", { project: project.slug })
        }
        className="relative block aspect-[3/2] w-full overflow-hidden bg-brand-navy focus-visible:outline-none"
      >
        {!imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-brand-navy p-6 text-center text-slate-300">
            <Layers className="h-10 w-10 text-brand-coral mb-2" />
            <span className="text-sm font-semibold text-white">
              {project.title}
            </span>
            <span className="text-xs text-slate-400 mt-1">
              {project.category}
            </span>
          </div>
        )}

        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="rounded-full bg-brand-navy/90 backdrop-blur-sm border border-brand-navy-border px-3 py-1 text-xs font-semibold text-white">
            {project.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-coral-strong">
            {project.clientOrIndustry}
          </p>

          <h3 className="mt-2 font-display text-xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            onClick={() =>
              trackEvent("portfolio_project_viewed", { project: project.slug })
            }
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:text-brand-coral-strong transition-colors"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
