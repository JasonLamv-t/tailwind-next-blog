//@ts-nocheck
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Dialog, Transition } from '@headlessui/react';
import { IconBrandAlgolia, IconSearch } from '@tabler/icons-react';
import algoliasearch from 'algoliasearch/lite';
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

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
  process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string
);

function useAutocomplete() {
  const id = useId();
  const router = useRouter();
  const [autocompleteState, setAutocompleteState] = useState({});

  const [autocomplete] = useState(() =>
    createAutocomplete({
      id,
      placeholder: 'Find something...',
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        setAutocompleteState(state);
      },
      shouldPanelOpen({ state }) {
        return state.query !== '';
      },
      navigator: {
        navigate({ itemUrl }) {
          autocomplete.setIsOpen(true);
          router.push(itemUrl);
        },
      },
      getSources() {
        return [
          {
            sourceId: 'querySuggestions',
            getItemInputValue({ item }) {
              return item.query;
            },
            getItemUrl({ item }) {
              const url = new URL(item.url);
              return `${url.pathname}${url.hash}`;
            },
            onSelect({ itemUrl }) {
              router.push(itemUrl);
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    query,
                    indexName: process.env
                      .NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string,
                    params: {
                      hitsPerPage: 5,
                      highlightPreTag:
                        '<mark class="underline bg-transparent text-emerald-500">',
                      highlightPostTag: '</mark>',
                    },
                  },
                ],
              });
            },
          },
        ];
      },
    })
  );

  return { autocomplete, autocompleteState };
}

const SearchInput = forwardRef(function SearchInput(
  { autocomplete, autocompleteState, onClose },
  inputRef
) {
  let inputProps = autocomplete.getInputProps({});

  return (
    <div className="group relative flex h-12">
      <IconSearch className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
      <input
        ref={inputRef}
        className={clsx(
          'flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
          autocompleteState.status === 'stalled' ? 'pr-11' : 'pr-4'
        )}
        {...inputProps}
        onKeyDown={(event) => {
          if (
            event.key === 'Escape' &&
            !autocompleteState.isOpen &&
            autocompleteState.query === ''
          ) {
            // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
            // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
            document.activeElement?.blur();

            onClose();
          } else {
            inputProps.onKeyDown(event);
          }
        }}
      />
      {autocompleteState.status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-emerald-400" />
        </div>
      )}
    </div>
  );
});

function resolveResult(result) {
  let allLevels = Object.keys(result.hierarchy);
  let hierarchy = Object.entries(result._highlightResult.hierarchy).filter(
    ([, { value }]) => Boolean(value)
  );
  let levels = hierarchy.map(([level]) => level);

  let level =
    result.type === 'content'
      ? levels.pop()
      : levels
          .filter(
            (level) =>
              allLevels.indexOf(level) <= allLevels.indexOf(result.type)
          )
          .pop();

  return {
    titleHtml: result._highlightResult.hierarchy[level].value,
    hierarchyHtml: hierarchy
      .slice(0, levels.indexOf(level))
      .map(([, { value }]) => value),
  };
}

function SearchResult({ result, resultIndex, autocomplete, collection }) {
  let id = useId();
  let { titleHtml, hierarchyHtml } = resolveResult(result);

  return (
    <li
      className={clsx(
        'group block cursor-default px-4 py-3 aria-selected:bg-zinc-50 dark:aria-selected:bg-zinc-800/50',
        resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800'
      )}
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete.getItemProps({
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

function SearchResults({ autocomplete, query, collection }) {
  if (collection.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
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
    <ul role="list" {...autocomplete.getListProps()}>
      {collection.items.map((result, resultIndex) => (
        <SearchResult
          key={result.objectID}
          result={result}
          resultIndex={resultIndex}
          autocomplete={autocomplete}
          collection={collection}
        />
      ))}
    </ul>
  );
}

function NoResultsIcon(props: any) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
      />
    </svg>
  );
}

function LoadingIcon(props: any) {
  let id = useId();

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="5.5" strokeLinejoin="round" />
      <path
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 10a5.5 5.5 0 1 0-5.5 5.5"
      />
      <defs>
        <linearGradient
          id={id}
          x1="13"
          x2="9.5"
          y1="9"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
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
  const formRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
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
                    className="border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5 dark:bg-white/2.5"
                    {...autocomplete.getPanelProps({})}
                  >
                    {autocompleteState.isOpen && (
                      <>
                        <SearchResults
                          autocomplete={autocomplete}
                          query={autocompleteState.query}
                          collection={autocompleteState.collections[0]}
                        />
                        <p className="flex items-center justify-end gap-2 border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                          Search by{' '}
                          <IconBrandAlgolia className="h-4 fill-[#003DFF] dark:fill-zinc-400" />
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
      <SearchDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
}
