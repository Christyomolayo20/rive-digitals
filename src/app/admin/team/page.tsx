"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { TeamMemberItem } from "@/types";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("/images/about-studio.jpg");
  const [linkedin, setLinkedin] = useState("");
  const [xSocial, setXSocial] = useState("");
  const [github, setGithub] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  const loadTeam = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin?resource=team", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        setTeam(json.team || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const openAddModal = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setBio("");
    setImage("/images/about-studio.jpg");
    setLinkedin("");
    setXSocial("");
    setGithub("");
    setDisplayOrder(team.length + 1);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMemberItem) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setImage(member.image);
    setLinkedin(member.socials?.linkedin || "");
    setXSocial(member.socials?.x || "");
    setGithub(member.socials?.github || "");
    setDisplayOrder(member.displayOrder);
    setIsPublished(member.isPublished);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload: TeamMemberItem = {
      id: editingMember ? editingMember.id : `team-${Date.now().toString(36)}`,
      name,
      role,
      bio,
      image,
      socials: {
        ...(linkedin ? { linkedin } : {}),
        ...(xSocial ? { x: xSocial } : {}),
        ...(github ? { github } : {}),
      },
      displayOrder: Number(displayOrder),
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
          resource: "team",
          data: payload,
        }),
      });

      if (res.ok) {
        setFeedback(
          editingMember
            ? `Updated "${name}" successfully`
            : `Added "${name}" to team`
        );
        setModalOpen(false);
        loadTeam();
      } else {
        setFeedback("Failed to save team member.");
      }
    } catch {
      setFeedback("Network error saving team member.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, memberName: string) => {
    if (!confirm(`Are you sure you want to delete ${memberName}?`)) return;

    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch(`/api/admin?resource=team&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      if (res.ok) {
        setFeedback(`Deleted ${memberName}`);
        loadTeam();
      } else {
        setFeedback("Failed to delete team member.");
      }
    } catch {
      setFeedback("Error deleting team member.");
    }
  };

  const handleTogglePublish = async (member: TeamMemberItem) => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          resource: "team",
          id: member.id,
          updates: { isPublished: !member.isPublished },
        }),
      });

      if (res.ok) {
        loadTeam();
      }
    } catch {
      // Ignore
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading Team Profiles...
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
            Team Profiles Manager
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your leadership and studio members. Profiles with &quot;Published&quot; status appear live on the public About Us page.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.id}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image || "/images/about-studio.jpg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    member.isPublished
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {member.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-brand-navy">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-coral-strong mt-0.5">
                  {member.role}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Order: #{member.displayOrder}</span>
                  <div className="flex items-center gap-2">
                    {member.socials?.linkedin && <Linkedin className="h-3.5 w-3.5" />}
                    {member.socials?.x && <Twitter className="h-3.5 w-3.5" />}
                    {member.socials?.github && <Github className="h-3.5 w-3.5" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleTogglePublish(member)}
                className="text-xs font-semibold text-slate-600 hover:text-brand-navy"
              >
                {member.isPublished ? "Set to Draft" : "Publish"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(member)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-brand-navy"
                  title="Edit member"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700"
                  title="Delete member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
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
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Christianah Olaniyi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Role / Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Creative Director & Brand Strategist"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Professional Biography *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Short summary of background, expertise, and leadership..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Profile Image URL / Preset
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Defaults to photorealistic studio asset <code className="text-slate-600">/images/about-studio.jpg</code> or Supabase Storage public URL.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    X / Twitter URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://x.com/..."
                    value={xSocial}
                    onChange={(e) => setXSocial(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
                <div className="pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-coral focus:ring-brand-coral"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>
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
                    <span>Save Team Member</span>
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
