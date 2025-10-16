/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // We define our app's color palette here
        background: '#111827', // A dark navy/gray
        card: '#1F2937', // A slightly lighter gray for cards
        primary: {
          DEFAULT: '#8B5CF6', // A vibrant violet
          light: '#A78BFA',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF', // A light gray for secondary text
          subtle: '#4B5563', // A darker gray for placeholders
        },
      },
    },
  },
  plugins: [],
};
