/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080711", // Deep Space Carbon
        surface: "rgba(18, 16, 38, 0.6)", // Holographic Dark Slate
        border: "rgba(0, 240, 255, 0.15)", // Glowing Cyan Border
        primary: {
          DEFAULT: "#ff007a", // Neon Pink
          hover: "#d40066",
        },
        secondary: {
          DEFAULT: "#00f0ff", // Neon Cyan
          hover: "#00c8d4",
        },
        accent: "#8a2be2", // Electric Purple
        success: "#00ff88", // Neon Green
        warning: "#ffaa00",
        danger: "#ff0055",
        tokenA: "#ff007a", // Match primary
        tokenB: "#00f0ff", // Match secondary
        lpToken: "#8a2be2", // Match accent
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'nova-gradient': "radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.05), transparent 70%)",
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

