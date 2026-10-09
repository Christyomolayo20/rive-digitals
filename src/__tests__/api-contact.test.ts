import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { resetRateLimitStore } from "@/lib/rate-limit";

function createJsonRequest(body: unknown, ip = "198.51.100.10"): NextRequest {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact — Server Route Handler", () => {
  beforeEach(() => {
    resetRateLimitStore();
    process.env.ALLOW_LOCAL_ENQUIRY_SPOOL = "true";
  });

  it("accepts a valid enquiry and returns 200 with referenceId", async () => {
    const req = createJsonRequest({
      fullName: "Tunde Bakare",
      email: "tunde@veridian.example",
      phone: "+234 800 111 2222",
      company: "Veridian Commercial",
      service: "brand-identity-graphic-design",
      budget: "growth-scope",
      description:
        "We are preparing for our Series A and need a cohesive brand identity system and corporate website.",
      preferredContact: "email",
      privacyConsent: true,
      website_hp: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.accepted).toBe(true);
    expect(json.referenceId).toMatch(/^RD-/);
  });

  it("returns 422 on invalid form data", async () => {
    const req = createJsonRequest({
      fullName: "A",
      email: "not-an-email",
      company: "",
      service: "invalid-service",
      description: "Too short",
      preferredContact: "email",
      privacyConsent: false,
    });

    const res = await POST(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.accepted).toBe(false);
    expect(json.code).toBe("VALIDATION_ERROR");
  });

  it("returns 400 when honeypot field is filled", async () => {
    const req = createJsonRequest({
      fullName: "Bot User",
      email: "bot@example.com",
      company: "Bot LLC",
      service: "website-design-development",
      description:
        "This submission has a populated honeypot field and must be rejected.",
      preferredContact: "email",
      privacyConsent: true,
      website_hp: "http://spam.example",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.accepted).toBe(false);
    expect(json.code).toBe("SPAM_REJECTED");
  });

  it("enforces IP rate limiting (429) after 5 submissions", async () => {
    const validBody = {
      fullName: "Rate Test User",
      email: "rate@example.com",
      company: "Rate Co",
      service: "website-design-development",
      description:
        "Testing rate limiting protection on the contact API endpoint.",
      preferredContact: "email",
      privacyConsent: true,
      website_hp: "",
    };

    for (let i = 0; i < 5; i++) {
      const res = await POST(createJsonRequest(validBody, "198.51.100.99"));
      expect(res.status).toBe(200);
    }

    const sixthRes = await POST(createJsonRequest(validBody, "198.51.100.99"));
    expect(sixthRes.status).toBe(429);
    const json = await sixthRes.json();
    expect(json.code).toBe("RATE_LIMITED");
  });
});
