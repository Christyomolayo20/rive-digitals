"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareArticleButtonsProps {
  title: string;
  url: string;
}

export function ShareArticleButtons({ title, url }: ShareArticleButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard permission denied
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
        <Share2 className="h-3.5 w-3.5 text-brand-coral-strong" />
        Share:
      </span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share article on Facebook"
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-navy transition-colors"
      >
        Facebook
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-navy transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Link Copied</span>
          </>
        ) : (
          <span>Copy Link</span>
        )}
      </button>
    </div>
  );
}
