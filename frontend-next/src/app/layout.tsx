import '@/styles/tailwind.css';
import { type Metadata } from 'next';
import { marianneFont } from '@/assets/fonts';
import { Matomo } from '@/components/matomo';
import { CookieBanner } from '@/components/cookie-banner/cookie-banner';
import { Suspense } from 'react';

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: 'https://recosante-preprod.ovh.fabrique.social.gouv.fr/og-image-x2.jpg',
        width: 1200,
        height: 630,
        alt: 'Recosanté',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: 'https://recosante-preprod.ovh.fabrique.social.gouv.fr/og-image-x2.jpg',
        width: 1200,
        height: 630,
        alt: 'Recosanté',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='fr'
      className={`h-full bg-gray-50 antialiased  ${marianneFont.variable} font-sans`}
    >
      <Matomo />
      <body className='flex h-full flex-col font-app font-medium'>
        <Suspense>
          <CookieBanner />
        </Suspense>
        <div className='flex min-h-full flex-col'>{children}</div>
      </body>
    </html>
  );
}
