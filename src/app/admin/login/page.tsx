"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Key, ShieldCheck, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { getBrowserSupabaseClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"passcode" | "supabase">("passcode");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasscodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin?resource=metrics", {
        headers: {
          "x-admin-passcode": passcode.trim(),
        },
      });

      if (res.ok) {
        localStorage.setItem("rive_admin_session", passcode.trim());
        document.cookie = `admin_session=${encodeURIComponent(
          passcode.trim()
        )}; path=/; max-age=86400; SameSite=Lax`;
        router.push("/admin/dashboard");
      } else {
        setError("Invalid admin passcode. Please verify your credentials.");
      }
    } catch {
      setError("Network error while verifying credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const sb = getBrowserSupabaseClient();
      if (!sb) {
        setError(
          "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL) are not set in this browser. Please use Passcode login or configure credentials in Settings."
        );
        setLoading(false);
        return;
      }

      const { data, error: sbError } = await sb.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (sbError || !data.session) {
        setError(sbError?.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      localStorage.setItem("rive_admin_session", data.session.access_token);
      document.cookie = `admin_session=${encodeURIComponent(
        data.session.access_token
      )}; path=/; max-age=86400; SameSite=Lax`;
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo variant="dark" size="md" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Admin Studio Sign In
          </h1>
          <p className="text-xs text-slate-400">
            Secure administrative control for Rive Digitals content, leads, and database.
          </p>
        </div>

        {/* Tab Toggle for Authentication Method */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-800 p-1 text-xs font-semibold text-slate-400">
          <button
            type="button"
            onClick={() => {
              setAuthMethod("passcode");
              setError("");
            }}
            className={`rounded-lg py-2 transition-all ${
              authMethod === "passcode"
                ? "bg-brand-coral-strong text-white shadow-sm"
                : "hover:text-white"
            }`}
          >
            Studio Passcode
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod("supabase");
              setError("");
            }}
            className={`rounded-lg py-2 transition-all ${
              authMethod === "supabase"
                ? "bg-brand-coral-strong text-white shadow-sm"
                : "hover:text-white"
            }`}
          >
            Supabase Auth
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl bg-red-950/70 border border-red-800/80 p-3.5 text-xs text-red-200"
          >
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {authMethod === "passcode" ? (
          <form onSubmit={handlePasscodeLogin} className="space-y-5">
            <div>
              <label
                htmlFor="passcode"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Admin Passcode
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Key className="h-4 w-4" />
                </div>
                <input
                  id="passcode"
                  type="password"
                  required
                  placeholder="Enter studio passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-800/90 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-coral focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Default: <code className="text-brand-coral font-mono">rive-admin-2026</code> (configurable in <code className="text-slate-300">ADMIN_PASSCODE</code>)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Unlock Admin Studio</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Administrator Email
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@rivedigitals.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-800/90 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-coral focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-800/90 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-coral focus:outline-none focus:ring-1 focus:ring-brand-coral"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-coral transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Sign In with Supabase</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
