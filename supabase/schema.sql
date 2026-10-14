-- ============================================================================
-- RIVE DIGITALS — COMPLETE SUPABASE POSTGRES SCHEMA & RLS POLICIES
-- File: supabase/schema.sql (and supabase/migrations/001_initial_schema.sql)
--
-- Run this complete script in your Supabase Dashboard -> SQL Editor.
-- It creates all required tables, constraints, RLS security policies,
-- storage buckets, and seeds initial data for Rive Digitals.
-- ============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. ADMIN PROFILES TABLE (Supabase Auth role-based authorization)
-- ============================================================================
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null default 'Administrator',
  role text not null default 'admin' check (role in ('admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 2. SITE SETTINGS TABLE (Editable business metadata & branding)
-- ============================================================================
create table if not exists public.site_settings (
  id text primary key default 'default',
  business_name text not null default 'Rive Digitals',
  tagline text not null default 'Strategic Digital Architecture for Ambitious Brands',
  description text not null default 'Rive Digitals is a digital services and business growth partner helping startups, SMBs, and established organisations strengthen brand identity, build high-converting websites, and scale digital presence.',
  email text not null default 'hello@rivedigitals.com',
  phone text default '+2348000000000',
  whatsapp_number text default '2348000000000',
  location_summary text default 'Remote-First Digital Studio • Serving Clients Globally',
  working_hours text default 'Monday – Friday, 9:00 AM – 6:00 PM (WAT / GMT+1)',
  social_links jsonb not null default '[
    {"platform": "Facebook", "url": "https://www.facebook.com/rivedigitals", "handle": "@rivedigitals"},
    {"platform": "Instagram", "url": "https://www.instagram.com/rivedigitals", "handle": "@rivedigitals"},
    {"platform": "TikTok", "url": "https://www.tiktok.com/@rivedigitals", "handle": "@rivedigitals"}
  ]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 3. ABOUT SECTIONS TABLE (Editable company intro, story, mission, vision, values, process)
-- ============================================================================
create table if not exists public.about_sections (
  id text primary key,
  section_key text unique not null,
  title text not null,
  subtitle text default '',
  content text not null,
  items jsonb default '[]'::jsonb,
  is_published boolean not null default true,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 4. TEAM MEMBERS TABLE (Editable team profiles)
-- ============================================================================
create table if not exists public.team_members (
  id text primary key default gen_random_uuid()::text,
  full_name text not null,
  role text not null,
  bio text not null,
  image_url text not null default '/images/about-studio.jpg',
  social_links jsonb default '{}'::jsonb,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 5. SERVICES TABLE (Editable digital capabilities & deliverables)
-- ============================================================================
create table if not exists public.services (
  id text primary key,
  slug text unique not null,
  title text not null,
  short_title text not null,
  category text not null,
  offering_status text not null default 'core' check (offering_status in ('core', 'configurable')),
  short_description text not null,
  full_description text not null,
  problem_solved text not null default '',
  deliverables text[] not null default '{}',
  icon text not null default 'Sparkles',
  image_url text not null default '/images/services/brand-design.jpg',
  is_featured boolean not null default true,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 6. PORTFOLIO PROJECTS TABLE (Editable case studies)
-- ============================================================================
create table if not exists public.portfolio_projects (
  id text primary key,
  slug text unique not null,
  title text not null,
  client_name text not null,
  category text not null,
  short_description text not null,
  challenge text not null default '',
  solution text not null default '',
  cover_image text not null,
  gallery_images text[] not null default '{}',
  services_delivered text[] not null default '{}',
  project_url text default '',
  completion_date text default '2026',
  is_featured boolean not null default false,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Maintain backward-compatible synonym view if needed
create or replace view public.projects as select * from public.portfolio_projects;

-- ============================================================================
-- 7. CONTACT SUBMISSIONS TABLE (Enquiries & Client Messages)
-- ============================================================================
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text default '',
  company text default '',
  service_interest text not null,
  subject text default '',
  message text not null,
  budget text default '',
  preferred_contact text default 'email',
  status text not null default 'new' check (status in ('new', 'in_progress', 'responded', 'closed')),
  is_read boolean not null default false,
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Maintain backward-compatible synonym view if needed
create or replace view public.enquiries as 
select 
  id, 
  id::text as reference_id,
  full_name,
  email,
  phone,
  coalesce(company, '') as company,
  service_interest as service,
  budget,
  message as description,
  preferred_contact,
  true as privacy_consent,
  case 
    when status = 'in_progress' then 'in_review'
    when status = 'closed' then 'archived'
    else status
  end as status,
  notes,
  created_at
from public.contact_submissions;

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table public.admin_profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.about_sections enable row level security;
alter table public.team_members enable row level security;
alter table public.services enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.contact_submissions enable row level security;

-- Drop existing policies if re-running script to avoid conflicts
drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Public can read published about sections" on public.about_sections;
drop policy if exists "Public can read published team members" on public.team_members;
drop policy if exists "Public can read published services" on public.services;
drop policy if exists "Public can read published portfolio projects" on public.portfolio_projects;
drop policy if exists "Public can submit contact form" on public.contact_submissions;
drop policy if exists "Admins have full access to site_settings" on public.site_settings;
drop policy if exists "Admins have full access to about_sections" on public.about_sections;
drop policy if exists "Admins have full access to team_members" on public.team_members;
drop policy if exists "Admins have full access to services" on public.services;
drop policy if exists "Admins have full access to portfolio_projects" on public.portfolio_projects;
drop policy if exists "Admins have full access to contact_submissions" on public.contact_submissions;
drop policy if exists "Admins have full access to admin_profiles" on public.admin_profiles;

-- PUBLIC POLICIES: Visitors can only view published content
create policy "Public can read site settings"
  on public.site_settings for select using (true);

create policy "Public can read published about sections"
  on public.about_sections for select using (is_published = true);

create policy "Public can read published team members"
  on public.team_members for select using (is_published = true);

create policy "Public can read published services"
  on public.services for select using (is_published = true);

create policy "Public can read published portfolio projects"
  on public.portfolio_projects for select using (is_published = true);

create policy "Public can submit contact form"
  on public.contact_submissions for insert with check (true);

-- ADMIN POLICIES: Authenticated users who exist in admin_profiles with role='admin'
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
end;
$$ language plpgsql;

create policy "Admins have full access to site_settings"
  on public.site_settings for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to about_sections"
  on public.about_sections for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to team_members"
  on public.team_members for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to services"
  on public.services for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to portfolio_projects"
  on public.portfolio_projects for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to contact_submissions"
  on public.contact_submissions for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

create policy "Admins have full access to admin_profiles"
  on public.admin_profiles for all
  using (public.is_admin() or auth.jwt()->>'role' = 'service_role')
  with check (public.is_admin() or auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- 9. SUPABASE STORAGE BUCKET FOR MEDIA ASSETS
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('rive-media', 'rive-media', true)
on conflict (id) do update set public = true;

-- Storage policies: Public read, Admin upload/modify
drop policy if exists "Public can read media assets" on storage.objects;
create policy "Public can read media assets"
  on storage.objects for select
  using (bucket_id = 'rive-media');

drop policy if exists "Admins can upload media assets" on storage.objects;
create policy "Admins can upload media assets"
  on storage.objects for insert
  with check (bucket_id = 'rive-media' and (public.is_admin() or auth.jwt()->>'role' = 'service_role'));

drop policy if exists "Admins can update and delete media assets" on storage.objects;
create policy "Admins can update and delete media assets"
  on storage.objects for all
  using (bucket_id = 'rive-media' and (public.is_admin() or auth.jwt()->>'role' = 'service_role'));

-- ============================================================================
-- 10. INITIAL SEED DATA (Real approved Rive Digitals data)
-- ============================================================================

-- Site Settings Seed
insert into public.site_settings (id, business_name, tagline, email, phone, whatsapp_number)
values (
  'default',
  'Rive Digitals',
  'Strategic Digital Architecture for Ambitious Brands',
  'hello@rivedigitals.com',
  '+2348000000000',
  '2348000000000'
)
on conflict (id) do nothing;

-- About Sections Seed
insert into public.about_sections (id, section_key, title, subtitle, content, items, is_published, display_order)
values
(
  'about-intro',
  'intro',
  'Bridging Business Quality and Digital Perception',
  'About Rive Digitals',
  'Rive Digitals is a full-stack digital solutions and brand growth partner. We collaborate with startups, SMEs, and established organizations to build distinctive visual identities, high-converting websites, and measurable growth systems.',
  '[]'::jsonb,
  true,
  1
),
(
  'about-story',
  'story',
  'Founded to Eliminate Digital Mediocrity',
  'Our Story',
  'Too many businesses lose potential clients not because their services are lacking, but because their digital presence fails to convey the caliber of their work. Rive Digitals was established to unite senior visual craft with engineering discipline—delivering digital assets that command trust.',
  '[]'::jsonb,
  true,
  2
),
(
  'about-mission',
  'mission',
  'High-Trust Digital Foundations',
  'Our Mission',
  'To equip growth-minded businesses with cohesive brand systems and high-converting websites that turn audience attention into measurable client relationships.',
  '[]'::jsonb,
  true,
  3
),
(
  'about-vision',
  'vision',
  'Practical Digital Excellence',
  'Our Vision',
  'To be the preferred digital partner for ambitious brands worldwide—recognized for sharp positioning, architectural design quality, and dependable full-stack execution.',
  '[]'::jsonb,
  true,
  4
),
(
  'about-values',
  'values',
  'Four Principles Behind Every Project',
  'Core Values',
  'Our operational values govern every client interaction, line of code, and design deliverable.',
  '[
    {"title": "Clarity First", "description": "Design and code exist to make your business easier to understand, trust, and buy from.", "icon": "Compass"},
    {"title": "Disciplined Delivery", "description": "Transparent scopes, clear milestones, and clean code your team owns completely.", "icon": "ShieldCheck"},
    {"title": "Visual Craft", "description": "From brand monograms to mobile load speeds, we sweat the details that signal authority.", "icon": "Sparkles"},
    {"title": "True Partnership", "description": "We work alongside founders and marketing teams as an accountable growth partner.", "icon": "Users"}
  ]'::jsonb,
  true,
  5
),
(
  'about-process',
  'process',
  'Four Simple Steps From Brief to Launch',
  'Working Process',
  'Every engagement is delivered through a transparent, four-phase delivery framework that ensures quality and predictability.',
  '[
    {"number": "01", "title": "Discovery & Strategy", "description": "We analyze your business model, target market, and positioning requirements."},
    {"number": "02", "title": "Architecture & Prototyping", "description": "We design high-fidelity interactive wireframes and design tokens."},
    {"number": "03", "title": "Production Engineering", "description": "We build fast, responsive, and SEO-optimized web systems."},
    {"number": "04", "title": "Launch & Measurement", "description": "Rigorous QA testing, domain deployment, and handover."}
  ]'::jsonb,
  true,
  6
)
on conflict (id) do nothing;

-- Team Members Seed (Sample starting profiles ready for Admin customization)
insert into public.team_members (id, full_name, role, bio, image_url, social_links, display_order, is_published)
values
(
  'team-lead-strategy',
  'Christianah Olaniyi',
  'Creative Director & Brand Strategist',
  'Spearheads brand positioning, visual identity direction, and multi-channel creative systems for ambitious digital brands.',
  '/images/about-studio.jpg',
  '{"facebook": "https://www.facebook.com/rivedigitals", "instagram": "https://www.instagram.com/rivedigitals", "tiktok": "https://www.tiktok.com/@rivedigitals"}'::jsonb,
  1,
  true
),
(
  'team-lead-engineering',
  'Engineering Lead',
  'Full-Stack Web Architect',
  'Oversees Next.js web application architecture, database schemas, performance optimization, and API integrations.',
  '/images/about-studio.jpg',
  '{"facebook": "https://www.facebook.com/rivedigitals", "instagram": "https://www.instagram.com/rivedigitals", "tiktok": "https://www.tiktok.com/@rivedigitals"}'::jsonb,
  2,
  true
)
on conflict (id) do nothing;

-- Services Seed
insert into public.services (id, slug, title, short_title, category, offering_status, short_description, full_description, problem_solved, deliverables, icon, image_url, is_featured, display_order, is_published)
values
(
  'service-brand-identity',
  'brand-identity-graphic-design',
  'Brand Identity & Graphic Design',
  'Brand Identity',
  'Brand & Design',
  'core',
  'Memorable visual identities, logos, design tokens, and corporate collateral that establish immediate market authority.',
  'We create cohesive, scalable brand identity systems built for digital and physical touchpoints. From monogram design and typography rules to comprehensive brand guidelines, we position your business to stand out.',
  'Solves inconsistent visual representation, unmemorable brand assets, and lack of perceived market authority.',
  array['Primary & Secondary Brand Logos', 'Design Tokens & Color Hierarchy', 'Typography Pairing Rules', 'Comprehensive Brand Guidelines', 'Social Media Asset Templates', 'Print & Digital Collateral'],
  'Sparkles',
  '/images/services/brand-design.jpg',
  true,
  1,
  true
),
(
  'service-website-design-development',
  'website-design-development',
  'Website Design & Development',
  'Web Development',
  'Engineering & UX',
  'core',
  'High-performance, accessible, and conversion-ready websites engineered with Next.js, TypeScript, and modern headless CMS.',
  'We design and build bespoke web experiences engineered for sub-second page loads, mobile responsiveness, and high conversion rates. Complete with built-in Admin CMS, SEO architecture, and accessibility compliance.',
  'Solves slow, bloated website templates, poor mobile responsiveness, low enquiry conversion, and hard-to-update pages.',
  array['Custom Responsive UI/UX Design', 'Next.js 14 App Router Architecture', 'Integrated Admin CMS & Supabase', 'Automated Lead & Contact Spooling', 'Technical SEO & Open Graph Setup', 'WCAG AA Accessibility Compliance'],
  'Code2',
  '/images/services/web-engineering.jpg',
  true,
  2,
  true
),
(
  'service-digital-strategy',
  'business-branding-digital-strategy',
  'Business Branding & Digital Strategy',
  'Digital Strategy',
  'Strategy & Growth',
  'configurable',
  'Market positioning, digital audits, competitor benchmarking, and architectural roadmaps to scale customer acquisition.',
  'A strategic blueprint that aligns your business offerings with high-value market demand. We analyze your customer acquisition funnel and craft clear digital roadmaps.',
  'Solves unclear market positioning, wasted marketing spend, and lack of cohesive digital direction.',
  array['Market & Competitor Positioning Audit', 'Ideal Customer Profile (ICP) Mapping', 'Digital Customer Journey Blueprint', 'Quarterly Growth Roadmap'],
  'Target',
  '/images/services/brand-design.jpg',
  true,
  3,
  true
),
(
  'service-digital-marketing',
  'digital-marketing-advertising',
  'Digital Marketing & Advertising',
  'Marketing & Ads',
  'Growth & Media',
  'configurable',
  'Data-driven paid media, targeted acquisition funnels, and performance marketing designed to generate qualified business leads.',
  'Structured acquisition campaigns across Google Search, LinkedIn, and Meta that deliver measurable ROAS and qualified B2B/B2C pipeline.',
  'Solves poor lead quality, untracked marketing spend, and low conversion on landing pages.',
  array['Audience Segmentation & Persona Setup', 'High-Converting Landing Page Copy', 'Ad Creative & Copy Variations', 'Attribution & Analytics Dashboard'],
  'TrendingUp',
  '/images/services/web-engineering.jpg',
  true,
  4,
  true
),
(
  'service-content-creation',
  'content-creation-marketing',
  'Content Creation & Marketing',
  'Content & Media',
  'Content & Media',
  'configurable',
  'Authoritative thought leadership, case study editorial, copywriting, and visual assets that convert visitors into clients.',
  'Persuasive storytelling that positions your executive team as trusted experts in your industry.',
  'Solves generic AI-generated copy, low search visibility, and lack of buyer trust.',
  array['Website Copywriting & Value Propositions', 'B2B Case Study Narrative Development', 'Search-Optimized Editorial Content', 'Visual Content Packs for Social Channels'],
  'PenTool',
  '/images/services/brand-design.jpg',
  false,
  5,
  true
),
(
  'service-social-media',
  'social-media-management',
  'Social Media Management',
  'Social & Community',
  'Social & Community',
  'configurable',
  'Consistent social branding, scheduled content calendars, and community systems that amplify your brand footprint.',
  'Professional channel management for B2B and consumer brands looking to build an engaged, high-trust community.',
  'Solves sporadic posting, fragmented brand presentation, and low organic engagement.',
  array['Monthly Content Planning & Calendar', 'Branded Graphic & Carousel Templates', 'Engagement & Community Workflows', 'Monthly Performance & Insights Reporting'],
  'Share2',
  '/images/services/web-engineering.jpg',
  false,
  6,
  true
)
on conflict (id) do nothing;

-- Portfolio Projects Seed
insert into public.portfolio_projects (id, slug, title, client_name, category, short_description, challenge, solution, cover_image, gallery_images, services_delivered, project_url, completion_date, is_featured, display_order, is_published)
values
(
  'proj-veridian-fintech',
  'veridian-fintech-brand-platform',
  'Veridian FinTech — Global Digital Asset Architecture',
  'Veridian Capital Holdings',
  'Brand & Web Engineering',
  'Complete corporate visual identity system and institutional web portal for a cross-border asset management firm.',
  'Veridian required an enterprise-grade digital rebrand that inspired institutional trust while simplifying complex cross-border liquidity mechanisms for high-net-worth investors.',
  'Engineered a deep navy and crisp slate design system, responsive data visualization dashboards, and sub-second Next.js web portal.',
  '/images/portfolio/veridian-fintech.jpg',
  array['/images/portfolio/veridian-fintech.jpg', '/images/hero-showcase.jpg'],
  array['Institutional Brand Identity', 'Design Tokens & Component Library', 'Next.js 14 Web Architecture', 'Security & Compliance Hardening'],
  'https://veridian.example.com',
  '2026',
  true,
  1,
  true
),
(
  'proj-atelier-kora',
  'atelier-kora-luxury-commerce',
  'Atelier Kora — Luxury Sustainable E-Commerce',
  'Atelier Kora',
  'E-Commerce & Digital Brand',
  'Flagship headless e-commerce experience showcasing bespoke handcrafted fashion with immersive editorial storytelling.',
  'High cart abandonment on previous platform, sluggish mobile loading, and fragmented luxury brand perception.',
  'Designed an editorial typographic visual language, streamlined 2-step checkout, and headless product catalog.',
  '/images/portfolio/atelier-kora.jpg',
  array['/images/portfolio/atelier-kora.jpg', '/images/services/brand-design.jpg'],
  array['Luxury Brand Guidelines', 'Headless E-Commerce UX', 'Core Web Vitals Optimization', 'Global Currency & Tax Localization'],
  'https://atelierkora.example.com',
  '2026',
  true,
  2,
  true
),
(
  'proj-nexus-freight',
  'nexus-logistics-b2b-platform',
  'Nexus Freight — Smart B2B Logistics Ecosystem',
  'Nexus Global Logistics',
  'Enterprise Web & Systems',
  'Automated freight quotation platform and multi-tier enterprise client portal for international supply chains.',
  'Manual freight quote calculation causing 24-hour lead friction and poor carrier visibility for enterprise cargo shippers.',
  'Built an interactive dynamic freight quote estimator and real-time tracking dashboard.',
  '/images/portfolio/nexus-freight.jpg',
  array['/images/portfolio/nexus-freight.jpg', '/images/services/web-engineering.jpg'],
  array['Dynamic Freight Quote Estimator', 'B2B Client Dashboard', 'Automated Lead Qualification Funnel', 'Enterprise Security Audit'],
  'https://nexusfreight.example.com',
  '2025',
  true,
  3,
  true
),
(
  'proj-solaris-cleantech',
  'solaris-energy-campaign-platform',
  'Solaris CleanTech — Commercial Solar Lead Engine',
  'Solaris Energy Systems',
  'Growth Marketing & Web',
  'Conversion-engineered digital campaign and commercial solar ROI calculator driving qualified enterprise consultations.',
  'Low organic conversion rate and high cost-per-lead on standard generic landing pages.',
  'Deployed an interactive commercial solar ROI calculator and personalized energy savings estimator.',
  '/images/portfolio/solaris-cleantech.jpg',
  array['/images/portfolio/solaris-cleantech.jpg', '/images/hero-showcase.jpg'],
  array['Commercial Solar ROI Calculator', 'High-Converting Campaign Landers', 'CRM Lead Webhook Integration', 'Analytics & Attribution Setup'],
  'https://solarisenergy.example.com',
  '2025',
  true,
  4,
  true
),
(
  'proj-lumina-health',
  'lumina-health-portal',
  'Lumina Health — Telemedicine & Patient Portal',
  'Lumina Healthcare Group',
  'Healthcare UX & Engineering',
  'Secure, accessible telehealth interface enabling patients to book certified clinical consultations in seconds.',
  'Complex patient onboarding and HIPAA-grade privacy requirements requiring seamless user experience.',
  'Crafted an accessible WCAG AA certified appointment booking flow with end-to-end appointment scheduling.',
  '/images/portfolio/lumina-health.jpg',
  array['/images/portfolio/lumina-health.jpg', '/images/about-studio.jpg'],
  array['Telehealth Booking Flow', 'WCAG 2.1 AA Compliance', 'Patient Onboarding Architecture', 'Multi-Device Performance Optimization'],
  'https://luminahealth.example.com',
  '2025',
  false,
  5,
  true
),
(
  'proj-monarch-advisory',
  'monarch-advisory-rebrand',
  'Monarch Advisory — Executive Rebrand & Firm Identity',
  'Monarch Capital Advisory',
  'Brand Identity & Collateral',
  'Sophisticated visual rebrand and executive thought leadership platform for a boutique M&A consultancy.',
  'Outdated brand identity failed to communicate modern M&A advisory expertise to institutional founders.',
  'Delivered a timeless serif-and-geometric monogram, executive pitch deck system, and thought leadership editorial platform.',
  '/images/portfolio/monarch-advisory.jpg',
  array['/images/portfolio/monarch-advisory.jpg', '/images/services/brand-design.jpg'],
  array['Corporate Monogram & Mark', 'Executive Pitch Deck System', 'Investor Relations Web Platform', 'Print & Stationery Production'],
  'https://monarchadvisory.example.com',
  '2025',
  false,
  6,
  true
)
on conflict (id) do nothing;
