import siteData from '#/meta/site';
import { Head, Html, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* for remark-math&rehype-katex */}
        <Link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />
      </Head>
      <body className="bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
