import { Author, allAuthors } from "contentlayer/generated";

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
export function getAuthor(slug?: string) {
  if (!allAuthors.length) throw new Error('Please add authors first');

  const defaultAuthor = allAuthors.find((author) => author.isDefault) || allAuthors[0];
  const foundAuthor = allAuthors.find((author) => author.url === `about/${slug}`);

  if (!slug) return defaultAuthor;
  else return foundAuthor;
};
