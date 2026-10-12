-- ============================================================================
-- RIVE DIGITALS — SUPABASE POSTGRES SCHEMA (supabase/schema.sql)
-- Run this script in your Supabase Dashboard -> SQL Editor to create all tables
-- for Client Enquiries, Portfolio Projects, Services, Blog Posts, and Settings.
-- ============================================================================

-- 1. CLIENT ENQUIRIES & QUOTE REQUESTS TABLE
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  full_name text not null,
  email text not null,
  phone text,
  company text not null,
  service text not null,
  budget text,
  description text not null,
  preferred_contact text not null default 'email',
  privacy_consent boolean not null default true,
  status text not null default 'new' check (status in ('new', 'in_review', 'responded', 'archived')),
  notes text default '',
  created_at timestamptz not null default now()
);

-- 2. PORTFOLIO PROJECTS TABLE (CMS OVERRIDES & ADDITIONS)
create table if not exists public.projects (
  id text primary key,
  slug text unique not null,
  title text not null,
  client_or_industry text not null,
  category text not null,
  tags text[] not null default '{}',
  thumbnail text not null,
  thumbnail_alt text not null,
  summary text not null,
  brief text not null,
  challenge text not null,
  solution text not null,
  deliverables text[] not null default '{}',
  featured boolean not null default false,
  completed_year text not null default '2026',
  created_at timestamptz not null default now()
);

-- 3. SERVICES TABLE (CMS STATUS & CONTENT OVERRIDES)
create table if not exists public.services (
  id text primary key,
  slug text unique not null,
  title text not null,
  short_title text not null,
  category text not null,
  offering_status text not null default 'core' check (offering_status in ('core', 'configurable')),
  image text not null,
  summary text not null,
  problem_solved text not null,
  deliverables text[] not null default '{}',
  featured boolean not null default true,
  updated_at timestamptz not null default now()
);

-- 4. SITE SETTINGS TABLE
create table if not exists public.site_settings (
  id text primary key default 'default',
  business_name text not null default 'Rive Digitals',
  tagline text not null default 'Strategic Digital Architecture for Ambitious Brands',
  email text not null default 'hello@rivedigitals.com',
  phone text default '',
  whatsapp_number text default '',
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.enquiries enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;

-- Public read access for published portfolio, services, and site settings
create policy "Allow public read on projects" on public.projects for select using (true);
create policy "Allow public read on services" on public.services for select using (true);
create policy "Allow public read on site_settings" on public.site_settings for select using (true);

-- Allow public insert on enquiries (validated by Next.js API route)
create policy "Allow public insert on enquiries" on public.enquiries for insert with check (true);
