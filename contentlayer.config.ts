import siteData from './data/meta/site';
import rehypeCodeTitle from '@jasonlamv-t/rehype-code-title';
import { IconLink } from '@tabler/icons-react';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { h } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    pinned: { type: 'boolean', required: false, default: false },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    summary: { type: 'string', required: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: 'data/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkSlug,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'before',
          properties: {},
          content: () => [IconLink],
          group: () => h('.group.h-min.relative'),
          test: (node: Element) =>
            ['h2', 'h3'].includes(node.tagName) && !node.properties?.className,
        },
      ],
      rehypeCodeTitle,
      [
        rehypePrism,
        {
          ignoreMissing: true,
          showLineNumbers: siteData.showCodeLineNumbers ?? false,
        },
      ],
      rehypePresetMinify,
    ]
  }
});