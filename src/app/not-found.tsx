import React from "react";
import Link from "next/link";
import { Home, Compass, FolderKanban, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center rounded-3xl bg-white border border-slate-200 p-8 sm:p-14 shadow-card">
        <span className="inline-flex items-center justify-center rounded-2xl bg-brand-navy px-4 py-1.5 font-mono text-sm font-bold text-brand-coral">
          404 • PAGE NOT FOUND
        </span>

        <h1 className="mt-6 font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
          We Could Not Find That Page
        </h1>

        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          The link you followed may be outdated, or the page may have been
          moved. Use the links below to return home or explore our digital
          services.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-5 py-3 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy-elevated transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Browse Services</span>
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
          >
            <FolderKanban className="h-4 w-4" />
            <span>View Portfolio</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
