const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        darkerBlue: '#0d0415',
        blueGray: '#1f2331',
        darkBlue: '#161522',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
