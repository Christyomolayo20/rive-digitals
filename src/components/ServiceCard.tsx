import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceItem } from "@/types";
import { ServiceIcon } from "@/components/ServiceIcon";

interface ServiceCardProps {
  service: ServiceItem;
  showDeliverablesCount?: number;
}

export function ServiceCard({
  service,
  showDeliverablesCount = 3,
}: ServiceCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-brand-coral/40">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-coral shadow-sm group-hover:bg-brand-coral-strong group-hover:text-white transition-colors">
            <ServiceIcon name={service.iconName} className="h-6 w-6" />
          </span>

          <span
            className={
              service.offeringStatus === "core"
                ? "inline-flex items-center rounded-full bg-brand-navy/5 px-3 py-1 text-xs font-semibold text-brand-navy"
                : "inline-flex items-center rounded-full bg-brand-coral-light px-3 py-1 text-xs font-semibold text-brand-coral-strong"
            }
          >
            {service.offeringStatus === "core"
              ? "Core Capability"
              : "Configurable Scope"}
          </span>
        </div>

        <h3 className="mt-6 font-display text-xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
          <Link href={`/services/${service.slug}`} className="focus:outline-none">
            {service.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {service.summary}
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Problem Solved
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">
            {service.problemSolved}
          </p>
        </div>

        {showDeliverablesCount > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Key Deliverables
            </p>
            <ul className="mt-2.5 space-y-2">
              {service.deliverables
                .slice(0, showDeliverablesCount)
                .map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-coral-strong transition-colors"
        >
          <span>Service Details</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href={`/contact?service=${service.slug}`}
          className="inline-flex items-center rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
        >
          Request Quote
        </Link>
      </div>
    </article>
  );
}
