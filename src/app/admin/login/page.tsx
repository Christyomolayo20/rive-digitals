"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Key, AlertCircle, Loader2, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasscodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = passcode.trim();
    if (!trimmed) {
      setError("Please enter the studio passcode.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin?resource=metrics", {
        headers: {
          "x-admin-passcode": trimmed,
        },
      });

      if (res.ok) {
        localStorage.setItem("rive_admin_session", trimmed);
        document.cookie = `admin_session=${encodeURIComponent(
          trimmed
        )}; path=/; max-age=86400; SameSite=Lax`;
        window.location.href = "/admin/dashboard";
      } else {
        setError("Invalid studio passcode. Please check your credentials.");
      }
    } catch {
      setError("Network error while verifying passcode. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 selection:bg-brand-coral selection:text-white">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-coral/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c2031_1px,transparent_1px),linear-gradient(to_bottom,#0c2031_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30" />
      </div>

      <div className="relative w-full max-w-md space-y-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo variant="dark" size="md" />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 px-3 py-1 text-[11px] font-semibold text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-coral" />
            <span>Studio Management Gate</span>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Admin Studio Sign In
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            Enter the master studio passcode to manage site content, team profiles, portfolio projects, and incoming client leads.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl bg-red-950/80 border border-red-800/80 p-3.5 text-xs text-red-200 animate-in fade-in"
          >
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Studio Passcode Form */}
        <form onSubmit={handlePasscodeLogin} className="space-y-5">
          <div>
            <label
              htmlFor="passcode"
              className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
            >
              Studio Passcode
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Key className="h-4 w-4" />
              </div>
              <input
                id="passcode"
                type={showPassword ? "text" : "password"}
                autoFocus
                required
                placeholder="Enter master passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError("");
                }}
                className="block w-full rounded-xl border border-slate-700 bg-slate-800/90 pl-10 pr-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/40 transition-all font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Internal studio access only. Passcode configured via secure environment variable.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-coral/20 hover:bg-brand-coral hover:shadow-brand-coral/30 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying Studio Passcode...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Unlock Admin Studio</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
