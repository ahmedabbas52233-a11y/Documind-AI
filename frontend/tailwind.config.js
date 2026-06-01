/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
        },
        accent: { 500: "#a855f7", 600: "#9333ea" },
        dark:   { 600: "#1a2236", 700: "#111827", 800: "#0d1120", 900: "#080b14" },
      },
    },
  },
  plugins: [],
};
