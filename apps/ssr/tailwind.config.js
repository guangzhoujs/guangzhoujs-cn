const colors = require('tailwindcss/colors')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      screens: {
        mobile: '640px',
        tablet: '960px',
        desktop: '1200px',
      },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        primary: '#2B4162',
        electric: '#1b3e9b',
        secondary: '#4D7EA8',
        gold: '#D4AF37',
        'black-coffee': '#fff',
        bone: '#f8fafc',
      },
    },
  },
  plugins: [],
}
