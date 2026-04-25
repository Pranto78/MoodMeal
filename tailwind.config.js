/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a1a",
          surface: "#12122a",
          card: "#1a1a3e",
          border: "rgba(255,255,255,0.08)",
        },
        neon: {
          cyan: "#00f5ff",
          purple: "#a855f7",
          blue: "#3b82f6",
          pink: "#ec4899",
          green: "#10b981",
          orange: "#f97316",
          yellow: "#facc15",
        },
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};
