import localFont from 'next/font/local';

export const marianneFont = localFont({
  src: [
    {
      path: './Marianne-Bold.woff2',
      weight: '900',
    },
    {
      path: './Marianne-BoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Marianne-ExtraBold.woff2',
      weight: '900',
    },
    {
      path: './Marianne-ExtraBoldItalic.woff2',
      weight: '900',
      style: 'italic',
    },

    {
      path: './Marianne-Medium.woff2',
      weight: '500',
    },
    {
      path: './Marianne-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './Marianne-Regular.woff2',
      weight: '400',
    },
    {
      path: './Marianne-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Marianne-Light.woff2',
      weight: '400',
    },
    {
      path: './Marianne-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './Marianne-Thin.woff2',
      weight: '100',
    },
    {
      path: './Marianne-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-marianne',
  display: 'swap',
});
