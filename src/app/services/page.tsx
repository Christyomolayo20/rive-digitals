import React from "react";
import type { Metadata } from "next";
import { getPublishedServices } from "@/lib/cms-store";
import { deliveryProcess } from "@/data/process";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBanner } from "@/components/CtaBanner";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Digital Services — Branding, Web Development & Growth Strategy",
  description:
    "Explore Rive Digitals' services: Brand Identity & Graphic Design, Website Design & Development, Digital Strategy, Digital Marketing, Content Creation, and Social Media Systems.",
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <div>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-coral/15 blur-[110px]"
        />
        <div className="mx-auto max-w-7xl relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Capabilities &amp; Scopes
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Digital Systems Built to Move Your Business Forward.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Clear deliverables, transparent workflows, and measurable outcomes across brand design, web engineering, and digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        aria-label="All Services"
        className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-brand-canvas"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showDeliverablesCount={3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Compact 4-Stage Process */}
      <section className="bg-white border-t border-slate-200 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Delivery Process
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
              How Every Project Is Delivered
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((stage) => (
              <div
                key={stage.number}
                className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
              >
                <span className="font-display text-2xl font-extrabold text-brand-coral-strong">
                  {stage.number}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-brand-navy">
                  {stage.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need a Tailored Service Scope?"
        subtitle="Tell us your goals and timeline—we'll recommend the right starting point."
      />
    </div>
  );
}
