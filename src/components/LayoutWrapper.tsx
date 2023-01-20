import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container h-screen flex flex-col mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutWrapper;
1;
