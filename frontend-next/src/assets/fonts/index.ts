import localFont from 'next/font/local';

export const marianneFont = localFont({
  src: [
    {
      path: './Marianne-Bold.otf',
      weight: '900',
    },
    {
      path: './Marianne-BoldItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Marianne-ExtraBold.otf',
      weight: '900',
    },
    {
      path: './Marianne-ExtraBoldItalic.otf',
      weight: '900',
      style: 'italic',
    },

    {
      path: './Marianne-Medium.otf',
      weight: '500',
    },
    {
      path: './Marianne-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './Marianne-Regular.otf',
      weight: '400',
    },
    {
      path: './Marianne-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Marianne-Light.otf',
      weight: '400',
    },
    {
      path: './Marianne-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './Marianne-Thin.otf',
      weight: '100',
    },
    {
      path: './Marianne-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-marianne',
});
