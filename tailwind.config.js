/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}', './inertia/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        'primary': '#FFD817',
        'secondary': '#FFBA11',
        'input': '#F3F3F3',
        'disabled': '#B4B4B4',
        'sub-text': '#757575',
      },
    },
  },
  plugins: [],
}
