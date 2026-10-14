"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Key,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [configured, setConfigured] = useState(false);
  const [source, setSource] = useState("unconfigured");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadSettings = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.supabase) {
          setConfigured(json.supabase.configured);
          setSource(json.supabase.source);
          setUrl(json.supabase.url || "");
        }
      }
    } catch {
      // Handled
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setError(null);

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "configure_supabase",
          data: { url: url.trim(), key: key.trim() },
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback("Supabase credentials saved successfully. Testing connection...");
        await handleTestConnection();
        loadSettings();
      } else {
        setError(json.error || "Failed to save credentials");
      }
    } catch (err) {
      setError("Network error saving configuration.");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setFeedback(null);
    setError(null);

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "test_supabase",
        }),
      });

      const json = await res.json();
      if (json.connected) {
        setFeedback("Success! Live connection verified with Supabase database.");
        setConfigured(true);
      } else {
        setError(json.message || "Could not connect to Supabase database.");
      }
    } catch {
      setError("Connection test failed.");
    } finally {
      setTesting(false);
    }
  };

  const copySqlSchema = async () => {
    const sql = `-- RIVE DIGITALS SUPABASE SETUP SCRIPT
-- Copy and run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

create table if not exists public.site_settings (
  id text primary key default 'default',
  business_name text not null default 'Rive Digitals',
  tagline text not null default 'Strategic Digital Architecture for Ambitious Brands',
  email text not null default 'hello@rivedigitals.com',
  phone text default '+2348000000000',
  updated_at timestamptz not null default now()
);

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

create table if not exists public.team_members (
  id text primary key default gen_random_uuid()::text,
  full_name text not null,
  role text not null,
  bio text not null,
  image_url text not null default '/images/about-studio.jpg',
  social_links jsonb default '{}'::jsonb,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id text primary key,
  slug text unique not null,
  title text not null,
  short_title text not null,
  category text not null,
  offering_status text not null default 'core',
  short_description text not null,
  full_description text not null,
  problem_solved text not null default '',
  deliverables text[] not null default '{}',
  icon text not null default 'Sparkles',
  image_url text not null default '/images/services/brand-design.jpg',
  is_featured boolean not null default true,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

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
  created_at timestamptz not null default now()
);

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
  status text not null default 'new',
  is_read boolean not null default false,
  notes text default '',
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.about_sections enable row level security;
alter table public.team_members enable row level security;
alter table public.services enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.contact_submissions enable row level security;

create policy "Public read published about" on public.about_sections for select using (is_published = true);
create policy "Public read published team" on public.team_members for select using (is_published = true);
create policy "Public read published services" on public.services for select using (is_published = true);
create policy "Public read published projects" on public.portfolio_projects for select using (is_published = true);
create policy "Public submit contact" on public.contact_submissions for insert with check (true);
`;
    await navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
          Settings &amp; Database Integration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure Supabase database connection, inspect environment variables, and manage administrative security.
        </p>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Supabase Connection Manager */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-brand-navy">
                Supabase Connection Setup
              </h2>
              <p className="text-xs text-slate-500">
                Connect your hosted PostgreSQL database for real-time enquiries, team profiles, and portfolio items.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${testing ? "animate-spin" : ""}`} />
            <span>Test Connection</span>
          </button>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Supabase Project URL
            </label>
            <input
              type="url"
              required
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 font-mono focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Found under Supabase Dashboard → Settings → API → Project URL.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Supabase API Key (Anon or Service Role)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 font-mono focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Found under Supabase Dashboard → Settings → API → Project API Keys.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Configuration Source: <strong className="text-brand-navy font-mono">{source}</strong>
            </span>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save &amp; Connect</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SQL Setup Helper */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Database DDL &amp; Table Setup
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Run this script once in your Supabase SQL editor to create all required tables and RLS security policies.
            </p>
          </div>

          <button
            type="button"
            onClick={copySqlSchema}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-navy px-4 py-2 text-xs font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
          >
            {copiedSql ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy SQL Setup</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-48 border border-slate-800">
          <pre>{`-- Creates tables for site_settings, about_sections, team_members, services, portfolio_projects, contact_submissions
-- File location in codebase: supabase/schema.sql`}</pre>
        </div>
      </div>

      {/* Security & Roles Guide */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Security &amp; Administrator Accounts
            </h2>
            <p className="text-xs text-slate-500">
              Guidelines for production security and credentials management.
            </p>
          </div>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc list-inside">
          <li>
            <strong>Studio Passcode</strong>: Set <code className="text-brand-navy font-mono">ADMIN_PASSCODE</code> in your Vercel Environment Variables to change the login passcode.
          </li>
          <li>
            <strong>Supabase Auth</strong>: To invite specific team members by email, create accounts in your Supabase Authentication dashboard and add their user IDs to the <code className="text-brand-navy font-mono">admin_profiles</code> table.
          </li>
          <li>
            <strong>Zero Public Exposure</strong>: The public website contains no admin controls or links. All write endpoints reject unauthorized requests with HTTP 401.
          </li>
        </ul>
      </div>
    </div>
  );
}
