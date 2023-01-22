import siteData from '#/meta/site';
import { BlogMeta } from '@/types/blog';

import fg from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import { orderBy } from 'lodash-es';
import path from 'path';

const blogsPath = 'data/blogs';

/**
 * Get the meta of all the blogs
 * @returns all publish blogs' meta in date order
 */
export const getAllBlogsMeta = () => {
  const blogFilepaths = fg
    .sync(['**/*.md', '**/*.mdx'], {
      cwd: path.resolve(blogsPath),
    })
    .map((filename) => path.resolve(blogsPath, filename));

  const publishedBlogsMeta = blogFilepaths
    .map((filename): BlogMeta => {
      const MDFile = fs.readFileSync(filename, 'utf8');
      const meta: BlogMeta = matter(MDFile).data as BlogMeta;
      meta.dateString = new Date(meta.date).toLocaleDateString(
        require('#/meta/site').locale,
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }
      );
      return meta;
    })
    .filter(({ draft }) => !draft);

  return orderBy(publishedBlogsMeta, 'date', 'desc');
};
