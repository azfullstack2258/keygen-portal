/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#00FF88', // derived from logo color
        secondary: '#FFFFFF', // white
        dark: '#000000', // black
        // add other colors as needed
      },
      fontFamily: {
        owners: ['Owners', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

