import '@/styles/tailwind.css';
import { marianneFont } from '@/assets/fonts';
import { Matomo } from '@/components/matomo';

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
        {children}
      </body>
    </html>
  );
}
