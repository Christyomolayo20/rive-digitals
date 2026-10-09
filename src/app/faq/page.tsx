import React from "react";
import type { Metadata } from "next";
import { faqData } from "@/data/faq";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Services, Process & Working Together",
  description:
    "Find answers to common questions about Rive Digitals' services, onboarding workflow, project pricing, revisions, ownership, and timelines.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
            Knowledge Base &amp; Answers
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
            Transparent answers on how we scope projects, collaborate with
            client teams, handle revisions, and deliver production-ready work.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FaqAccordion items={faqData} allowCategoryFilter />
        </div>
      </section>

      <CtaBanner
        title="Have a Specific Question About Your Project?"
        subtitle="Reach out directly through our contact page and we will gladly clarify how we can help."
      />
    </div>
  );
}
