"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Compass,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

interface AboutSection {
  id: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  content: string;
  items?: any[];
  isPublished: boolean;
  displayOrder: number;
}

export default function AdminAboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("intro");

  const loadSections = async () => {
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin?resource=about", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.ok) {
        const json = await res.json();
        setSections(json.sections || []);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleUpdateField = (
    key: string,
    field: keyof AboutSection,
    value: any
  ) => {
    setSections((prev) =>
      prev.map((s) => (s.sectionKey === key ? { ...s, [field]: value } : s))
    );
  };

  const handleSaveSection = async (section: AboutSection) => {
    setSavingKey(section.sectionKey);
    setFeedback(null);
    try {
      const passcode = localStorage.getItem("rive_admin_session") || "";
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          resource: "about",
          data: section,
        }),
      });

      if (res.ok) {
        setFeedback(`Saved "${section.title}" successfully!`);
      } else {
        setFeedback("Failed to save changes. Please try again.");
      }
    } catch {
      setFeedback("Network error saving section.");
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-500">
            Loading About Us Content...
          </span>
        </div>
      </div>
    );
  }

  const currentSection =
    sections.find((s) => s.sectionKey === activeTab) || sections[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
          About Us Content Manager
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Edit company introduction, our story, mission, vision, core values, and delivery process. Changes save to Supabase and reflect live on the public website.
        </p>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {sections.map((s) => (
          <button
            key={s.sectionKey}
            type="button"
            onClick={() => {
              setActiveTab(s.sectionKey);
              setFeedback(null);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === s.sectionKey
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {currentSection && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Section Key: {currentSection.sectionKey}
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-brand-navy">
                Edit {currentSection.title}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={currentSection.isPublished}
                  onChange={(e) =>
                    handleUpdateField(
                      currentSection.sectionKey,
                      "isPublished",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 text-brand-coral focus:ring-brand-coral"
                />
                <span>Published on Website</span>
              </label>

              <button
                type="button"
                onClick={() => handleSaveSection(currentSection)}
                disabled={savingKey === currentSection.sectionKey}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors disabled:opacity-60"
              >
                {savingKey === currentSection.sectionKey ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Eyebrow / Subtitle
              </label>
              <input
                type="text"
                value={currentSection.subtitle || ""}
                onChange={(e) =>
                  handleUpdateField(
                    currentSection.sectionKey,
                    "subtitle",
                    e.target.value
                  )
                }
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Main Headline
              </label>
              <input
                type="text"
                value={currentSection.title}
                onChange={(e) =>
                  handleUpdateField(
                    currentSection.sectionKey,
                    "title",
                    e.target.value
                  )
                }
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Section Body Text
            </label>
            <textarea
              rows={5}
              value={currentSection.content}
              onChange={(e) =>
                handleUpdateField(
                  currentSection.sectionKey,
                  "content",
                  e.target.value
                )
              }
              className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-coral"
            />
          </div>

          {/* If values or process items exist */}
          {currentSection.items && currentSection.items.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-brand-navy mb-4">
                Structured Items / Principles ({currentSection.items.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {currentSection.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-coral-strong">
                        Item {idx + 1}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      placeholder="Title"
                      onChange={(e) => {
                        const newItems = [...(currentSection.items || [])];
                        newItems[idx] = { ...newItems[idx], title: e.target.value };
                        handleUpdateField(
                          currentSection.sectionKey,
                          "items",
                          newItems
                        );
                      }}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                    />
                    <textarea
                      rows={2}
                      value={item.description}
                      placeholder="Description"
                      onChange={(e) => {
                        const newItems = [...(currentSection.items || [])];
                        newItems[idx] = {
                          ...newItems[idx],
                          description: e.target.value,
                        };
                        handleUpdateField(
                          currentSection.sectionKey,
                          "items",
                          newItems
                        );
                      }}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
