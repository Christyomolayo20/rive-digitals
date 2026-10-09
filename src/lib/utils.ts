import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips control characters, HTML tags, and normalizes whitespace
 * to prevent injection in emails, logs, or webhooks.
 */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a readable publication date.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Builds a properly URL-encoded WhatsApp click-to-chat URL if a business WhatsApp number is configured.
 * Returns null if no number is configured so UI components can gracefully fall back to the contact form.
 */
export function buildWhatsAppUrl(customMessage?: string): string | null {
  const rawNumber = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, "");
  if (!rawNumber) {
    return null;
  }
  const message =
    customMessage || siteConfig.contact.whatsappDefaultMessage;
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
}
