import { siteMeta } from '#/config';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Providers } from '@/components/Provider';
import '@/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  authors: siteMeta.authors,
  generator: 'NextJS & Contentlayer & Tailwind-next-blog',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={siteMeta.language}>
      <body className="antialiased bg-zinc-50 dark:bg-black">
        <Providers>
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
