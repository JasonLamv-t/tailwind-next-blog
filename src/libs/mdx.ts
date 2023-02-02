import exportToc, { Heading, Toc } from '@jasonlamv-t/remark-toc-export';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';

import { readFile } from './utils';

import siteData from '#/meta/site';

export const parseMDX = async (
  filename: string,
  type: 'blogs' | 'projects'
) => {
  const source = readFile(filename, type);

  const toc: Toc = [];
  const res = await bundleMDX({
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
        rehypeAutolinkHeadings,
        [
          rehypePrism,
          {
            ignoreMissing: true,
            showLineNumbers: siteData.showCodeLineNumbers ?? false,
          },
        ],
      ];

      return options;
    },
  });

  return { ...res, toc };
};
