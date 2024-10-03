/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#313131",
        secondary: "#23CDCD",
        tertiary: "#4C4C4C",
        quaternary: "",
        quinary: "",
        senary: "",
      },
      backgroundImage: {},
      boxShadow: {},
    },
  },
  plugins: [],
};
