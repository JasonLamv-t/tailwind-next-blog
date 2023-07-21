'use client';

import siteData from '#/meta/site';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteData.theme}>
      {children}
    </ThemeProvider>
  );
}
