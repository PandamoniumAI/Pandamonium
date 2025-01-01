/** @type {import('tailwindcss').Config} */
import lato from "../../";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["BalooDa2", "sans-serif"],
        lato: lato,
      },
    },
  },
  plugins: [],
}
