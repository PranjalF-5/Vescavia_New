/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        'vescavia-black': '#07070C', // Deep ink (dark bg)
        'vescavia-white': '#FAFAFA',
        'vescavia-light': '#F3F2F9', // Cool paper (light bg)
        'vescavia-dark-text': '#0B0B14',
        'dark-surface': '#0E0E16',
        'light-surface': '#FFFFFF',

        // --- Theme palette (see index.css; switch with ?palette=aurora|sunset|acid|ultraviolet) ---
        // Fills & glows
        accent: 'rgb(var(--a1) / <alpha-value>)',
        'accent-2': 'rgb(var(--a2) / <alpha-value>)',
        'accent-3': 'rgb(var(--a3) / <alpha-value>)',
        // Text that sits on an accent fill (dark on bright palettes, white on deep ones)
        'on-accent': 'rgb(var(--on-a) / <alpha-value>)',
        // Accent used for small text on the page background (contrast-safe in both themes)
        'accent-text': 'rgb(var(--a-text) / <alpha-value>)',
        'accent-text-2': 'rgb(var(--a-text-2) / <alpha-value>)',
        'accent-text-3': 'rgb(var(--a-text-3) / <alpha-value>)',
        // Gradient stops for large display type
        'grad-1': 'rgb(var(--g1) / <alpha-value>)',
        'grad-2': 'rgb(var(--g2) / <alpha-value>)',
        'grad-3': 'rgb(var(--g3) / <alpha-value>)',

        // Neutral palette for a clean look
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
      boxShadow: {
        glow: '0 10px 40px -10px rgb(var(--a1) / 0.55)',
        'glow-2': '0 10px 40px -10px rgb(var(--a2) / 0.55)',
        'glow-3': '0 10px 40px -10px rgb(var(--a3) / 0.55)',
        'glow-lg': '0 24px 60px -12px rgb(var(--a1) / 0.5)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        marquee: 'marquee 32s linear infinite',
        'marquee-fast': 'marquee 14s linear infinite',
        float: 'float-y 7s ease-in-out infinite',
        'float-delayed': 'float-y 8s ease-in-out -3s infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        shine: 'shine 6s linear infinite',
        'aurora-a': 'aurora-a 28s ease-in-out infinite',
        'aurora-b': 'aurora-b 34s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
