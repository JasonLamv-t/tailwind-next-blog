import { IconSun, IconMoon } from '@tabler/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() =>
        setTheme(
          theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
        )
      }
    >
      {mounted ? (
        theme === 'dark' || resolvedTheme === 'dark' ? (
          <IconSun />
        ) : (
          <IconMoon />
        )
      ) : null}
    </button>
  );
};
