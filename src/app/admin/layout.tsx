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
  CheckCircle2,
  AlertCircle,
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
    // If on /admin/login, don't check session or render dashboard sidebar
    if (pathname === "/admin/login") {
      setIsAuth(false);
      return;
    }

    const token =
      localStorage.getItem("rive_admin_session") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_session="))
        ?.split("=")[1];

    if (!token) {
      setIsAuth(false);
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
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
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center">
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

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* =====================================================================
       * Desktop Sidebar
       * ===================================================================== */}
      <aside className="hidden lg:flex w-64 flex-col bg-brand-navy text-white border-r border-brand-navy-border shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-brand-navy-border flex items-center justify-between">
          <BrandLogo variant="dark" size="sm" />
          <span className="rounded-md bg-brand-coral/20 border border-brand-coral/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-coral">
            Studio
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-coral-strong text-white font-semibold shadow-sm"
                    : "text-slate-300 hover:bg-brand-navy-elevated hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Actions Footer */}
        <div className="p-4 border-t border-brand-navy-border space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-brand-navy-elevated p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-brand-coral">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                Admin Session
              </p>
              <p className="truncate text-[10px] text-slate-400">
                Authorized Account
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
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
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3.5 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-brand-navy">
                Rive Digitals Studio
              </span>
              <span className="hidden sm:inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="relative w-72 bg-brand-navy text-white flex flex-col p-6 z-10">
              <div className="flex items-center justify-between pb-6 border-b border-brand-navy-border">
                <BrandLogo variant="dark" size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium",
                        active
                          ? "bg-brand-coral-strong text-white font-semibold"
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
                  className="flex items-center gap-2 text-xs text-red-400 font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
