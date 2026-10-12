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
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-coral/40">
      <Link
        href={`/work/${project.slug}`}
        onClick={() =>
          trackEvent("portfolio_project_viewed", { project: project.slug })
        }
        className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-navy focus-visible:outline-none"
      >
        {!imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-brand-navy p-6 text-center text-slate-300">
            <Layers className="h-10 w-10 text-brand-coral mb-2" />
            <span className="text-sm font-semibold text-white">
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-navy/90 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-white">
            {project.category}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-sm transition-transform duration-300 group-hover:bg-brand-coral-strong group-hover:text-white group-hover:scale-105">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-coral-strong">
            {project.clientOrIndustry}
          </p>

          <h3 className="mt-1.5 font-display text-xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
