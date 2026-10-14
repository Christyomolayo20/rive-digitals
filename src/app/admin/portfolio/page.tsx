"use client";

import React, { useState, useEffect } from "react";
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Loader2,
  X,
  ExternalLink,
} from "lucide-react";
import { ProjectItem } from "@/types";

const IMAGE_PRESETS = [
  { label: "Veridian FinTech Showcase", value: "/images/portfolio/veridian-fintech.jpg" },
  { label: "Atelier Kora Luxury E-Commerce", value: "/images/portfolio/atelier-kora.jpg" },
  { label: "Nexus Freight B2B Platform", value: "/images/portfolio/nexus-freight.jpg" },
  { label: "Solaris CleanTech Campaign", value: "/images/portfolio/solaris-cleantech.jpg" },
  { label: "Lumina Health Telehealth Portal", value: "/images/portfolio/lumina-health.jpg" },
  { label: "Monarch Advisory Rebrand", value: "/images/portfolio/monarch-advisory.jpg" },
  { label: "Studio Agency Workspace", value: "/images/hero-showcase.jpg" },
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [category, setCategory] = useState("Brand & Web Engineering");
  const [summary, setSummary] = useState("");
  const [brief, setBrief] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [thumbnail, setThumbnail] = useState(IMAGE_PRESETS[0].value);
  const [deliverablesInput, setDeliverablesInput] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [completedYear, setCompletedYear] = useState("2026");
  const [featured, setFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  const loadProjects = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin?resource=portfolio", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        setProjects(json.projects || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setClientName("");
    setCategory("Brand & Web Engineering");
    setSummary("");
    setBrief("");
    setChallenge("");
    setSolution("");
    setThumbnail(IMAGE_PRESETS[0].value);
    setDeliverablesInput("Institutional Brand Identity\nResponsive Web Portal\nDesign System");
    setProjectUrl("");
    setCompletedYear("2026");
    setFeatured(true);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setClientName(proj.clientOrIndustry);
    setCategory(proj.category);
    setSummary(proj.summary);
    setBrief(proj.brief || "");
    setChallenge(proj.challenge);
    setSolution(proj.solution);
    setThumbnail(proj.thumbnail);
    setDeliverablesInput((proj.deliverables || []).join("\n"));
    setProjectUrl(proj.externalUrl || "");
    setCompletedYear(proj.completedYear || "2026");
    setFeatured(proj.featured);
    setIsPublished(proj.isPublished ?? true);
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
      editingProject?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload: Partial<ProjectItem> = {
      id: editingProject ? editingProject.id : `proj-${Date.now().toString(36)}`,
      slug,
      title,
      clientOrIndustry: clientName,
      category,
      summary,
      brief,
      challenge,
      solution,
      thumbnail,
      deliverables,
      externalUrl: projectUrl,
      completedYear,
      featured,
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
          resource: "portfolio",
          data: payload,
        }),
      });

      if (res.ok) {
        setFeedback(
          editingProject
            ? `Updated "${title}" successfully`
            : `Published new case study "${title}"`
        );
        setModalOpen(false);
        loadProjects();
      } else {
        setFeedback("Failed to save project.");
      }
    } catch {
      setFeedback("Network error saving project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, projTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${projTitle}"?`)) return;

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch(`/api/admin?resource=portfolio&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      if (res.ok) {
        setFeedback(`Deleted project "${projTitle}"`);
        loadProjects();
      } else {
        setFeedback("Failed to delete project.");
      }
    } catch {
      setFeedback("Error deleting project.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading Portfolio Projects...
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
            Portfolio &amp; Case Studies Manager
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, edit, and feature client projects and case studies. Changes synchronize with Supabase.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-full bg-brand-navy/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white">
                    {proj.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {proj.featured && (
                    <span className="rounded-full bg-brand-coral-strong px-2 py-0.5 text-[10px] font-bold text-white">
                      Featured
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      proj.isPublished !== false
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-200"
                    }`}
                  >
                    {proj.isPublished !== false ? "Live" : "Draft"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {proj.clientOrIndustry}
                </span>
                <h3 className="font-display text-lg font-bold text-brand-navy mt-1">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Deliverables: {proj.deliverables?.length || 0}</span>
                  <span>Year: {proj.completedYear || "2026"}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                /portfolio/{proj.slug}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(proj)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-brand-navy"
                  title="Edit project"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id, proj.title)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700"
                  title="Delete project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                {editingProject ? "Edit Portfolio Project" : "Add New Case Study"}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Veridian FinTech Platform"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Client or Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Veridian Capital Holdings"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
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
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={completedYear}
                    onChange={(e) => setCompletedYear(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="1-2 sentences summarizing the project objective and result"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    The Challenge
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What business problem or obstacle needed to be solved?"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    The Solution
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How did Rive Digitals design and engineer the solution?"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Preset or Enter Custom Cover Image URL
                </label>
                <select
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 mb-2"
                >
                  {IMAGE_PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 font-mono"
                  placeholder="Or enter custom URL (/images/... or https://...)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Deliverables (one per line)
                </label>
                <textarea
                  rows={3}
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Project URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
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
                    <span>Save Project</span>
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
