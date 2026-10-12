"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig, mainNavLinks } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/BrandLogo";
import { ServiceIcon } from "@/components/ServiceIcon";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-navy/95 backdrop-blur-md border-b border-brand-navy-border text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <BrandLogo variant="dark" size="md" />

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex lg:items-center lg:gap-1"
        >
          {mainNavLinks.map((item) => {
            const active = isActive(item.href);

            if ("hasDropdown" in item && item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "px-3.5 py-2 text-sm font-medium rounded-l-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
                        active
                          ? "text-brand-coral bg-brand-navy-elevated"
                          : "text-slate-200 hover:text-white hover:bg-brand-navy-elevated/60"
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle services submenu"
                      aria-expanded={servicesDropdownOpen}
                      aria-controls="desktop-services-menu"
                      onClick={() =>
                        setServicesDropdownOpen((prev) => !prev)
                      }
                      className={cn(
                        "px-2 py-2 text-sm font-medium rounded-r-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
                        active
                          ? "text-brand-coral bg-brand-navy-elevated"
                          : "text-slate-200 hover:text-white hover:bg-brand-navy-elevated/60"
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          servicesDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {servicesDropdownOpen && (
                    <div
                      id="desktop-services-menu"
                      role="region"
                      aria-label="Services submenu"
                      className="absolute left-0 top-full pt-2 w-[540px] z-50"
                    >
                      <div className="rounded-2xl bg-brand-navy-elevated border border-brand-navy-border p-4 shadow-2xl">
                        <div className="mb-3 flex items-center justify-between border-b border-brand-navy-border pb-2.5 px-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Digital Capabilities
                          </span>
                          <Link
                            href="/services"
                            className="text-xs font-semibold text-brand-coral hover:underline inline-flex items-center gap-1"
                          >
                            All Services
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {servicesData.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-navy border border-brand-navy-border text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-colors">
                                <ServiceIcon
                                  name={service.iconName}
                                  className="h-4 w-4"
                                />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white group-hover:text-brand-coral transition-colors">
                                  {service.shortTitle}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                                  {service.summary}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral",
                  active
                    ? "text-brand-coral bg-brand-navy-elevated"
                    : "text-slate-200 hover:text-white hover:bg-brand-navy-elevated/60"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary CTA & Admin Link */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-brand-coral/50 transition-colors"
            title="Admin Studio & Supabase CMS"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-brand-coral" />
            <span>Admin</span>
          </Link>

          <Link
            href={siteConfig.cta.primaryHref}
            onClick={() =>
              trackEvent("primary_cta_clicked", { location: "header" })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            {siteConfig.cta.primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={siteConfig.cta.primaryHref}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-brand-coral-strong px-3.5 py-2 text-xs font-semibold text-white"
          >
            Get Quote
          </Link>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-200 hover:bg-brand-navy-elevated hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-brand-navy-border bg-brand-navy px-4 pt-3 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="space-y-1">
            {mainNavLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-brand-navy-elevated text-brand-coral"
                      : "text-slate-200 hover:bg-brand-navy-elevated/60 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-brand-coral hover:bg-brand-navy-elevated"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Studio</span>
            </Link>
          </div>

          <div className="mt-4 border-t border-brand-navy-border pt-4">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Services
            </p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-brand-navy-elevated hover:text-white"
                >
                  <ServiceIcon
                    name={service.iconName}
                    className="h-4 w-4 text-brand-coral shrink-0"
                  />
                  <span>{service.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 px-2">
            <Link
              href={siteConfig.cta.primaryHref}
              onClick={() =>
                trackEvent("primary_cta_clicked", { location: "mobile_drawer" })
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-brand-coral"
            >
              {siteConfig.cta.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
