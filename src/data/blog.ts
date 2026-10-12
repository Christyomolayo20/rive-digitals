import { BlogArticle, BlogCategory } from "@/types";

/**
 * CENTRALISED BLOG / INSIGHTS CONTENT
 * Paired with photorealistic cover imagery and concise, actionable sections.
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
      "How to Structure a Service Website That Generates Qualified Enquiries",
    excerpt:
      "Why visually attractive websites often fail to convert—and how clear hierarchy, proof placement, and simple enquiry flows fix the leak.",
    category: "Web Architecture",
    tags: ["Conversion Optimization", "Website Strategy", "B2B UX", "Lead Generation"],
    publishedAt: "2026-09-18",
    readingTimeMinutes: 4,
    authorRole: "Rive Digitals Strategy & UX Desk",
    coverImage: "/images/portfolio/nexus-freight.jpg",
    coverImageAlt:
      "Modern widescreen monitor displaying a high-converting B2B web platform",
    featured: true,
    sections: [
      {
        heading: "1. Pass the Five-Second Clarity Test",
        paragraphs: [
          "When a prospective client lands on your homepage, they want three immediate answers: What do you do? Who do you help? And what happens when I reach out?",
          "High-converting websites avoid vague slogans. They pair a specific value proposition in the first screen with two clear actions: requesting a quote or exploring real work.",
        ],
        callout:
          "Clarity beats cleverness. If visitors have to guess what you offer, conversion rates drop.",
      },
      {
        heading: "2. Structure Services Around Buyer Problems",
        paragraphs: [
          "Decision-makers buy outcomes, not technical jargon. Every service page should clearly state the business problem it solves, the deliverables included, and how onboarding works.",
        ],
        bulletPoints: [
          "Lead with the business problem your service eliminates.",
          "List concrete deliverables so buyers know what to expect.",
          "Show relevant portfolio proof right beside the call to action.",
        ],
      },
    ],
  },
  {
    id: "post-cohesive-brand-design-tokens",
    slug: "why-growing-businesses-need-a-brand-system-not-just-a-logo",
    title:
      "Why Growing Businesses Need a Cohesive Brand System—Not Just a Logo",
    excerpt:
      "A standalone logo cannot guarantee consistency. Learn how documented color tokens, typography, and templates build instant credibility.",
    category: "Brand Strategy",
    tags: ["Brand Identity", "Design Systems", "Visual Consistency", "SMB Growth"],
    publishedAt: "2026-08-29",
    readingTimeMinutes: 4,
    authorRole: "Rive Digitals Brand Design Practice",
    coverImage: "/images/portfolio/veridian-fintech.jpg",
    coverImageAlt:
      "Brand identity guidelines book, corporate card, and financial dashboard mockup",
    featured: true,
    sections: [
      {
        heading: "Where Standalone Logos Fall Short",
        paragraphs: [
          "Many companies commission a logo early on and stop there. Months later, their website, pitch deck, and social channels use mismatched colors and fonts—making an established business look fragmented.",
        ],
      },
      {
        heading: "The 4 Pillars of a Practical Brand System",
        paragraphs: [
          "A durable brand system translates your identity into ready-to-use rules and templates so every touchpoint looks unmistakably yours.",
        ],
        bulletPoints: [
          "Responsive Logo Lockups: Primary marks, compact icons, and monochrome variants.",
          "Accessible Color Tokens: Defined hex codes tested for contrast and legibility.",
          "Typographic Hierarchy: Clear font pairings for headings, body text, and UI.",
          "Reusable Templates: Master layouts for decks, proposals, and social posts.",
        ],
      },
    ],
  },
  {
    id: "post-performance-and-accessibility-roi",
    slug: "web-performance-and-accessibility-as-competitive-advantages",
    title:
      "Web Performance & Accessibility: The Overlooked Drivers of Trust",
    excerpt:
      "Fast load times, responsive layouts, and readable contrast directly improve search rankings, mobile retention, and enquiry rates.",
    category: "Web Architecture",
    tags: ["Web Performance", "Accessibility", "Technical SEO", "Core Web Vitals"],
    publishedAt: "2026-08-05",
    readingTimeMinutes: 3,
    authorRole: "Rive Digitals Engineering Desk",
    coverImage: "/images/portfolio/lumina-health.jpg",
    coverImageAlt:
      "High-contrast accessible web portal on desktop and tablet screens",
    featured: false,
    sections: [
      {
        heading: "Speed Protects Mobile Attention",
        paragraphs: [
          "Buyers frequently inspect vendor websites on mobile connections between meetings. Optimised images, server-rendered HTML, and clean code ensure your site loads in under a second without layout jumps.",
        ],
        bulletPoints: [
          "Maintain strong text contrast (4.5:1+) across dark and light sections.",
          "Design touch-friendly buttons and inputs for mobile screens.",
          "Pair every image and form control with accessible labels.",
        ],
      },
    ],
  },
  {
    id: "post-aligning-campaigns-with-landing-pages",
    slug: "stop-sending-campaign-traffic-to-your-homepage",
    title:
      "Why Sending Campaign Traffic to a Generic Homepage Hurts Conversions",
    excerpt:
      "How dedicated landing pages and privacy-first analytics turn digital marketing spend into measurable client enquiries.",
    category: "Digital Growth",
    tags: ["Digital Marketing", "Landing Pages", "CRO", "Analytics"],
    publishedAt: "2026-07-19",
    readingTimeMinutes: 3,
    authorRole: "Rive Digitals Growth & Analytics Desk",
    coverImage: "/images/portfolio/solaris-cleantech.jpg",
    coverImageAlt:
      "Interactive ROI calculator landing page on laptop and smartphone",
    featured: false,
    sections: [
      {
        heading: "Match the Page to the Promise",
        paragraphs: [
          "When someone clicks an ad for a specific service, dropping them onto a general homepage forces them to hunt for information. Dedicated landing pages mirror the exact problem, proof, and quote form relevant to that campaign.",
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
