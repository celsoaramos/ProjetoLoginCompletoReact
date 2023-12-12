/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        free: '#52adad',
        common: '#dfdbdb',
        uncommon: '#8c8c8c',
        rare: '#509f50',
        superrare: '#9e2ffd',
        epic: '#D906FF',
        legend: '#bc944d',
        superlegend: '#9E3339',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        // sans: ['Calistoga', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/aspect-ratio')
  ],
}
