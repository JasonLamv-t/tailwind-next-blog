import MDXRenderer from '@/components/MDXRenderer';
import { parseMDX } from '@/libs/mdx';

export default function About({ code }: { code: string }) {
  return <MDXRenderer code={code} layout={'AuthorLayout'} />;
}

export async function getStaticProps() {
  const { code } = await parseMDX('author.md');
  return { props: { code } };
}
