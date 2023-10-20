/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export const darkMode = ["class"];
export const future = {
  hoverOnlyWhenSupported: true,
};
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    fontFamily: {
      display: ["var(--font-sf)", "system-ui", "sans-serif"],
      default: ["var(--font-inter)", "system-ui", "sans-serif"],
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
      "fade-up": {
        "0%": {
          opacity: 0,
          transform: "translateY(10px)",
        },
        "80%": {
          opacity: 0.6,
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0px)",
        },
      },
      "fade-down": {
        "0%": {
          opacity: 0,
          transform: "translateY(-10px)",
        },
        "80%": {
          opacity: 0.6,
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0px)",
        },
      },
      // Tooltip
      "slide-up-fade": {
        "0%": { opacity: 0, transform: "translateY(6px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "slide-down-fade": {
        "0%": { opacity: 0, transform: "translateY(-6px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      // Fade up and down
      "fade-up": "fade-up 0.5s",
      "fade-down": "fade-down 0.5s",
      // Tooltip
      "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
};
export const plugins = [
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
  plugin(({ addVariant }) => {
    addVariant("radix-side-top", '&[data-side="top"]');
    addVariant("radix-side-bottom", '&[data-side="bottom"]');
  }),
];
