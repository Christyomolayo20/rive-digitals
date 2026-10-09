import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { deliveryProcess } from "@/data/process";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Digital Services — Branding, Web Development & Growth Strategy",
  description:
    "Explore Rive Digitals' services: Brand Identity & Graphic Design, Website Design & Development, Digital Strategy, Digital Marketing, Content Creation, and Social Media Systems.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Services &amp; Capabilities
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Practical Digital Solutions Built to Move Your Business Forward
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
              Each capability is structured around clear deliverables, defined
              problem-solving, and a transparent workflow. Select any service
              below to inspect the full scope and delivery process, or request a
              custom quote.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        aria-label="All Services"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-brand-navy">
                How Our Service Scopes Work
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                {siteConfig.serviceConfirmationNotice}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
              <span className="rounded-full bg-brand-navy/5 px-3 py-1.5 text-brand-navy">
                Core Capability
              </span>
              <span className="rounded-full bg-brand-coral-light px-3 py-1.5 text-brand-coral-strong">
                Configurable Scope
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showDeliverablesCount={5}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Engagements Are Delivered */}
      <section className="bg-white border-t border-slate-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Engagement Framework
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              What to Expect When Working With Us
            </h2>
            <p className="mt-3 text-base text-slate-600">
              We do not publish generic price tags or unrealistic instant
              delivery promises. Instead, every project is scoped accurately
              against four clear stages.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((stage) => (
              <div
                key={stage.number}
                className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <span className="font-display text-2xl font-extrabold text-brand-coral-strong">
                  {stage.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not Sure Which Service Scope Fits Your Goals?"
        subtitle="Share a brief overview of where your business is today and what you want to achieve. We will recommend the right starting point."
      />
    </div>
  );
}
