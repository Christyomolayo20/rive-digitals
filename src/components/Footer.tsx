"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { siteConfig, mainNavLinks } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/BrandLogo";
import { trackEvent, setAnalyticsConsent } from "@/lib/analytics";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.6a6.34 6.34 0 0 0 10.74 4.54V11.8a8.31 8.31 0 0 0 5.71 1.93v-3.52a4.88 4.88 0 0 1-3.14-1.28A4.83 4.83 0 0 1 19.59 6.7z" />
    </svg>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <Facebook className="h-4 w-4 text-brand-coral shrink-0" />;
    case "instagram":
      return <Instagram className="h-4 w-4 text-brand-coral shrink-0" />;
    case "tiktok":
      return <TikTokIcon className="h-4 w-4 text-brand-coral shrink-0" />;
    default:
      return null;
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-brand-navy text-slate-300 border-t border-brand-navy-border"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Contact Info */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <BrandLogo variant="dark" size="lg" showTagline />
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              We help ambitious businesses build distinctive brand identities,
              high-converting websites, and scalable digital growth systems.
            </p>

            <div className="space-y-2.5 pt-1 text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Mail className="h-4 w-4 text-brand-coral shrink-0 mt-1" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  onClick={() =>
                    trackEvent("email_clicked", { location: "footer" })
                  }
                  className="hover:text-white underline-offset-4 hover:underline break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-brand-coral shrink-0 mt-1" />
                <span>{siteConfig.contact.locationSummary}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <Clock className="h-4 w-4 text-brand-coral shrink-0 mt-1" />
                <span>{siteConfig.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect & Consultation */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Social Channels
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {siteConfig.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                    >
                      {getSocialIcon(social.platform)}
                      <span>{social.platform}</span>
                      <span className="text-xs text-slate-500 group-hover:text-slate-400">
                        ({social.handle})
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-brand-coral transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-4">
              <p className="text-xs font-semibold text-white">
                Start Your Project
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Receive a tailored proposal within 1–2 business days.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-coral hover:underline"
              >
                Let&apos;s Work Together →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 border-t border-brand-navy-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
            {siteConfig.features.enableAnalytics && (
              <button
                type="button"
                onClick={() => {
                  setAnalyticsConsent("declined");
                  window.localStorage.removeItem(
                    "rive_digitals_analytics_consent"
                  );
                  window.location.reload();
                }}
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                Privacy Preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
