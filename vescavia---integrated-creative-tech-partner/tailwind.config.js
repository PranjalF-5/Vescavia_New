/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'vescavia-black': '#050505',
        'vescavia-white': '#FAFAFA', // Sharper white
        'vescavia-light': '#F4F4F5', // Light mode bg
        'vescavia-dark-text': '#0A0A0A', // Sharper black text
        'vescavia-gold': '#D4AF37', // Kept for legacy, but unused in main theme now
        'vescavia-purple': '#7C3AED', // New "Purpleish Blue" (Electric Violet)
        'eccentric-blue': '#2A45F5', // Tech/System
        'dark-surface': '#121212',
        'light-surface': '#FFFFFF',
        // Override gray with neutral palette for Swiss look
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
        'grid-pattern':
          'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
