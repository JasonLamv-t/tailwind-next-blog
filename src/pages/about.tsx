import authorData from '#/meta/author';
import MDXRenderer from '@/components/MDXRenderer';
import { CommonSEO } from '@/components/SEO';
import { parseMDX } from '@/libs/mdx';

export default function About({ code }: { code: string }) {
  return (
    <>
      <CommonSEO title={`${authorData.name} | Brachistochrone`} />
      <MDXRenderer code={code} layout={'AuthorLayout'} />
    </>
  );
}

export async function getStaticProps() {
  const { code } = await parseMDX('author.md');
  return { props: { code } };
}
