import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { Banner } from './banner';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Header />
      <main className='flex-auto'>{children}</main>
      <Footer />
    </>
  );
}
