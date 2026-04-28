/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Zinc 950
        surface: "#121214", // Dark surface
        border: "#27272a", // Zinc 800
        primary: {
          DEFAULT: "#ffffff", // White
          hover: "#e4e4e7", // Zinc 200
        },
        secondary: {
          DEFAULT: "#a1a1aa", // Zinc 400
          hover: "#71717a", // Zinc 500
        },
        accent: "#27272a", // Zinc 800
        success: "#22c55e", // Green 500
        warning: "#eab308",
        danger: "#ef4444",
        tokenA: "#ffffff",
        tokenB: "#a1a1aa",
        lpToken: "#71717a",
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

