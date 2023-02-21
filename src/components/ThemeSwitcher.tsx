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
    <button
      type="button"
      aria-label="Toggle dark mode"
      className={clsx(
        className,
        'p-1 w-8 h-8 backdrop-blur rounded-md dark:hover:bg-zinc-800/90 text-zinc-500 hover:bg-zinc-100'
      )}
      onClick={() =>
        setTheme(
          theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
        )
      }
    >
      {mounted && (
        <>
          <IconSun className="h-6 w-6  dark:hidden" />
          <IconMoon className="hidden h-6 w-6 dark:block" />
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;
