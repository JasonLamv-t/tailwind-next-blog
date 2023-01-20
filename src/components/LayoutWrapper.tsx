import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container h-screen flex flex-col mx-auto px-4 sm:px-6 lg:px-8 bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutWrapper;
