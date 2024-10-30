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
        primary: "#FFF",
        secondary: "#F0BF60",
        tertiary: "#FFF",
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
