import React from "react";
import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact & Request a Quote — Start Your Project",
  description:
    "Contact Rive Digitals to request a project quote, schedule a consultation, or discuss your brand identity, website development, and digital growth goals.",
  alternates: {
    canonical: "/contact",
  },
};

interface ContactPageProps {
  searchParams?: {
    service?: string;
    intent?: string;
  };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const whatsappUrl = buildWhatsAppUrl();
  const preselectedService = searchParams?.service;

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              Contact &amp; Project Enquiries
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Tell Us About Your Project Goals
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              {siteConfig.contact.responseExpectation}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Contact Channels & Expectations */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  Direct Channels
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Prefer direct email or instant messaging? Reach our team using
                  the verified details below.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-coral">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-0.5 block font-semibold text-brand-navy hover:text-brand-coral-strong break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone (Only linked if actual phone number is configured) */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-coral">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone Consultation
                    </p>
                    {siteConfig.contact.phone ? (
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="mt-0.5 block font-semibold text-brand-navy hover:text-brand-coral-strong"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-slate-700 font-medium">
                        {siteConfig.contact.phoneDisplay}
                      </p>
                    )}
                  </div>
                </div>

                {/* WhatsApp (Rendered as live button when business number is supplied) */}
                {whatsappUrl && (
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Message Us on WhatsApp</span>
                    </a>
                  </div>
                )}

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-navy">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Working Hours
                    </p>
                    <p className="mt-0.5 text-slate-700">
                      {siteConfig.contact.workingHours}
                    </p>
                  </div>
                </div>

                {/* Location Summary */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-navy">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Operations
                    </p>
                    <p className="mt-0.5 text-slate-700">
                      {siteConfig.contact.locationSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-5 border-t border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Official Social Profiles
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-navy transition-colors"
                    >
                      <span>{social.platform}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* What Happens Next Card */}
            <div className="rounded-2xl bg-brand-navy text-white p-6 sm:p-8 border border-brand-navy-border">
              <h3 className="font-display text-lg font-bold text-white">
                What Happens After You Submit?
              </h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0 mt-0.5" />
                  <span>
                    We review your project context and service requirements.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0 mt-0.5" />
                  <span>
                    We reply via your preferred contact method within 1–2
                    business days.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral shrink-0 mt-0.5" />
                  <span>
                    We share a clear scope of work, deliverables list, and
                    proposal before any work begins.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Validated Enquiry Form */}
          <div className="lg:col-span-8">
            <EnquiryForm defaultService={preselectedService} />
          </div>
        </div>
      </section>
    </div>
  );
}
