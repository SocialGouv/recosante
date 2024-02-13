import clsx from 'clsx';

import '@/styles/tailwind.css';
import { type Metadata } from 'next';
import { marianneFont } from '@/assets/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s - Recosanté',
    default:
      "Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez.",
  },
  description: 'Télécharger l’application Recosanté.',
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
      <body className='flex h-full flex-col font-app font-medium'>
        <div className='flex min-h-full flex-col'>{children}</div>
      </body>
    </html>
  );
}
