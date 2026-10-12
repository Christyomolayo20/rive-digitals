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
import { portfolioProjects } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBanner } from "@/components/CtaBanner";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({
  params,
}: ServiceDetailPageProps): Metadata {
  const service = getServiceBySlug(params.slug);
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

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = portfolioProjects.slice(0, 2);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.category,
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Visual Split Hero */}
      <section className="bg-brand-navy text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-coral transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Services</span>
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy-elevated border border-brand-navy-border text-brand-coral">
                  <ServiceIcon name={service.iconName} className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3 py-1 text-xs font-semibold text-slate-300">
                  {service.category}
                </span>
                <span className="rounded-full bg-brand-coral/20 px-3 py-1 text-xs font-semibold text-brand-coral">
                  {service.offeringStatus === "core"
                    ? "Core Capability"
                    : "Custom Scope"}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                {service.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:border-slate-500 transition-colors"
                >
                  <span>View Related Work</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-brand-navy-border shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Ideal Customer */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Included Deliverables
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-extrabold text-brand-navy">
              What You Receive
            </h2>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-4 border border-slate-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                <Users className="h-4 w-4" />
                <span>Ideal For</span>
              </div>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-brand-navy">
                Who This Service Helps
              </h2>
              <ul className="mt-5 space-y-3">
                {service.idealCustomer.map((profile) => (
                  <li
                    key={profile}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-coral-strong shrink-0" />
                    <span>{profile}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-canvas p-4 border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Problem Solved
              </p>
              <p className="mt-1 text-xs sm:text-sm text-brand-navy font-medium">
                {service.problemSolved}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Workflow */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy mb-8">
            Delivery Workflow
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.workflow.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <span className="font-display text-xl font-extrabold text-brand-coral-strong">
                  {step.stepNumber}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Portfolio Previews */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl font-extrabold text-brand-navy">
              Related Work
            </h2>
            <Link
              href="/work"
              className="text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-coral-strong"
            >
              All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        primaryLabel={service.ctaLabel}
        primaryHref={`/contact?service=${service.slug}`}
      />
    </div>
  );
}
