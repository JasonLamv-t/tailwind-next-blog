'use client';

import Button from '@/components/Button';
import { IconMoon, IconSun } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      aria-label="Toggle dark mode"
      className={clsx(
        className,
        'focus:[&:not(:focus-visible)]:outline-none',
        'px-1.5 items-center w-8 h-8 rounded-md dark:hover:bg-zinc-800/90 text-zinc-500 hover:bg-zinc-100'
      )}
      onClick={() => {
        setTheme(
          theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
        );
      }}
    >
      {mounted && (
        <>
          <IconSun className="h-5 w-5  dark:hidden" />
          <IconMoon className="hidden h-5 w-5 dark:block" />
        </>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
