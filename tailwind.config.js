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
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'fadeSlideUp': 'fadeSlideUp 0.7s ease-out forwards',
        'slideInUp': 'slideInUp 0.5s ease-out forwards',
        'slideInRight': 'slideInRight 0.5s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
        'slideUp': 'slideUp 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      translate: ['active', 'group-hover'],
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
