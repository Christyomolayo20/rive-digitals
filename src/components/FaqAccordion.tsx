"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
  allowCategoryFilter?: boolean;
}

export function FaqAccordion({
  items,
  allowCategoryFilter = false,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      {allowCategoryFilter && (
        <div
          role="toolbar"
          aria-label="Filter frequently asked questions by topic"
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            aria-pressed={activeCategory === "All"}
            className={cn(
              "rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors",
              activeCategory === "All"
                ? "bg-brand-navy text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:border-brand-navy"
            )}
          >
            All Topics ({items.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors",
                activeCategory === cat
                  ? "bg-brand-navy text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-brand-navy"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-slate-200 rounded-2xl bg-white border border-slate-200 shadow-card">
        {visibleItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-btn-${item.id}`;

          return (
            <div key={item.id} className="p-5 sm:p-6">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral rounded-lg"
                >
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-coral-strong mb-1">
                      {item.category}
                    </span>
                    <p className="font-display text-base sm:text-lg font-bold text-brand-navy">
                      {item.question}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-200",
                      isOpen &&
                        "rotate-180 bg-brand-navy text-white border-brand-navy"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="mt-3 pt-2 text-sm sm:text-base leading-relaxed text-slate-600"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
