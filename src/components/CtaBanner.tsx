"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaBanner({
  title = "Ready to Strengthen Your Brand and Digital Presence?",
  subtitle = "Share your project goals with Rive Digitals. We will review your requirements and respond within 1–2 business days with a structured path forward.",
  primaryLabel = siteConfig.cta.primaryLabel,
  primaryHref = siteConfig.cta.primaryHref,
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: CtaBannerProps) {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      aria-label="Project Enquiry Call to Action"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-navy border border-brand-navy-border px-6 py-12 sm:px-12 sm:py-16 lg:px-16 relative shadow-2xl">
        {/* Subtle geometric accent inspired by the Rive Digitals logo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-3xl border-[18px] border-brand-navy-elevated opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-24 bottom-24 h-8 w-8 bg-brand-coral/25"
        />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-coral">
            Start a Conversation
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={primaryHref}
              onClick={() =>
                trackEvent("primary_cta_clicked", { location: "cta_banner" })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_clicked", { location: "cta_banner" })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors hover:border-brand-coral"
              >
                <MessageSquare className="h-4 w-4 text-brand-coral" />
                <span>Chat on WhatsApp</span>
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors hover:border-slate-500"
              >
                <span>{secondaryLabel}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
