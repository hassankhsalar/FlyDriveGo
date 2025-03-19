/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "red-rose": ['"Red Rose"', "serif"],
        poppins: ["Poppins", "sans-serif"],
        sans: ["Catamaran", "serif"],
      },
      colors: {
        text: "#03191c",
        background: "#ffffff",
        primary: "#05CDDB",
        secondary: "#DDF2D1",
        SmokeWhite: "#F5F5F5",
        CharcoleDark: "#333333",
      },
    },
  },

 plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
