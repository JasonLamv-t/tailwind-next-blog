import { getAllBlogMetaAndSlug } from '@/libs/utils';
import { isEqual } from 'lodash-es';

export default function Blog() {
  return <>Blog</>;
}

export function getStaticPaths() {
  const allSlugs = getAllBlogMetaAndSlug().map(({ slug }) => slug);
  const paths = allSlugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export function getStaticProps(context: any) {
  const { slug: theSlug } = context.params as { slug: string[] };

  const res = getAllBlogMetaAndSlug().find(({ slug }) =>
    isEqual(slug, theSlug)
  );
  console.log(res);

  return { props: {} };
}
