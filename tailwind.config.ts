import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: "var(--brand-navy)",
            elevated: "var(--brand-navy-elevated)",
            surface: "var(--brand-navy-surface)",
            border: "var(--brand-navy-border)",
          },
          coral: {
            DEFAULT: "var(--brand-coral)",
            strong: "var(--brand-coral-strong)",
            hover: "var(--brand-coral-hover)",
            light: "var(--brand-coral-light)",
            muted: "var(--brand-coral-muted)",
          },
          canvas: "var(--brand-canvas)",
          surface: "var(--brand-surface)",
          slate: "var(--brand-slate)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(6, 20, 31, 0.06), 0 2px 8px -2px rgba(6, 20, 31, 0.04)",
        "card-hover":
          "0 16px 40px -8px rgba(6, 20, 31, 0.12), 0 4px 12px -2px rgba(6, 20, 31, 0.06)",
        glow: "0 0 32px -4px rgba(216, 104, 117, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
