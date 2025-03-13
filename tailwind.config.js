/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Catamaran', 'serif'],
      },
      colors: {
        'text': '#03191c',
        'background': '#ffffff',
        'primary': '#4EDAE4',
        'secondary': '#DDF2D1',
        'SmokeWhite': '##F5F5F5',
        'CharcoleDark' : '#333333',
       },
    },
  }, 
  plugins: [
    require('daisyui'),
  ],
}

