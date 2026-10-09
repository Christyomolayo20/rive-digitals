import { z } from "zod";
import { servicesData } from "@/data/services";
import { sanitizePlainText } from "@/lib/utils";

export const ALLOWED_SERVICE_OPTIONS = [
  ...servicesData.map((s) => ({
    value: s.slug,
    label: s.title,
  })),
  {
    value: "multiple-or-custom-scope",
    label: "Multiple Services / Custom Growth Scope",
  },
  {
    value: "general-consultation",
    label: "General Consultation / Not Sure Yet",
  },
] as const;

export const ALLOWED_SERVICE_VALUES = ALLOWED_SERVICE_OPTIONS.map(
  (option) => option.value
);

export const BUDGET_OPTIONS = [
  { value: "", label: "Select an estimated range (Optional)" },
  { value: "undecided", label: "Need guidance / Scope-dependent" },
  { value: "starter-scope", label: "Focused Single-Service Project" },
  { value: "growth-scope", label: "Comprehensive Brand + Website Build" },
  { value: "enterprise-retainer", label: "Multi-Phase Platform or Ongoing Retainer" },
] as const;

export const PREFERRED_CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const phoneRegex = /^[+\d\s().-]{7,25}$/;

export const enquirySchema = z
  .object({
    fullName: z
      .string()
      .transform(sanitizePlainText)
      .pipe(
        z
          .string()
          .min(2, "Please enter your full name (at least 2 characters).")
          .max(100, "Full name must be 100 characters or fewer.")
      ),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address.")
      .max(160, "Email address must be 160 characters or fewer."),
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || phoneRegex.test(val),
        "Please enter a valid phone number (7–25 digits, may include + or spaces)."
      ),
    company: z
      .string()
      .transform(sanitizePlainText)
      .pipe(
        z
          .string()
          .min(2, "Please provide your company, organisation, or project name.")
          .max(120, "Company name must be 120 characters or fewer.")
      ),
    service: z
      .string()
      .refine(
        (val) => ALLOWED_SERVICE_VALUES.includes(val),
        "Please select a valid service of interest from the list."
      ),
    budget: z
      .string()
      .max(60, "Invalid budget selection.")
      .optional()
      .or(z.literal("")),
    description: z
      .string()
      .transform(sanitizePlainText)
      .pipe(
        z
          .string()
          .min(
            25,
            "Please share a brief overview of your goals or project requirements (at least 25 characters)."
          )
          .max(3000, "Project description must be 3,000 characters or fewer.")
      ),
    preferredContact: z.enum(["email", "phone", "whatsapp"], {
      errorMap: () => ({
        message: "Please choose your preferred contact method.",
      }),
    }),
    privacyConsent: z.boolean().refine((val) => val === true, {
      message:
        "You must acknowledge the Privacy Policy to submit an enquiry.",
    }),
    // Anti-bot honeypot field — must remain empty
    website_hp: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (
      (data.preferredContact === "phone" ||
        data.preferredContact === "whatsapp") &&
      (!data.phone || data.phone.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message:
          "Please provide a phone or WhatsApp number when selecting Phone or WhatsApp as your preferred contact method.",
      });
    }
  });

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
