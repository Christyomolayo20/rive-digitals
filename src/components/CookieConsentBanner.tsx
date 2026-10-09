"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  ConsentChoice,
} from "@/lib/analytics";

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentChoice>("granted");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(getAnalyticsConsent());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ConsentChoice>;
      if (customEvent.detail) {
        setConsent(customEvent.detail);
      }
    };
    window.addEventListener("rive:consent-updated", handleUpdate);
    return () =>
      window.removeEventListener("rive:consent-updated", handleUpdate);
  }, []);

  if (!mounted || !siteConfig.features.enableAnalytics || consent !== "undecided") {
    return null;
  }

  return (
    <aside
      aria-label="Analytics and privacy consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-4 sm:p-5 text-white shadow-2xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 text-xs sm:text-sm text-slate-300">
          <p className="font-semibold text-white">
            Privacy-Conscious Analytics
          </p>
          <p>
            We use optional, privacy-first analytics to understand which pages
            and services are most helpful. We never track personal form text or
            sell visitor data. Read our{" "}
            <Link
              href="/privacy"
              className="text-brand-coral underline underline-offset-2 hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent("declined");
              setConsent("declined");
            }}
            className="rounded-xl border border-brand-navy-border bg-brand-navy px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          >
            Decline Optional
          </button>
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent("granted");
              setConsent("granted");
            }}
            className="rounded-xl bg-brand-coral-strong px-4 py-2 text-xs font-semibold text-white hover:bg-brand-coral transition-colors"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
