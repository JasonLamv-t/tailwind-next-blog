import { resolveResult, Result, useAutocomplete } from '@/libs/algolia';
import {
  AutocompleteApi,
  AutocompleteCollection,
  AutocompleteState,
} from '@algolia/autocomplete-core';
import { Dialog, Transition } from '@headlessui/react';
import { IconLoader2, IconSearch, IconSearchOff } from '@tabler/icons-react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  Dispatch,
  forwardRef,
  Fragment,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import Button from './Button';

const AlgoliaLogo = ({ className }: { className: string }) => (
  <svg
    width="485"
    height="120"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2197 501"
    className={className}
    aria-label="Algolia logo"
  >
    <path d="M1070.38 275.57V6.18c0-3.63-3.24-6.39-6.82-5.83l-50.46 7.94a5.912 5.912 0 0 0-4.99 5.84l.17 273.22c0 12.92 0 92.7 95.97 95.49 3.33.1 6.09-2.58 6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72l.01-.02Z" />
    <path d="M1902.56 105.01h-50.78a5.9 5.9 0 0 0-5.9 5.9v266.1a5.9 5.9 0 0 0 5.9 5.9h50.78c3.25 0 5.9-2.642 5.9-5.9v-266.1c0-3.258-2.65-5.9-5.9-5.9Z" />
    <path d="M1851.78 71.65h50.77c3.26 0 5.9-2.64 5.9-5.9V6.18c0-3.62-3.24-6.39-6.82-5.83l-50.77 7.95a5.902 5.902 0 0 0-4.99 5.83v51.62c0 3.26 2.64 5.9 5.9 5.9h.01Zm-87.75 203.92V6.18c0-3.63-3.24-6.39-6.82-5.83l-50.46 7.94a5.912 5.912 0 0 0-4.99 5.84l.17 273.22c0 12.92 0 92.7 95.97 95.49 3.33.1 6.09-2.58 6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72l.01-.02ZM1631.95 143c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78 0-36.15 3.17-51.92 9.85-15.59 6.66-29.29 16.05-40.76 28.31-11.47 12.23-20.38 26.87-26.76 44.03-6.38 17.17-9.24 37.37-9.24 58.36 0 20.99 3.19 36.87 9.55 54.21 6.38 17.32 15.14 32.11 26.45 44.36 11.29 12.23 24.83 21.62 40.6 28.46 15.77 6.83 40.12 10.33 52.4 10.48 12.25 0 36.78-3.82 52.7-10.48 15.92-6.68 29.46-16.23 40.78-28.46 11.29-12.25 20.05-27.04 26.25-44.36 6.22-17.34 9.24-33.22 9.24-54.21 0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03h.02Zm-44.43 163.75c-11.47 15.75-27.56 23.7-48.09 23.7-20.55 0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2 0-26.89 5.59-49.14 17.06-64.87 11.45-15.75 27.54-23.52 48.07-23.52 20.55 0 36.63 7.78 48.09 23.52 11.47 15.57 17.36 37.98 17.36 64.87 0 27.19-5.72 45.3-17.19 61.2h.01ZM894.416 105.01h-49.33c-48.36 0-90.91 25.48-115.75 64.1-14.52 22.58-22.99 49.63-22.99 78.73 0 44.89 20.13 84.92 51.59 111.1 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 1.23 0 2.46-.03 3.68-.09.36-.02.71-.05 1.07-.07.87-.05 1.75-.11 2.62-.2.34-.03.68-.08 1.02-.12.91-.1 1.82-.21 2.73-.34.21-.03.42-.07.63-.1 32.89-5.07 61.56-30.82 70.9-62.81v57.83c0 3.26 2.64 5.9 5.9 5.9h50.42c3.26 0 5.9-2.64 5.9-5.9V110.91c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0 206.92c-12.2 10.16-27.97 13.98-44.84 15.12-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-42.24 0-77.12-35.89-77.12-79.37 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33v142.83ZM2133.97 105.01h-49.33c-48.36 0-90.91 25.48-115.75 64.1-14.52 22.58-22.99 49.63-22.99 78.73 0 44.89 20.13 84.92 51.59 111.1 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 1.23 0 2.46-.03 3.68-.09.36-.02.71-.05 1.07-.07.87-.05 1.75-.11 2.62-.2.34-.03.68-.08 1.02-.12.91-.1 1.82-.21 2.73-.34.21-.03.42-.07.63-.1 32.89-5.07 61.56-30.82 70.9-62.81v57.83c0 3.26 2.64 5.9 5.9 5.9h50.42c3.26 0 5.9-2.64 5.9-5.9V110.91c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0 206.92c-12.2 10.16-27.97 13.98-44.84 15.12-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-42.24 0-77.12-35.89-77.12-79.37 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33v142.83Zm-819.92-206.92h-49.33c-48.36 0-90.91 25.48-115.75 64.1-11.79 18.34-19.6 39.64-22.11 62.59a148.518 148.518 0 0 0 .05 32.73c4.28 38.09 23.14 71.61 50.66 94.52 2.93 2.6 6.05 4.98 9.31 7.14 12.86 8.49 28.11 13.47 44.52 13.47 17.99 0 34.61-5.93 48.16-15.97 16.29-11.58 28.88-28.54 34.48-47.75v50.26h-.11v11.08c0 21.84-5.71 38.27-17.34 49.36-11.61 11.08-31.04 16.63-58.25 16.63-11.12 0-28.79-.59-46.6-2.41-2.83-.29-5.46 1.5-6.27 4.22l-12.78 43.11c-1.02 3.46 1.27 7.02 4.83 7.53 21.52 3.08 42.52 4.68 54.65 4.68 48.91 0 85.16-10.75 108.89-32.21 21.48-19.41 33.15-48.89 35.2-88.52V110.93c0-3.26-2.64-5.9-5.9-5.9h-56.32l.01-.02Zm0 64.1s.65 139.13 0 143.36c-12.08 9.77-27.11 13.59-43.49 14.7-.16.01-.33.03-.49.04-1.12.07-2.24.1-3.36.1-1.32 0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38 0-10.25 1.96-20.01 5.42-28.98 11.22-29.12 38.77-49.74 71.06-49.74h49.33-.01Z" />
    <path d="M249.826.28C113.296.28 1.996 110.36.026 246.43c-2 138.19 110.12 252.7 248.33 253.5 42.68.25 83.79-10.19 120.3-30.03 3.56-1.93 4.11-6.83 1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48 10.84-53.17 16.38-81.71 16.03-111.68-1.37-201.91-94.29-200.13-205.96 1.76-110.26 92-199.41 202.67-199.41h202.69v360.27l-115-102.18c-3.72-3.31-9.42-2.66-12.42 1.31-18.46 24.44-48.53 39.64-81.93 37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24 39.63-101.52 94-101.52 49.18 0 89.68 37.85 93.91 85.95.38 4.28 2.31 8.27 5.52 11.12l29.95 26.55c3.4 3.01 8.79 1.17 9.63-3.3 2.16-11.55 2.92-23.58 2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13 58.14-150.27 137.25-2.09 77.1 61.08 143.56 138.19 145.26 32.19.71 62.03-9.41 86.14-26.95l150.26 133.2c6.44 5.71 16.61 1.14 16.61-7.47V9.74c0-5.24-4.24-9.48-9.48-9.48h-240.36v.02Z" />
  </svg>
);

