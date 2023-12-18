/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        MarianneBold: 'Marianne-Bold',
        MarianneBoldItalic: 'Marianne-BoldItalic',
        MarianneExtraBold: 'Marianne-ExtraBold',
        MarianneExtraBoldItalic: 'Marianne-ExtraBoldItalic',
        MarianneLight: 'Marianne-Light',
        MarianneLightItalic: 'Marianne-LightItalic',
        MarianneMedium: 'Marianne-Medium',
        MarianneMediumItalic: 'Marianne-MediumItalic',
        MarianneRegular: 'Marianne-Regular',
        MarianneRegularItalic: 'Marianne-RegularItalic',
        MarianneThin: 'Marianne-Thin',
        MarianneThinItalic: 'Marianne-ThinItalic',
      },
      colors: {
        app: {
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
    },
  },
  plugins: [],
};
