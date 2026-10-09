# Rive Digitals — Official Business Website

Production-ready business website and client enquiry platform for **Rive Digitals** (`rivedigitals.com`), built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **React Hook Form**, and **Zod**.

---

## 1. Architecture & Key Features

- **Brand Identity & Design System**: Derived directly from the official Rive Digitals geometric monogram logo (`public/images/logo.jpg` and vector mark `public/images/rive-logo.svg`):
  - **Deep Midnight Navy (`#06141F`)** & **Elevated Navy (`#0C2031`)**
  - **Coral Rose Focal Accent (`#D86875` / `#C84B59`)**
  - **Crisp White (`#FFFFFF`)** & **Slate Canvas (`#F8FAFC`)**
  - Centralised as CSS custom properties in `src/app/globals.css` and mapped into `tailwind.config.ts`.
- **Complete Page Structure**:
  - `/` — **Home**: Hero proposition, Services overview, Why Rive Digitals, Selected Portfolio preview, 4-stage Delivery Process, Conditional Testimonials, FAQ preview, and Final Enquiry CTA.
  - `/about` — **About Us**: Brand story, Mission & Vision, Core Values, Differentiators, and Conditional Team section.
  - `/services` & `/services/[slug]` — **Services Overview & Individual Service Detail Pages**: Covers all 6 service verticals with problem solved, deliverables, ideal client profile, workflow steps, and contextual quote links.
  - `/work` & `/work/[slug]` — **Portfolio & Individual Case Studies**: Interactive category filtering, empty states, project brief, challenge, solution, deliverables, outcomes, and visual gallery.
  - `/contact` & `POST /api/contact` — **Contact & Request a Quote**: Client + server Zod validation, plain-text sanitization, honeypot anti-bot field, IP rate limiting, and truthful delivery via Resend, Webhook, or Supabase.
  - `/blog` & `/blog/[slug]` — **Insights & Articles**: Keyword search, category & tag filtering, reading time, social share controls, related articles, and `BlogPosting` JSON-LD schema.
  - `/faq` — **Dedicated FAQ Hub**: Topic filtering and `FAQPage` JSON-LD structured data.
  - `/privacy` & `/terms` — **Legal Templates**: Editable business details with prominent legal review notices.
  - `not-found.tsx`, `sitemap.ts`, `robots.ts` — Custom 404 page, dynamic `/sitemap.xml`, and `/robots.txt`.

---

## 2. Project Structure

```text
rive-digitals/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── logo.jpg                  # Official uploaded Rive Digitals brand logo
│       ├── rive-logo.svg             # Vector fallback matching the uploaded logo
│       └── portfolio/                # High-DPI SVG architectural & UI case study visuals
├── src/
│   ├── __tests__/
│   │   └── site-and-validation.test.ts
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── api/contact/route.ts      # Server-side enquiry processor & rate limiter
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── services/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── terms/page.tsx
│   │   ├── work/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css               # Centralised brand color tokens
│   │   ├── layout.tsx                # Root layout, SEO metadata & Organization JSON-LD
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── page.tsx                  # Homepage
│   │   ├── robots.ts                 # Dynamic /robots.txt
│   │   └── sitemap.ts                # Dynamic /sitemap.xml
│   ├── components/
│   │   ├── BlogExplorer.tsx
│   │   ├── BrandLogo.tsx
│   │   ├── CookieConsentBanner.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── EnquiryForm.tsx
│   │   ├── FaqAccordion.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceIcon.tsx
│   │   └── ShareArticleButtons.tsx
│   ├── config/
│   │   └── site.ts                   # Single source of truth for business info & toggles
│   ├── data/
│   │   ├── blog.ts                   # Blog articles & categories
│   │   ├── faq.ts                    # FAQ items & categories
│   │   ├── portfolio.ts              # Portfolio projects & case studies
│   │   ├── process.ts                # 4-stage delivery workflow
│   │   └── services.ts               # Service definitions & workflows
│   ├── lib/
│   │   ├── analytics.ts              # Consent-gated privacy-first analytics helper
│   │   ├── rate-limit.ts             # Sliding-window IP rate limiter
│   │   ├── utils.ts                  # Sanitization, date formatting, WhatsApp URL builder
│   │   └── validation.ts             # Shared client/server Zod enquiry schema
│   └── types/
│       └── index.ts                  # TypeScript interfaces
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## 3. Prerequisites & Local Development

### Prerequisites
- **Node.js**: v18.18.0 or v20+ LTS (includes `npm`).
  - *Windows Quick Install (if Node.js is not yet installed)*:
    ```powershell
    winget install OpenJS.NodeJS.LTS
    ```
    After installing, restart your terminal so `node` and `npm` are on your `PATH`.

### Installation & Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure local environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run TypeScript checks, Linting, Tests, and Production Build**:
   ```bash
   npm run typecheck
   npm run lint
   npm test
   npm run build
   ```

---

## 4. How to Update Content (Centralised Configuration)

Routine content edits never require modifying React components:

1. **Business Details, Email, Phone, WhatsApp & Social Links**:
   - Edit `src/config/site.ts` (or set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`).
   - When `NEXT_PUBLIC_WHATSAPP_NUMBER` is populated (e.g., `2348012345678`), WhatsApp CTA buttons automatically appear on the Contact page and CTA banners with a pre-encoded message.
