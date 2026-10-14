"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Mail,
  Phone,
  Building,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Clock,
  MessageSquare,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { ContactSubmission, ContactSubmissionStatus } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | ContactSubmissionStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin?resource=messages", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        setMessages(json.submissions || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ContactSubmissionStatus) => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          resource: "messages",
          id,
          updates: { status: newStatus, isRead: true },
        }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus, isRead: true } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) =>
            prev ? { ...prev, status: newStatus, isRead: true } : null
          );
        }
        setFeedback(`Status updated to "${newStatus}"`);
      }
    } catch {
      setFeedback("Failed to update enquiry status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete enquiry from ${name}?`)) return;

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch(`/api/admin?resource=messages&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        setFeedback(`Deleted enquiry from ${name}`);
      }
    } catch {
      setFeedback("Failed to delete enquiry.");
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesStatus = filterStatus === "all" || m.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.serviceInterest || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading Client Enquiries...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Client Enquiries CRM
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review, triage, and reply to client briefs submitted from the public contact and quote forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
            Total: {messages.length} leads
          </span>
        </div>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(["all", "new", "in_progress", "responded", "closed"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? "bg-brand-navy text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Layout (List + Detail) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Messages List Column */}
        <div className={selectedMessage ? "lg:col-span-5" : "lg:col-span-12"}>
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center">
                <Inbox className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3 text-sm font-semibold text-brand-navy">
                  No matching enquiries found
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try adjusting your search query or status filter.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredMessages.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-4 sm:p-5 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-brand-coral-light/30 border-l-4 border-l-brand-coral-strong"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-brand-navy truncate">
                              {msg.fullName}
                            </p>
                            {!msg.isRead && (
                              <span className="h-2 w-2 rounded-full bg-brand-coral shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {msg.company ? `${msg.company} • ` : ""}
                            {msg.email}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            msg.status === "new"
                              ? "bg-brand-coral-light text-brand-coral-strong"
                              : msg.status === "in_progress"
                              ? "bg-amber-100 text-amber-800"
                              : msg.status === "responded"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {msg.status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {msg.message}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-medium text-brand-navy/80">
                          {msg.serviceInterest}
                        </span>
                        <span>{formatDate(msg.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Message Inspector Column */}
        {selectedMessage && (
          <div className="lg:col-span-7">
            <div className="sticky top-20 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-coral-strong font-mono">
                    Ref: {selectedMessage.referenceId || selectedMessage.id.slice(0, 8)}
                  </span>
                  <h2 className="font-display text-xl font-bold text-brand-navy mt-1">
                    {selectedMessage.fullName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedMessage.company || "Independent Project"} • Submitted on{" "}
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Update Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Update Enquiry Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["new", "in_progress", "responded", "closed"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedMessage.id, st)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold capitalize transition-all ${
                        selectedMessage.status === st
                          ? "bg-brand-navy text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Email</span>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-brand-coral" />
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Regarding%20Your%20Project%20Enquiry%20to%20Rive%20Digitals`}
                      className="font-semibold text-brand-navy hover:underline break-all"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Phone / WhatsApp</span>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-brand-coral" />
                    <span className="font-semibold text-brand-navy">
                      {selectedMessage.phone || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Service Scope</span>
                  <p className="font-semibold text-brand-navy">
                    {selectedMessage.serviceInterest}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Budget Estimate</span>
                  <p className="font-semibold text-brand-navy">
                    {selectedMessage.budget || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Project Brief &amp; Description
                </h3>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re:%20Project%20Enquiry%20with%20Rive%20Digitals`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Reply via Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage.id, selectedMessage.fullName)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
