import { Footer } from '@/components/Footer';
import { Header } from '@/components/landing/Header';
import { Banner } from '@/components/banner';
import { Toaster } from '@/components/toast';

export default function Layout({ children }: { children: React.ReactNode }) {
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
