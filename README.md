# Rive Digitals — Professional Business Website & Admin CMS

A modern, responsive, visual-first business website and Admin Studio for **Rive Digitals**, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Zod**, and **Supabase**.

- **GitHub Repository**: [https://github.com/Christyomolayo20/rive-digitals.git](https://github.com/Christyomolayo20/rive-digitals.git)
- **Live Admin Studio Route**: `/admin` (Default passcode: `rive-admin-2026`, configurable via `ADMIN_PASSCODE`)

---

## Key Features

1. **Visual-First & Fully Responsive UI/UX**
   - Mobile-first layouts across `360px` phones, `768px` tablets, `1280px` laptops, and `1440px+` desktops.
   - 10 watermark-free, photorealistic brand, web engineering, and portfolio visuals stored in `public/images/`.
   - Concise, high-conversion copy with fast visual scanning.

2. **Full Admin Studio (`/admin`) + Live Supabase Integration**
   - **Enquiries & Leads CRM**: View incoming leads from `/contact`, update status (`new`, `in_review`, `contacted`, `archived`), email clients directly, or delete records.
   - **Portfolio Manager**: Add new portfolio case studies or remove projects with live Supabase sync.
   - **Services & Scopes Manager**: Toggle services between `Core Service` and `Custom Scope`.
   - **Supabase Setup UI**: Connect your Supabase Project URL and API Key directly in the `/admin` dashboard (or via environment variables) and copy the ready-to-run SQL schema (`supabase/schema.sql`).

3. **Validated Contact & Quote API (`/api/contact`)**
   - Zod schema validation (`src/lib/validation.ts`), honeypot anti-spam protection, and IP rate limiting (`src/lib/rate-limit.ts`).
   - Multi-channel delivery: syncs directly to **Supabase** (`enquiries` table), **Resend** email, **Webhook**, or local development spool.

---

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

- **Public Website**: `http://localhost:3000`
- **Admin Studio**: `http://localhost:3000/admin` (Passcode: `rive-admin-2026`)

### Verification Commands

```bash
npm run typecheck   # TypeScript strict verification
npm test            # Vitest unit & integration test suite
npm run build       # Production Next.js build
```

---

## Connecting Supabase

1. Create a project at [https://supabase.com](https://supabase.com).
2. Open the **Supabase SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql) (or copy it directly from the **Supabase Setup** tab inside `/admin`).
3. Configure your credentials either:
   - Directly inside **`/admin` -> Supabase Setup** (for instant local connection), or
   - Via environment variables in `.env.local` / Vercel:
     ```env
     NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
     NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
     SUPABASE_URL="https://your-project-id.supabase.co"
     SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
     ADMIN_PASSCODE="your-secure-admin-passcode"
     ```

---

## Deploying to Vercel (Connected to GitHub)

This repository includes a preconfigured [`vercel.json`](./vercel.json) and is pushed to [`https://github.com/Christyomolayo20/rive-digitals.git`](https://github.com/Christyomolayo20/rive-digitals.git).

1. Go to [https://vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Click **Import** next to `Christyomolayo20/rive-digitals`.
3. Under **Environment Variables**, add:
   - `ADMIN_PASSCODE`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (Optional) `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`
4. Click **Deploy**. Every `git push origin main` will automatically build and deploy to your live Vercel URL.
