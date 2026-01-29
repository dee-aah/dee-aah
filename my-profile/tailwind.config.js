/** @type {import('tailwindcss').Config} */
module.exports = {
  // PENTING: Baris ini wajib ada agar tombol berfungsi
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}