import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { enquirySchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";
import { getSupabaseCredentials, supabaseFetch } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
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
      status: "new" as const,
    };

    const deliveredChannels: string[] = [];

    // 1. Supabase Postgres Persistence (via env vars or Admin Studio runtime config)
    const sbCreds = await getSupabaseCredentials();
    if (sbCreds.source !== "unconfigured") {
      const sbResult = await supabaseFetch("enquiries", {
        method: "POST",
        prefer: "return=minimal",
        body: {
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
          status: "new",
          created_at: submittedAt,
        },
      });

      if (sbResult.ok) {
        deliveredChannels.push("supabase");
      }
    }

    // 2. Resend Transactional Email Integration
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

    // 3. Optional Webhook Integration
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

    // 4. Local Admin Studio Spool
    const allowLocalSpool =
      process.env.NODE_ENV !== "production" ||
      process.env.ALLOW_LOCAL_ENQUIRY_SPOOL === "true";

    if (allowLocalSpool) {
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
        if (!deliveredChannels.includes("local_spool")) {
          deliveredChannels.push("local_spool");
        }
      } catch {
        // Ignore on read-only file systems
      }
    }

    if (deliveredChannels.length === 0) {
      return NextResponse.json(
        {
          accepted: false,
          code: "INTEGRATION_NOT_CONFIGURED",
          message: `The enquiry database or mail integration is not yet connected in this production environment. Please connect Supabase in /admin or send your project details directly to ${siteConfig.contact.email}.`,
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
