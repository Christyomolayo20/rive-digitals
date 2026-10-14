"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Layers,
  Users,
  Inbox,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Database,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DashboardData {
  metrics: {
    publishedProjectsCount: number;
    activeServicesCount: number;
    teamMembersCount: number;
    totalSubmissionsCount: number;
    unreadSubmissionsCount: number;
    isSupabaseConnected: boolean;
    supabaseSource: string;
  };
  messages: any[];
  supabase: {
    configured: boolean;
    source: string;
    url: string;
  };
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        headers: { "x-admin-passcode": passcode },
      });
      if (!res.ok) {
        throw new Error("Failed to load dashboard data");
      }
      const json = await res.json();
      setData(json);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading Studio Dashboard...
          </span>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics;
  const recentMessages = (data?.messages || []).slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Studio Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome to the Rive Digitals management dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRefreshing(true);
            loadData();
          }}
          disabled={refreshing}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Supabase Status Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              metrics?.isSupabaseConnected
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy">
              Supabase Database Backend:{" "}
              {metrics?.isSupabaseConnected ? (
                <span className="text-emerald-700">Connected ({metrics.supabaseSource})</span>
              ) : (
                <span className="text-amber-700">Local Hybrid Mode</span>
              )}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {metrics?.isSupabaseConnected
                ? `Active endpoint: ${data?.supabase?.url || "Configured"}`
                : "Database credentials are not yet configured. Leads and changes are stored locally."}
            </p>
          </div>
        </div>

        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-brand-navy px-4 py-2 text-xs font-semibold text-white hover:bg-brand-navy-elevated transition-colors shrink-0"
        >
          <span>{metrics?.isSupabaseConnected ? "Database Settings" : "Connect Supabase"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 5 Real Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Published Projects
            </span>
            <FolderKanban className="h-4 w-4 text-brand-coral" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand-navy">
            {metrics?.publishedProjectsCount ?? 0}
          </p>
          <Link
            href="/admin/portfolio"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-coral hover:underline"
          >
            <span>Manage Projects</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Services
            </span>
            <Layers className="h-4 w-4 text-brand-navy" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand-navy">
            {metrics?.activeServicesCount ?? 0}
          </p>
          <Link
            href="/admin/services"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:underline"
          >
            <span>Manage Scopes</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Team Profiles
            </span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand-navy">
            {metrics?.teamMembersCount ?? 0}
          </p>
          <Link
            href="/admin/team"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
          >
            <span>Manage Team</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Enquiries
            </span>
            <Inbox className="h-4 w-4 text-slate-600" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand-navy">
            {metrics?.totalSubmissionsCount ?? 0}
          </p>
          <Link
            href="/admin/messages"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:underline"
          >
            <span>View All Leads</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl bg-white border border-brand-coral/30 bg-brand-coral-light/20 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-coral-strong uppercase tracking-wider">
              Unread Leads
            </span>
            <span className="h-2 w-2 rounded-full bg-brand-coral animate-ping" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand-coral-strong">
            {metrics?.unreadSubmissionsCount ?? 0}
          </p>
          <Link
            href="/admin/messages?status=new"
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-coral-strong hover:underline"
          >
            <span>Review New Messages</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/portfolio"
          className="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-brand-coral/50 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-coral-light text-brand-coral-strong group-hover:bg-brand-coral-strong group-hover:text-white transition-colors">
              <Plus className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-navy">Add Portfolio Project</p>
              <p className="text-xs text-slate-500">Publish new case studies</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/about"
          className="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-brand-navy hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-navy">Edit About Us</p>
              <p className="text-xs text-slate-500">Mission, story, and values</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/team"
          className="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-indigo-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-navy">Add Team Member</p>
              <p className="text-xs text-slate-500">Manage leadership &amp; roles</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-brand-coral hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-colors">
              <Inbox className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-navy">Client Enquiries</p>
              <p className="text-xs text-slate-500">Respond to incoming briefs</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Enquiries Table Preview */}
      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Recent Client Enquiries
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest submissions received through the public contact and quote forms.
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs font-semibold text-brand-coral hover:underline inline-flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-brand-navy">
              No Client Enquiries Recorded Yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              When prospective clients submit the contact form on your website, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Client &amp; Company</th>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentMessages.map((msg: any) => (
                  <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brand-navy">{msg.fullName}</p>
                      <p className="text-xs text-slate-500">{msg.company || msg.email}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                      {msg.serviceInterest || msg.service}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          msg.status === "new"
                            ? "bg-brand-coral-light text-brand-coral-strong"
                            : msg.status === "in_progress"
                            ? "bg-amber-100 text-amber-800"
                            : msg.status === "responded"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDate(msg.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/admin/messages"
                        className="text-xs font-semibold text-brand-coral hover:underline"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
