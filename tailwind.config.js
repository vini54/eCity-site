/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        palleteBlue10: "#0154AB",
        palleteBlue20: "#1562B1",
        palleteBlue30: "#2169B6",
        palleteOrange10: "#F26522",
      },
    },
  },
  plugins: [],
};
