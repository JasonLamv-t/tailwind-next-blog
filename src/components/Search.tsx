import { Dialog, Transition } from '@headlessui/react';
import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Button from './Button';
import { IconBrandAlgolia } from '@tabler/icons-react';

function SearchDialog({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
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
              <div
              // {...autocomplete.getRootProps({})}
              >
                <form
                // ref={formRef}
                // {...autocomplete.getFormProps({
                //   inputElement: inputRef.current,
                // })}
                >
                  {/* <SearchInput
                    ref={inputRef}
                    autocomplete={autocomplete}
                    autocompleteState={autocompleteState}
                    onClose={() => setOpen(false)}
                  /> */}
                  <div
                    // ref={panelRef}
                    className="border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5 dark:bg-white/2.5"
                    // {...autocomplete.getPanelProps({})}
                  >
                    {/* {autocompleteState.isOpen && (
                      <>
                        <SearchResults
                          autocomplete={autocomplete}
                          query={autocompleteState.query}
                          collection={autocompleteState.collections[0]}
                        />

                      </>
                    )} */}
                    <p className="flex items-center justify-end gap-2 border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                      Search by{' '}
                      <IconBrandAlgolia className="h-4 fill-[#003DFF] dark:fill-zinc-400" />
                    </p>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function Search({ className }: { className?: string }) {
  const [isMac, setIsMac] = useState<boolean>();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    setIsMac(isApple);

    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (isApple ? event.metaKey : event.ctrlKey)) {
        event.preventDefault();
        setDialogOpen(true);
      }
    };

    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <>
      <Button
        aria-label="Open search dialog"
        className={clsx(
          className,
          'w-8 h-8 inline-flex p-1.5 backdrop-blur items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/90',
          'lg:w-full max-w-xs lg:hover:bg-inherit lg:rounded-full lg:ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:lg:bg-white/5 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none'
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
      {process.env.NODE_ENV !== 'production' && (
        <SearchDialog open={dialogOpen} setOpen={setDialogOpen} />
      )}
    </>
  );
}