2. **Services**:
   - Edit `src/data/services.ts`. Adding or updating an entry automatically updates the Header mega-menu, Footer links, Homepage cards, `/services` overview, `/services/[slug]` detail page, `/sitemap.xml`, and the Contact Form service dropdown!
3. **Portfolio / Case Studies**:
   - Edit `src/data/portfolio.ts` and drop project images into `public/images/portfolio/`.
4. **Blog / Insights Articles**:
   - Add a new object to `blogArticles` in `src/data/blog.ts`.
5. **Testimonials & Team Profiles**:
   - By policy, no fake testimonials or fabricated team bios are displayed. Once genuine client testimonials are collected, add them to `verifiedTestimonials` in `src/config/site.ts` and set `features.showTestimonials = true`.

---

## 5. Connecting Production Integrations

### A. Transactional Email (Resend)
To receive email notifications whenever a client submits the Contact / Quote Request form:
1. Create an account at [resend.com](https://resend.com) and verify your domain (`rivedigitals.com`).
2. Set the following variables in your production hosting environment:
   ```env
   RESEND_API_KEY="re_your_api_key"
   ENQUIRY_FROM_EMAIL="Rive Digitals Website <notifications@rivedigitals.com>"
   ENQUIRY_TO_EMAIL="hello@rivedigitals.com"
   ALLOW_LOCAL_ENQUIRY_SPOOL="false"
   ```

### B. Webhook / CRM (Optional)
Set `ENQUIRY_WEBHOOK_URL` to forward validated JSON payloads to Make, Zapier, Slack, or HubSpot.

### C. Supabase Database Storage (Optional)
If persistent database storage is desired in addition to email notifications:
1. Create an `enquiries` table in Supabase with columns: `reference_id`, `full_name`, `email`, `phone`, `company`, `service`, `budget`, `description`, `preferred_contact`, `privacy_consent`, `created_at`.
2. Provide `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in environment variables.

> **Truthful Submission Guarantee**: If deployed to production (`NODE_ENV=production` and `ALLOW_LOCAL_ENQUIRY_SPOOL=false`) without `RESEND_API_KEY`, `ENQUIRY_WEBHOOK_URL`, or `SUPABASE_URL`, `/api/contact` returns HTTP `503 INTEGRATION_NOT_CONFIGURED` and instructs the visitor to use the direct email link—never faking a successful submission.

---

## 6. Deployment & Pre-Launch Checklist

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Click **Deploy** and connect your custom domain (`rivedigitals.com`).

### Pre-Launch Checklist
- [ ] Confirm official business email (`NEXT_PUBLIC_CONTACT_EMAIL`), phone (`NEXT_PUBLIC_CONTACT_PHONE`), and WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- [ ] Configure `RESEND_API_KEY` (or `ENQUIRY_WEBHOOK_URL`) in production and set `ALLOW_LOCAL_ENQUIRY_SPOOL="false"`.
- [ ] Submit a real test enquiry on staging/production to verify email delivery.
- [ ] Review `src/data/services.ts` to confirm which services are active core offerings vs configurable scopes.
- [ ] Have qualified legal counsel review `/privacy` and `/terms` before removing `siteConfig.legalReviewNotice`.
- [ ] Submit `https://rivedigitals.com/sitemap.xml` in Google Search Console.
