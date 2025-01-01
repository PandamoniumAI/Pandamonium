/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "baloo": ["BalooDa2", "sans-serif"]
        "lato": ["Lato", "sans-serif"]
      }
    },
  },
  plugins: [],
}
