import clsx from 'clsx';

import '@/styles/tailwind.css';
import { type Metadata } from 'next';
import { marianneFont } from '@/assets/fonts';
import { Matomo } from '@/components/matomo';

export const metadata: Metadata = {
  title: {
    template: '%s - Recosanté',
    default:
      "Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez.",
  },
  description: 'Télécharger l’application Recosanté.',
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
      className={clsx('h-full bg-gray-50 antialiased', marianneFont.variable)}
    >
      <Matomo />
      <body className='flex h-full flex-col font-app font-medium'>
        <div className='flex min-h-full flex-col'>{children}</div>
      </body>
    </html>
  );
}
