/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "baloo": ["BalooDa2-Regular", "sans-serif"]
      }
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'BalooDa2-Regular',
          src: 'url("/src/assets/fonts/BalooDa2-Regular.ttf") format("truetype")',
          fontWeight: 'normal',
          fontStyle: 'normal',
        }
      })
    },
  ],
}
