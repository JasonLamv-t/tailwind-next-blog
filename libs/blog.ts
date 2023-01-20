import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getAllFilePaths } from './file';
import { orderBy } from 'lodash-es';

const blogsPath = 'data/blogs';

/**
 * Get the meta of all the blogs
 * @returns all publish blogs' meta in date order
 */
export const getAllBlogsMeta = () => {
  const allFilePaths = getAllFilePaths(path.resolve(blogsPath));
  const publishBlogsMatter = allFilePaths
    .map((filepath) => {
      const MDFile = fs.readFileSync(filepath, 'utf8');
      return matter(MDFile).data;
    })
    .filter(({ draft }) => !draft);
  return orderBy(publishBlogsMatter, 'date', 'desc');
};
