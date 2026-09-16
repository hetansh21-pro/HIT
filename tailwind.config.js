/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hit: {
          red: '#FF1E42',
          redHover: '#E01536',
          neon: '#DFFF00',
          dark: '#0F172A',
          charcoal: '#1E293B',
          muted: '#64748B',
          light: '#F8FAFC',
          cardBorder: '#EEF2F6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2s ease-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
