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
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-coral/40">
      <div>
        {/* Visual Header Image */}
        <Link
          href={`/services/${service.slug}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-brand-navy"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />

          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/90 backdrop-blur-md border border-white/15 text-brand-coral shadow-sm">
              <ServiceIcon name={service.iconName} className="h-5 w-5" />
            </span>

            <span
              className={
                service.offeringStatus === "core"
                  ? "rounded-full bg-brand-navy/90 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-white"
                  : "rounded-full bg-brand-coral-strong/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white"
              }
            >
              {service.offeringStatus === "core"
                ? "Core Service"
                : "Custom Scope"}
            </span>
          </div>
        </Link>

        {/* Card Copy */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
            <Link href={`/services/${service.slug}`} className="focus:outline-none">
              {service.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {service.summary}
          </p>

          {showDeliverablesCount > 0 && (
            <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              {service.deliverables
                .slice(0, showDeliverablesCount)
                .map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-3">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-coral-strong transition-colors"
        >
          <span>Explore Scope</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href={`/contact?service=${service.slug}`}
          className="inline-flex items-center rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-brand-navy hover:bg-brand-coral-strong hover:text-white transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </article>
  );
}
