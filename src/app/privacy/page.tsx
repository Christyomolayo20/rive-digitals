import React from "react";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy and data handling notice for ${siteConfig.name}.`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
              Legal &amp; Data Protection
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Effective Date: October 2026 • Entity: {siteConfig.legalName}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              1. Overview
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
              &ldquo;us&rdquo;) respects your privacy and is committed to
              protecting the personal and business information you share with us
              through our website ({siteConfig.url}). This Privacy Policy
              explains what information we collect, why we collect it, and how
              it is handled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              2. Information We Collect
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              We collect only the information necessary to respond to your
              enquiries, provide project quotes, and improve our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Enquiry &amp; Quote Information:</strong> Full name,
                email address, phone/WhatsApp number (when provided), company
                name, selected service of interest, estimated scope, and project
                description submitted via our contact form.
              </li>
              <li>
                <strong>Direct Communications:</strong> Records of
                correspondence when you contact us via email (
                {siteConfig.contact.email}) or WhatsApp.
              </li>
              <li>
                <strong>Consent-Gated Analytics:</strong> Aggregate,
                non-identifying interaction events (such as page views or CTA
                clicks) collected only if you grant optional analytics consent.
                We never include personal form text in analytics payloads.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                To review your project brief, respond to your questions, and
                prepare requested proposals or quotes.
              </li>
              <li>
                To communicate with you using your preferred contact method
                (Email, Phone, or WhatsApp).
              </li>
              <li>
                To protect our website and forms against automated spam, abuse,
                and unauthorized access (including temporary IP rate limiting).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              4. Data Sharing &amp; Service Providers
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              We do not sell, rent, or trade your personal information. Your
              enquiry data is processed only through trusted infrastructure
              providers strictly as needed to operate our business (such as
              transactional email delivery or secure cloud hosting) under
              confidentiality obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-brand-navy">
              5. Data Retention &amp; Your Rights
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              We retain enquiry records only as long as reasonably required to
              address your request, maintain business records, or fulfil a
              resulting client agreement. You may request access to, correction
              of, or deletion of your personal data at any time by contacting us
              at{" "}
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
