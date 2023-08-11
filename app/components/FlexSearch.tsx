'use client';

import useFlexSearchIndex from '@/libs/useFlexSearchIndex';
import { Dialog, Transition } from '@headlessui/react';
import { IconSearch } from '@tabler/icons-react';
import Button from 'app/components/Button';
import clsx from 'clsx';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

const SearchDialog = ({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) => {
  const index = useFlexSearchIndex();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const res = index.search(value, {
      limit: 10,
      enrich: true,
      suggest: true,
      bool: 'and',
    });
    console.log(res);
  };

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      // afterLeave={() => autocomplete.setQuery('')}
    >
      <Dialog
        onClose={setOpen}
        className={clsx('fixed inset-0 z-50', className)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:py-20 sm:px-6 md:py-32 lg:px-8 lg:py-[15vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 dark:bg-zinc-900 dark:ring-zinc-800 sm:max-w-xl">
              <div className="group relative flex h-12">
                <IconSearch className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
                <input
                  type="search"
                  onKeyDown={onKeyDown}
                  className="flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden pr-4"
                  placeholder="Find something..."
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const FlexSearch = ({ className }: { className?: string }) => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (isMac ? event.metaKey : event.ctrlKey)) {
        event.preventDefault();
        setDialogOpen(true);
      }
    };

    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [isMac]);

  return (
    <>
      <Button
        aria-label="Open search dialog"
        className={clsx(
          className,
          'w-8 h-8 inline-flex p-1.5 items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/90',
          'lg:w-full lg:hover:bg-inherit lg:rounded-full lg:ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:lg:bg-white/5 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none'
        )}
        onClick={() => setDialogOpen(true)}
      >
        <IconSearch className="h-auto w-5 lg:w-4 lg:ml-1" />
        <div className="w-full text-sm hidden lg:inline-flex items-center">
          <span className="ml-1 mr-auto text-zinc-400 dark:text-zinc-500">
            Find something...
          </span>
          <kbd className="text-2xs mr-1">
            <kbd className="font-sans">{isMac ? '⌘' : 'Ctrl '}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </div>
      </Button>
      <SearchDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
};

export default FlexSearch;
