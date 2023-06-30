/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height:{
        '800':'660px',
        '600':'600px'
      }
    },
  },
  plugins: [],
}

