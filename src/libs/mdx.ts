import { bundleMDX } from 'mdx-bundler';
import { readFile } from './utils';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import exportToc, { Heading, Toc } from '@jasonlamv-t/remark-toc-export';
import remarkSlug from 'remark-slug';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import path from 'path';

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
      ];
      
      return options;
    },
  });

  return { ...res, toc };
};
