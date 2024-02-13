import { type Config } from 'tailwindcss';
import formsPlugin from '@tailwindcss/forms';
import headlessuiPlugin from '@headlessui/tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      app: ['var(--font-marianne)'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '3rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      colors: {
        muted: '#555555',
        'muted-100': '#9C9C9C',
        dark: '#232323',
        app: {
          green: '#4FCBAD',
          gray: '#ECF1FB',
          'gray-100': '#AEB1B7',
          'gray-300': '#D9D9EF',
          yellow: '#F2D072',
          primary: '#3343BD',
          dark: '#000A8B',
          50: '#f1f4ff',
          100: '#e5e8ff',
          200: '#ced5ff',
          300: '#a7b1ff',
          400: '#767fff',
          500: '#3f42ff',
          600: '#2118ff',
          700: '#1007fa',
          800: '#0d05d2',
          900: '#0c06ac',
          950: '#000091', // this is the main color
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      maxWidth: {
        '2xl': '40rem',
      },
    },
  },
  plugins: [
    formsPlugin,
    headlessuiPlugin,
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
