/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#E8F6EE',
          100: '#D1EDDC',
          200: '#A3DCB9',
          300: '#75CB96',
          400: '#47BA73',
          500: '#0B9A5B', // secondary green
          600: '#087A4B', // primary green
          700: '#06623C',
          800: '#064E3B', // dark green
          900: '#033527',
          dark: '#064E3B',
          primary: '#087A4B',
          secondary: '#0B9A5B',
          light: '#E8F6EE',
          cream: '#F8FAF4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(8, 122, 75, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(8, 122, 75, 0.15)',
        'glow': '0 0 20px rgba(11, 154, 91, 0.35)',
      }
    },
  },
  plugins: [],
}
