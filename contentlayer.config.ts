import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    pinned: { type: 'boolean', required: false, default: false },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    summary: { type: 'string', required: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (post: Post) => `/posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: 'data/posts', documentTypes: [Post] });