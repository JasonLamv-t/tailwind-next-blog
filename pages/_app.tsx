import LayoutWrapper from 'components/LayoutWrapper';
import siteData from 'data/meta/site';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteData.theme}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
