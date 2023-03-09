import { BlogMeta } from '@/types/blog';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import Code from './Code';
import Note from './Note';
import Pre from './Pre';
import Image from './Image';

export default function MDXRenderer({
  code,
  layout,
  meta,
}: {
  code: string;
  layout?: 'ArticleLayout';
  meta?: BlogMeta;
}) {
  const MDXContent = useMemo(() => getMDXComponent(code), [code]);
  const wrapper = layout ? require(`@/layouts/${layout}`).default : '';
  const components = {
    wrapper,
    pre: Pre,
    code: Code,
    Note: Note,
    img: Image,
  };

  return <MDXContent components={components} {...meta} />;
}
