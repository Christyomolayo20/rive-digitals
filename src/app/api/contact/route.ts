import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { enquirySchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";

/**
 * POST /api/contact
 * Server-side handler for Rive Digitals project enquiries and quote requests.
 *
 * Security & Integrity Guarantees:
 * 1. Sliding-window rate limiting per IP address.
 * 2. Honeypot anti-bot verification (`website_hp`).
 * 3. Strict server-side Zod validation and plain-text sanitization.
 * 4. Truthful integration delivery:
 *    - Delivers via Resend API if `RESEND_API_KEY` is configured.
 *    - Delivers via Webhook/CRM if `ENQUIRY_WEBHOOK_URL` is configured.
 *    - Persists to Supabase if `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` are configured.
 *    - Spools locally to `.local-enquiries.json` ONLY in non-production / explicit local test mode.
 *    - Never fakes success if production integrations are missing.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Identify client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "anonymous-ip";

    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          accepted: false,
          code: "RATE_LIMITED",
          message: `Too many requests from this network. Please wait ${Math.ceil(
            rateLimit.retryAfterSeconds / 60
          )} minutes or email ${siteConfig.contact.email} directly.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 2. Parse request body safely
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          accepted: false,
          code: "INVALID_JSON",
          message: "Invalid request payload.",
        },
        { status: 400 }
      );
    }

    // 3. Check anti-bot honeypot before full processing
    if (
      rawBody &&
      typeof rawBody === "object" &&
      "website_hp" in rawBody &&
      typeof (rawBody as { website_hp?: unknown }).website_hp === "string" &&
      ((rawBody as { website_hp: string }).website_hp || "").trim().length > 0
    ) {
      return NextResponse.json(
        {
          accepted: false,
          code: "SPAM_REJECTED",
          message: "Submission rejected by automated spam filter.",
        },
        { status: 400 }
      );
    }

    // 4. Validate and sanitize with shared Zod schema
    const parsed = enquirySchema.safeParse(rawBody);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          accepted: false,
          code: "VALIDATION_ERROR",
          message:
            firstIssue?.message ||
            "Please check the highlighted form fields and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const enquiry = parsed.data;
    const referenceId = `RD-${Date.now().toString(36).toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const enquiryRecord = {
      referenceId,
      submittedAt,
      fullName: enquiry.fullName,
      email: enquiry.email,
      phone: enquiry.phone || "Not provided",
      company: enquiry.company,
      service: enquiry.service,
      budget: enquiry.budget || "Not specified",
      description: enquiry.description,
      preferredContact: enquiry.preferredContact,
      privacyConsent: enquiry.privacyConsent,
    };

    const deliveredChannels: string[] = [];

    // 5A. Optional Resend Transactional Email Integration
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL || siteConfig.contact.email;
    const fromEmail =
      process.env.ENQUIRY_FROM_EMAIL ||
      "Rive Digitals Website <onboarding@resend.dev>";

    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: enquiry.email,
          subject: `[New Project Enquiry ${referenceId}] ${enquiry.company} — ${enquiry.service}`,
          text: [
            `New Project Enquiry Received (${referenceId})`,
            `----------------------------------------`,
            `Submitted At: ${submittedAt}`,
            `Name: ${enquiry.fullName}`,
            `Company: ${enquiry.company}`,
            `Email: ${enquiry.email}`,
            `Phone: ${enquiryRecord.phone}`,
            `Preferred Contact: ${enquiry.preferredContact}`,
            `Service of Interest: ${enquiry.service}`,
            `Estimated Scope: ${enquiryRecord.budget}`,
            ``,
            `Project Description:`,
            enquiry.description,
          ].join("\n"),
        }),
      });

      if (emailResponse.ok) {
        deliveredChannels.push("resend_email");
      }
    }

    // 5B. Optional Webhook / CRM Integration
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryRecord),
      });

      if (webhookResponse.ok) {
        deliveredChannels.push("webhook");
      }
    }

    // 5C. Optional Supabase Persistence Integration
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const sbResponse = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          reference_id: referenceId,
          full_name: enquiry.fullName,
          email: enquiry.email,
          phone: enquiry.phone || null,
          company: enquiry.company,
          service: enquiry.service,
          budget: enquiry.budget || null,
          description: enquiry.description,
          preferred_contact: enquiry.preferredContact,
          privacy_consent: enquiry.privacyConsent,
          created_at: submittedAt,
        }),
      });

      if (sbResponse.ok) {
        deliveredChannels.push("supabase");
      }
    }

    // 5D. Local Development / Staging Spool (Only when not in unconfigured production)
    const allowLocalSpool =
      process.env.NODE_ENV !== "production" ||
      process.env.ALLOW_LOCAL_ENQUIRY_SPOOL === "true";

    if (deliveredChannels.length === 0 && allowLocalSpool) {
      try {
        const spoolFile = path.join(process.cwd(), ".local-enquiries.json");
        let existing: unknown[] = [];
        try {
          const rawExisting = await fs.readFile(spoolFile, "utf8");
          const parsedExisting = JSON.parse(rawExisting);
          if (Array.isArray(parsedExisting)) {
            existing = parsedExisting;
          }
        } catch {
          existing = [];
        }
        existing.push(enquiryRecord);
        await fs.writeFile(
          spoolFile,
          JSON.stringify(existing, null, 2),
          "utf8"
        );
        deliveredChannels.push("local_spool");
      } catch {
        // If filesystem is read-only, only count as delivered if an external service succeeded
      }
    }

    // 6. Truthful Verification: Never fake success if no destination accepted the enquiry
    if (deliveredChannels.length === 0) {
      return NextResponse.json(
        {
          accepted: false,
          code: "INTEGRATION_NOT_CONFIGURED",
          message: `The enquiry form mail integration is not yet connected in this production environment. Please send your project details directly to ${siteConfig.contact.email}.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        accepted: true,
        referenceId,
        channels: deliveredChannels,
        message:
          "Thank you for contacting Rive Digitals. Your enquiry has been recorded.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        accepted: false,
        code: "INTERNAL_ERROR",
        message: `An unexpected server error occurred. Please email ${siteConfig.contact.email} directly.`,
      },
      { status: 500 }
    );
  }
}
