/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      blur: {
        '150': '150px', // Add custom blur value
      },
    },
  },
  plugins: [],
};
