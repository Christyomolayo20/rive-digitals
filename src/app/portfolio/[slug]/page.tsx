import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { getPublishedProjects, getProjectBySlug } from "@/lib/cms-store";
import { siteConfig } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";

export const revalidate = 60;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Project Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-coral transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-coral/20 border border-brand-coral/30 px-3.5 py-1 text-xs font-semibold text-brand-coral">
              {project.category}
            </span>
            <span className="rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold text-slate-300">
              {project.clientOrIndustry}
            </span>
            {project.completedYear && (
              <span className="text-xs text-slate-400">
                Year: {project.completedYear}
              </span>
            )}
          </div>

          <h1 className="mt-5 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            {project.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300 max-w-3xl">
            {project.summary}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-brand-navy-elevated border border-brand-navy-border px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.externalUrl && (
            <div className="mt-8">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-3 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
              >
                <span>Visit Live Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Primary Visual Showcase */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-brand-canvas">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-brand-navy border border-slate-200 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.thumbnailAlt || project.title}
              className="w-full h-auto object-cover max-h-[750px]"
            />
          </div>
          {project.disclosureNote && (
            <p className="mt-3 text-xs text-slate-500 italic">
              {project.disclosureNote}
            </p>
          )}
        </div>
      </section>

      {/* Challenge, Solution & Deliverables */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Narrative Columns */}
          <div className="lg:col-span-7 space-y-8">
            {project.brief && (
              <div className="rounded-2xl bg-brand-canvas border border-slate-200 p-7 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  01. The Brief
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                  Project Objective
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {project.brief}
                </p>
              </div>
            )}

            {project.challenge && (
              <div className="rounded-2xl bg-brand-canvas border border-slate-200 p-7 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  02. The Challenge
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                  What Needed to Be Solved
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="rounded-2xl bg-brand-canvas border border-slate-200 p-7 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  03. The Solution
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                  Execution &amp; Architecture
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Deliverables & Scope */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-7 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                <Layers className="h-4 w-4" />
                <span>Scope of Work</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-navy">
                Key Deliverables
              </h3>
              <ul className="mt-5 space-y-3">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.outcomes && project.outcomes.length > 0 && (
              <div className="rounded-2xl bg-brand-navy text-white p-7 sm:p-8 border border-brand-navy-border shadow-card">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-coral">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified Outcomes</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  Key Improvements Delivered
                </h3>
                <div className="mt-5 space-y-4">
                  {project.outcomes.map((outcome) => (
                    <div
                      key={outcome.label}
                      className="rounded-xl bg-brand-navy-elevated border border-brand-navy-border p-4"
                    >
                      <p className="text-sm font-bold text-brand-coral">
                        {outcome.label}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {outcome.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-brand-coral-light border border-brand-coral/30 p-7">
              <h3 className="font-display text-lg font-bold text-brand-navy">
                Interested in a Similar Engagement?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Let us know what you are building and we will prepare a tailored scope for your organisation.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Visuals */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-brand-canvas">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold text-brand-navy mb-8">
              Project Views &amp; Deliverables Gallery
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.gallery.map((item, idx) => (
                <figure
                  key={item.src + idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt || project.title}
                    loading="lazy"
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                  {item.caption && (
                    <figcaption className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
