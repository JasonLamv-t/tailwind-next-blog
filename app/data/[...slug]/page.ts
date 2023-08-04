import { readDirRecursive } from '@/libs/data';
import { notFound, redirect, usePathname } from 'next/navigation';

export const generateStaticParams = async () => {
  const filePaths = await readDirRecursive('data/(public)');
  const params = filePaths.map((filePath) => ({
    slug: filePath.split('/').slice(1),
  }));

  return params;
};

const Redirector = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}) => {
  const filePaths = await readDirRecursive('data/(public)');

  const foundFilePath = filePaths.find((v) => v === `data/${slug.join('/')}`);
  if (foundFilePath) redirect(foundFilePath.replace('data/(public)', '/data'));
  else notFound();
};

export default Redirector;
