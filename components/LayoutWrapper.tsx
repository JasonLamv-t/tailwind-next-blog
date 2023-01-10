import { ReactNode } from 'react';
import Navbar from './Navbar';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <main className="mb-auto">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default LayoutWrapper;
