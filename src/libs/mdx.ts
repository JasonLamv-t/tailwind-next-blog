import rehypeCodeTitle from '@jasonlamv-t/rehype-code-title';
import exportToc, { Heading, Toc } from '@jasonlamv-t/remark-toc-extract';
import { h } from 'hastscript';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';

import siteData from '#/meta/site';
import { Element } from 'hastscript/lib/core';
import { formatDate, readFile } from './utils';

const IconLink = h(
  'svg.w-6.h-6.absolute.-left-6.right-auto.hidden.group-hover:block',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    strokeWidth: '2',
    stroke: 'currentColor',
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  [
    h('path', {
      d: 'M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5',
    }),
    h('path', {
      d: 'M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5',
    }),
  ]
);

export const parseMDX = async (
  filename: string,
  type?: 'blogs' | 'projects'
) => {
  const source = readFile(filename, type);

  const toc: Toc = [];
  const { code, matter } = await bundleMDX({
    source,
    cwd: path.resolve('src', 'components'),
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMath,
        remarkSlug,
        [
          exportToc,
          {
            callback: (t: Toc) => {
              t.forEach((item: Heading) => toc.push(item));
            },
            depthLimit: 3,
          },
        ],
      ];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'before',
            properties: {},
            content: () => [IconLink],
            group: () => h('.group.h-min.relative'),
            test: (node: Element) =>
              ['h2', 'h3'].includes(node.tagName) &&
              !node.properties?.className,
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
      ];

      return options;
    },
  });

  const meta = matter.data;
  meta.dateString = formatDate(meta.date);

  return { code, toc, meta };
};
