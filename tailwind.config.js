/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verdeBase: "#2b9348",
        verdeClaro: "#95d5b2",
        fondoVerde: "#e9f5e5",
      },
    },
  },
  plugins: [],
}
