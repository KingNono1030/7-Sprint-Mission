/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-layout': 'auto 1fr',
      },
      fontFamily: {
        primary: 'Pretendard',
      },
      colors: {
        blue: {
          light: '#CFE5FF',
          DEFAULT: '#3692FF',
          dark: '#3692FF',
        },
        white: {
          light: '#F5F5F5',
          text: '#F5F5F5',
          DEFAULT: '#fff',
          dark: '#943126',
        },
        gray: {
          DEFAULT: '#374151',
          dark: '#9A7D0A',
        },
      },
      boxShadow: {
        'custom-light': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
    },
  },
  plugins: [],
};
