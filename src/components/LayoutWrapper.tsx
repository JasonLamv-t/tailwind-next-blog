import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 sm:px-10 xl:px-16 bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
        <div className="h-full min-h-screen flex flex-col">
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
