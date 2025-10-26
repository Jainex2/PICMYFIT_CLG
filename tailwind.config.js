/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        // Luxury cream/beige/brown palette from the image
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#f9f1e6',
          300: '#f4e6d3',
          400: '#edd5b7',
          500: '#e4c29f',
          600: '#d4a574',
          700: '#c19a6b',
          800: '#a67c52',
          900: '#8b6441',
        },
        beige: {
          50: '#faf9f7',
          100: '#f5f2ed',
          200: '#ebe4d9',
          300: '#ddd1c0',
          400: '#cbb89f',
          500: '#b8a082',
          600: '#a08968',
          700: '#8b7355',
          800: '#725f47',
          900: '#5d4e3a',
        },
        luxury: {
          50: '#f8f6f3',
          100: '#f0ebe4',
          200: '#e0d5c7',
          300: '#cbb89f',
          400: '#b8a082',
          500: '#a08968',
          600: '#8b7355',
          700: '#725f47',
          800: '#5d4e3a',
          900: '#4a3d2f',
        },
        coffee: {
          50: '#f7f5f3',
          100: '#ede8e3',
          200: '#d9cfc5',
          300: '#c0b09f',
          400: '#a08968',
          500: '#8b7355',
          600: '#725f47',
          700: '#5d4e3a',
          800: '#4a3d2f',
          900: '#3d3326',
        },
        neutral: {
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
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'luxury-float': 'luxuryFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        luxuryFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};