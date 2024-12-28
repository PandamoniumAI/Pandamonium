/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fonts:{
        "baloo": ["Baloo 2", "sans-serif"],
      }
    },
  },
  plugins: [],
}