const SearchInput = forwardRef<
  HTMLInputElement,
  {
    autocomplete: AutocompleteApi<
      Result,
      React.ChangeEvent,
      React.MouseEvent,
      React.KeyboardEvent
    >;
    autocompleteState: AutocompleteState<Result> | null;
    onClose: () => void;
  }
>(function SearchInput({ autocomplete, autocompleteState, onClose }, inputRef) {
  const inputProps = autocomplete.getInputProps({
    inputElement: null,
  });

  return (
    <div className="group relative flex h-12">
      <IconSearch className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
      <input
        ref={inputRef}
        className={clsx(
          'flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
          autocompleteState?.status === 'stalled' ? 'pr-11' : 'pr-4'
        )}
        {...inputProps}
        onKeyDown={(event) => {
          if (
            event.key === 'Escape' &&
            !autocompleteState?.isOpen &&
            autocompleteState?.query === ''
          ) {
            // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
            // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
            // @ts-ignore
            document.activeElement?.blur();

            onClose();
          } else {
            inputProps.onKeyDown(event);
          }
        }}
      />
      {autocompleteState?.status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <IconLoader2 className="h-5 w-5 animate-spin stroke-zinc-300  dark:stroke-zinc-400 " />
        </div>
      )}
    </div>
  );
});

