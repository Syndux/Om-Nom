/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#F9FBFC',
        'main-dark-bg': '#23272F',
        'secondary-dark-bg': '#40464F',
        'light-gray': '#EBEBEB',
        'blue-ncs': '#0080C0',
        'dm-blue-ncs': '#0D47A1',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'hero-pattern':
        "url('https://wallpapercave.com/wp/wp7707112.jpg')",
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        'main-bg': '#F9FBFC',
        'main-dark-bg': '#23272F',
        'secondary-dark-bg': '#2E3238',
        'light-gray': '#EBEBEB',
      },
      fontSize: {
        14: "14px",
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
    },
  },
  plugins: [],
};
