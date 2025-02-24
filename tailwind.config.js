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
        primary: "var(--background-color)",
        bg_secondary: "var(--background-secondary-color)",
        secondary: "#EFBF60",
        tertiary: "var(--tertiary-text)",
        quaternary: "",
        quinary: "",
        senary: "",
      },
      backgroundImage: {
        body: "url('/images/body-background.png')",
      },
      boxShadow: {
        custom: "var(--shadow-custom)",
      },
    },
  },
  plugins: [],
};
