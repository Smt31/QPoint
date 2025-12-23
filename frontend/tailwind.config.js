/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        primaryHover: "#FF5252",
        bgMain: "#FFF5F6",
        textPrimary: "#1A1A1A",
        textSecondary: "#4A4A4A",
        textMuted: "#9CA3AF",
        border: "#E5E7EB",
      },
    },
  }
,
  plugins: [],
};
