import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  blogArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/blog";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { ShareArticleButtons } from "@/components/ShareArticleButtons";
import { CtaBanner } from "@/components/CtaBanner";

interface BlogArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({
  params,
}: BlogArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      url: `${siteConfig.url}/blog/${article.slug}`,
      images: [article.coverImage],
    },
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 2);
  const canonicalUrl = `${siteConfig.url}/blog/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo.src}`,
      },
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article Header */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-border">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-coral transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="rounded-full bg-brand-coral/20 border border-brand-coral/30 px-3.5 py-1 font-semibold text-brand-coral">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-coral" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-coral" />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
            {article.excerpt}
          </p>

          <div className="mt-6 pt-6 border-t border-brand-navy-border flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              Published by <strong className="text-white">{article.authorRole}</strong>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-brand-navy-elevated border border-brand-navy-border px-2.5 py-1 text-xs text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Cover Visual */}
          <div className="mb-12 overflow-hidden rounded-3xl bg-brand-navy border border-slate-200 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.coverImageAlt}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Sections */}
          <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-12 shadow-card space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-navy">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base sm:text-lg leading-relaxed text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2.5 rounded-2xl bg-slate-50 p-6 border border-slate-100">
                    {section.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                      >
                        <CheckCircle2 className="h-5 w-5 text-brand-coral-strong shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <blockquote className="rounded-2xl bg-brand-coral-light border-l-4 border-brand-coral-strong p-5 sm:p-6 text-sm sm:text-base font-medium text-brand-navy">
                    {section.callout}
                  </blockquote>
                )}
              </section>
            ))}

            {/* Share Bar */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <ShareArticleButtons title={article.title} url={canonicalUrl} />
              <Link
                href="/contact?intent=quote"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-coral-strong hover:underline"
              >
                <span>Discuss this topic with our team</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-4xl">
            <h2
              id="related-articles-heading"
              className="font-display text-2xl font-bold text-brand-navy mb-8"
            >
              Related Insights
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-2xl bg-brand-canvas border border-slate-200 p-6 transition-all hover:border-brand-coral/50 hover:shadow-card"
                >
                  <span className="text-xs font-semibold text-brand-coral-strong">
                    {rel.category} • {rel.readingTimeMinutes} min read
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </div>
  );
}
