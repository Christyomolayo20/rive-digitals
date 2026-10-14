"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";
import { ServiceItem } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [category, setCategory] = useState("Brand & Design");
  const [offeringStatus, setOfferingStatus] = useState<"core" | "configurable">("core");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [deliverablesInput, setDeliverablesInput] = useState("");
  const [image, setImage] = useState("/images/services/brand-design.jpg");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  const loadServices = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin?resource=services", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        setServices(json.services || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setTitle("");
    setShortTitle("");
    setCategory("Brand & Design");
    setOfferingStatus("core");
    setSummary("");
    setDescription("");
    setProblemSolved("");
    setDeliverablesInput("Deliverable 1\nDeliverable 2\nDeliverable 3");
    setImage("/images/services/brand-design.jpg");
    setIsFeatured(true);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (svc: ServiceItem) => {
    setEditingService(svc);
    setTitle(svc.title);
    setShortTitle(svc.shortTitle);
    setCategory(svc.category);
    setOfferingStatus(svc.offeringStatus);
    setSummary(svc.summary);
    setDescription(svc.description);
    setProblemSolved(svc.problemSolved || "");
    setDeliverablesInput((svc.deliverables || []).join("\n"));
    setImage(svc.image);
    setIsFeatured(svc.featured);
    setIsPublished(svc.isPublished ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const deliverables = deliverablesInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const slug =
      editingService?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload: Partial<ServiceItem> = {
      id: editingService ? editingService.id : `service-${Date.now().toString(36)}`,
      slug,
      title,
      shortTitle: shortTitle || title,
      category,
      offeringStatus,
      summary,
      description,
      problemSolved,
      deliverables,
      image,
      featured: isFeatured,
      isPublished,
    };

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          resource: "services",
          data: payload,
        }),
      });

      if (res.ok) {
        setFeedback(
          editingService
            ? `Updated "${title}" successfully`
            : `Created service "${title}"`
        );
        setModalOpen(false);
        loadServices();
      } else {
        setFeedback("Failed to save service.");
      }
    } catch {
      setFeedback("Network error saving service.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, svcTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${svcTitle}"?`)) return;

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch(`/api/admin?resource=services&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      if (res.ok) {
        setFeedback(`Deleted service "${svcTitle}"`);
        loadServices();
      } else {
        setFeedback("Failed to delete service.");
      }
    } catch {
      setFeedback("Error deleting service.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading Services...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Services &amp; Capabilities Manager
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure service scopes, deliverables, and publication status. Changes sync directly with Supabase.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      svc.offeringStatus === "core"
                        ? "bg-brand-navy text-white"
                        : "bg-brand-coral-strong text-white"
                    }`}
                  >
                    {svc.offeringStatus === "core" ? "Core" : "Configurable"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {svc.category}
                </span>
                <h3 className="font-display text-lg font-bold text-brand-navy mt-1">
                  {svc.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {svc.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Deliverables: {svc.deliverables?.length || 0}</span>
                  <span className={svc.isPublished !== false ? "text-emerald-600 font-semibold" : "text-slate-400"}>
                    {svc.isPublished !== false ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                /{svc.slug}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(svc)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-brand-navy"
                  title="Edit service"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(svc.id, svc.title)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700"
                  title="Delete service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Short Menu Title
                  </label>
                  <input
                    type="text"
                    value={shortTitle}
                    onChange={(e) => setShortTitle(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Offering Status
                  </label>
                  <select
                    value={offeringStatus}
                    onChange={(e) => setOfferingStatus(e.target.value as any)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                  >
                    <option value="core">Core Capability</option>
                    <option value="configurable">Configurable Scope</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Card Summary (1-2 sentences) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Service Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Problem This Solves
                </label>
                <textarea
                  rows={2}
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Deliverables (one per line)
                </label>
                <textarea
                  rows={4}
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-coral focus:ring-brand-coral"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-coral focus:ring-brand-coral"
                  />
                  <span>Publish Live</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Service</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
