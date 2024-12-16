/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        expandVertical: 'expandVertical 0.3s ease-out forwards',
        collapseVertical: 'collapseVertical 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        expandVertical: {
          '0%': {
            opacity: '0',
            maxHeight: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            maxHeight: '500px',
            transform: 'translateY(0)',
          },
        },
        collapseVertical: {
          '0%': {
            opacity: '1',
            maxHeight: '500px',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            maxHeight: '0',
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
};