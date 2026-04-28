/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deep Obsidian Black
        surface: "rgba(10, 10, 10, 0.7)", // Obsidian Glass
        border: "rgba(255, 255, 255, 0.1)", // Clean Monochrome Border
        primary: {
          DEFAULT: "#ffffff", // Pure White
          hover: "#d4d4d4",
        },
        secondary: {
          DEFAULT: "#a3a3a3", // Neutral Grey
          hover: "#737373",
        },
        accent: "#404040", // Dark Graphite
        success: "#ffffff", // White success
        warning: "#737373",
        danger: "#404040",
        tokenA: "#ffffff", // Match primary
        tokenB: "#a3a3a3", // Match secondary
        lpToken: "#404040", // Match accent
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'nova-gradient': "radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.08), transparent 70%)",
        'crystal-card': "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

