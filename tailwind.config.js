/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--background-secondary-color)",
        secondary: "#F0BF60",
        tertiary: "#FFF",
        quaternary: "",
        quinary: "",
        senary: "",
      },
      backgroundImage: {},
      boxShadow: {
        custom: "0px 5px 20px 0px #0000000D",
      },
    },
  },
  plugins: [],
};
