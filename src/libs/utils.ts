import siteData from '#/meta/site';
import { BlogMeta } from '@/types/blog';

import fg from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import { orderBy } from 'lodash-es';
import path from 'path';

const pathmap = {
  blog: 'data/blogs',
  project: 'data/projects',
};

/**
 * Get all md/mdx files name in the directory of the specified type
 * @param type blog | project
 * @returns list of the file names
 */
export const getAllFilenames = (type: 'blog' | 'project') => {
  return fg.sync(['**/*.md', '**/*.mdx'], {
    cwd: path.resolve(pathmap[type]),
  });
};

/**
 * Format the filename to slug list
 * @param filename the filename of the blog
 * @returns slugs in string list format
 */
export const formatFilename = (filename: string) =>
  filename.replace('.md', '').replaceAll(' ', '-').split('/');

/**
 * Get the meta of all the blogs
 * @returns all publish blogs' meta in date order
 */
export const getAllBlogMetaAndSlug = () => {
  const blogFilenames = getAllFilenames('blog');

  const blogMetaAndSlug = blogFilenames
    .map((filename) => {
      const filePath = path.resolve(pathmap.blog, filename);
      const MDFile = fs.readFileSync(filePath, 'utf8');
      const meta = matter(MDFile).data as BlogMeta;
      meta.dateString = new Date(meta.date).toLocaleDateString(
        siteData.locale,
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }
      );

      const slug = meta.canonicalUrl
        ? [meta.canonicalUrl]
        : formatFilename(filename);
      return { meta, slug, filename };
    })
    .filter(({ meta: { draft } }) => !draft);

  return orderBy(blogMetaAndSlug, 'meta.date', 'desc');
};
