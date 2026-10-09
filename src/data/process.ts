import { ProcessStage } from "@/types";

/**
 * CENTRALISED DELIVERY PROCESS CONFIGURATION
 * Explains transparently how Rive Digitals scopes, executes, and delivers client work.
 */
export const deliveryProcess: ProcessStage[] = [
  {
    number: "01",
    title: "Discovery & Commercial Alignment",
    subtitle: "Understanding objectives, audience, and constraints",
    description:
      "We begin by auditing your current digital presence, clarifying your business goals, and identifying what your target customers need to see to trust and contact you.",
    clientInputs: [
      "Project brief & commercial goals",
      "Existing brand assets or domain context",
    ],
    keyOutputs: [
      "Confirmed project scope & milestone roadmap",
      "Audience & conversion requirements brief",
    ],
  },
  {
    number: "02",
    title: "Strategy & Information Architecture",
    subtitle: "Structuring the narrative and visual direction",
    description:
      "Before writing code or finalising visuals, we map the site structure, content hierarchy, and design tokens so every screen serves a clear purpose.",
    clientInputs: [
      "Feedback on sitemap & messaging structure",
      "Core service and company details",
    ],
    keyOutputs: [
      "Page hierarchy & conversion wireframes",
      "Visual direction & design token system",
    ],
  },
  {
    number: "03",
    title: "Design, Engineering & QA",
    subtitle: "Building responsive, accessible, production-grade assets",
    description:
      "We craft the visual identity or build the responsive application with clean components, validated enquiry forms, SEO metadata, and cross-device testing.",
    clientInputs: [
      "Consolidated milestone review feedback",
      "Approval of staging environment or proof sheets",
    ],
    keyOutputs: [
      "Production-ready web codebase or master brand kit",
      "Accessibility, responsiveness & form verification",
    ],
  },
  {
    number: "04",
    title: "Launch, Handover & Growth",
    subtitle: "Smooth deployment and maintainable ownership",
    description:
      "We coordinate production launch, connect your live email or analytics integrations, and hand over clear documentation so your team stays in control.",
    clientInputs: [
      "Domain DNS or hosting environment access",
      "Final pre-launch sign-off",
    ],
    keyOutputs: [
      "Live production deployment & SSL verification",
      "Content management guide & optional growth support",
    ],
  },
];
