import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { siteConfig, teamMembers } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — Digital Partner for Brand & Business Growth",
  description:
    "Learn about Rive Digitals—our mission, values, and how we partner with ambitious businesses to build credible brands and high-converting websites.",
  alternates: {
    canonical: "/about",
  },
};

const coreValues = [
  {
    icon: Compass,
    title: "Clarity First",
    description:
      "Design and code exist to make your business easier to understand, trust, and buy from.",
  },
  {
    icon: ShieldCheck,
    title: "Disciplined Delivery",
    description:
      "Transparent scopes, clear milestones, and clean code your team owns completely.",
  },
  {
    icon: Sparkles,
    title: "Visual Craft",
    description:
      "From brand monograms to mobile load speeds, we sweat the details that signal authority.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description:
      "We work alongside founders and marketing teams as an accountable growth partner.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Hero with Studio Visual */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              About {siteConfig.name}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Bridging Business Quality and Digital Perception.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              We partner with startups, SMBs, and established brands to build
              distinctive visual identities, fast conversion-ready websites, and
              scalable digital growth systems.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/contact?intent=quote"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-coral transition-colors"
              >
                <span>Work With Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm font-semibold text-white hover:border-slate-500 transition-colors"
              >
                <span>See Our Work</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-brand-navy-border shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-studio.jpg"
                alt="Rive Digitals creative strategy, design, and engineering team collaborating"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Studio Showcase */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-brand-navy text-white p-7 sm:p-8 border border-brand-navy-border shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                Our Mission
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                High-Trust Digital Foundations
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                To equip growth-minded businesses with cohesive brand systems
                and high-converting websites that turn audience attention into
                measurable client relationships.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-navy-border text-xs text-slate-400">
              Brand Identity • Web Engineering • Digital Growth
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-slate-200 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Our Vision
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                Practical Digital Excellence
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                To be the go-to digital partner for ambitious brands—recognised
                for sharp positioning, architectural design quality, and
                dependable full-stack execution.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-xs font-semibold text-brand-navy">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-coral-strong" />
                Zero generic templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-coral-strong" />
                Full code &amp; asset ownership
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-brand-navy shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/services/brand-design.jpg"
              alt="Brand identity design tokens and guidelines book"
              loading="lazy"
              className="h-full w-full object-cover min-h-[260px]"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white border-y border-slate-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              How We Operate
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Four Principles Behind Every Project
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl bg-brand-canvas border border-slate-200 p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-brand-coral">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {siteConfig.features.showTeamProfiles && teamMembers.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <h3 className="font-display text-lg font-bold text-brand-navy">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-brand-coral-strong">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
