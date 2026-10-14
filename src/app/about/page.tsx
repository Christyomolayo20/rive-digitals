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
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPublishedAboutSections, getPublishedTeamMembers } from "@/lib/cms-store";
import { CtaBanner } from "@/components/CtaBanner";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.6a6.34 6.34 0 0 0 10.74 4.54V11.8a8.31 8.31 0 0 0 5.71 1.93v-3.52a4.88 4.88 0 0 1-3.14-1.28A4.83 4.83 0 0 1 19.59 6.7z" />
    </svg>
  );
}

export const revalidate = 60; // Revalidate every 60s

export const metadata: Metadata = {
  title: "About Us — Digital Solutions, Branding & Technology Partner",
  description:
    "Learn about Rive Digitals—our story, mission, core values, working process, and team of digital strategists, designers, and engineers.",
  alternates: {
    canonical: "/about",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
};

export default async function AboutPage() {
  const [sections, team] = await Promise.all([
    getPublishedAboutSections(),
    getPublishedTeamMembers(),
  ]);

  const introSection = sections.find((s) => s.sectionKey === "intro");
  const storySection = sections.find((s) => s.sectionKey === "story");
  const missionSection = sections.find((s) => s.sectionKey === "mission");
  const visionSection = sections.find((s) => s.sectionKey === "vision");
  const valuesSection = sections.find((s) => s.sectionKey === "values");
  const processSection = sections.find((s) => s.sectionKey === "process");

  return (
    <div>
      {/* 1. Page Hero / Company Introduction */}
      <section className="relative overflow-hidden bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-coral/15 blur-[110px]"
        />
        <div className="relative mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy-elevated border border-brand-navy-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-coral">
              {introSection?.subtitle || `About ${siteConfig.name}`}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {introSection?.title || "Bridging Business Quality and Digital Perception"}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              {introSection?.content ||
                "Rive Digitals is a full-stack digital solutions, branding, marketing and technology partner. We collaborate with startups, SMEs, and established organizations to build distinctive visual identities, high-converting websites, and measurable growth systems."}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-coral-strong px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-coral transition-colors shadow-glow"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-border bg-brand-navy-elevated px-6 py-3.5 text-sm font-semibold text-white hover:border-slate-500 transition-colors"
              >
                <span>Explore Portfolio</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-brand-navy-border shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-studio.jpg"
                alt="Rive Digitals creative strategy, design, and engineering team collaborating"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-brand-navy shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/brand-design.jpg"
                alt="Brand design construction and visual guidelines"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              {storySection?.subtitle || "Our Story"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              {storySection?.title || "Founded to Eliminate Digital Mediocrity"}
            </h2>
            <div className="text-base sm:text-lg text-slate-600 leading-relaxed space-y-4">
              <p>
                {storySection?.content ||
                  "Too many businesses lose potential clients not because their services are lacking, but because their digital presence fails to convey the caliber of their work. Rive Digitals was established to unite senior visual craft with engineering discipline—delivering digital assets that command trust."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-canvas border-b border-slate-200">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-10 border border-brand-navy-border shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral">
                {missionSection?.subtitle || "Our Mission"}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                {missionSection?.title || "High-Trust Digital Foundations"}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {missionSection?.content ||
                  "To equip growth-minded businesses with cohesive brand systems and high-converting websites that turn audience attention into measurable client relationships."}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-navy-border text-xs text-slate-400 font-medium">
              Brand Identity • Modern Web Engineering • Scalable Growth
            </div>
          </div>

          {/* Vision Card */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-slate-200 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                {visionSection?.subtitle || "Our Vision"}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-brand-navy">
                {visionSection?.title || "Practical Digital Excellence"}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {visionSection?.content ||
                  "To be the preferred digital partner for ambitious brands worldwide—recognized for sharp positioning, architectural design quality, and dependable full-stack execution."}
              </p>
            </div>
            <ul className="mt-8 space-y-2 text-xs font-semibold text-brand-navy">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0" />
                Zero generic AI templates or bloated themes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-coral-strong shrink-0" />
                Complete intellectual property and source code ownership
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              {valuesSection?.subtitle || "Our Core Values"}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              {valuesSection?.title || "Four Principles Behind Every Project"}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {valuesSection?.content ||
                "Our operational values govern every client interaction, line of code, and design deliverable."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(valuesSection?.items || [
              {
                title: "Clarity First",
                description: "Design and code exist to make your business easier to understand, trust, and buy from.",
                icon: "Compass",
              },
              {
                title: "Disciplined Delivery",
                description: "Transparent scopes, clear milestones, and clean code your team owns completely.",
                icon: "ShieldCheck",
              },
              {
                title: "Visual Craft",
                description: "From brand monograms to mobile load speeds, we sweat the details that signal authority.",
                icon: "Sparkles",
              },
              {
                title: "True Partnership",
                description: "We work alongside founders and marketing teams as an accountable growth partner.",
                icon: "Users",
              },
            ]).map((val: any) => {
              const IconComp = iconMap[val.icon] || Sparkles;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl bg-brand-canvas border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-brand-coral">
                    <IconComp className="h-5 w-5" />
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

      {/* 5. Working Process / Approach */}
      <section className="bg-brand-canvas py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
              {processSection?.subtitle || "Our Approach"}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              {processSection?.title || "Structured, Predictable Project Delivery"}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {processSection?.content ||
                "Every engagement is delivered through a transparent, four-phase delivery framework that ensures quality and predictability."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(processSection?.items || [
              {
                number: "01",
                title: "Discovery & Strategy",
                description: "We analyze your business model, target market, and positioning requirements.",
              },
              {
                number: "02",
                title: "Architecture & Prototyping",
                description: "We design high-fidelity interactive wireframes and design tokens.",
              },
              {
                number: "03",
                title: "Production Engineering",
                description: "We build fast, responsive, and SEO-optimized web systems.",
              },
              {
                number: "04",
                title: "Launch & Measurement",
                description: "Rigorous QA testing, domain deployment, and handover.",
              },
            ]).map((step: any) => (
              <div
                key={step.number || step.title}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
              >
                <span className="font-display text-2xl font-extrabold text-brand-coral-strong">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dynamic Team Section */}
      <section
        aria-labelledby="team-heading"
        className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-coral-strong">
                Our People
              </span>
              <h2
                id="team-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight"
              >
                The Creative &amp; Technical Minds Behind Rive Digitals
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              A collaborative multidisciplinary team dedicated to senior craft, business strategy, and technical excellence.
            </p>
          </div>

          {team.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Users className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-3 text-base font-semibold text-brand-navy">
                Team Profiles are currently being updated
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Check back shortly to meet our creative directors, engineers, and strategists.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-slate-200 bg-brand-canvas overflow-hidden shadow-card hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] bg-brand-navy overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image || "/images/about-studio.jpg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-brand-navy">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-coral-strong mt-0.5">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>

                    {member.socials && Object.keys(member.socials).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3">
                        {member.socials.facebook && (
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Facebook`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.tiktok && (
                          <a
                            href={member.socials.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on TikTok`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <TikTokIcon className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.x && (
                          <a
                            href={member.socials.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on GitHub`}
                            className="text-slate-400 hover:text-brand-coral-strong transition-colors"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Prospective Client CTA */}
      <CtaBanner
        title="Ready to Partner With Rive Digitals?"
        subtitle="Share your project goals, timeline, and vision. We'll prepare a structured scope and proposal."
      />
    </div>
  );
}
