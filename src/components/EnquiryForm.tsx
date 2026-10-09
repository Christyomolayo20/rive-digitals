"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Mail,
} from "lucide-react";
import {
  enquirySchema,
  EnquiryFormValues,
  ALLOWED_SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  PREFERRED_CONTACT_METHODS,
} from "@/lib/validation";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

interface EnquiryFormProps {
  defaultService?: string;
}

interface SubmissionResult {
  status: "idle" | "success" | "error" | "unconfigured";
  message?: string;
  referenceId?: string;
}

export function EnquiryForm({ defaultService }: EnquiryFormProps) {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>({
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service:
        defaultService &&
        ALLOWED_SERVICE_OPTIONS.some((s) => s.value === defaultService)
          ? defaultService
          : ALLOWED_SERVICE_OPTIONS[0].value,
      budget: "",
      description: "",
      preferredContact: "email",
      privacyConsent: false,
      website_hp: "",
    },
  });

  useEffect(() => {
    if (
      defaultService &&
      ALLOWED_SERVICE_OPTIONS.some((s) => s.value === defaultService)
    ) {
      setValue("service", defaultService);
    }
  }, [defaultService, setValue]);

  const onSubmit = async (values: EnquiryFormValues) => {
    if (isSubmitting) return;
    setSubmissionResult({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = await response.json();

      if (response.ok && payload.accepted === true) {
        trackEvent("contact_form_submitted", {
          service: values.service,
          preferredContact: values.preferredContact,
        });
        setSubmissionResult({
          status: "success",
          message:
            payload.message ||
            "Thank you. Your project enquiry has been received.",
          referenceId: payload.referenceId,
        });
        reset();
        return;
      }

      if (response.status === 503 && payload.code === "INTEGRATION_NOT_CONFIGURED") {
        setSubmissionResult({
          status: "unconfigured",
          message:
            payload.message ||
            "Our automated form mail server is currently awaiting production credentials. Please send your brief directly via email so nothing is missed.",
        });
        return;
      }

      setSubmissionResult({
        status: "error",
        message:
          payload.message ||
          "We could not process your submission right now. Please verify your details and try again.",
      });
    } catch {
      setSubmissionResult({
        status: "error",
        message:
          "A network error occurred while submitting your enquiry. Please check your connection or email us directly.",
      });
    }
  };

  if (submissionResult.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-brand-navy">
          Enquiry Received
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-lg mx-auto">
          {submissionResult.message}
        </p>
        <p className="mt-3 text-xs text-slate-600">
          {siteConfig.contact.responseExpectation}
        </p>
        {submissionResult.referenceId && (
          <p className="mt-3 inline-block rounded-lg bg-white px-3 py-1 font-mono text-xs text-slate-600 border border-emerald-200">
            Reference: {submissionResult.referenceId}
          </p>
        )}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setSubmissionResult({ status: "idle" })}
            className="rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-card"
    >
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-navy">
          Project Enquiry &amp; Quote Request
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          Fields marked with <span className="text-brand-coral-strong">*</span>{" "}
          are required. {siteConfig.contact.responseExpectation}
        </p>
      </div>

      {/* Feedback Banner for Error or Unconfigured Production Mailer */}
      {submissionResult.status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-900"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to complete submission</p>
            <p className="mt-1 text-red-800">{submissionResult.message}</p>
          </div>
        </div>
      )}

      {submissionResult.status === "unconfigured" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-amber-950"
        >
          <Mail className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              Direct Email Required (Email Integration Not Yet Connected)
            </p>
            <p className="mt-1 text-amber-900">{submissionResult.message}</p>
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Project%20Enquiry%20for%20Rive%20Digitals`}
              className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand-navy underline"
            >
              Email {siteConfig.contact.email} directly →
            </a>
          </div>
        </div>
      )}

      {/* Honeypot Anti-Spam Field (Hidden from visual & screen-reader users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Leave this field empty</label>
        <input
          id="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_hp")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-brand-navy"
          >
            Full Name <span className="text-brand-coral-strong">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g., Adaobi Okafor"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-brand-navy"
          >
            Email Address <span className="text-brand-coral-strong">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-brand-navy"
          >
            Phone / WhatsApp Number{" "}
            <span className="text-xs font-normal text-slate-500">
              (Optional unless preferred)
            </span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          />
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Company / Business Name */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-brand-navy"
          >
            Company or Business Name{" "}
            <span className="text-brand-coral-strong">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Your Organisation Name"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            {...register("company")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          />
          {errors.company && (
            <p
              id="company-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Service of Interest */}
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-semibold text-brand-navy"
          >
            Service of Interest{" "}
            <span className="text-brand-coral-strong">*</span>
          </label>
          <select
            id="service"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            {...register("service")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          >
            {ALLOWED_SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p
              id="service-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Estimated Scope / Budget (Optional) */}
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-semibold text-brand-navy"
          >
            Estimated Project Scope{" "}
            <span className="text-xs font-normal text-slate-500">
              (Optional)
            </span>
          </label>
          <select
            id="budget"
            {...register("budget")}
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-brand-navy"
        >
          Project Overview &amp; Objectives{" "}
          <span className="text-brand-coral-strong">*</span>
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          Tell us briefly about your business, what you want to achieve, and any
          target launch context.
        </p>
        <textarea
          id="description"
          rows={5}
          placeholder="We are looking to redesign our corporate website and unify our brand identity ahead of our Q4 expansion..."
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          {...register("description")}
          className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
        />
        {errors.description && (
          <p
            id="description-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <fieldset>
        <legend className="block text-sm font-semibold text-brand-navy">
          Preferred Contact Method{" "}
          <span className="text-brand-coral-strong">*</span>
        </legend>
        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PREFERRED_CONTACT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-brand-navy hover:border-brand-navy has-[:checked]:border-brand-coral-strong has-[:checked]:bg-brand-coral-light/60"
            >
              <input
                type="radio"
                value={method.value}
                {...register("preferredContact")}
                className="h-4 w-4 text-brand-coral-strong focus:ring-brand-coral"
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
        {errors.preferredContact && (
          <p
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errors.preferredContact.message}
          </p>
        )}
      </fieldset>

      {/* Privacy Notice Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            aria-invalid={!!errors.privacyConsent}
            aria-describedby={
              errors.privacyConsent ? "privacyConsent-error" : undefined
            }
            {...register("privacyConsent")}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-coral-strong focus:ring-brand-coral"
          />
          <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            I consent to {siteConfig.name} processing the information provided
            above for the purpose of responding to my enquiry, in accordance
            with the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-brand-navy underline hover:text-brand-coral-strong"
            >
              Privacy Policy
            </Link>
            . <span className="text-brand-coral-strong">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p
            id="privacyConsent-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errors.privacyConsent.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-8 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-coral disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Project Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
