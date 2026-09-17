/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#070D0B',
          secondary: '#0E1714',
          gold: '#E5C158',
          'gold-hover': '#F0CF6B',
          emerald: '#1F4535',
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(229, 193, 88, 0.2)',
        card: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
