import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
  AlertTriangle,
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

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-coral transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Services</span>
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy-elevated border border-brand-navy-border text-brand-coral">
                  <ServiceIcon name={service.iconName} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold text-slate-300">
                  {service.category}
                </span>
                <span className="rounded-full bg-brand-coral/20 px-3.5 py-1 text-xs font-semibold text-brand-coral">
                  {service.offeringStatus === "core"
                    ? "Core Capability"
                    : "Configurable Engagement"}
                </span>
              </div>

              <h1 className="mt-6 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {service.title}
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                {service.description}
              </p>

              {service.statusNote && (
                <p className="mt-4 rounded-xl bg-brand-navy-elevated border border-brand-navy-border p-4 text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Scope Note:</strong>{" "}
                  {service.statusNote}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-4 text-base font-semibold text-white hover:border-slate-500 transition-colors"
                >
                  <span>Explore Case Studies</span>
                </Link>
              </div>
            </div>

            {/* Problem Solved Highlight Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-brand-coral font-semibold text-xs uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Business Problem Solved</span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-white font-medium">
                  {service.problemSolved}
                </p>
                <div className="mt-6 pt-5 border-t border-brand-navy-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Tailored Proposal
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Deliverables and timelines are scoped around your specific
                    requirements after an initial discovery review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Ideal Customer */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Key Deliverables */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-7 sm:p-10 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              What Is Included
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Key Project Deliverables
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Every engagement is documented in a written statement of work and
              typically includes the following core outputs:
            </p>

            <ul className="mt-6 space-y-4">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-brand-navy">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal Customer Profile */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-7 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                <Users className="h-4 w-4" />
                <span>Who This Is For</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                Ideal Client Profile
              </h2>
              <ul className="mt-5 space-y-3.5">
                {service.idealCustomer.map((profile) => (
                  <li
                    key={profile}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-coral-strong shrink-0" />
                    <span>{profile}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-navy text-white p-7 sm:p-8 border border-brand-navy-border">
              <h3 className="font-display text-xl font-bold">
                Need a Custom Combination?
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                We frequently pair{" "}
                <strong className="text-white">{service.shortTitle}</strong>{" "}
                with complementary capabilities to ensure a cohesive launch.
              </p>
              <Link
                href={`/contact?service=${service.slug}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-3 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
              >
                <span>Request a Tailored Scope</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Project Workflow */}
      <section className="bg-white border-y border-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Expected Project Workflow
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              How We Deliver {service.shortTitle}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.workflow.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <span className="font-display text-2xl font-extrabold text-brand-coral-strong">
                  {step.stepNumber}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Portfolio Previews */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Proof of Execution
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
                Selected Work Showcases
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-semibold text-brand-navy hover:text-brand-coral-strong"
            >
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Ready to Discuss Your ${service.shortTitle} Project?`}
        subtitle="Send us your project brief and we will get back to you within 1–2 business days with recommended next steps."
        primaryLabel={service.ctaLabel}
        primaryHref={`/contact?service=${service.slug}`}
      />
    </div>
  );
}
