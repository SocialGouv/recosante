import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SimpleHeader } from '@/components/SimpleHeader';
import { Banner } from '@/components/banner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <SimpleHeader />
      <main className='flex-auto'>{children}</main>
      <Footer />
    </>
  );
}
