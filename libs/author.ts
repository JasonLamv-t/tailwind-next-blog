import { Author, allAuthors } from 'contentlayer/generated';

/**
 * get the default author or the first author
 */
export function getAuthor(): Author;
/**
 * search the author with the given slug
 * @param slug author's slug in the url or the alias
 * @returns found `Author` or `undefined`
 */
export function getAuthor(slug: string): Author | undefined;
/**
 * search all the authors with the given slugs
 * @param slugs authors' slugs in the url or the alias
 * @return found `Author`s, at least `[default Author]` if no author is found
 */
export function getAuthor(slugs: string[]): Author[];
export function getAuthor(slug?: string | string[]) {
  if (!allAuthors.length) throw new Error('Please add authors first');

  const defaultAuthor =
    allAuthors.find((author) => author.isDefault) || allAuthors[0];
  if (!slug) return defaultAuthor;

  if (Array.isArray(slug)) {
    const foundAuthors = slug
      .map(
        (s) =>
          allAuthors.find((author) => author.url === `about/${s}`) as Author
      )
      .filter((v) => v);
    return foundAuthors.length ? foundAuthors : [defaultAuthor];
  } else return allAuthors.find((author) => author.url === `about/${slug}`);
}
