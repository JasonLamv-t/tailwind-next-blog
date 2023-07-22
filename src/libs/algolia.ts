import {
  AutocompleteApi,
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch';
import { useRouter } from 'next/router';
import { useId, useState } from 'react';

export type HierarchyIndex =
  | 'lvl0'
  | 'lvl1'
  | 'lvl2'
  | 'lvl3'
  | 'lvl4'
  | 'lvl5'
  | 'lvl6';

export interface Content {
  value: string;
  matchLevel: string | unknown;
  fullyHighlighted?: boolean | unknown;
  matchedWords: string[];
}

export interface Result extends BaseItem {
  url: string;
  url_without_anchor: string;
  anchor: string;
  content: string;
  type: 'content' | HierarchyIndex;
  hierarchy: {
    [key in HierarchyIndex]: string | null;
  };
  objectID: string;
  _snippetResult: {
    content: {
      value: string;
      matchLevel: string | unknown;
    };
  };
  _highlightResult: {
    content: Content;
    hierarchy: {
      [key in HierarchyIndex]: Content;
    };
  };
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
  process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string
);

export function useAutocomplete() {
  const id = useId();
  const router = useRouter();
  const [autocompleteState, setAutocompleteState] =
    useState<AutocompleteState<Result> | null>(null);

  const [autocomplete] = useState(
    () =>
      createAutocomplete({
        id,
        placeholder: 'Find something...',
        defaultActiveItemId: 0,
        onStateChange({ state }) {
          setAutocompleteState(state as unknown as AutocompleteState<Result>);
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
                return item.query as string;
              },
              getItemUrl({ item }) {
                const url = new URL(item.url as string);
                return `${url.pathname}${url.hash}`;
              },
              onSelect({ itemUrl }) {
                router.push(itemUrl as string);
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
      }) as AutocompleteApi<
        Result,
        React.ChangeEvent | React.FormEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >
  );

  return { autocomplete, autocompleteState };
}

export function resolveResult(result: Result) {
  const allLevels = Object.keys(result.hierarchy) as HierarchyIndex[];
  const hierarchy = Object.entries(result._highlightResult.hierarchy).filter(
    ([, { value }]) => Boolean(value)
  ) as [HierarchyIndex, Content][];
  const levels = hierarchy.map(([level]) => level);

  const level =
    result.type === 'content'
      ? levels.pop()!
      : levels
        .filter(
          (level) =>
            allLevels.indexOf(level) <=
            allLevels.indexOf(result.type as HierarchyIndex)
        )
        .pop()!;

  return {
    titleHtml: result._highlightResult.hierarchy[level].value,
    hierarchyHtml: hierarchy
      .slice(0, levels.indexOf(level))
      .map(([, { value }]) => value),
  };
}
