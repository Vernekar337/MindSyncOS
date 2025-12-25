/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2A9D8F", // Soft teal
          hover: "#21867a",
          light: "#E0F2F1",
        },
        secondary: {
          DEFAULT: "#6667AB", // Muted purple
          hover: "#54558F",
        },
        accent: {
          DEFAULT: "#F4A261", // Warm coral
          hover: "#E76F51",
        },
        background: {
          DEFAULT: "#F7F9FB", // Off-white
          elevated: "#FFFFFF", // White cards
        },
        text: {
          main: "#2D3748",
          muted: "#718096",
        },
        status: {
          success: "#48BB78",
          danger: "#F56565",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
