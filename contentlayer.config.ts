import rehypeCodeTitle from '@jasonlamv-t/rehype-code-title';
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import { h } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Element } from 'rehype-autolink-headings/lib';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';
import { IconLink } from './app/components/MDX/IconLink';
import Platform from './app/types/Platform';
import { feature } from './data/config';

export const Link = defineNestedType(() => ({
  name: 'Link',
  fields: {
    name: { type: 'string', required: true },
    url: { type: 'string', required: false },
  },
}));

export const SocialLink = defineNestedType(() => ({
  name: 'SocialLink',
  fields: {
    platform: {
      type: 'enum',
      options: Object.keys(Platform),
      required: true,
    },
    value: { type: 'string', required: true },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    author: { type: 'string', required: false }, // multiAuthor splitting with ','
    date: { type: 'date', required: true },
    pinned: { type: 'boolean', required: false, default: false },
    draft: { type: 'boolean', required: false, default: false },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    summary: { type: 'string', required: true },
    canonicalUrl: { type: 'string', required: false, default: '' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) =>
        post.canonicalUrl
          ? `posts/${post.canonicalUrl}`
          : post._raw.flattenedPath,
    },
  },
}));

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    isDefault: { type: 'boolean', required: false, default: false },
    name: { type: 'string', required: true },
    alias: { type: 'string', required: false, default: '' },
    avatarPath: {
      type: 'string',
      required: false,
      default: '/data/images/logo.jpg',
    },
    location: { type: 'string', required: false },
    occupation: { type: 'string', required: false },
    company: { type: 'nested', of: Link, required: false },
    organizations: { type: 'list', of: Link, required: false },
    social: { type: 'list', of: SocialLink, required: false },
    resumePath: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (author) =>
        author.alias
          ? `about/${author.alias}`
          : author._raw.flattenedPath.replace('authors', 'about'),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    link: { type: 'string', required: true }, // TODO: set to false and add project detail page
    coverPath: { type: 'string', required: false },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Author, Project],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath, remarkSlug],
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
          showLineNumbers: feature?.showCodeLineNumbers ?? false,
        },
      ],
      rehypePresetMinify,
    ],
  },
});
