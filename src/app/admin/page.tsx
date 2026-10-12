"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Inbox,
  FolderKanban,
  Layers,
  Database,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Mail,
  RefreshCw,
  ExternalLink,
  Lock,
} from "lucide-react";
import {
  EnquiryRecord,
  EnquiryStatus,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
} from "@/types";
import { cn, formatDate } from "@/lib/utils";

type AdminTab = "enquiries" | "portfolio" | "services" | "supabase";

const PRESET_PROJECT_IMAGES = [
  {
    label: "Fintech Brand & UI Mockup",
    value: "/images/portfolio/veridian-fintech.jpg",
  },
  {
    label: "Luxury E-Commerce Flagship",
    value: "/images/portfolio/atelier-kora.jpg",
  },
  {
    label: "Global B2B Logistics Platform",
    value: "/images/portfolio/nexus-freight.jpg",
  },
  {
    label: "CleanTech Campaign & ROI Lander",
    value: "/images/portfolio/solaris-cleantech.jpg",
  },
  {
    label: "Healthcare Patient Portal",
    value: "/images/portfolio/lumina-health.jpg",
  },
  {
    label: "Executive Corporate Rebrand",
    value: "/images/portfolio/monarch-advisory.jpg",
  },
];

export default function AdminDashboardPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("enquiries");
  const [loading, setLoading] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>("all");

  const [supabaseState, setSupabaseState] = useState<{
    configured: boolean;
    source: string;
    url: string;
    tableStatus: string;
  }>({
    configured: false,
    source: "unconfigured",
    url: "",
    tableStatus: "unconfigured",
  });

  // Supabase connection form state
  const [sbUrlInput, setSbUrlInput] = useState("");
  const [sbKeyInput, setSbKeyInput] = useState("");
  const [sbFeedback, setSbFeedback] = useState("");

  // New project form state
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjClient, setNewProjClient] = useState("");
  const [newProjCategory, setNewProjCategory] = useState<ProjectCategory>(
    "Web Design & Development"
  );
  const [newProjImage, setNewProjImage] = useState(
    PRESET_PROJECT_IMAGES[0].value
  );
  const [newProjSummary, setNewProjSummary] = useState("");
  const [newProjTags, setNewProjTags] = useState("Next.js, Brand System, UX");
  const [newProjFeatured, setNewProjFeatured] = useState(true);
  const [projFeedback, setProjFeedback] = useState("");

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", { cache: "no-store" });
      if (res.status === 401) {
        setAuthorized(false);
        return;
      }
      const data = await res.json();
      if (data.authorized) {
        setAuthorized(true);
        setEnquiries(data.enquiries || []);
        setProjects(data.projects || []);
        setServices(data.services || []);
        setSupabaseState(data.supabase);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", passcode }),
    });
    const data = await res.json();
    if (res.ok && data.authorized) {
      setAuthorized(true);
      fetchAdminData();
    } else {
      setAuthError(data.message || "Invalid passcode.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthorized(false);
    setPasscode("");
  };

  const handleStatusChange = async (
    referenceId: string,
    status: EnquiryStatus
  ) => {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "enquiry_status", referenceId, status }),
    });
    fetchAdminData();
  };

  const handleDeleteEnquiry = async (referenceId: string) => {
    await fetch(
      `/api/admin?referenceId=${encodeURIComponent(referenceId)}`,
      { method: "DELETE" }
    );
    fetchAdminData();
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjFeedback("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_project",
        title: newProjTitle,
        clientOrIndustry: newProjClient,
        category: newProjCategory,
        thumbnail: newProjImage,
        summary: newProjSummary,
        tags: newProjTags,
        featured: newProjFeatured,
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setNewProjTitle("");
      setNewProjClient("");
      setNewProjSummary("");
      setProjFeedback("Project published to portfolio!");
      fetchAdminData();
    } else {
      setProjFeedback(data.message || "Could not add project.");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    await fetch(`/api/admin?projectId=${encodeURIComponent(projectId)}`, {
      method: "DELETE",
    });
    fetchAdminData();
  };

  const handleToggleServiceStatus = async (service: ServiceItem) => {
    const nextStatus =
      service.offeringStatus === "core" ? "configurable" : "core";
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "service_update",
        serviceId: service.id,
        offeringStatus: nextStatus,
      }),
    });
    fetchAdminData();
  };

  const handleConnectSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSbFeedback("Testing connection...");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "connect_supabase",
        url: sbUrlInput,
        key: sbKeyInput,
      }),
    });
    const data = await res.json();
    setSbFeedback(data.message || "Updated.");
    if (res.ok) {
      setSbKeyInput("");
      fetchAdminData();
    }
  };

  // Login Screen
  if (authorized === false) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-brand-canvas">
        <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-coral mb-6">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-brand-navy">
            Rive Digitals Admin Portal
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to manage client enquiries, portfolio case studies, service
            scopes, and your Supabase database connection.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Admin Passcode
              </label>
              <input
                id="admin-passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: rive-admin-2026)"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-coral"
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-red-600">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-coral-strong px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
            >
              Sign In to Admin Studio
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-600">
            <strong>Default Local Passcode:</strong>{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-brand-navy border">
              rive-admin-2026
            </code>{" "}
            (Change via <code className="font-mono">ADMIN_PASSCODE</code> in{" "}
            <code className="font-mono">.env.local</code> or Vercel).
          </div>
        </div>
      </section>
    );
  }

  const filteredEnquiries =
    statusFilter === "all"
      ? enquiries
      : enquiries.filter((e) => e.status === statusFilter);

  const newLeadsCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="min-h-screen bg-brand-canvas pb-20">
      {/* Top Admin Header */}
      <div className="bg-brand-navy text-white border-b border-brand-navy-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 px-3 py-0.5 text-xs font-semibold text-brand-coral">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Studio &amp; CMS
              </span>
              <span
                className={cn(
                  "rounded-full px-3 py-0.5 text-xs font-semibold",
                  supabaseState.configured
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                )}
              >
                {supabaseState.configured
                  ? "Supabase Connected"
                  : "Hybrid Local + Supabase Ready"}
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold">
              Rive Digitals Command Centre
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fetchAdminData}
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              Refresh
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
            >
              View Live Site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-600/20 border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Enquiries
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-brand-navy">
              {enquiries.length}
            </p>
            <p className="mt-1 text-xs text-brand-coral-strong font-medium">
              {newLeadsCount} unread / new
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Portfolio Projects
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-brand-navy">
              {projects.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {projects.filter((p) => p.featured).length} featured on Home
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Service Verticals
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-brand-navy">
              {services.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {services.filter((s) => s.offeringStatus === "core").length} core
              capabilities
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Database Engine
            </p>
            <p className="mt-2 font-display text-xl font-extrabold text-brand-navy">
              {supabaseState.configured ? "Supabase Postgres" : "Local Hybrid"}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("supabase")}
              className="mt-1 text-xs font-semibold text-brand-coral-strong hover:underline"
            >
              Configure Supabase →
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex overflow-x-auto gap-2 border-b border-slate-200 pb-3">
          {[
            {
              id: "enquiries",
              label: `Client Enquiries (${enquiries.length})`,
              icon: Inbox,
            },
            {
              id: "portfolio",
              label: `Portfolio Manager (${projects.length})`,
              icon: FolderKanban,
            },
            {
              id: "services",
              label: `Services & Scopes (${services.length})`,
              icon: Layers,
            },
            {
              id: "supabase",
              label: "Supabase Database Setup",
              icon: Database,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all",
                  active
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-brand-navy"
                )}
              >
                <Icon className="h-4 w-4 text-brand-coral" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENQUIRIES INBOX */}
        {activeTab === "enquiries" && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(["all", "new", "in_review", "responded", "archived"] as const).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
                        statusFilter === st
                          ? "bg-brand-coral-strong text-white"
                          : "bg-white border border-slate-200 text-slate-600"
                      )}
                    >
                      {st.replace("_", " ")}
                    </button>
                  )
                )}
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-brand-coral-strong hover:underline"
              >
                + Submit Test Enquiry via Contact Form
              </Link>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
                <Inbox className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3 font-display text-lg font-bold text-brand-navy">
                  No enquiries in this view
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  When prospective clients submit the Request a Quote form,
                  their details appear here and sync with Supabase.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map((item) => (
                  <div
                    key={item.referenceId}
                    className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card flex flex-col lg:flex-row lg:items-start justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-md bg-brand-navy px-2.5 py-1 font-mono text-xs font-bold text-brand-coral">
                          {item.referenceId}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-0.5 text-xs font-semibold uppercase",
                            item.status === "new" &&
                              "bg-emerald-100 text-emerald-800",
                            item.status === "in_review" &&
                              "bg-amber-100 text-amber-800",
                            item.status === "responded" &&
                              "bg-blue-100 text-blue-800",
                            item.status === "archived" &&
                              "bg-slate-100 text-slate-600"
                          )}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatDate(item.submittedAt)}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-brand-navy">
                        {item.fullName} —{" "}
                        <span className="text-brand-coral-strong">
                          {item.company}
                        </span>
                      </h3>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                        <span>
                          <strong>Email:</strong> {item.email}
                        </span>
                        <span>
                          <strong>Phone:</strong> {item.phone}
                        </span>
                        <span>
                          <strong>Service:</strong> {item.service}
                        </span>
                        <span>
                          <strong>Preferred:</strong> {item.preferredContact}
                        </span>
                      </div>

                      <p className="mt-2 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-sm text-slate-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap lg:flex-col items-stretch gap-2 shrink-0">
                      <select
                        aria-label={`Update status for ${item.referenceId}`}
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item.referenceId,
                            e.target.value as EnquiryStatus
                          )
                        }
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-brand-navy"
                      >
                        <option value="new">Status: New</option>
                        <option value="in_review">Status: In Review</option>
                        <option value="responded">Status: Responded</option>
                        <option value="archived">Status: Archived</option>
                      </select>

                      <a
                        href={`mailto:${item.email}?subject=Re:%20Your%20Rive%20Digitals%20Enquiry%20(${item.referenceId})`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-navy px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-navy-elevated"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Reply via Email
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteEnquiry(item.referenceId)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGER */}
        {activeTab === "portfolio" && (
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Add New Project Form */}
            <form
              onSubmit={handleAddProject}
              className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-card space-y-4 h-fit"
            >
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-brand-coral-strong" />
                <h2 className="font-display text-lg font-bold text-brand-navy">
                  Add Portfolio Project
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g., Zenith Commerce — Brand & Web Redesign"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy">
                    Client / Industry *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    placeholder="e.g., Retail & FinTech"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-navy">
                    Category
                  </label>
                  <select
                    value={newProjCategory}
                    onChange={(e) =>
                      setNewProjCategory(e.target.value as ProjectCategory)
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  >
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Web Design & Development">
                      Web Design &amp; Development
                    </option>
                    <option value="Digital Strategy & Growth">
                      Digital Strategy &amp; Growth
                    </option>
                    <option value="Content & Campaigns">
                      Content &amp; Campaigns
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Showcase Photography
                </label>
                <select
                  value={newProjImage}
                  onChange={(e) => setNewProjImage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                >
                  {PRESET_PROJECT_IMAGES.map((img) => (
                    <option key={img.value} value={img.value}>
                      {img.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newProjTags}
                  onChange={(e) => setNewProjTags(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy">
                  Executive Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newProjSummary}
                  onChange={(e) => setNewProjSummary(e.target.value)}
                  placeholder="1–2 sentences describing what was built and the business impact..."
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                <input
                  type="checkbox"
                  checked={newProjFeatured}
                  onChange={(e) => setNewProjFeatured(e.target.checked)}
                />
                Feature on Homepage
              </label>

              {projFeedback && (
                <p className="text-xs font-semibold text-emerald-700">
                  {projFeedback}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-brand-coral-strong px-5 py-3 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
              >
                Publish Project
              </button>
            </form>

            {/* Existing Projects List */}
            <div className="lg:col-span-7 space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-card"
                >
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proj.thumbnail}
                      alt={proj.thumbnailAlt}
                      className="h-16 w-24 rounded-xl object-cover shrink-0 bg-brand-navy"
                    />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-coral-strong">
                        {proj.category}
                      </span>
                      <h3 className="font-display text-base font-bold text-brand-navy">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {proj.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Link
                      href={`/work/${proj.slug}`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-card flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.image}
                    alt={svc.imageAlt}
                    className="h-16 w-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-brand-navy">
                      {svc.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">{svc.summary}</p>
                    <span
                      className={cn(
                        "mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        svc.offeringStatus === "core"
                          ? "bg-brand-navy text-white"
                          : "bg-brand-coral-light text-brand-coral-strong"
                      )}
                    >
                      {svc.offeringStatus === "core"
                        ? "Confirmed Core Capability"
                        : "Configurable Scope"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleServiceStatus(svc)}
                  className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-brand-navy hover:bg-slate-50"
                >
                  Toggle Status
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SUPABASE CONNECTION & SCHEMA */}
        {activeTab === "supabase" && (
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleConnectSupabase}
              className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card space-y-5"
            >
              <div className="flex items-center gap-2.5">
                <Database className="h-5 w-5 text-brand-coral-strong" />
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  Connect Supabase Project
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enter your Supabase Project URL and Service Role Key (or Anon
                Key) below to connect live Postgres persistence, or set{" "}
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                  SUPABASE_URL
                </code>{" "}
                and{" "}
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                  SUPABASE_SERVICE_ROLE_KEY
                </code>{" "}
                in Vercel Environment Variables.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  required
                  value={sbUrlInput}
                  onChange={(e) => setSbUrlInput(e.target.value)}
                  placeholder="https://your-project-id.supabase.co"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Supabase Service Role or Anon Key
                </label>
                <input
                  type="password"
                  required
                  value={sbKeyInput}
                  onChange={(e) => setSbKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </div>

              {sbFeedback && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-900">
                  {sbFeedback}
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-brand-coral-strong px-6 py-3 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
              >
                Save &amp; Verify Supabase Connection
              </button>
            </form>

            <div className="lg:col-span-6 rounded-2xl bg-brand-navy text-white p-6 sm:p-8 border border-brand-navy-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                  SQL Migration Ready
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  supabase/schema.sql
                </span>
              </div>
              <h3 className="font-display text-lg font-bold">
                One-Click Supabase Table Setup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Open your Supabase project&apos;s <strong>SQL Editor</strong>{" "}
                and paste the contents of{" "}
                <code className="text-brand-coral">supabase/schema.sql</code> to
                provision the <code className="text-white">enquiries</code>,{" "}
                <code className="text-white">projects</code>,{" "}
                <code className="text-white">services</code>, and{" "}
                <code className="text-white">site_settings</code> tables with
                Row Level Security (RLS).
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral" />
                  <span>
                    Automatic sync for Contact &amp; Quote Form submissions
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral" />
                  <span>
                    Lead status pipeline (New → In Review → Responded)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-coral" />
                  <span>Portfolio &amp; Service scope CMS persistence</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
