import fs from 'fs/promises';

export const readDirRecursive = async (dirName: string) => {
  let files: string[] = [];
  const items = await fs.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...(await readDirRecursive(`${dirName}/${item.name}`)),
      ];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};
