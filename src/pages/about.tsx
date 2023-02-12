import MDXRender from '@/components/MDXRender';
import { parseMDX } from '@/libs/mdx';

export default function About({ code }: { code: string }) {
  return <MDXRender code={code} layout={'AuthorLayout'} />;
}

export async function getStaticProps() {
  const { code } = await parseMDX('author.md');
  return { props: { code } };
}
