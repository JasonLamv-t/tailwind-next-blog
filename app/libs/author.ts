import { allAuthors } from "contentlayer/generated";

const getAuthor = (slug?: string) => {
  if (!allAuthors.length) throw new Error('Please add authors first');

  const defaultAuthor = allAuthors.find((author) => author.isDefault) || allAuthors[0];
  const foundAuthor = allAuthors.find((author) => author.url === `about/${slug}`);

  if (!slug) return defaultAuthor;
  else return foundAuthor;
};

export default getAuthor;