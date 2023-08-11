import { Author, Post, allAuthors, allPosts } from 'contentlayer/generated';
import { Document } from 'flexsearch';

const useFlexSearchIndex = () => {
  const index = new Document({
    tokenize: 'full',
    document: {
      id: 'url',
      index: ['url', 'title', 'summary', 'content'],
    },
  });

  [...allAuthors, ...allPosts].forEach((doc) => {
    index.add({
      url: doc.url,
      title: (doc as Post)?.title ?? (doc as Author)?.name,
      summary: (doc as Post)?.summary ?? '',
      content: doc.body.raw,
    });
  });

  return index;
};

export default useFlexSearchIndex;
