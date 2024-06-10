import rehypeCodeTitle from '@jasonlamv-t/rehype-code-title';
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';
import { h } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import { IconLink } from './components/MDX/IconLink';
import { SocialMedia } from './types/SocialMedia';
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
    socialMedia: {
      type: 'enum',
      options: Object.keys(SocialMedia),
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

export const Resource = defineDocumentType(() => ({
  name: 'Resource',
  filePathPattern: 'resources/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['book', 'video', 'article', 'app', 'other'],
      required: true,
    },
    description: { type: 'string', required: true },
    link: { type: 'string', required: true },
    coverPath: { type: 'string', required: false },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Author, Project, Resource],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'before',
          properties: {},
          content: () => [IconLink],
          group: () => h('.group.h-min.relative'),
          test: (node: { tagName: string; properties: { className: any } }) =>
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
