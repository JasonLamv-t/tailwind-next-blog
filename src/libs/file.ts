import fs from 'fs';
import path from 'path';

/**
 * Get all the files paths in the given directory, including subdirectories
 * @param targetPath the path to the target directory
 * @param list existing filepaths(for recursion)
 * @returns filepaths list
 */
export const getAllFilePaths = (targetPath: string, list: string[] = []) => {
  const resolvedList = fs.readdirSync(targetPath);

  resolvedList.forEach((item) => {
    const itemPath = path.join(targetPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) getAllFilePaths(itemPath, list);
    else list.push(itemPath);
  });

  return list;
};