function SearchResult({
  result,
  resultIndex,
  autocomplete,
  collection,
}: {
  result: Result;
  resultIndex: number;
  autocomplete: AutocompleteApi<
    Result,
    React.ChangeEvent,
    React.MouseEvent,
    React.KeyboardEvent
  > | null;
  collection: AutocompleteCollection<Result>;
}) {
  const id = useId();
  const { titleHtml, hierarchyHtml } = resolveResult(result);

  return (
    <li
      className={clsx(
        'group block cursor-default px-4 py-3 aria-selected:bg-zinc-50 dark:aria-selected:bg-zinc-800/50',
        resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800'
      )}
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete?.getItemProps({
        item: result,
        source: collection.source,
      })}
    >
      <div
        id={`${id}-title`}
        aria-hidden="true"
        className="text-sm font-medium text-zinc-900 group-aria-selected:text-emerald-500 dark:text-white"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
      {hierarchyHtml.length > 0 && (
        <div
          id={`${id}-hierarchy`}
          aria-hidden="true"
          className="mt-1 truncate whitespace-nowrap text-2xs text-zinc-500"
        >
          {hierarchyHtml.map((item, itemIndex, items) => (
            <Fragment key={itemIndex}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
              <span
                className={
                  itemIndex === items.length - 1
                    ? 'sr-only'
                    : 'mx-2 text-zinc-300 dark:text-zinc-700'
                }
              >
                /
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </li>
  );
}

function SearchResults({
  autocomplete,
  query,
  collection,
}: {
  autocomplete: AutocompleteApi<
    Result,
    React.ChangeEvent,
    React.MouseEvent,
    React.KeyboardEvent
  >;
  query?: string;
  collection?: AutocompleteCollection<Result>;
}) {
  if (!collection || collection.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <IconSearchOff className="mx-auto h-4 w-4 stroke-zinc-900 dark:stroke-zinc-600" />
        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
          Nothing found for{' '}
          <strong className="break-words font-semibold text-zinc-900 dark:text-white">
            &lsquo;{query}&rsquo;
          </strong>
          . Please try again.
        </p>
      </div>
    );
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result, resultIndex) => (
        <SearchResult
          key={result.objectID as string}
          result={result}
          resultIndex={resultIndex}
          autocomplete={autocomplete}
          collection={collection}
        />
      ))}
    </ul>
  );
}

function SearchDialog({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { autocomplete, autocompleteState } = useAutocomplete();

  useEffect(() => {
    if (!open) {
      return;
    }

    function onRouteChange() {
      setOpen(false);
    }

    router.events.on('routeChangeStart', onRouteChange);
    router.events.on('hashChangeStart', onRouteChange);

    return () => {
      router.events.off('routeChangeStart', onRouteChange);
      router.events.off('hashChangeStart', onRouteChange);
    };
  }, [open, setOpen, router]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => autocomplete.setQuery('')}
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
              <div {...autocomplete.getRootProps({})}>
                <form
                  ref={formRef}
                  {...autocomplete.getFormProps({
                    inputElement: inputRef.current,
                  })}
                >
                  <SearchInput
                    ref={inputRef}
                    autocomplete={autocomplete}
                    autocompleteState={autocompleteState}
                    onClose={() => setOpen(false)}
                  />

                  <div
                    ref={panelRef}
                    className="border-t border-zinc-200 bg-white empty:hidden dark:bg-zinc-900 dark:ring-zinc-800 dark:border-zinc-100/5 dark:bg-white/2.5"
                    {...autocomplete.getPanelProps({})}
                  >
                    {autocompleteState?.isOpen && (
                      <>
                        <SearchResults
                          autocomplete={autocomplete}
                          query={autocompleteState?.query}
                          collection={autocompleteState?.collections[0]}
                        />
                        <p className="flex items-center justify-end gap-2 border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                          Search by{' '}
                          <AlgoliaLogo className="h-4 w-auto fill-[#003DFF] dark:fill-zinc-400" />
                        </p>
                      </>
                    )}
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
          'w-8 h-8 inline-flex p-1.5 items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/90',
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
      <SearchDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
}
