/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        primary: { 400:"#818cf8", 500:"#6366f1", 600:"#4f46e5" },
        accent:  { 500:"#a855f7", 600:"#7c3aed" },
        surface: { 50:"#f8fafc", 900:"#0c0c10", 800:"#12121a", 700:"#1a1a24" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
=======
        primary: {
          400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
        },
        accent: { 500: "#a855f7", 600: "#9333ea" },
        dark:   { 600: "#1a2236", 700: "#111827", 800: "#0d1120", 900: "#080b14" },
>>>>>>> origin/main
      },
    },
  },
  plugins: [],
};
