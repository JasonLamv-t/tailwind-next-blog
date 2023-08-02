'use client';

import { siteMeta } from '#/config';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMeta.theme}>
      <div className="h-full min-h-screen flex flex-col mx-auto max-w-5xl px-4 sm:px-10 xl:px-16 bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
        {children}
      </div>
    </ThemeProvider>
  );
}
