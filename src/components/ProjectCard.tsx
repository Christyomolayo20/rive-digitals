import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-slate-300">
      {/* Visual Header with Hover Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={project.thumbnailAlt || project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Pill Overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full bg-brand-navy/85 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-xs">
            {project.category}
          </span>
        </div>

        {/* Hover Arrow Badge */}
        <div className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-brand-navy shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-coral group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-coral-strong">
            {project.clientOrIndustry}
          </p>

          <h3 className="mt-1.5 font-display text-xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
            <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
          {(project.tags || []).slice(0, 3).map((tag) => (
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
