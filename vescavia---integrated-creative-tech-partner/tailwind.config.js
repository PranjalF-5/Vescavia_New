/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'vescavia-black': '#050505',
        'vescavia-white': '#FAFAFA',
        'vescavia-light': '#F4F4F5',
        'vescavia-dark-text': '#0A0A0A',
        'vescavia-gold': '#D4AF37',
        'vescavia-purple': '#7C3AED',
        'eccentric-blue': '#2A45F5',
        'dark-surface': '#121212',
        'light-surface': '#FFFFFF',
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
};
