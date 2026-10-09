import React from "react";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Website Terms of Use and general engagement conditions for ${siteConfig.name}.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Legal Review Notice Banner */}
        <div className="mb-10 flex items-start gap-3.5 rounded-2xl bg-amber-50 border border-amber-300 p-5 text-xs sm:text-sm text-amber-950">
          <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <p>{siteConfig.legalReviewNotice}</p>
        </div>

        <article className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-12 shadow-card space-y-8 text-slate-700">
          <header className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              Legal &amp; Governance
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Effective Date: October 2026 • Entity: {siteConfig.legalName}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              1. Acceptance of Website Terms
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              By accessing and using the {siteConfig.name} website (
              {siteConfig.url}), you agree to comply with these Terms of
              Service. If you do not agree with any part of these terms, please
              discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              2. Project Scopes &amp; Client Agreements
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Information published on this website—including service
              descriptions, workflow summaries, and portfolio case studies—is
              provided for general informational purposes and does not
              constitute a binding commercial offer. All client engagements,
              deliverables, fees, revision rounds, and intellectual property
              transfers are governed by a separate written Statement of Work or
              Master Services Agreement signed by both parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              3. Intellectual Property
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Unless otherwise stated, the branding, logo mark, text, visual
              assets, and code structure of this website are the intellectual
              property of {siteConfig.legalName} and may not be reproduced or
              redistributed without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              4. Acceptable Use
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Visitors must not submit automated spam, malicious payloads, or
              untruthful enquiries through our forms, nor attempt to disrupt the
              availability or security of the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              5. Contact Information
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Questions regarding these Terms of Service may be directed to{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-brand-navy underline"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
