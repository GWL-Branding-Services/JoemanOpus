/** @type {import('tailwindcss').Config} */
export default {
  content: [
 "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
 colors: { 
        "gwltheme": "#693813",
        "gwltheme-light": "#cf6b20", 
        "gwltheme-accent": "#fd7e14"
      },
      screens: {
        'lg': '992px',
        'sd': '550px',
      },},
  },
  plugins: [],
}

