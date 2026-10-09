import { FaqItem } from "@/types";

/**
 * CENTRALISED FREQUENTLY ASKED QUESTIONS
 * Edit answers here to update both the Homepage FAQ preview and the dedicated /faq page.
 * Answers avoid making unsupported timeline or pricing guarantees.
 */
export const faqCategories = [
  "Services & Scope",
  "Onboarding & Process",
  "Pricing & Quotes",
  "Revisions & Governance",
  "Timelines & Working Arrangements",
] as const;

export const faqData: FaqItem[] = [
  {
    id: "faq-services-offered",
    category: "Services & Scope",
    question: "What core digital services does Rive Digitals provide?",
    answer:
      "We focus on Brand Identity & Graphic Design, Website Design & Development, and Business Branding & Digital Strategy. We also structure Digital Marketing & Advertising, Content Creation, and Social Media Management programmes tailored to your project requirements and growth stage.",
    featuredOnHome: true,
  },
  {
    id: "faq-custom-scope",
    category: "Services & Scope",
    question:
      "Can we commission a single service, or do we need a full-service package?",
    answer:
      "You can engage us for a focused standalone project—such as a visual identity system or a corporate website build—or combine multiple capabilities into a phased rollout. Every scope is defined around your immediate commercial priorities.",
    featuredOnHome: true,
  },
  {
    id: "faq-pricing-structure",
    category: "Pricing & Quotes",
    question: "How do you price projects and how can we get an accurate quote?",
    answer:
      "Because a five-page corporate website and a multi-vertical platform with custom integrations require very different engineering effort, we do not publish one-size-fits-all price tags. Once you submit a project brief via our Request a Quote form, we review your objectives and provide a transparent, itemised proposal before any commitment is made.",
    featuredOnHome: true,
  },
  {
    id: "faq-onboarding-process",
    category: "Onboarding & Process",
    question: "What happens after we submit an enquiry or quote request?",
    answer:
      "First, we review your submission and reply within 1–2 business days. If we need clarification, we schedule a focused discovery call. From there, we prepare a written scope of work outlining deliverables, milestones, commercial terms, and required inputs so both teams have complete clarity.",
    featuredOnHome: true,
  },
  {
    id: "faq-revisions",
    category: "Revisions & Governance",
    question: "How are feedback and design revisions handled during a project?",
    answer:
      "We work in structured milestone phases—such as strategy alignment, wireframing, visual design, and staging review. Each phase includes dedicated review rounds defined in your project agreement, ensuring your team can provide consolidated feedback early before final code or master assets are locked.",
    featuredOnHome: true,
  },
  {
    id: "faq-timelines",
    category: "Timelines & Working Arrangements",
    question: "How long does a typical branding or website project take?",
    answer:
      "Project duration depends on the complexity of the scope, the number of custom templates or deliverables, and how quickly consolidated feedback and content assets are exchanged. During the proposal stage, we provide a realistic milestone schedule tailored to your specific deliverables.",
    featuredOnHome: true,
  },
  {
    id: "faq-ownership-handover",
    category: "Revisions & Governance",
    question:
      "Will we own our website code, brand assets, and content upon completion?",
    answer:
      "Yes. Upon project completion and final settlement as outlined in your client agreement, you receive full ownership of the agreed final brand assets, source files, and custom website codebase, along with documentation on how to manage and update your content.",
    featuredOnHome: false,
  },
  {
    id: "faq-remote-collaboration",
    category: "Timelines & Working Arrangements",
    question: "How do we communicate and collaborate during an engagement?",
    answer:
      "We operate as a remote-first digital partner serving clients locally and internationally. We use structured email updates, scheduled video walkthroughs at key milestones, and shared project documentation so your team always knows what is completed and what is needed next.",
    featuredOnHome: false,
  },
  {
    id: "faq-post-launch-support",
    category: "Onboarding & Process",
    question: "Do you offer post-launch website maintenance or ongoing support?",
    answer:
      "Yes. Every website we build is engineered with clean, maintainable configuration so your team can handle routine text and portfolio updates independently. If you prefer ongoing technical maintenance, iterative UX enhancements, or content support, we can arrange a dedicated post-launch support agreement.",
    featuredOnHome: false,
  },
];
