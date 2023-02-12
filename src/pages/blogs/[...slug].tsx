import MDXRenderer from '@/components/MDXRenderer';
import { parseMDX } from '@/libs/mdx';
import { getAllBlogMetaAndSlug } from '@/libs/utils';
import { BlogMeta } from '@/types/blog';
import { isEqual } from 'lodash-es';

export default function Blog({ code, meta }: { code: string; meta: BlogMeta }) {
  return <MDXRenderer code={code} layout={'ArticleLayout'} meta={meta} />;
}

export function getStaticPaths() {
  const paths = getAllBlogMetaAndSlug().map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const { slug: theSlug } = context.params as { slug: string[] };

  const allBlog = getAllBlogMetaAndSlug();
  const index = allBlog.findIndex(({ slug }) => isEqual(slug, theSlug));
  const next = index === allBlog.length - 1 ? null : allBlog[index + 1];
  const previous = index === 0 ? null : allBlog[index - 1];
  const res = await parseMDX(allBlog[index].filename, 'blogs');

  return { props: { ...res, previous, next } };
}
