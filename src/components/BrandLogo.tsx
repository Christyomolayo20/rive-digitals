"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

/**
 * Renders the official Rive Digitals brand logo using the uploaded logo image (`/images/logo.jpg`)
 * with an automatic vector fallback (`/images/rive-logo.svg`).
 * Because the uploaded square brand asset has a generous dark navy canvas around the central mark,
 * we apply a subtle zoom crop inside the rounded frame so the geometric white arch and coral-rose
 * square node remain crisp and legible at navigation bar sizes.
 */
export function BrandLogo({
  variant = "dark",
  size = "md",
  showTagline = false,
  className,
}: BrandLogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(siteConfig.logo.src);

  const boxSizes = {
    sm: "h-9 w-9 rounded-lg",
    md: "h-11 w-11 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral rounded-xl",
        className
      )}
      aria-label={`${siteConfig.name} — Home`}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-brand-navy border border-brand-navy-border shadow-sm transition-transform duration-200 group-hover:scale-[1.03]",
          boxSizes[size]
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={siteConfig.logo.alt}
          onError={() => {
            if (imgSrc !== siteConfig.logo.svgFallback) {
              setImgSrc(siteConfig.logo.svgFallback);
            }
          }}
          className="h-full w-full object-cover scale-[1.65] select-none"
          width={56}
          height={56}
        />
      </span>

      <span className="flex flex-col">
        <span
          className={cn(
            "font-display font-bold tracking-tight leading-none transition-colors",
            size === "sm" && "text-base",
            size === "md" && "text-lg sm:text-xl",
            size === "lg" && "text-xl sm:text-2xl",
            variant === "dark" ? "text-white" : "text-brand-navy"
          )}
        >
          RIVE{" "}
          <span className="text-brand-coral font-semibold">DIGITALS</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-xs font-medium tracking-wide",
              variant === "dark" ? "text-slate-400" : "text-slate-600"
            )}
          >
            Digital Services &amp; Brand Growth
          </span>
        )}
      </span>
    </Link>
  );
}
