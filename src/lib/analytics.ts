"use client";

import { siteConfig } from "@/config/site";

export type AnalyticsEventName =
  | "contact_form_submitted"
  | "quote_request_initiated"
  | "whatsapp_clicked"
  | "email_clicked"
  | "portfolio_project_viewed"
  | "service_page_viewed"
  | "primary_cta_clicked";

export type ConsentChoice = "granted" | "declined" | "undecided";

const CONSENT_STORAGE_KEY = "rive_digitals_analytics_consent";

export function getAnalyticsConsent(): ConsentChoice {
  if (typeof window === "undefined") {
    return "undecided";
  }
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "granted" || stored === "declined") {
      return stored;
    }
    return "undecided";
  } catch {
    return "undecided";
  }
}

export function setAnalyticsConsent(choice: "granted" | "declined"): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(
      new CustomEvent("rive:consent-updated", { detail: choice })
    );
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
}

/**
 * Dispatches privacy-conscious conversion events ONLY when analytics is enabled
 * and the visitor has granted consent. Never includes personal data (names, emails, messages).
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  metadata?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !siteConfig.features.enableAnalytics) {
    return;
  }

  const consent = getAnalyticsConsent();
  if (consent !== "granted") {
    return;
  }

  // Safe non-PII payload
  const safeProps = metadata ? { ...metadata } : {};

  // 1. Plausible Analytics integration (if configured)
  const win = window as unknown as {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  };

  if (typeof win.plausible === "function") {
    win.plausible(eventName, { props: safeProps });
  }

  // 2. Google Analytics 4 gtag integration (if configured)
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, safeProps);
  }
}
