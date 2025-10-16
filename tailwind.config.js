/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#111827',
        card: '#1F2937',
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          subtle: '#4B5563',
        },
      },
    },
  },
  plugins: [],
};
