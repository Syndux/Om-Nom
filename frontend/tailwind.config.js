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
        'maya-blue': '#7EC5FE',
        'dm-maya-blue': '#0D47A1',
        'earth-yellow': '#F1BC6E',
        'dm-earth-yellow': '#814110',
        'button-red': '#DC2626',
        'button-blue': '#2626DC',
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
        'secondary-dark-bg': '#40464F',
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
