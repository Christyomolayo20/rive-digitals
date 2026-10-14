import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import { servicesData, getServiceBySlug } from "@/data/services";
import { getPublishedServices, getPublishedProjects } from "@/lib/cms-store";
import { siteConfig } from "@/config/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBanner } from "@/components/CtaBanner";

export const revalidate = 60;

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const allServices = await getPublishedServices();
  const service = allServices.find((s) => s.slug === params.slug) || getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} — Digital Services`,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
      url: `${siteConfig.url}/services/${service.slug}`,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [allServices, allProjects] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  const service = allServices.find((s) => s.slug === params.slug) || getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects.slice(0, 2);

  return (
    <div>
      {/* Service Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-coral transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Capabilities</span>
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-brand-coral/20 border border-brand-coral/30 px-3.5 py-1 text-xs font-semibold text-brand-coral">
                  {service.category}
                </span>
                <span className="rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold text-slate-300">
                  {service.offeringStatus === "core" ? "Core Capability" : "Configurable Scope"}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
                {service.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.slug)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-coral transition-colors shadow-glow"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm font-semibold text-white hover:border-slate-500 transition-colors"
                >
                  <span>Related Case Studies</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-brand-navy-border bg-brand-navy-elevated shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope, Deliverables & Problem Solved */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-canvas">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-8">
            {service.problemSolved && (
              <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                  Business Problem
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                  What This Service Solves
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  {service.problemSolved}
                </p>
              </div>
            )}

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Scope &amp; Artifacts
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                Key Deliverables
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl bg-brand-canvas p-3.5 text-sm text-slate-800 border border-slate-200/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-brand-navy text-white p-8 border border-brand-navy-border shadow-card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy-elevated text-brand-coral">
                  <Users className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Ideal Engagement For
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {(service.idealCustomer || [
                  "High-growth startups preparing for market launch",
                  "Established SMBs scaling customer acquisition",
                  "Service firms upgrading brand perception",
                ]).map((cust) => (
                  <li key={cust} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0 mt-0.5" />
                    <span>{cust}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-brand-coral-light border border-brand-coral/30 p-8">
              <h3 className="font-display text-xl font-bold text-brand-navy">
                Ready to Request a Quote?
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                We review every brief personally and recommend a tailored scope within 1–2 business days.
              </p>
              <Link
                href={`/contact?service=${encodeURIComponent(service.slug)}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Portfolio Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-brand-navy">
                Related Showcases
              </h2>
              <Link
                href="/portfolio"
                className="text-xs sm:text-sm font-semibold text-brand-coral-strong hover:underline inline-flex items-center gap-1"
              >
                <span>All Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
