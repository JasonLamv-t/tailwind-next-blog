import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';
import Button from './Button';

export default function Search({ className }: { className?: string }) {
  return (
    <Button
      aria-label="Open search dialog"
      className={clsx(
        className,
        'w-8 h-8 inline-flex p-1.5 backdrop-blur items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/90',
        'lg:w-full max-w-xs lg:hover:bg-inherit lg:rounded-full lg:ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:lg:bg-white/5 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none'
      )}
    >
      <IconSearch className="h-auto w-5 lg:w-4 lg:ml-1" />
      <div className="w-full text-sm hidden lg:inline-flex items-center">
        <span className="ml-1 mr-auto text-zinc-400 dark:text-zinc-500">
          Find something...
        </span>
        <kbd className="text-2xs mr-1">
          <kbd className="font-sans">Ctrl </kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </div>
    </Button>
  );
}
