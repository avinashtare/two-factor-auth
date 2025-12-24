// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        background: {
          primary: "#111827", // gray-900
          secondary: "#1F2937", // gray-800
          tertiary: "#000000", // black
        },

        // Gray Scale
        gray: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
        },

        // Primary Purple
        purple: {
          900: "#581C87",
          800: "#6B21A8",
          700: "#7C3AED",
          600: "#9333EA",
          500: "#A855F7",
          400: "#C084FC",
          300: "#D8B4FE",
        },

        // Secondary Pink
        pink: {
          900: "#831843",
          800: "#9D174D",
          700: "#BE185D",
          600: "#DB2777",
          500: "#EC4899",
          400: "#F472B6",
          300: "#F9A8D4",
        },

        // Accent Colors
        blue: {
          500: "#3B82F6",
        },
        cyan: {
          500: "#06B6D4",
        },
        green: {
          500: "#10B981",
        },
        emerald: {
          500: "#10B981",
        },
        orange: {
          500: "#F97316",
        },
        red: {
          500: "#EF4444",
        },
        yellow: {
          900: "#713F12",
          700: "#A16207",
          300: "#FDE047",
        },
      },

      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to bottom right, #111827, #1F2937, #000000)",
        "gradient-purple-pink": "linear-gradient(to right, #9333EA, #DB2777)",
        "gradient-purple-pink-hover":
          "linear-gradient(to right, #7C3AED, #BE185D)",
        "gradient-blue-cyan":
          "linear-gradient(to bottom right, #3B82F6, #06B6D4)",
        "gradient-green-emerald":
          "linear-gradient(to bottom right, #10B981, #10B981)",
        "gradient-orange-red":
          "linear-gradient(to bottom right, #F97316, #EF4444)",
        "gradient-purple-900": "linear-gradient(to right, #581C87, #831843)",
      },

      backdropBlur: {
        md: "12px",
        xl: "24px",
      },

      boxShadow: {
        "purple-glow": "0 10px 40px -10px rgba(147, 51, 234, 0.3)",
        "pink-glow": "0 10px 40px -10px rgba(219, 39, 119, 0.3)",
      },

      borderColor: {
        "gray-primary": "#374151",
        "gray-secondary": "#4B5563",
        "purple-primary": "#7C3AED",
        "yellow-primary": "#A16207",
      },
    },
  },
  plugins: [],
};

export default config;
