import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        /* ---- Cinematic core palette ------------------------------- */
        ink: {
          DEFAULT: "#07090E",
          50: "#F6F7F9",
          100: "#EAECF0",
          200: "#D4D7DE",
          300: "#AEB4BF",
          400: "#7C8492",
          500: "#5A626F",
          600: "#454C57",
          700: "#343A43",
          800: "#1E222A",
          900: "#12151B",
          950: "#07090E",
        },
        navy: {
          DEFAULT: "#0A1020",
          50: "#EEF2F9",
          100: "#D6DFEE",
          200: "#AFC0DD",
          300: "#8099C6",
          400: "#5875AE",
          500: "#3B5794",
          600: "#2B417A",
          700: "#233462",
          800: "#1B2949",
          900: "#0A1020",
          950: "#060A14",
        },
        /* Warm neutral — paper / bone */
        bone: {
          DEFAULT: "#F5F3EF",
          50: "#FCFBF9",
          100: "#F5F3EF",
          200: "#EBE7DF",
          300: "#DDD6C9",
          400: "#C7BCA9",
          500: "#AC9E88",
          600: "#8E7F68",
          700: "#726651",
          800: "#5C5244",
          900: "#4C453A",
        },
        /* Electric blue — used sparingly as an accent */
        electric: {
          DEFAULT: "#2E6BFF",
          50: "#EEF3FF",
          100: "#D9E4FF",
          200: "#BCCCFF",
          300: "#8FA8FF",
          400: "#5C82FF",
          500: "#2E6BFF",
          600: "#1B50E0",
          700: "#163FB4",
          800: "#17358D",
          900: "#183070",
        },
        /* Signal green — status / WhatsApp only */
        signal: {
          DEFAULT: "#25D366",
          400: "#4BE382",
          500: "#25D366",
          600: "#1DAE50",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Chakra Petch Fallback",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-display)",
          "Chakra Petch Fallback",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7.2vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2.25rem, 5.2vw, 4.5rem)", { lineHeight: "1.04", letterSpacing: "-0.012em" }],
        "display-md": ["clamp(1.85rem, 3.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.008em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2.125rem)", { lineHeight: "1.18", letterSpacing: "-0.005em" }],
        "lede": ["clamp(1.0625rem, 1.35vw, 1.3125rem)", { lineHeight: "1.62" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.22em" }],
        micro: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
      },
      spacing: {
        section: "clamp(4.5rem, 10vw, 9.5rem)",
        "section-sm": "clamp(3rem, 6vw, 5.5rem)",
        gutter: "clamp(1.25rem, 4vw, 3rem)",
      },
      maxWidth: {
        prose: "62ch",
        content: "1040px",
      },
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        hairline: "0 0 0 1px rgba(255,255,255,0.08)",
        lift: "0 1px 2px rgba(7,9,14,0.04), 0 12px 32px -12px rgba(7,9,14,0.14)",
        "lift-lg": "0 2px 4px rgba(7,9,14,0.05), 0 28px 60px -20px rgba(7,9,14,0.24)",
        deep: "0 40px 90px -32px rgba(6,10,20,0.55)",
        glow: "0 0 0 1px rgba(46,107,255,0.35), 0 18px 46px -16px rgba(46,107,255,0.5)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(7,9,14,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,9,14,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "72px 72px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "out-soft": "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
        "600": "600ms",
        "900": "900ms",
      },
      keyframes: {
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
