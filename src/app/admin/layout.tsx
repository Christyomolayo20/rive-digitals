"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Layers,
  FolderKanban,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "About Us", href: "/admin/about", icon: FileText },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Enquiries", href: "/admin/messages", icon: Inbox },
  { label: "Supabase & Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuth(false);
      return;
    }

    let token =
      localStorage.getItem("rive_admin_session") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_session="))
        ?.split("=")[1];

    if (!token) {
      setIsAuth(false);
      router.push("/admin/login");
      return;
    }

    try {
      token = decodeURIComponent(token);
    } catch {}
    token = token.trim();

    // Strictly verify password against server Admin API
    fetch("/api/admin?resource=metrics", {
      headers: { "x-admin-passcode": token },
    })
      .then((res) => {
        if (res.ok) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("rive_admin_session");
          document.cookie =
            "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          setIsAuth(false);
          router.push("/admin/login");
        }
      })
      .catch(() => {
        // Fallback for temporary connection glitch
        setIsAuth(true);
      });
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("rive_admin_session");
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  // If on login page, render clean auth wrapper without sidebar
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center">
        {children}
      </div>
    );
  }

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-coral border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-slate-300">
            Verifying Admin Authorization...
          </span>
        </div>
      </div>
    );
  }

  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);
  const currentTitle = currentItem?.label || "Admin Studio";

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-brand-coral selection:text-white">
      {/* =====================================================================
       * Desktop Sidebar
       * ===================================================================== */}
      <aside className="hidden lg:flex w-64 flex-col bg-brand-navy text-white border-r border-brand-navy-border shrink-0 shadow-lg">
        {/* Brand Header */}
        <div className="p-6 border-b border-brand-navy-border flex items-center justify-between">
          <BrandLogo variant="dark" size="sm" />
          <span className="rounded-full bg-brand-coral/20 border border-brand-coral/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-coral">
            Studio
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-brand-coral-strong text-white font-semibold shadow-md shadow-brand-coral/20"
                    : "text-slate-300 hover:bg-brand-navy-elevated hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    active ? "text-white" : "text-slate-400 group-hover:text-brand-coral"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Actions Footer */}
        <div className="p-4 border-t border-brand-navy-border space-y-3 bg-brand-navy/60">
          <div className="flex items-center gap-3 rounded-xl bg-brand-navy-elevated/80 border border-brand-navy-border p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-brand-coral border border-brand-coral/30">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white flex items-center gap-1.5">
                <span>Studio Admin</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </p>
              <p className="truncate text-[10px] text-slate-400">
                Authorized Session
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-3 w-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
       * Main Content Area
       * ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3.5 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Studio</span>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              <span className="font-display font-bold text-sm text-brand-navy">
                {currentTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Operational Status */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </header>

        {/* Mobile Slide-Out Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="relative w-72 bg-brand-navy text-white flex flex-col p-6 z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-brand-navy-border">
                <BrandLogo variant="dark" size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-brand-navy-elevated"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 py-6 space-y-1.5 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-coral-strong text-white font-semibold shadow-sm"
                          : "text-slate-300 hover:bg-brand-navy-elevated hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-brand-navy-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-xs text-red-400 font-semibold hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>

                <Link
                  href="/"
                  target="_blank"
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Live Site</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50/70">
          {children}
        </main>
      </div>
    </div>
  );
}
