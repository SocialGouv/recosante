import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Banner } from './banner';
import { Toaster } from './toast';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Header />
      <main className='flex-auto'>{children}</main>
      <Toaster position='top-right' expand={false} />
      <Footer />
    </>
  );
}
