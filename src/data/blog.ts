import { BlogArticle, BlogCategory } from "@/types";

/**
 * CENTRALISED BLOG / INSIGHTS CONTENT
 * Add new articles to the `blogArticles` array below.
 * Routes, reading times, category filters, related articles, and SEO metadata
 * are generated automatically from this structure.
 */
export const blogCategories: BlogCategory[] = [
  "Brand Strategy",
  "Web Architecture",
  "Digital Growth",
  "Content Systems",
];

export const blogArticles: BlogArticle[] = [
  {
    id: "post-website-conversion-architecture",
    slug: "how-to-structure-a-b2b-service-website-for-qualified-enquiries",
    title:
      "How to Structure a Service Website That Generates Qualified Business Enquiries",
    excerpt:
      "Why many visually attractive websites fail to convert prospective buyers—and how clear information architecture, proof placement, and frictionless enquiry flows fix the leak.",
    category: "Web Architecture",
    tags: ["Conversion Optimization", "Website Strategy", "B2B UX", "Lead Generation"],
    publishedAt: "2026-09-18",
    readingTimeMinutes: 6,
    authorRole: "Rive Digitals Strategy & UX Desk",
    coverImage: "/images/portfolio/nexus-logistics-platform.svg",
    coverImageAlt:
      "Diagram of a structured B2B website layout and guided enquiry form",
    featured: true,
    sections: [
      {
        heading: "The Five-Second Clarity Test",
        paragraphs: [
          "When a prospective client lands on your homepage, they are rarely looking for abstract slogans. They are trying to answer three immediate questions: What exactly does this company do? Do they work with businesses like mine? And what happens if I reach out?",
          "Websites that bury their core offering beneath vague headlines or heavy visual effects force visitors to work too hard. High-converting business websites prioritize immediate clarity in the very first viewport, pairing a specific value proposition with two unmistakable pathways: a primary call to action for ready buyers, and a secondary path to inspect previous work.",
        ],
        callout:
          "Clarity beats cleverness every time. If a visitor has to guess what services you offer after reading your hero section, conversion rates drop sharply.",
      },
      {
        heading: "Structuring Service Pages Around Buyer Problems",
        paragraphs: [
          "A common mistake on service pages is listing internal technical tasks without explaining the commercial outcome. Decision-makers invest in digital services to solve business bottlenecks—whether that is an inconsistent brand identity, a slow mobile checkout, or an unclear customer acquisition funnel.",
          "Each service vertical should clearly state the business problem it resolves, the concrete deliverables included, who the service is best suited for, and how the delivery workflow unfolds from discovery to handover.",
        ],
        bulletPoints: [
          "State the specific business problem the service addresses.",
          "List tangible deliverables so buyers know what they are commissioning.",
          "Outline the step-by-step delivery workflow to remove onboarding anxiety.",
          "Place a contextual quote request link directly at the point of conviction.",
        ],
      },
      {
        heading: "Designing Enquiry Forms That Respect the Buyer",
        paragraphs: [
          "Your contact page is the most commercially sensitive screen on your website. If the form asks for twenty mandatory fields, qualified buyers abandon it; if it asks only for a name and an empty message box, your team spends days chasing basic project context.",
          "The optimal balance collects essential contact details alongside structured scope selectors—such as the primary service of interest, preferred communication channel, and a brief project overview—while clearly stating when the visitor can expect a human response.",
        ],
      },
    ],
  },
  {
    id: "post-cohesive-brand-design-tokens",
    slug: "why-growing-businesses-need-a-brand-system-not-just-a-logo",
    title:
      "Why Growing Businesses Need a Cohesive Brand System—Not Just a Standalone Logo",
    excerpt:
      "A logo mark alone cannot guarantee visual consistency. Learn how documented color tokens, typographic scales, and reusable templates protect brand credibility across every channel.",
    category: "Brand Strategy",
    tags: ["Brand Identity", "Design Systems", "Visual Consistency", "SMB Growth"],
    publishedAt: "2026-08-29",
    readingTimeMinutes: 5,
    authorRole: "Rive Digitals Brand Design Practice",
    coverImage: "/images/portfolio/veridian-fintech-brand.svg",
    coverImageAlt:
      "Brand identity guidelines showing monogram grid, color swatches, and typography scale",
    featured: true,
    sections: [
      {
        heading: "Where Standalone Logos Break Down",
        paragraphs: [
          "Many businesses commission a logo mark early in their journey and assume their branding is complete. Six months later, their website uses one shade of blue, their pitch deck uses another, their social graphics use three incompatible fonts, and their proposals look like they came from a different company entirely.",
          "Visual inconsistency creates subtle cognitive friction. Even when prospective clients cannot articulate the design flaw, fragmented touchpoints make an organisation feel less established than it actually is.",
        ],
      },
      {
        heading: "The Core Pillars of a Practical Brand System",
        paragraphs: [
          "A durable brand system translates your visual identity into repeatable rules and ready-to-use assets. Instead of relying on guesswork every time a new page or presentation is created, your team works from a single source of truth.",
        ],
        bulletPoints: [
          "Responsive Logo Architecture: Primary lockups, compact navigation marks, and high-contrast monochrome variants.",
          "Accessible Color Tokens: Defined primary, surface, border, and accent hex codes tested for legibility.",
          "Typographic Hierarchy: Clear pairings for display headings, long-form reading, and UI controls.",
          "Operational Templates: Master layouts for proposals, social announcements, and case studies.",
        ],
        callout:
          "When your brand colours and typography are codified as design tokens, launching new web pages or marketing campaigns takes a fraction of the time.",
      },
    ],
  },
  {
    id: "post-performance-and-accessibility-roi",
    slug: "web-performance-and-accessibility-as-competitive-advantages",
    title:
      "Web Performance and Accessibility: The Overlooked Drivers of Search Visibility and Trust",
    excerpt:
      "Fast load times, semantic HTML, and keyboard accessibility are not merely technical checkboxes—they directly influence search rankings, mobile retention, and brand perception.",
    category: "Web Architecture",
    tags: ["Web Performance", "Accessibility", "Technical SEO", "Core Web Vitals"],
    publishedAt: "2026-08-05",
    readingTimeMinutes: 5,
    authorRole: "Rive Digitals Engineering Desk",
    coverImage: "/images/portfolio/lumina-health-portal.svg",
    coverImageAlt:
      "Accessible web interface showcasing high contrast typography and structured cards",
    featured: false,
    sections: [
      {
        heading: "Every Second of Delay Costs Attention",
        paragraphs: [
          "Decision-makers frequently browse vendor websites on mobile connections between meetings. When a site loads megabytes of unoptimized scripts, shifts layout while someone tries to tap a button, or locks up scrolling with heavy animations, visitors leave before reading a single case study.",
          "By prioritising server-rendered HTML, modern vector and compressed image formats, and restrained client-side JavaScript, a business website feels instantaneous on both flagship desktops and mid-range mobile phones.",
        ],
      },
      {
        heading: "Accessibility Improves the Experience for Everyone",
        paragraphs: [
          "Designing for accessibility—sufficient color contrast, logical heading hierarchies, descriptive link labels, and keyboard navigation—does more than widen your audience. It forces disciplined visual hierarchy and clean semantic markup that search engine crawlers also rely upon to index your content accurately.",
        ],
        bulletPoints: [
          "Maintain at least a 4.5:1 contrast ratio for standard body text.",
          "Ensure every interactive control has a visible keyboard focus state.",
          "Pair every form input with an explicit label and clear error instructions.",
          "Respect user operating system preferences for reduced motion.",
        ],
      },
    ],
  },
  {
    id: "post-aligning-campaigns-with-landing-pages",
    slug: "stop-sending-campaign-traffic-to-your-homepage",
    title:
      "Why Sending Campaign Traffic to a Generic Homepage Hurts Conversion Rates",
    excerpt:
      "How message-matched landing experiences and privacy-conscious conversion tracking turn digital marketing spend into measurable commercial enquiries.",
    category: "Digital Growth",
    tags: ["Digital Marketing", "Landing Pages", "CRO", "Analytics"],
    publishedAt: "2026-07-19",
    readingTimeMinutes: 4,
    authorRole: "Rive Digitals Growth & Analytics Desk",
    coverImage: "/images/portfolio/solaris-energy-campaign.svg",
    coverImageAlt:
      "Full-funnel campaign alignment from social creative to dedicated conversion landing page",
    featured: false,
    sections: [
      {
        heading: "The Cost of Message Mismatch",
        paragraphs: [
          "When someone clicks a specific campaign link—for example, an announcement for B2B website redesigns or brand identity audits—they expect the destination page to speak directly to that need. Dropping them onto a general homepage forces them to hunt through navigation menus to find what was promised.",
          "Dedicated service and campaign pages maintain momentum by mirroring the exact problem, deliverables, and proof points relevant to that visitor segment.",
        ],
      },
      {
        heading: "Measuring What Actually Matters",
        paragraphs: [
          "Impressions and raw page views rarely pay the bills. A healthy digital growth setup tracks high-intent actions—such as completed quote requests, consultation bookings, and direct WhatsApp or email initiations—while respecting visitor privacy and consent preferences.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit = 2
): BlogArticle[] {
  const current = getArticleBySlug(currentSlug);
  return blogArticles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      if (current && a.category === current.category && b.category !== current.category) {
        return -1;
      }
      if (current && b.category === current.category && a.category !== current.category) {
        return 1;
      }
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .slice(0, limit);
}
