import Pre from '@/components/Pre';
import AuthorLayout from '@/layouts/AuthorLayout';
import { parseMDX } from '@/libs/mdx';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

export default function About({ code }: { code: string }) {
  const MDXContent = useMemo(() => getMDXComponent(code), [code]);
  const components = {
    pre: Pre,
    wrapper: AuthorLayout,
  };

  return <MDXContent components={components} />;
}

export async function getStaticProps() {
  const { code } = await parseMDX('author.md');
  return { props: { code } };
}
