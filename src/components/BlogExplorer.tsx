"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Calendar, ArrowRight, X } from "lucide-react";
import { BlogArticle, BlogCategory } from "@/types";
import { cn, formatDate } from "@/lib/utils";

interface BlogExplorerProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
}

export function BlogExplorer({ articles, categories }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | BlogCategory
  >("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((article) => article.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory, selectedTag]);

  return (
    <div>
      {/* Search and Category Filter Controls */}
      <div className="mb-8 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-card space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="blog-search" className="sr-only">
              Search insights and articles
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, keyword, or tag..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-9 py-2.5 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-coral"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-brand-navy"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            role="toolbar"
            aria-label="Filter articles by category"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              aria-pressed={selectedCategory === "All"}
              className={cn(
                "rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors",
                selectedCategory === "All"
                  ? "bg-brand-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              All ({articles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={cn(
                  "rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors",
                  selectedCategory === cat
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-1.5">
            Topics:
          </span>
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(active ? null : tag)}
                aria-pressed={active}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                  active
                    ? "bg-brand-coral-strong text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                #{tag}
              </button>
            );
          })}
          {(selectedCategory !== "All" || selectedTag || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTag(null);
                setSearchQuery("");
              }}
              className="ml-auto text-xs font-semibold text-brand-coral-strong hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-brand-coral/40"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="relative block aspect-[16/9] w-full overflow-hidden bg-brand-navy"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-brand-navy/90 backdrop-blur-sm border border-brand-navy-border px-3 py-1 text-xs font-semibold text-white">
                  {article.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-brand-coral-strong" />
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt)}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-coral-strong" />
                      <span>{article.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold text-brand-navy group-hover:text-brand-coral-strong transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-slate-500">
                    {article.authorRole}
                  </span>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:text-brand-coral-strong transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <p className="font-display text-lg font-bold text-brand-navy">
            No matching articles found
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try adjusting your search keywords or clearing the active category
            and tag filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedTag(null);
              setSearchQuery("");
            }}
            className="mt-5 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-elevated"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
