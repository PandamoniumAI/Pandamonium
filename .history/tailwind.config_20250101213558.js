/** @type {import('tailwindcss').Config} */
import lato from "./src/assets/fonts/Lato-Regular.ttf";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["BalooDa2", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}
